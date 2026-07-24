import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Helper: updates <title>, meta description and canonical for each route
function PageSEO({ title, description, canonical }: { title: string; description: string; canonical: string }) {
  React.useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (metaOgTitle) metaOgTitle.setAttribute('content', title);
    const metaOgDesc = document.querySelector('meta[property="og:description"]');
    if (metaOgDesc) metaOgDesc.setAttribute('content', description);
    const metaOgUrl = document.querySelector('meta[property="og:url"]');
    if (metaOgUrl) metaOgUrl.setAttribute('content', canonical);
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonical);
  }, [title, description, canonical]);
  return null;
}

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
import { Team } from './components/Team';
import { Partners } from './components/Partners';
import { ChatSection } from './components/ChatSection';
import { Footer } from './components/Footer';
import { StickyChat } from './components/StickyChat';
import { CataloguePage } from './components/CataloguePage';
import { LeadQuiz } from './components/LeadQuiz';
import { AINewsFeed } from './components/AINewsFeed';
import { AdminRadarDashboard } from './components/AdminRadarDashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';

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
      <PageSEO
        title="Linh Labs | Consulenza AI per il Business — Catania"
        description="Linh Labs trasforma l'intelligenza artificiale in vantaggio competitivo reale. Chatbot avanzati, sistemi RAG, automazioni n8n e consulenza AI per aziende a Catania e in tutta Italia."
        canonical="https://linhlabs.com/"
      />
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Services />
        <AINewsFeed />
        <AutomationCatalogue />
        <PortfolioSlider />
        <Team />
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
        <Route path="/admin" element={<AdminRadarDashboard />} />
        <Route path="/privacy" element={
          <>
            <PageSEO
              title="Informativa sulla Privacy & Cookie Policy (GDPR) — Linh Labs"
              description="Informativa sulla Privacy e sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) di Linh Labs, Catania (CT)."
              canonical="https://linhlabs.com/privacy"
            />
            <PrivacyPolicy />
          </>
        } />
        <Route path="/catalogo" element={
          <>
            <PageSEO
              title="Catalogo Automazioni AI | 18+ Workflow Pronti — Linh Labs"
              description="Esplora 18+ automazioni AI pronte all'uso: chatbot, pipeline RAG, automazioni marketing, document ops e molto altro. Personalizza e implementa nel tuo business."
              canonical="https://linhlabs.com/catalogo"
            />
            <CataloguePage />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;