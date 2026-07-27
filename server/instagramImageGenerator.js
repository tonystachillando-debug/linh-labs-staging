import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CAROUSEL_DIR = path.resolve(__dirname, '../public/carousels');

// Ensure output directory exists
if (!fs.existsSync(CAROUSEL_DIR)) {
  fs.mkdirSync(CAROUSEL_DIR, { recursive: true });
}

/**
 * Generate 1080x1350 SVG AND PNG Slide Images with EXACT L7 Logo
 */
export async function generateCarouselSlideImages(carouselData) {
  const slides = carouselData.slides || [];
  const generatedFiles = [];

  for (const slide of slides) {
    const svgFileName = `slide_${slide.slide_number}.svg`;
    const pngFileName = `slide_${slide.slide_number}.png`;
    const svgFilePath = path.join(CAROUSEL_DIR, svgFileName);
    const pngFilePath = path.join(CAROUSEL_DIR, pngFileName);

    const isCover = slide.type === 'cover';
    const isCTA = slide.type === 'cta';

    // SVG Slide (1080x1350 resolution - 4:5 Aspect Ratio)
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
    <radialGradient id="cyanGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#36D6B5" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#36D6B5" stop-opacity="0" />
    </radialGradient>
    <style>
      .tag-text { font-family: 'Outfit', 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 700; fill: #36D6B5; letter-spacing: 2px; }
      .headline { font-family: 'Outfit', 'Inter', system-ui, sans-serif; font-size: ${isCover ? '58px' : '46px'}; font-weight: 800; fill: #ffffff; line-height: 1.25; }
      .body-text { font-family: 'Inter', system-ui, sans-serif; font-size: 28px; font-weight: 400; fill: #cbd5e1; line-height: 1.6; }
      .takeaway-title { font-family: 'Outfit', 'Inter', system-ui, sans-serif; font-size: 24px; font-weight: 800; fill: #36D6B5; letter-spacing: 1.5px; }
      .takeaway-item { font-family: 'Inter', system-ui, sans-serif; font-size: 26px; font-weight: 500; fill: #94a3b8; line-height: 1.5; }
      .footer-text { font-family: 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 600; fill: #64748b; }
    </style>
  </defs>

  <!-- Solid Obsidian Background -->
  <rect width="1080" height="1350" fill="#0A0D14" />
  <circle cx="540" cy="500" r="500" fill="url(#cyanGlow)" />

  <!-- Outer Frame -->
  <rect x="24" y="24" width="1032" height="1302" rx="32" fill="none" stroke="#1e293b" stroke-width="3" />

  <!-- Official L7 LinhLabs Brand Logo -->
  <g transform="translate(80, 65) scale(0.55)">
    <!-- L Outline (White) -->
    <path d="M 45 35 L 45 125 C 45 150, 60 165, 85 165 L 135 165" stroke="#FFFFFF" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <!-- 7 Filled Shape (Teal) -->
    <path d="M 85 30 L 145 30 C 168 30, 180 44, 174 66 L 152 138 C 147 154, 133 166, 115 166 C 98 166, 90 152, 95 134 L 108 92 C 111 82, 104 72, 94 72 L 85 72 Z" fill="#36D6B5" />
    <!-- LinhLabs Text -->
    <text x="215" y="112" font-family="'Outfit', 'Inter', sans-serif" font-size="82" font-weight="700" letter-spacing="-0.02em">
      <tspan fill="#FFFFFF">Linh</tspan>
      <tspan fill="#36D6B5" dx="6">Labs</tspan>
    </text>
    <!-- Subtitle -->
    <text x="218" y="158" font-family="'Outfit', 'Inter', sans-serif" font-size="25" font-weight="600" fill="#FFFFFF" letter-spacing="0.48em">YOUR AI PARTNER</text>
  </g>

  <!-- Slide Counter -->
  <text x="1000" y="115" text-anchor="end" font-family="'Inter', sans-serif" font-size="24" font-weight="700" fill="#64748b">${slide.slide_number} / ${slides.length}</text>

  <!-- Category Tag Badge -->
  <rect x="80" y="180" width="380" height="52" rx="26" fill="#36D6B5" fill-opacity="0.15" stroke="#36D6B5" stroke-opacity="0.4" stroke-width="2" />
  <text x="100" y="214" class="tag-text">${(slide.tag || 'AI RADAR').toUpperCase()}</text>

  <!-- Headline -->
  <foreignObject x="80" y="270" width="920" height="280">
    <div xmlns="http://www.w3.org/1999/xhtml" class="headline">
      ${slide.headline}
    </div>
  </foreignObject>

  <!-- Body Content in Glassmorphic Card -->
  <rect x="80" y="550" width="920" height="340" rx="24" fill="#0F172A" fill-opacity="0.75" stroke="#1E293B" stroke-width="2" />
  <foreignObject x="110" y="580" width="860" height="280">
    <div xmlns="http://www.w3.org/1999/xhtml" class="body-text">
      ${slide.body || slide.subtitle || ''}
    </div>
  </foreignObject>

  <!-- Takeaways Box -->
  ${slide.takeaways && slide.takeaways.length > 0 ? `
    <rect x="80" y="920" width="920" height="240" rx="24" fill="#0F172A" stroke="#36D6B5" stroke-opacity="0.35" stroke-width="2" />
    <text x="120" y="970" class="takeaway-title">PERCHÉ È IMPORTANTE</text>
    <foreignObject x="120" y="990" width="840" height="140">
      <div xmlns="http://www.w3.org/1999/xhtml" class="takeaway-item">
        ${slide.takeaways.map(t => `✓ ${t}`).join('<br/>')}
      </div>
    </foreignObject>
  ` : ''}

  <!-- CTA Button for Last Slide -->
  ${isCTA ? `
    <rect x="180" y="940" width="720" height="100" rx="50" fill="#36D6B5" />
    <text x="540" y="1002" text-anchor="middle" font-family="'Outfit', 'Inter', sans-serif" font-size="30" font-weight="800" fill="#0A0D14">
      ${slide.cta_button || 'ISCRIVITI ALLA NEWSLETTER GRATIS ➔'}
    </text>
  ` : ''}

  <!-- Footer -->
  <line x1="80" y1="1230" x2="1000" y2="1230" stroke="#1e293b" stroke-width="2" />
  <text x="80" y="1275" class="footer-text">linhlabs.com</text>
  <text x="1000" y="1275" text-anchor="end" class="footer-text">Scorri per continuare →</text>
</svg>`;

    // Save SVG
    fs.writeFileSync(svgFilePath, svgContent, 'utf-8');

    // Convert and Save High-Res PNG (1080x1350)
    const resvg = new Resvg(Buffer.from(svgContent), { fitTo: { mode: 'width', value: 1080 } });
    const pngBuffer = resvg.render().asPng();
    fs.writeFileSync(pngFilePath, pngBuffer);

    generatedFiles.push({
      slide_number: slide.slide_number,
      svgUrl: `/carousels/${svgFileName}`,
      pngUrl: `/carousels/${pngFileName}`,
      svgFilePath,
      pngFilePath
    });
  }

  return generatedFiles;
}
