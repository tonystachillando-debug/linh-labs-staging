import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      // Small delay to let the page render before scrolling
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Services } from './components/Services';
import { AutomationCatalogue } from './components/AutomationCatalogue';
import { PortfolioSlider } from './components/PortfolioSlider';
import { Partners } from './components/Partners';
import { ChatSection } from './components/ChatSection';
import { Footer } from './components/Footer';
import { StickyChat } from './components/StickyChat';
import { CataloguePage } from './components/CataloguePage';
import { LeadQuiz } from './components/LeadQuiz';

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
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Services />
        <AutomationCatalogue />
        <PortfolioSlider />
        <ChatSection newMessages={syncedMessages} />
        <Partners />
        <LeadQuiz />
      </main>
      <Footer />
      <StickyChat onMessageSent={handleStickyMessage} />
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CataloguePage />} />
      </Routes>
    </>
  );
}

export default App;