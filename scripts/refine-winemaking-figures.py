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

# Larger packaging studies. The bag-in-box pair uses a true cutaway so that
# the shrinking bag cannot be confused with the rigid outer box.
PACKAGE_DEFS = '''<defs>
<linearGradient id="green"><stop stop-color="#3d5a4b"/><stop offset=".26" stop-color="#73886a"/><stop offset=".5" stop-color="#91a47a"/><stop offset=".78" stop-color="#57715b"/><stop offset="1" stop-color="#304d40"/></linearGradient>
<linearGradient id="clear"><stop stop-color="#d3ddd0"/><stop offset=".27" stop-color="#ffffff"/><stop offset=".7" stop-color="#edf0df"/><stop offset="1" stop-color="#becdb9"/></linearGradient>
<linearGradient id="silver"><stop stop-color="#b4bfb5"/><stop offset=".34" stop-color="#f7f8ed"/><stop offset=".67" stop-color="#d5dcd0"/><stop offset="1" stop-color="#a8b7aa"/></linearGradient>
<linearGradient id="wine" x2="0" y2="1"><stop stop-color="#b8a261"/><stop offset="1" stop-color="#9e8646"/></linearGradient>
<marker id="tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L8 5L1 9" fill="none" stroke="#668b91" stroke-width="1.5"/></marker>
</defs>'''

def package_write(name, title, description, body, w=500, h=540):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title description"><title id="title">{escape(title)}</title><desc id="description">{escape(description)}</desc>{PACKAGE_DEFS}<rect width="{w}" height="{h}" rx="16" fill="#f5f2e8"/><g font-family="PingFang SC,Noto Sans CJK SC,Microsoft YaHei,sans-serif" fill="#354b40" stroke-linejoin="round" stroke-linecap="round">{body}</g></svg>'''
    (OUT / name).write_text(svg + '\n')

def package_label(x, y, value, path):
    return f'<path d="{path}" fill="none" stroke="#8d9985" stroke-width="1.8"/><text x="{x}" y="{y}" font-size="22" font-weight="500">{value}</text>'

bottle = 'M175 55H225V141C225 167 278 183 278 220V458Q278 480 256 482H144Q122 480 122 458V220C122 183 175 167 175 141Z'
body = f'<ellipse cx="200" cy="490" rx="110" ry="11" fill="#dedfce"/><path d="{bottle}" fill="url(#green)" stroke="#3c5746" stroke-width="3"/>'
body += '<path d="M138 245H263V453Q263 466 249 469H151Q138 466 138 453Z" fill="#a5a56e" opacity=".22"/><path d="M142 220C139 249 139 284 139 329" fill="none" stroke="#e3e9c0" stroke-width="7" opacity=".65"/><path d="M151 195Q174 173 181 150" fill="none" stroke="#d9e4b9" stroke-width="4" opacity=".6"/><rect x="172" y="43" width="56" height="80" rx="7" fill="#7d4352" stroke="#633542" stroke-width="2"/><path d="M177 57H223M177 65H223M176 110H224" stroke="#b7838d" stroke-width="2"/><rect x="140" y="298" width="120" height="100" rx="5" fill="#f7f0db" stroke="#dfd2af" stroke-width="2"/>'
body += '<path d="M166 316H234M166 379H234" stroke="#c9b991" stroke-width="1.5"/><text x="200" y="347" text-anchor="middle" font-family="Georgia,serif" font-size="25" fill="#746144" letter-spacing="3">WINE</text><path d="M181 361H219" stroke="#b6a985"/><path d="M139 463Q200 436 262 463" fill="none" stroke="#294638" stroke-width="6"/><path d="M145 472Q200 450 256 472" fill="none" stroke="#7f956d" stroke-width="2"/>'
body += package_label(321,105,'瓶口与封口','M229 84H288L307 99')
body += package_label(321,260,'玻璃瓶身','M279 272H294L308 254')
body += package_label(321,441,'瓶底','M266 466H290L308 435')
package_write('packaging-glass-clear.svg','玻璃瓶结构示意','放大的绿色玻璃葡萄酒瓶，标出瓶口与封口、玻璃瓶身和瓶底。',body)

plastic = 'M174 67H226V136C226 161 276 180 279 216L286 448Q287 476 261 480H139Q113 476 114 448L121 216C124 180 174 161 174 136Z'
body = f'<ellipse cx="200" cy="490" rx="114" ry="11" fill="#dedfce"/><path d="{plastic}" fill="url(#clear)" stroke="#80977c" stroke-width="3"/>'
body += '<path d="M126 241H274L278 446Q280 465 260 468H140Q120 465 122 446Z" fill="url(#wine)" opacity=".45"/><path d="M127 241Q200 253 274 241" fill="none" stroke="#c0ae70" stroke-width="2"/><rect x="170" y="43" width="60" height="55" rx="7" fill="#7d4352" stroke="#633542" stroke-width="2"/>'
for x in range(177,227,6):
    body += f'<path d="M{x} 51V88" stroke="#b7838d" stroke-width="2"/>'
body += '<path d="M173 105H227M173 115H227M174 127H226" stroke="#8fa388" stroke-width="3"/><path d="M147 204Q171 178 181 149" fill="none" stroke="white" stroke-width="5"/><path d="M136 220L130 443" fill="none" stroke="white" stroke-width="7" opacity=".75"/>'
for y in [264,277,413,426]:
    body += f'<path d="M126 {y}Q200 {y+10} 278 {y}" fill="none" stroke="#94a48a" stroke-width="2"/>'
body += '<rect x="139" y="300" width="122" height="98" rx="5" fill="#f7f0db" stroke="#d9d0b4" stroke-width="2"/><path d="M166 317H234M166 379H234" stroke="#c9b991" stroke-width="1.5"/><text x="200" y="348" text-anchor="middle" font-family="Georgia,serif" font-size="25" fill="#746144" letter-spacing="3">WINE</text><path d="M181 362H219" stroke="#b6a985"/><path d="M132 456Q148 442 160 464Q181 447 200 468Q219 447 240 464Q252 442 268 456" fill="none" stroke="#889d7e" stroke-width="2.5"/>'
body += package_label(321,83,'螺旋瓶盖','M231 66H293L307 77')
body += package_label(321,251,'塑料瓶身','M282 272H294L308 245')
body += package_label(321,436,'瓶底','M275 459H292L308 430')
package_write('packaging-plastic-clear.svg','塑料瓶结构示意','放大的透明塑料葡萄酒瓶，画出螺旋瓶盖、瓶口螺纹、轻质瓶身、酒液和瓶底轮廓。',body)

def bag_scene(offset, collapsed=False):
    body = f'<g transform="translate({offset} 0)"><ellipse cx="206" cy="376" rx="164" ry="12" fill="#dedfce"/>'
    body += '<path d="M70 122L114 87H323L279 122Z" fill="#f1e6c9" stroke="#a18b63" stroke-width="2.5"/><path d="M279 122L323 87V333L279 370Z" fill="#c9b68b" stroke="#a18b63" stroke-width="2.5"/><rect x="70" y="122" width="209" height="248" rx="5" fill="#e7d8b4" stroke="#a18b63" stroke-width="2.5"/>'
    body += '<path d="M86 143H262V352H86Z" fill="#f8f6eb" stroke="#c7b88e" stroke-width="1.5" stroke-dasharray="6 5"/>'
    if not collapsed:
        body += '<path d="M112 155Q173 146 235 156L247 327Q178 345 99 331Z" fill="url(#silver)" stroke="#85988a" stroke-width="2.5"/><path d="M110 213Q174 225 239 213L247 327Q178 342 101 331Z" fill="#a05c70" opacity=".8"/><path d="M110 213Q174 226 239 213" fill="none" stroke="#743d50" stroke-width="2"/><path d="M119 162Q131 203 110 321M229 163Q219 215 239 320" fill="none" stroke="#f7f9ec" stroke-width="4"/><path d="M109 329Q179 313 239 328" fill="none" stroke="#8a9b8a" stroke-width="2"/>'
    else:
        body += '<path d="M158 157L185 165L171 188L203 216L185 244L218 277L227 329Q192 343 145 334L133 310L154 285L134 257L161 229L142 202Z" fill="url(#silver)" stroke="#85988a" stroke-width="2.5"/><path d="M143 302Q181 312 222 301L227 329Q190 342 146 333Z" fill="#a05c70" opacity=".8"/><path d="M169 177L164 202L182 222L165 244L185 268L173 287" fill="none" stroke="#f7f9ec" stroke-width="3"/>'
        body += '<path d="M108 220H139M231 220H205" fill="none" stroke="#668b91" stroke-width="3" marker-end="url(#tip)"/>'
    body += '<path d="M234 322H278" fill="none" stroke="#556d64" stroke-width="16"/><ellipse cx="238" cy="322" rx="14" ry="18" fill="#bdcabe" stroke="#7f9587" stroke-width="2"/><path d="M243 322H298V346" fill="none" stroke="#405c55" stroke-width="15"/><rect x="280" y="301" width="32" height="8" rx="4" fill="#405c55"/>'
    if collapsed:
        body += '<path d="M299 355C295 361 289 368 291 372C293 379 305 379 307 372C309 368 303 361 299 355Z" fill="#9c5267"/>'
    body += '</g>'
    return body

body = '<text x="210" y="48" text-anchor="middle" font-size="25" font-weight="600">倒酒前</text><text x="710" y="48" text-anchor="middle" font-size="25" font-weight="600">倒出部分酒液后</text>'
body += bag_scene(0) + bag_scene(500,True)
body += '<path d="M409 233H479" fill="none" stroke="#668b91" stroke-width="3.5" marker-end="url(#tip)"/>'
body += package_label(341,113,'纸盒','M321 132H334V119')
body += package_label(341,203,'内袋','M240 176H326L334 197')
body += package_label(341,327,'出酒阀','M299 322H332')
body += '<text x="200" y="420" text-anchor="middle" font-size="23">纸盒支撑，柔性内袋装酒</text><text x="710" y="420" text-anchor="middle" font-size="23">外盒不变，内袋随倒酒收缩</text>'
package_write('packaging-bag-clear.svg','袋装盒剖面：倒酒前后内袋的变化','两幅同尺寸纸盒剖面图。左图内袋充盈，标出纸盒、内袋和出酒阀；右图酒液减少、内袋收缩，外层纸盒保持原形。',body,1000,456)

body = '<text x="210" y="48" text-anchor="middle" font-size="25" font-weight="600">倒酒前</text>' + bag_scene(0)
body += package_label(341,113,'纸盒','M321 132H334V119') + package_label(341,203,'内袋','M240 176H326L334 197') + package_label(341,327,'出酒阀','M299 322H332')
body += '<text x="210" y="420" text-anchor="middle" font-size="22">纸盒支撑，柔性内袋装酒</text><g transform="translate(0 446)"><text x="210" y="48" text-anchor="middle" font-size="25" font-weight="600">倒出部分酒液后</text>' + bag_scene(0,True) + '<text x="210" y="420" text-anchor="middle" font-size="22">外盒不变，内袋随倒酒收缩</text></g><path d="M437 398V484" fill="none" stroke="#668b91" stroke-width="3" marker-end="url(#tip)"/>'
package_write('packaging-bag-clear-mobile.svg','袋装盒剖面：倒酒前后内袋的变化','上下两幅同尺寸纸盒剖面图，内袋随倒酒而收缩，外层纸盒保持形状。',body,500,900)
