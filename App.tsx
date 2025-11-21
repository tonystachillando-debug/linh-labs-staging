import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Services } from './components/Services';
import { Partners } from './components/Partners';
import { ChatSection } from './components/ChatSection';
import { Footer } from './components/Footer';
import { StickyChat } from './components/StickyChat';

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500/30">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Services />
        <Partners />
        <ChatSection />
      </main>
      <Footer />
      <StickyChat />
    </div>
  );
}

export default App;