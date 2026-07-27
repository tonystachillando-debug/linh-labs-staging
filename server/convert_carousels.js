import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CAROUSEL_DIR = path.resolve(__dirname, '../public/carousels');

async function convertAllSlides() {
  console.log('🔄 Convertitore SVG ➔ PNG in corso...');
  const files = fs.readdirSync(CAROUSEL_DIR).filter(f => f.endsWith('.svg'));
  
  for (const file of files) {
    const svgPath = path.join(CAROUSEL_DIR, file);
    const pngName = file.replace('.svg', '.png');
    const pngPath = path.join(CAROUSEL_DIR, pngName);

    const svgBuffer = fs.readFileSync(svgPath);
    const resvg = new Resvg(svgBuffer, {
      fitTo: {
        mode: 'width',
        value: 1080
      }
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`✅ Convertita: ${file} ➔ ${pngName} (${pngBuffer.length} bytes)`);
  }
}

convertAllSlides().catch(console.error);
