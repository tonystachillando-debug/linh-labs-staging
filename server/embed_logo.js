import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(__dirname, '../public/images/linhlabs-logo.png');
const logoBuffer = fs.readFileSync(logoPath);
const base64Logo = `data:image/png;base64,${logoBuffer.toString('base64')}`;

console.log('Base64 logo length:', base64Logo.length);

const generatorPath = path.resolve(__dirname, './instagramImageGenerator.js');
let generatorCode = fs.readFileSync(generatorPath, 'utf-8');

// Replace logo group with exact PNG image tag
const logoReplacement = `<image href="${base64Logo}" x="80" y="65" height="70" preserveAspectRatio="xMinYMin meet" />`;

generatorCode = generatorCode.replace(/<!-- Official L7 LinhLabs Brand Logo -->[\s\S]*?<\/g>/, `<!-- Official Exact PNG Brand Logo -->\n  ${logoReplacement}`);

fs.writeFileSync(generatorPath, generatorCode, 'utf-8');
console.log('Updated instagramImageGenerator.js with exact PNG logo!');
