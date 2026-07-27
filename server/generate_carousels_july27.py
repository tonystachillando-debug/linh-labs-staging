import os

slides = [
    # Slide 1: Cover
    '''<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1350" fill="#0A0D14"/>
  <circle cx="540" cy="400" r="450" fill="#36D6B5" fill-opacity="0.08" filter="blur(80px)"/>
  
  <!-- Logo Badge -->
  <g transform="translate(80, 90)">
    <text font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#36D6B5" letter-spacing="3">LINH LABS AI RADAR — 27 LUGLIO 2026</text>
  </g>
  
  <!-- Main Hook Title -->
  <text x="80" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="800" fill="#FFFFFF" width="920">
    <tspan x="80" dy="0">Gemini 3 Flash,</tspan>
    <tspan x="80" dy="90">Llama 4 MoE &amp;</tspan>
    <tspan x="80" dy="90" fill="#36D6B5">EU AI Act 2026</tspan>
  </text>
  
  <text x="80" y="740" font-family="system-ui, -apple-system, sans-serif" font-size="36" fill="#94A3B8">
    <tspan x="80" dy="0">Le 3 novità fondamentali che ridefiniscono</tspan>
    <tspan x="80" dy="48">l'architettura e la compliance aziendale.</tspan>
  </text>
  
  <!-- Glassmorphic Box -->
  <rect x="80" y="900" width="920" height="240" rx="24" fill="#0F172A" fill-opacity="0.6" stroke="#36D6B5" stroke-opacity="0.4" stroke-width="2"/>
  <text x="130" y="990" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="600" fill="#FFFFFF">⚡ RESOCONTO QUOTIDIANO</text>
  <text x="130" y="1060" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="#94A3B8">Sintesi originale senza copia-incolla curata da Linh Labs.</text>
  
  <!-- Swipe CTA -->
  <rect x="360" y="1200" width="360" height="64" rx="32" fill="#36D6B5"/>
  <text x="540" y="1242" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="700" fill="#0A0D14" text-anchor="middle">Swipe per scoprire ➔</text>
</svg>''',

    # Slide 2: Google DeepMind
    '''<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1350" fill="#0A0D14"/>
  <circle cx="200" cy="300" r="300" fill="#36D6B5" fill-opacity="0.06" filter="blur(70px)"/>
  
  <!-- Header Category -->
  <rect x="80" y="90" width="260" height="50" rx="25" fill="#36D6B5" fill-opacity="0.15"/>
  <text x="210" y="123" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#36D6B5" text-anchor="middle">LLM &amp; AGENTI</text>
  
  <!-- Article Title -->
  <text x="80" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="800" fill="#FFFFFF">
    <tspan x="80" dy="0">Google DeepMind Presenta</tspan>
    <tspan x="80" dy="70" fill="#36D6B5">Gemini 3 Flash &amp; Mariner</tspan>
  </text>
  
  <!-- Summary Box -->
  <rect x="80" y="420" width="920" height="420" rx="24" fill="#0F172A" fill-opacity="0.7" stroke="#1E293B" stroke-width="2"/>
  <text x="130" y="500" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#E2E8F0">
    <tspan x="130" dy="0">Google DeepMind ha svelato Gemini 3 Flash e</tspan>
    <tspan x="130" dy="50">Project Mariner: un sistema ad ultra-bassa latenza</tspan>
    <tspan x="130" dy="50">progettato per consentire agli agenti AI di navigare</tspan>
    <tspan x="130" dy="50">nel web ed eseguire workflow complessi in autonomia.</tspan>
  </text>
  
  <!-- Key Takeaways -->
  <rect x="80" y="890" width="920" height="340" rx="24" fill="#0F172A" stroke="#36D6B5" stroke-opacity="0.3" stroke-width="2"/>
  <text x="130" y="960" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#36D6B5">PUNTI CHIAVE</text>
  
  <text x="130" y="1030" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="#FFFFFF">
    <tspan x="130" dy="0">✓ Latenza ridotta del 50% rispetto alle versioni v2</tspan>
    <tspan x="130" dy="60">✓ Orchestrazione nativa per automazioni browser</tspan>
  </text>
</svg>''',

    # Slide 3: Meta Llama 4
    '''<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1350" fill="#0A0D14"/>
  <circle cx="880" cy="300" r="300" fill="#36D6B5" fill-opacity="0.06" filter="blur(70px)"/>
  
  <rect x="80" y="90" width="300" height="50" rx="25" fill="#36D6B5" fill-opacity="0.15"/>
  <text x="230" y="123" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#36D6B5" text-anchor="middle">RICERCA &amp; MODELLI</text>
  
  <text x="80" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="800" fill="#FFFFFF">
    <tspan x="80" dy="0">Meta Rilascia Llama 4:</tspan>
    <tspan x="80" dy="70" fill="#36D6B5">Open-Weights MoE Enterprise</tspan>
  </text>
  
  <rect x="80" y="420" width="920" height="420" rx="24" fill="#0F172A" fill-opacity="0.7" stroke="#1E293B" stroke-width="2"/>
  <text x="130" y="500" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#E2E8F0">
    <tspan x="130" dy="0">Meta ha reso disponibili i pesi aperti di Llama 4.</tspan>
    <tspan x="130" dy="50">La nuova architettura Mixture-of-Experts (MoE)</tspan>
    <tspan x="130" dy="50">riduce dell'80% la memoria VRAM necessaria,</tspan>
    <tspan x="130" dy="50">portando prestazioni enterprise su server locali.</tspan>
  </text>
  
  <rect x="80" y="890" width="920" height="340" rx="24" fill="#0F172A" stroke="#36D6B5" stroke-opacity="0.3" stroke-width="2"/>
  <text x="130" y="960" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#36D6B5">PUNTI CHIAVE</text>
  
  <text x="130" y="1030" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="#FFFFFF">
    <tspan x="130" dy="0">✓ Abbattimento dell'80% dei costi di calcolo locali</tspan>
    <tspan x="130" dy="60">✓ Totale sovranità dei dati ed esecuzione custom</tspan>
  </text>
</svg>''',

    # Slide 4: EU AI Act
    '''<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1350" fill="#0A0D14"/>
  <circle cx="540" cy="700" r="350" fill="#36D6B5" fill-opacity="0.06" filter="blur(80px)"/>
  
  <rect x="80" y="90" width="380" height="50" rx="25" fill="#36D6B5" fill-opacity="0.15"/>
  <text x="270" y="123" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#36D6B5" text-anchor="middle">REGOLAMENTAZIONE &amp; COMPLIANCE</text>
  
  <text x="80" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="800" fill="#FFFFFF">
    <tspan x="80" dy="0">EU AI Act 2026:</tspan>
    <tspan x="80" dy="70" fill="#36D6B5">Pubblicate le Linee Guida Audit</tspan>
  </text>
  
  <rect x="80" y="420" width="920" height="420" rx="24" fill="#0F172A" fill-opacity="0.7" stroke="#1E293B" stroke-width="2"/>
  <text x="130" y="500" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#E2E8F0">
    <tspan x="130" dy="0">La Commissione Europea ha rilasciato il quadro</tspan>
    <tspan x="130" dy="50">operativo finale per la compliance dell'EU AI Act.</tspan>
    <tspan x="130" dy="50">Definiti i requisiti minimi di tracciabilità log e</tspan>
    <tspan x="130" dy="50">sicurezza dei dati per l'integrazione di AI B2B.</tspan>
  </text>
  
  <rect x="80" y="890" width="920" height="340" rx="24" fill="#0F172A" stroke="#36D6B5" stroke-opacity="0.3" stroke-width="2"/>
  <text x="130" y="960" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#36D6B5">PUNTI CHIAVE</text>
  
  <text x="130" y="1030" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="#FFFFFF">
    <tspan x="130" dy="0">✓ Audit trail obbligatorio per i log di produzione</tspan>
    <tspan x="130" dy="60">✓ Standard ufficiali per software enterprise in UE</tspan>
  </text>
</svg>''',

    # Slide 5: Strategic Insight
    '''<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1350" fill="#0A0D14"/>
  <circle cx="540" cy="500" r="400" fill="#36D6B5" fill-opacity="0.08" filter="blur(80px)"/>
  
  <text x="80" y="150" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#36D6B5" letter-spacing="3">STRATEGIC VISION</text>
  
  <text x="80" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="800" fill="#FFFFFF">
    <tspan x="80" dy="0">Cosa significa tutto questo</tspan>
    <tspan x="80" dy="75" fill="#36D6B5">per la tua azienda?</tspan>
  </text>
  
  <rect x="80" y="440" width="920" height="720" rx="28" fill="#0F172A" fill-opacity="0.8" stroke="#36D6B5" stroke-opacity="0.4" stroke-width="2"/>
  
  <g transform="translate(130, 520)">
    <circle cx="30" cy="30" r="24" fill="#36D6B5" fill-opacity="0.2"/>
    <text x="30" y="39" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#36D6B5" text-anchor="middle">1</text>
    <text x="80" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">AGENTI AUTONOMI REALI</text>
    <text x="80" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#94A3B8">Con latenza &lt;200ms gli agenti entrano nei workflow operativi reali.</text>
  </g>

  <g transform="translate(130, 720)">
    <circle cx="30" cy="30" r="24" fill="#36D6B5" fill-opacity="0.2"/>
    <text x="30" y="39" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#36D6B5" text-anchor="middle">2</text>
    <text x="80" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">EFFICIENZA HARDWARE LOCALE</text>
    <text x="80" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#94A3B8">Modelli MoE permettono privacy totale e costi ridotti dell'80%.</text>
  </g>

  <g transform="translate(130, 920)">
    <circle cx="30" cy="30" r="24" fill="#36D6B5" fill-opacity="0.2"/>
    <text x="30" y="39" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#36D6B5" text-anchor="middle">3</text>
    <text x="80" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">COMPLIANCE OBBLIGATORIA</text>
    <text x="80" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#94A3B8">La tracciabilità e la sicurezza dei dati AI diventano lo standard B2B.</text>
  </g>
</svg>''',

    # Slide 6: Outro & CTA
    '''<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1350" fill="#0A0D14"/>
  <circle cx="540" cy="675" r="500" fill="#36D6B5" fill-opacity="0.09" filter="blur(90px)"/>
  
  <!-- Logo Display -->
  <g transform="translate(320, 280)">
    <path d="M 28 8 L 58 8 C 72 8, 82 18, 79 32 L 65 76 C 60 88, 48 96, 36 96 C 24 96, 18 86, 22 74 L 30 50 C 33 42, 28 34, 20 34 C 12 34, 8 28, 10 20 C 12 12, 18 8, 28 8 Z" fill="#36D6B5" transform="scale(1.4)"/>
    <text x="140" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="86" font-weight="700" fill="#36D6B5">Labs</text>
  </g>
  
  <text x="540" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="800" fill="#FFFFFF" text-anchor="middle">
    <tspan x="540" dy="0">Rimani sempre un passo avanti</tspan>
    <tspan x="540" dy="75" fill="#36D6B5">nel futuro dell'AI.</tspan>
  </text>
  
  <text x="540" y="740" font-family="system-ui, -apple-system, sans-serif" font-size="34" fill="#94A3B8" text-anchor="middle">
    <tspan x="540" dy="0">Ricevi ogni mattina il resoconto completo,</tspan>
    <tspan x="540" dy="50">sintetizzato e filtrato per decision maker e professionisti.</tspan>
  </text>
  
  <!-- Big CTA Button -->
  <rect x="180" y="890" width="720" height="110" rx="55" fill="#36D6B5"/>
  <text x="540" y="960" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#0A0D14" text-anchor="middle">Iscriviti alla Newsletter gratis ➔</text>
  
  <text x="540" y="1120" font-family="system-ui, -apple-system, sans-serif" font-size="40" font-weight="700" fill="#FFFFFF" text-anchor="middle">linhlabs.com</text>
</svg>'''
]

out_dir = '/Users/stazione/Desktop/LIHNLABS/LIHN LABS SITO/public/carousels'
os.makedirs(out_dir, exist_ok=True)

for i, content in enumerate(slides, 1):
    file_path = os.path.join(out_dir, f'slide_{i}.svg')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated {file_path}")

print("✅ Generazione 6 Slide Carosello 27 Luglio 2026 completata!")
