"""Draw precise, code-native filtration and packaging teaching illustrations."""
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist/assets'
DEFS = '''<defs>
<linearGradient id="glass"><stop stop-color="#314c3e"/><stop offset=".25" stop-color="#607f5b"/><stop offset=".46" stop-color="#9bab75"/><stop offset=".62" stop-color="#526a49"/><stop offset="1" stop-color="#263f35"/></linearGradient>
<linearGradient id="pet"><stop stop-color="#c1d0bf" stop-opacity=".8"/><stop offset=".3" stop-color="#f5f7e9"/><stop offset=".7" stop-color="#c9d8b5" stop-opacity=".65"/><stop offset="1" stop-color="#a8bda4"/></linearGradient>
<linearGradient id="paper" x2="1" y2="1"><stop stop-color="#f5efdd"/><stop offset="1" stop-color="#d6c9a6"/></linearGradient>
<linearGradient id="bag"><stop stop-color="#e7e9dc"/><stop offset=".45" stop-color="#f9f9ef"/><stop offset="1" stop-color="#bec9bd"/></linearGradient>
<linearGradient id="depth"><stop stop-color="#d4ddc6"/><stop offset="1" stop-color="#edf0df"/></linearGradient>
<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L8 5L1 9" fill="none" stroke="#568b9d" stroke-width="1.6"/></marker>
</defs>'''

def write(name, title, body):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="420" height="300" viewBox="0 0 420 300" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title>{DEFS}<rect width="420" height="300" rx="12" fill="#faf8f0"/><g font-family="Noto Sans CJK SC,Microsoft YaHei,sans-serif" fill="#35412f">{body}</g></svg>'''
    (OUT / name).write_text(svg + '\n')

def arrow(path):
    return f'<path d="{path}" fill="none" stroke="#568b9d" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)"/>'

def text(x, y, value, size=15, color='#65705d'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="middle">{value}</text>'

# A three-dimensional fibrous bed; particles lodge at different depths.
body = '<path d="M150 65L174 48H283L259 65Z" fill="#edf0e2" stroke="#98a788"/><path d="M259 65L283 48V221L259 239Z" fill="#bac8ac" stroke="#98a788"/><rect x="150" y="65" width="109" height="174" rx="3" fill="url(#depth)" stroke="#98a788"/>'
for row in range(8):
    for col in range(5):
        x, y = 158 + col * 21, 75 + row * 20
        body += f'<path d="M{x} {y}q15 15 6 24m-6-11q15-12 22 4" fill="none" stroke="#a3b493" stroke-width="1.1" opacity=".8"/>'
for x, y, r in [(51,103,5),(92,169,7),(119,122,4),(162,105,6),(178,192,5),(202,140,4),(234,206,3)]:
    body += f'<circle cx="{x}" cy="{y}" r="{r}" fill="#854b5d" stroke="#fffaf2"/>'
body += arrow('M30 148H137') + arrow('M285 148H389')
body += text(85,65,'含颗粒的酒液') + text(337,100,'过滤后酒液') + text(205,276,'颗粒被截留在纤维介质内部')
write('filtration-depth-refined.svg', '深层过滤：酒液穿过多孔纤维，颗粒截留于不同深度', body)

body = '<rect x="205" y="55" width="20" height="183" rx="3" fill="#b2c2a1" stroke="#859774"/>'
for y in range(67,231,14):
    body += f'<rect x="205" y="{y}" width="20" height="4" fill="#faf8f0" stroke="#859774" stroke-width=".5"/>'
for x,y,r in [(44,106,6),(93,183,5),(127,99,7),(173,151,5),(197,84,7),(196,118,6),(195,171,7),(198,210,6)]:
    body += f'<circle cx="{x}" cy="{y}" r="{r}" fill="#854b5d" stroke="#fffaf2"/>'
body += arrow('M30 148H183') + arrow('M239 148H389')
body += '<path d="M246 68H279L290 48" fill="none" stroke="#859774"/>'
body += text(324,45,'薄膜与微孔') + text(85,65,'含颗粒的酒液') + text(327,102,'过滤后酒液') + text(210,276,'颗粒停留在膜的上游表面')
write('filtration-surface-refined.svg','表面过滤：颗粒截留在薄膜上游，酒液穿过微孔',body)

bottle = 'M188 41H232V98Q232 116 249 130Q266 144 266 166V254Q266 266 254 267H166Q154 266 154 254V166Q154 144 171 130Q188 116 188 98Z'
body = f'<ellipse cx="210" cy="275" rx="76" ry="9" fill="#dddcd0" opacity=".5"/><path d="{bottle}" fill="url(#glass)" stroke="#435940" stroke-width="2"/><rect x="187" y="29" width="46" height="51" rx="6" fill="#445c4e"/><path d="M191 42H229M191 50H229M190 73H230" stroke="#859b7d" opacity=".7"/><path d="M176 145Q167 155 167 176V242" fill="none" stroke="#cfdbac" stroke-width="5" opacity=".55"/><path d="M169 257Q210 241 251 257" fill="none" stroke="#243e32" stroke-width="4"/><rect x="165" y="174" width="90" height="57" rx="2" fill="#f0e9d3" stroke="#d7cbae"/>'
body += text(210,197,'WINE',12,'#7d7156') + '<path d="M186 207H234M192 215H228" stroke="#bfb297"/>'
body += text(320,117,'玻璃瓶壁') + '<path d="M286 121L260 148" stroke="#8c9a80" fill="none"/>'
write('packaging-glass-refined.svg','玻璃葡萄酒瓶：瓶颈、肩部、酒标与凹底的结构示意',body)

body = f'<ellipse cx="210" cy="275" rx="76" ry="9" fill="#dddcd0" opacity=".5"/><path d="{bottle}" fill="url(#pet)" stroke="#839b7e" stroke-width="2"/><path d="M157 170H263V254Q263 263 253 264H167Q157 263 157 254Z" fill="#d3ce93" opacity=".45"/><rect x="186" y="29" width="48" height="40" rx="5" fill="#9ba98b" stroke="#7d9177"/>'
for x in range(191,233,5): body += f'<path d="M{x} 33V63" stroke="#71866a" stroke-width="1"/>'
body += '<path d="M187 79H233M187 86H233M165 154Q210 160 255 154M159 246Q210 252 261 246M162 257Q210 262 258 257" fill="none" stroke="#a5b697" stroke-width="2"/><path d="M176 145Q167 155 167 176V235" fill="none" stroke="white" stroke-width="6" opacity=".7"/><rect x="166" y="178" width="88" height="54" rx="2" fill="#f0ebda" stroke="#c5cbb6"/>'
body += text(210,200,'WINE',12,'#7d7156') + '<path d="M187 211H233M194 218H226" stroke="#bfb297"/>'
body += text(320,113,'轻质瓶身') + '<path d="M285 117L260 144" stroke="#8c9a80" fill="none"/>'
write('packaging-plastic-refined.svg','塑料葡萄酒瓶：轻质透明瓶身、螺纹盖与加强纹示意',body)

body = '<ellipse cx="210" cy="272" rx="124" ry="10" fill="#dddcd0" opacity=".5"/><path d="M100 72L136 47H314L278 72Z" fill="#ede3c8" stroke="#a79878"/><path d="M278 72L314 47V228L278 255Z" fill="#c8b997" stroke="#a79878"/><rect x="100" y="72" width="178" height="183" rx="4" fill="url(#paper)" stroke="#a79878" stroke-width="1.5"/><path d="M129 103Q187 93 248 107L257 223Q192 238 122 226Z" fill="url(#bag)" stroke="#96a58e" stroke-width="1.6"/><path d="M132 114Q170 131 150 213M240 114Q220 155 246 218M135 225Q185 208 237 225" fill="none" stroke="#a6b39f" stroke-width="1.3"/><path d="M127 100L132 228M248 105L253 224" fill="none" stroke="#f9fbf1" stroke-width="3"/><circle cx="252" cy="211" r="13" fill="#bec6b7" stroke="#82917b"/><path d="M252 211H298V235" fill="none" stroke="#556b64" stroke-width="12" stroke-linejoin="round"/><rect x="281" y="202" width="24" height="7" rx="2" fill="#354d48"/><path d="M298 243Q287 259 298 261Q309 259 298 243" fill="#bba45c"/>'
body += text(326,107,'外层纸盒') + '<path d="M309 113L289 138" stroke="#9b957e"/>' + text(190,153,'柔性内袋',15) + text(190,177,'随倒酒收缩',13)
body += arrow('M80 160H117') + arrow('M272 160H251')
write('packaging-bag-refined.svg','袋装盒剖面：外层纸盒、收缩的柔性内袋和出酒阀',body)
