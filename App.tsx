import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Services } from './components/Services';
import { AutomationCatalogue } from './components/AutomationCatalogue';
import { AgeOfAgents } from './components/AgeOfAgents';
import { Partners } from './components/Partners';
import { ChatSection } from './components/ChatSection';
import { Footer } from './components/Footer';
import { StickyChat } from './components/StickyChat';
import { CataloguePage } from './components/CataloguePage';

function HomePage() {
  const [syncedMessages, setSyncedMessages] = React.useState<{ id: string, text: string, sender: 'user' | 'bot' }[]>([]);

  const handleStickyMessage = (userText: string, botText: string) => {
    const timestamp = Date.now();
    setSyncedMessages([
      { id: timestamp.toString(), text: userText, sender: 'user' },
      { id: (timestamp + 1).toString(), text: botText, sender: 'bot' }
    ]);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500/30">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Services />
        <AutomationCatalogue />
        <AgeOfAgents />
        <Partners />
        <ChatSection newMessages={syncedMessages} />
      </main>
      <Footer />
      <StickyChat onMessageSent={handleStickyMessage} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalogo" element={<CataloguePage />} />
    </Routes>
  );
}

export default App;