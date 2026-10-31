"""Abstract filtration diagrams: flat forms, restrained color, readable callouts."""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'dist/assets'

DEFS = '''<defs>
<marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1L6 4L1 7" fill="none" stroke="#578a91" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></marker>
<pattern id="mesh" width="56" height="58" patternUnits="userSpaceOnUse"><path d="M-12 7C6 7 6 36 25 36S43 7 62 7M-12 44C6 44 6 15 25 15S43 44 62 44" fill="none" stroke="#b7c6ad" stroke-width="2.4" stroke-linecap="round"/></pattern>
</defs>'''

def path(d, color, width=1.5, extra=''):
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'

def text(x, y, content, anchor='middle', size=24, color='#627260'):
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size}" fill="{color}">{content}</text>'

def particle(x, y, r=7):
    return f'<circle cx="{x}" cy="{y}" r="{r+3}" fill="#fcfbf7"/><circle cx="{x}" cy="{y}" r="{r}" fill="#92536a"/>'

def common():
    s = '<rect x="24" y="146" width="552" height="210" rx="26" fill="#f7f2e8"/>'
    s += path('M39 162H560M39 340H560', '#e9decb', 1)
    s += text(30, 54, '含颗粒的酒液', 'start')
    s += text(570, 54, '过滤后酒液', 'end')
    s += path('M49 251H191', '#578a91', 3, 'marker-end="url(#flow-arrow)"')
    s += path('M453 251H552', '#578a91', 3, 'marker-end="url(#flow-arrow)"')
    for x, y, r in [(65,197,7),(137,218,5),(95,301,8),(176,322,4)]:
        s += particle(x, y, r)
    return s

def save(name, title, desc, body):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="460" viewBox="0 0 600 460" role="img" aria-labelledby="title desc"><title id="title">{title}</title><desc id="desc">{desc}</desc>{DEFS}<rect width="600" height="460" fill="#fcfbf7"/><g font-family="PingFang SC,Noto Sans CJK SC,Microsoft YaHei,sans-serif">{body}</g></svg>'''
    (OUT / name).write_text(svg, encoding='utf-8')

depth = common()
depth += text(323, 101, '厚滤材剖面', size=25)
depth += path('M323 112V130', '#9faa94', 1.3)
depth += '<rect x="223" y="130" width="200" height="242" rx="13" fill="#e8eee2" stroke="#a5b29b" stroke-width="1.6"/>'
depth += '<rect x="231" y="138" width="184" height="226" rx="8" fill="url(#mesh)"/>'
for d in ['M213 190C260 172 271 213 319 192S377 174 434 188', 'M213 251C265 235 282 266 324 251S390 238 434 251', 'M213 313C264 332 286 291 330 313S389 327 434 312']:
    depth += path(d, '#7babb0', 2.4, 'opacity=".88"')
for x, y, r in [(247,173,7),(272,289,8),(310,215,5),(360,314,7),(394,198,5)]:
    depth += particle(x, y, r)
depth += path('M360 324V404H464', '#9a8a79', 1.35)
depth += text(346, 438, '内部不同深处截留', size=25, color='#714659')
save('filtration-depth-elegant-v4.svg', '深层过滤：内部截留', '简洁的平面剖面示意。酒液由左向右穿过较厚、多孔的滤材，酒红色颗粒截留在介质内部的不同深度。', depth)

surface = common()
surface += text(334, 101, '薄膜与微孔', size=25)
surface += path('M334 112V130', '#9faa94', 1.3)
# Thin surface barrier with explicit openings. Empty slots are enlarged for teaching.
surface += '<rect x="322" y="130" width="24" height="242" rx="8" fill="#a5b8a0"/>'
for y in [171,222,273,324]:
    surface += f'<rect x="320" y="{y}" width="28" height="10" rx="5" fill="#fcfbf7"/>'
    surface += path(f'M337 {y+5}H367', '#7babb0', 1.8, 'marker-end="url(#flow-arrow)"')
surface += path('M217 251H299', '#578a91', 2)
for x, y, r in [(313,157,7),(312,207,6),(312,252,8),(312,301,7),(314,352,5)]:
    surface += particle(x, y, r)
surface += path('M312 311L274 404H141', '#9a8a79', 1.35)
surface += text(217, 438, '上游表面截留', size=25, color='#714659')
save('filtration-surface-elegant-v4.svg', '表面过滤：表面截留', '简洁的平面剖面示意。酒液由左向右穿过薄膜微孔，酒红色颗粒停留在薄膜的左侧上游表面。', surface)

print('Created two abstract, flat filtration diagrams.')
