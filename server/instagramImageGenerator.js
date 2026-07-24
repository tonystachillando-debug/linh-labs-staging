import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CAROUSEL_DIR = path.resolve(__dirname, '../public/carousels');

// Ensure output directory exists
if (!fs.existsSync(CAROUSEL_DIR)) {
  fs.mkdirSync(CAROUSEL_DIR, { recursive: true });
}

/**
 * Generate 1080x1350 SVG/PNG Slide Images for Instagram
 */
export async function generateCarouselSlideImages(carouselData) {
  const slides = carouselData.slides || [];
  const generatedFiles = [];

  for (const slide of slides) {
    const fileName = `slide_${slide.slide_number}.svg`;
    const filePath = path.join(CAROUSEL_DIR, fileName);

    const isCover = slide.type === 'cover';
    const isCTA = slide.type === 'cta';

    // Build vector SVG slide (1080x1350 resolution)
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="50%" stop-color="#0b0f19" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <!-- Glow Gradient -->
    <radialGradient id="purpleGlow" cx="90%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="cyanGlow" cx="10%" cy="90%" r="60%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <style>
      .brand-title { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 38px; font-weight: 800; fill: #ffffff; }
      .brand-accent { fill: #38bdf8; }
      .slide-counter { font-family: 'Inter', system-ui, sans-serif; font-size: 24px; font-weight: 700; fill: #64748b; }
      .tag-text { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 22px; font-weight: 800; fill: #38bdf8; letter-spacing: 2px; }
      .headline { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: ${isCover ? '62px' : '46px'}; font-weight: 800; fill: #ffffff; line-height: 1.2; }
      .body-text { font-family: 'Inter', system-ui, sans-serif; font-size: 30px; font-weight: 400; fill: #cbd5e1; line-height: 1.6; }
      .takeaway-title { font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 22px; font-weight: 800; fill: #38bdf8; letter-spacing: 1px; }
      .takeaway-item { font-family: 'Inter', system-ui, sans-serif; font-size: 24px; font-weight: 500; fill: #94a3b8; }
      .footer-text { font-family: 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 600; fill: #64748b; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1080" height="1350" fill="url(#bgGrad)" />
  <circle cx="950" cy="150" r="500" fill="url(#purpleGlow)" />
  <circle cx="150" cy="1200" r="500" fill="url(#cyanGlow)" />

  <!-- Outer Border Frame -->
  <rect x="20" y="20" width="1040" height="1310" rx="36" fill="none" stroke="#1e293b" stroke-width="4" />

  <!-- Header -->
  <text x="80" y="110" class="brand-title">LINH<tspan class="brand-accent">LABS</tspan></text>
  <text x="940" y="110" text-anchor="end" class="slide-counter">${slide.slide_number} / ${slides.length}</text>

  <!-- Category Tag Badge -->
  <rect x="80" y="180" width="340" height="54" rx="27" fill="#7c3aed" fill-opacity="0.15" stroke="#7c3aed" stroke-opacity="0.4" stroke-width="2" />
  <text x="100" y="215" class="tag-text">${(slide.tag || 'AI RADAR').toUpperCase()}</text>

  <!-- Headline -->
  <foreignObject x="80" y="280" width="920" height="300">
    <div xmlns="http://www.w3.org/1999/xhtml" class="headline">
      ${slide.headline}
    </div>
  </foreignObject>

  <!-- Body Content -->
  <foreignObject x="80" y="580" width="920" height="380">
    <div xmlns="http://www.w3.org/1999/xhtml" class="body-text">
      ${slide.body || slide.subtitle || ''}
    </div>
  </foreignObject>

  <!-- Takeaways Box (if present) -->
  ${slide.takeaways && slide.takeaways.length > 0 ? `
    <rect x="80" y="940" width="920" height="200" rx="20" fill="#0b0f19" stroke="#38bdf8" stroke-width="2" />
    <text x="110" y="985" class="takeaway-title">PERCHÉ È IMPORTANTE:</text>
    <foreignObject x="110" y="1005" width="860" height="110">
      <div xmlns="http://www.w3.org/1999/xhtml" class="takeaway-item">
        ${slide.takeaways.map(t => `• ${t}`).join('<br/>')}
      </div>
    </foreignObject>
  ` : ''}

  <!-- CTA Button for Last Slide -->
  ${isCTA ? `
    <rect x="290" y="1020" width="500" height="100" rx="50" fill="url(#ctaGrad)" />
    <text x="540" y="1080" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="800" fill="#ffffff">
      ${slide.cta_button || 'LINK IN BIO 🔗'}
    </text>
  ` : ''}

  <!-- Footer -->
  <line x1="80" y1="1240" x2="1000" y2="1240" stroke="#1e293b" stroke-width="2" />
  <text x="80" y="1285" class="footer-text">linhlabs.com</text>
  <text x="1000" y="1285" text-anchor="end" class="footer-text">Scorri per continuare →</text>
</svg>`;

    fs.writeFileSync(filePath, svgContent, 'utf-8');
    generatedFiles.push({
      slide_number: slide.slide_number,
      svgUrl: `/carousels/${fileName}`,
      filePath
    });
  }

  return generatedFiles;
}
