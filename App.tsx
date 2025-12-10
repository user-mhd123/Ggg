import React, { useState } from 'react';
import { 
  Menu, X, Globe, ChevronRight, Play, Star, MapPin, 
  ShieldCheck, Smartphone, Wifi, Zap, Server, Phone, Mail, Instagram, User
} from 'lucide-react';
import { CONTENT, CONTACT_DETAILS } from './constants';
import { Language } from './types';
import GeminiLive from './components/GeminiLive';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'individual' | 'business'>('individual');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white overflow-x-hidden ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* --- Navbar --- */}
      <nav className="fixed w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-black -rotate-45" />
            </div>
            <span className="text-xl font-bold font-orbitron tracking-wider">LIGHTSPEED</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-cyan-400 transition">{t.nav.about}</a>
            <a href="#solutions" className="hover:text-cyan-400 transition">{t.nav.solutions}</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition">{t.nav.howItWorks}</a>
            <a href="#testimonials" className="hover:text-cyan-400 transition">{t.nav.testimonials}</a>
            <button onClick={() => setContactModalOpen(true)} className="hover:text-cyan-400 transition">{t.nav.contact}</button>
            <button onClick={toggleLang} className="flex items-center gap-1 hover:text-white">
              <Globe size={16} /> <span>{lang.toUpperCase()}</span>
            </button>
            <button className="px-5 py-2 border border-white/30 rounded hover:bg-white hover:text-black transition">
              {t.nav.signUp}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10 p-6 flex flex-col gap-4">
             <a href="#about" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a>
             <a href="#solutions" onClick={() => setMobileMenuOpen(false)}>{t.nav.solutions}</a>
             <button onClick={() => { setContactModalOpen(true); setMobileMenuOpen(false); }}>{t.nav.contact}</button>
             <button onClick={toggleLang} className="flex items-center gap-2">{t.nav.signUp}</button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Earth Image */}
        <div className="absolute inset-0 z-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Earth from space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-orbitron mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded transition shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              {t.hero.cta}
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Section --- */}
      <section className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm relative z-20 -mt-10 mx-4 md:mx-auto container rounded-xl max-w-6xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
             <div className="text-cyan-400 mb-2 flex justify-center"><Zap size={32} /></div>
             <h3 className="text-2xl font-bold font-orbitron">300 <span className="text-sm text-gray-400">/mbps</span></h3>
             <p className="text-gray-500 text-sm uppercase tracking-widest mt-1">{t.stats.speed}</p>
          </div>
          <div className="p-4">
             <div className="text-cyan-400 mb-2 flex justify-center"><Star size={32} /></div>
             <h3 className="text-2xl font-bold font-orbitron">4.9 <span className="text-sm text-gray-400">★</span></h3>
             <p className="text-gray-500 text-sm uppercase tracking-widest mt-1">{t.stats.rating}</p>
          </div>
          <div className="p-4">
             <div className="text-cyan-400 mb-2 flex justify-center"><Globe size={32} /></div>
             <h3 className="text-2xl font-bold font-orbitron">195</h3>
             <p className="text-gray-500 text-sm uppercase tracking-widest mt-1">{t.stats.coverage}</p>
          </div>
        </div>
      </section>

      {/* --- Mission Section --- */}
      <section id="about" className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-1 bg-cyan-500"></span>
                <span className="uppercase tracking-widest text-sm text-gray-400">{t.mission.title}</span>
             </div>
             <h2 className="text-4xl font-orbitron font-bold mb-6">{t.mission.subtitle}</h2>
             <p className="text-gray-400 leading-relaxed mb-8">{t.mission.description}</p>
             <button className="bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded text-sm font-bold uppercase tracking-wider">{t.mission.cta}</button>
          </div>
          <div className="lg:w-1/2 relative group">
             <div className="absolute -inset-4 bg-cyan-500/20 rounded-xl blur-xl group-hover:bg-cyan-500/30 transition duration-700"></div>
             <img 
               src="https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?q=80&w=2068&auto=format&fit=crop" 
               alt="Remote Island" 
               className="relative rounded-lg shadow-2xl grayscale hover:grayscale-0 transition duration-500"
             />
          </div>
        </div>
      </section>

      {/* --- Capabilities Section --- */}
      <section className="py-24 bg-[#080808]">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-16">
           <div className="lg:w-1/2 relative">
             <img 
               src="https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop" 
               alt="Satellite" 
               className="rounded-lg shadow-2xl opacity-80 hover:opacity-100 transition duration-500"
             />
           </div>
           <div className="lg:w-1/2">
             <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-1 bg-cyan-500"></span>
                <span className="uppercase tracking-widest text-sm text-gray-400">{t.capabilities.title}</span>
             </div>
             <h2 className="text-4xl font-orbitron font-bold mb-6">{t.capabilities.subtitle}</h2>
             <p className="text-gray-400 leading-relaxed mb-8">{t.capabilities.description}</p>
             <button className="bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded text-sm font-bold uppercase tracking-wider">{t.capabilities.cta}</button>
           </div>
        </div>
      </section>

      {/* --- Coverage Map --- */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-orbitron font-bold mb-4">{t.coverage.title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">{t.coverage.subtitle}</p>
        
        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-contain bg-center opacity-60 grayscale invert">
          {/* Animated dots for "nodes" */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 90 + 5}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            {t.coverage.legend}
          </div>
        </div>
      </section>

      {/* --- Solution Section --- */}
      <section id="solutions" className="py-24 bg-[#080808]">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
             <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-1 bg-cyan-500"></span>
                <span className="uppercase tracking-widest text-sm text-gray-400">{t.solution.title}</span>
             </div>
             <h2 className="text-4xl font-orbitron font-bold mb-6">{t.solution.subtitle}</h2>
             <p className="text-gray-400 leading-relaxed mb-8">{t.solution.description}</p>
             <button className="bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded text-sm font-bold uppercase tracking-wider">{t.solution.cta}</button>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-3xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
               alt="Cyber Technology" 
               className="relative rounded-lg shadow-2xl mix-blend-lighten"
             />
          </div>
        </div>
      </section>

      {/* --- Security Section --- */}
      <section className="py-24 container mx-auto px-6">
         <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2">
             <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-1 bg-cyan-500"></span>
                <span className="uppercase tracking-widest text-sm text-gray-400">{t.security.title}</span>
             </div>
             <h2 className="text-4xl font-orbitron font-bold mb-6">{t.security.subtitle}</h2>
             <p className="text-gray-400 leading-relaxed mb-8">{t.security.description}</p>
             <button className="bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded text-sm font-bold uppercase tracking-wider">{t.security.cta}</button>
          </div>
          <div className="lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/10">
              <img 
               src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop" 
               alt="Digital Security" 
               className="w-full h-full object-cover opacity-80 hover:scale-105 transition duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section className="py-24 bg-[#080808]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-12">{t.pricing.title}</h2>
          
          {/* Toggle */}
          <div className="inline-flex bg-white/5 rounded-full p-1 mb-16 border border-white/10">
            <button 
              onClick={() => setBillingCycle('individual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${billingCycle === 'individual' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              {t.pricing.toggleIndividual}
            </button>
            <button 
              onClick={() => setBillingCycle('business')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${billingCycle === 'business' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              {t.pricing.toggleBusiness}
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition duration-300 group">
              <div className="p-8 border-b border-white/10">
                <h3 className="text-xl font-bold mb-2">Andromeda</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Unlimited data</p>
                <div className="text-4xl font-orbitron font-bold mb-1">
                  <span className="text-lg align-top">$</span>149<span className="text-sm text-gray-500 font-sans font-normal">/month</span>
                </div>
              </div>
              <div className="p-8">
                 <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded font-bold uppercase text-sm mb-8 transition">{t.pricing.cta}</button>
                 <div className="space-y-4 text-sm text-gray-400">
                    <div className="flex justify-between"><span>{t.pricing.features.download}</span><span className="text-white">300 mps</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.upload}</span><span className="text-white">60 mps</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.data}</span><span className="text-white">Unlimited</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.contract}</span><span className="text-white">12 Month</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.setup}</span><span className="text-white">£ 258</span></div>
                 </div>
              </div>
            </div>

            {/* Card 2 - Active */}
            <div className="bg-cyan-900/10 border border-cyan-500 rounded-xl overflow-hidden transform md:-translate-y-4 relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-cyan-500 shadow-[0_0_20px_#06b6d4]"></div>
              <div className="p-8 border-b border-cyan-500/20 bg-cyan-500/5">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Saturn</h3>
                <p className="text-xs text-cyan-300/60 uppercase tracking-widest mb-6">Fast brother</p>
                <div className="text-4xl font-orbitron font-bold mb-1">
                  <span className="text-lg align-top">$</span>99<span className="text-sm text-gray-500 font-sans font-normal">/month</span>
                </div>
              </div>
              <div className="p-8">
                 <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase text-sm mb-8 transition shadow-[0_0_15px_rgba(6,182,212,0.4)]">{t.pricing.cta}</button>
                 <div className="space-y-4 text-sm text-gray-300">
                    <div className="flex justify-between"><span>{t.pricing.features.download}</span><span className="text-white font-bold">200 mps</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.upload}</span><span className="text-white font-bold">40 mps</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.data}</span><span className="text-white font-bold">Unlimited</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.contract}</span><span className="text-white font-bold">12 Month</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.setup}</span><span className="text-white font-bold">£ 258</span></div>
                 </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition duration-300">
              <div className="p-8 border-b border-white/10">
                <h3 className="text-xl font-bold mb-2">Moon</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Better than basic</p>
                <div className="text-4xl font-orbitron font-bold mb-1">
                  <span className="text-lg align-top">$</span>79<span className="text-sm text-gray-500 font-sans font-normal">/month</span>
                </div>
              </div>
              <div className="p-8">
                 <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded font-bold uppercase text-sm mb-8 transition">{t.pricing.cta}</button>
                 <div className="space-y-4 text-sm text-gray-400">
                    <div className="flex justify-between"><span>{t.pricing.features.download}</span><span className="text-white">150 mps</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.upload}</span><span className="text-white">20 mps</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.data}</span><span className="text-white">Unlimited</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.contract}</span><span className="text-white">12 Month</span></div>
                    <div className="flex justify-between"><span>{t.pricing.features.setup}</span><span className="text-white">£ 258</span></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer & Final CTA --- */}
      <footer className="relative bg-[#020202] pt-32 pb-10 border-t border-white/5 overflow-hidden">
        {/* Planet Background Footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8">{t.ctaJoin.title}</h2>
            <button className="px-10 py-4 border border-white hover:bg-white hover:text-black transition uppercase tracking-widest text-sm mb-24">
                {t.ctaJoin.button}
            </button>

            <div className="grid md:grid-cols-4 gap-8 text-left text-sm text-gray-400 border-t border-white/10 pt-16">
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">LightSpeed</h4>
                    <p className="leading-relaxed mb-4">{t.footer.description}</p>
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm rotate-45">
                        <div className="w-4 h-4 bg-black -rotate-45" />
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">{t.footer.about}</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-cyan-400">Solutions</a></li>
                        <li><a href="#" className="hover:text-cyan-400">How it works</a></li>
                        <li><a href="#" className="hover:text-cyan-400">Testimonials</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">{t.footer.solutions}</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-cyan-400">Individuals</a></li>
                        <li><a href="#" className="hover:text-cyan-400">Businesses</a></li>
                        <li><a href="#" className="hover:text-cyan-400">Non-profit</a></li>
                    </ul>
                </div>
                <div>
                     <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">{t.footer.contact}</h4>
                     <ul className="space-y-2">
                        <li><a href="#" className="hover:text-cyan-400">Phone</a></li>
                        <li><a href="#" className="hover:text-cyan-400">E-mail</a></li>
                        <li><a href="#" className="hover:text-cyan-400">Instagram</a></li>
                        <li><a href="#" className="hover:text-cyan-400">Facebook</a></li>
                    </ul>
                    <button className="mt-6 px-6 py-2 border border-white/30 rounded hover:bg-white hover:text-black transition">
                        Sign Up
                    </button>
                </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
                {t.footer.copyright}
            </div>
        </div>
      </footer>

      {/* --- Contact Modal --- */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
           <div className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-md w-full relative">
              <button 
                onClick={() => setContactModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X />
              </button>
              <h3 className="text-2xl font-orbitron font-bold mb-8 text-center text-cyan-400">{t.contactInfo.title}</h3>
              
              <div className="space-y-6">
                 <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                    <User className="text-cyan-500" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">{t.contactInfo.manager}</p>
                        <p className="font-medium">{CONTACT_DETAILS.manager}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                    <Phone className="text-green-500" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">{t.contactInfo.whatsapp}</p>
                        <p className="font-medium font-mono">{CONTACT_DETAILS.whatsapp}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                    <Mail className="text-yellow-500" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">{t.contactInfo.email}</p>
                        <p className="font-medium break-all">{CONTACT_DETAILS.email}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                    <Instagram className="text-pink-500" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">{t.contactInfo.instagram}</p>
                        <p className="font-medium">{CONTACT_DETAILS.instagram}</p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => setContactModalOpen(false)}
                className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded font-bold transition"
              >
                {t.contactInfo.close}
              </button>
           </div>
        </div>
      )}

      {/* --- AI Support Floating Button --- */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
            onClick={() => setAiAssistantOpen(true)}
            className="group flex items-center gap-2 pl-4 pr-2 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:pr-4"
        >
            <span className="font-bold text-sm hidden group-hover:block transition-all">{t.ai.button}</span>
            <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-white rounded-full relative z-10"></div>
            </div>
        </button>
      </div>

      <GeminiLive 
        isOpen={aiAssistantOpen} 
        onClose={() => setAiAssistantOpen(false)} 
        lang={lang}
        t={t.ai}
      />

    </div>
  );
};

export default App;
