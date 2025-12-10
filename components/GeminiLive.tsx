import React, { useEffect, useRef, useState, memo } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, type Blob as GenAIBlob } from '@google/genai';
import { Mic, MicOff, Volume2, X, Activity } from 'lucide-react';
import { Content } from '../types';

interface GeminiLiveProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  t: Content['ai'];
}

// Audio Utils
function createBlob(data: Float32Array): GenAIBlob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const GeminiLive: React.FC<GeminiLiveProps> = ({ isOpen, onClose, lang, t }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<string>(t.idle);
  const [volume, setVolume] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null); // Holds the session promise/object
  
  // Audio Playback
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Connection
  const connect = async () => {
    if (!process.env.API_KEY) {
      console.error("API Key missing");
      return;
    }

    setStatus(t.listening);
    setIsActive(true);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Initialize Audio Contexts
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const inputCtx = new AudioContextClass({ sampleRate: 16000 });
    const outputCtx = new AudioContextClass({ sampleRate: 24000 });
    
    inputAudioContextRef.current = inputCtx;
    audioContextRef.current = outputCtx;

    // Get Mic Stream
    let stream: MediaStream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
        console.error("Mic permission denied", e);
        setStatus(t.micPermission);
        setIsActive(false);
        return;
    }

    const outputNode = outputCtx.createGain();
    outputNode.connect(outputCtx.destination);

    // Start Session
    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          console.log("Session Opened");
          setStatus(t.listening);
          
          // Audio Input Processing
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            
            // Calculate volume for visualization
            let sum = 0;
            for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
            setVolume(Math.sqrt(sum / inputData.length) * 100);

            const pcmBlob = createBlob(inputData);
            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
          };
          
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          // Handle Model Audio
          const audioStr = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioStr) {
             setStatus(t.speaking);
             nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
             
             const audioBuffer = await decodeAudioData(
                 decode(audioStr),
                 outputCtx,
                 24000,
                 1
             );
             
             const source = outputCtx.createBufferSource();
             source.buffer = audioBuffer;
             source.connect(outputNode);
             
             source.addEventListener('ended', () => {
                 sourcesRef.current.delete(source);
                 if (sourcesRef.current.size === 0) setStatus(t.listening);
             });
             
             source.start(nextStartTimeRef.current);
             nextStartTimeRef.current += audioBuffer.duration;
             sourcesRef.current.add(source);
          }

          if (message.serverContent?.interrupted) {
             sourcesRef.current.forEach(s => s.stop());
             sourcesRef.current.clear();
             nextStartTimeRef.current = 0;
             setStatus(t.listening);
          }
        },
        onclose: () => {
            console.log("Session Closed");
            cleanup();
        },
        onerror: (err) => {
            console.error("Session Error", err);
            cleanup();
        }
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
        },
        systemInstruction: `You are a helpful AI assistant for LightSpeed Internet. 
        You speak ${lang === 'ar' ? 'Arabic' : 'English'}. 
        You help customers understand satellite internet plans, coverage, and support.
        Be concise and friendly.`
      }
    });

    sessionRef.current = sessionPromise;
  };

  const cleanup = () => {
    setIsActive(false);
    setStatus(t.idle);
    setVolume(0);
    
    // Stop Audio Contexts
    inputAudioContextRef.current?.close();
    audioContextRef.current?.close();
    
    // Stop sources
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  const toggleSession = () => {
    if (isActive) {
      // We can't cleanly close the session object directly via SDK based on docs easily without ref holding the session
      // So we rely on closing contexts/reloading or just recreating. 
      // The SDK session has a close method? The interface implies it but patterns show disconnect.
      // For now, reload/cleanup contexts effectively stops it.
      sessionRef.current?.then((s: any) => s.close && s.close());
      cleanup();
    } else {
      connect();
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-cyan-500/50 rounded-2xl w-full max-w-md p-6 shadow-[0_0_50px_rgba(0,174,239,0.3)] relative overflow-hidden">
        
        {/* Close Button */}
        <button onClick={() => { cleanup(); onClose(); }} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
            <h3 className="text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                {t.title}
            </h3>
            <p className="text-cyan-300/60 text-sm mt-1">{status}</p>
        </div>

        {/* Visualizer */}
        <div className="h-32 flex items-center justify-center space-x-2 mb-8 relative">
           <div className={`absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
           
           {/* Simple Bars Visualizer */}
           {[...Array(5)].map((_, i) => (
             <div 
                key={i} 
                className="w-3 bg-gradient-to-t from-cyan-600 to-blue-400 rounded-full transition-all duration-75"
                style={{ 
                    height: isActive ? `${Math.max(10, Math.min(100, volume * (Math.random() + 0.5)))}%` : '10%',
                    opacity: isActive ? 1 : 0.3
                }}
             />
           ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center">
            <button 
                onClick={toggleSession}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isActive 
                    ? 'bg-red-500/20 text-red-500 border-2 border-red-500/50 hover:bg-red-500 hover:text-white' 
                    : 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500/50 hover:bg-cyan-500 hover:text-white'
                }`}
            >
                {isActive ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default memo(GeminiLive);