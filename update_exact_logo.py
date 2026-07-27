import os

# Exact SVG logo matching the L7 Monogram + LinhLabs + YOUR AI PARTNER subtitle
exact_svg = '''<svg width="600" height="220" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 10)">
    <!-- L Outline (White) -->
    <path d="M 45 35 
             L 45 125 
             C 45 150, 60 165, 85 165 
             L 135 165" 
          stroke="#FFFFFF" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    
    <!-- 7 Filled Shape (Teal #36D6B5) -->
    <path d="M 85 30 
             L 145 30 
             C 168 30, 180 44, 174 66 
             L 152 138 
             C 147 154, 133 166, 115 166 
             C 98 166, 90 152, 95 134 
             L 108 92 
             C 111 82, 104 72, 94 72 
             L 85 72 Z" 
          fill="#36D6B5" />

    <!-- Text: Linh (White) + Labs (Teal) -->
    <text x="215" y="112" font-family="'Outfit', 'Inter', system-ui, -apple-system, sans-serif" font-size="82" font-weight="700" letter-spacing="-0.02em">
      <tspan fill="#FFFFFF">Linh</tspan>
      <tspan fill="#36D6B5" dx="6">Labs</tspan>
    </text>

    <!-- Subtitle: YOUR AI PARTNER (White) -->
    <text x="218" y="158" font-family="'Outfit', 'Inter', system-ui, -apple-system, sans-serif" font-size="25" font-weight="600" fill="#FFFFFF" letter-spacing="0.48em">YOUR AI PARTNER</text>
  </g>
</svg>'''

paths = [
    '/Users/stazione/Desktop/LIHNLABS/LIHN LABS SITO/public/images/linhlabs-logo.svg',
    '/Users/stazione/Desktop/LIHNLABS/LIHN LABS SITO/dist/images/linhlabs-logo.svg'
]

for path in paths:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(exact_svg)

print("Exact L7 LinhLabs logo generated successfully!")
