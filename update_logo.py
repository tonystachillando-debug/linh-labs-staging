import os

svg_content = '''<svg width="500" height="140" viewBox="0 0 500 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Solid Teal Hook Icon -->
  <g transform="translate(10, 10)">
    <path d="M 36 10
             L 76 10
             C 96 10, 110 24, 104 44
             L 86 96
             C 80 114, 64 126, 46 126
             C 30 126, 18 112, 24 96
             L 38 56
             C 42 44, 34 32, 22 32
             C 10 32, 2 22, 8 10
             C 14 10, 24 10, 36 10 Z"
          fill="#36D6B5"/>
  </g>

  <!-- Linh Labs Typography -->
  <text x="145" y="92" font-family="'Outfit', 'Inter', system-ui, -apple-system, sans-serif" font-size="76" font-weight="500" letter-spacing="-0.02em">
    <tspan fill="#FFFFFF">Linh</tspan>
    <tspan fill="#36D6B5" dx="16">Labs</tspan>
  </text>
</svg>'''

paths = [
    '/Users/stazione/Desktop/LIHNLABS/LIHN LABS SITO/public/images/linhlabs-logo.svg',
    '/Users/stazione/Desktop/LIHNLABS/LIHN LABS SITO/dist/images/linhlabs-logo.svg'
]

for path in paths:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg_content)

print("SVG logo updated successfully!")
