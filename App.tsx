import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { captureReferral } from './services/referral';

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
// import { AINewsFeed } from './components/AINewsFeed'; // nascosto finché non è pronto
import { AdminRadarDashboard } from './components/AdminRadarDashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TreasuryPage } from './components/TreasuryPage';

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
        title="Linh Labs | Agenti AI per il Business — Catania"
        description="Linh Labs progetta e mette in produzione agenti AI autonomi per le aziende: sistemi multi-agente, knowledge base RAG, agenti conversazionali e governance AI Act. Catania e tutta Italia."
        canonical="https://linhlabs.com/"
      />
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Services />
        {/* AI News Radar nascosto finché non è pronto: rimettere <AINewsFeed /> qui */}
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
  React.useEffect(() => {
    captureReferral();
  }, []);

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
              title="Catalogo Agenti AI | Playbook Agentici Pronti — Linh Labs"
              description="Esplora i playbook agentici di Linh Labs: agenti per vendite, marketing, documenti e assistenza, adattati ai tuoi strumenti e ai tuoi dati."
              canonical="https://linhlabs.com/catalogo"
            />
            <CataloguePage />
          </>
        } />
        <Route path="/treasury" element={
          <>
            <PageSEO
              title="Linh Treasury | Automazione Bonifici CBI & SEPA Instant — Linh Labs"
              description="Elimina l'85% del tempo di Payroll e bonifici bancari. Connetti il tuo gestionale ai canali interbancari con generazione XML ISO 20022 a zero errori."
              canonical="https://linhlabs.com/treasury"
            />
            <TreasuryPage />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;