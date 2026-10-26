"""Draw figure 7.5 from its complete, source-reviewed annotation data."""
from html import escape
import unicodedata

def bottle_art(parts):
    colors = {p['number']: p['color'] for p in parts}
    outline = 'M134 38H166Q173 38 173 48V180C173 212 205 231 212 272V610Q212 638 196 642H104Q88 638 88 610V272C95 231 127 212 127 180V48Q127 38 134 38Z'
    svg = f'''<defs>
<linearGradient id="glass" x2="1"><stop stop-color="#a0ad85" stop-opacity=".4"/><stop offset=".22" stop-color="#f9fbeb" stop-opacity=".62"/><stop offset=".68" stop-color="#d8e2c2" stop-opacity=".3"/><stop offset="1" stop-color="#80916c" stop-opacity=".45"/></linearGradient>
<linearGradient id="wine" x2="1"><stop stop-color="#a7a331"/><stop offset=".22" stop-color="#e1d468"/><stop offset=".5" stop-color="#cabe47"/><stop offset=".83" stop-color="#b5a937"/><stop offset="1" stop-color="#8d902c"/></linearGradient>
<linearGradient id="shoulder" x2="0" y2="1"><stop stop-color="#c0ae45"/><stop offset=".65" stop-color="#d5c85d"/><stop offset="1" stop-color="#c3b64d"/></linearGradient>
<clipPath id="bottle"><path d="{outline}"/></clipPath></defs>
<ellipse cx="150" cy="651" rx="63" ry="8" fill="#8b8b6e" opacity=".12"/>
<path d="{outline}" fill="url(#glass)" stroke="#788568" stroke-width="2"/>
<g clip-path="url(#bottle)">
<rect x="87" y="188" width="126" height="457" fill="url(#wine)"/>
<rect x="87" y="201" width="126" height="80" fill="url(#shoulder)"/>
<path d="M125 188Q150 185 175 188V194H125Z" fill="{colors[3]}"/>
<path d="M125 195H175V201H125Z" fill="{colors[4]}"/>
<path d="M85 280Q150 275 215 280V284Q150 280 85 285Z" fill="{colors[5]}"/>
<path d="M85 286Q150 282 215 286V290Q150 286 85 291Z" fill="{colors[6]}"/>
<path d="M139 61V181C139 223 106 241 104 280V595Q104 616 115 620" fill="none" stroke="#fffdec" stroke-width="13" opacity=".27" stroke-linecap="round"/>
<path d="M164 60V180C164 214 197 243 198 278V604" fill="none" stroke="#737c42" stroke-width="4" opacity=".19"/>
<ellipse cx="150" cy="625" rx="54" ry="12" fill="none" stroke="#7c7d3d" stroke-width="2" opacity=".45"/>
<path d="M109 632Q150 606 191 632" fill="none" stroke="#dad27a" stroke-width="4" opacity=".6"/>
</g>
<path d="M130 38Q150 34 170 38L173 55Q150 59 127 55Z" fill="#e9eddd" fill-opacity=".7" stroke="#7b876d" stroke-width="1.4"/>
<path d="M127 58Q150 62 173 58V69Q150 73 127 69Z" fill="url(#glass)" stroke="#9aa48b" stroke-width="1"/>
'''
    leaders = {
        3: ([24, 191], 'M42 191H100L126 191', [126, 191]),
        4: ([276, 196], 'M258 196H218L174 198', [174, 198]),
        5: ([24, 313], 'M42 313H64L89 282', [89, 282]),
        2: ([276, 257], 'M258 257H231L187 230', [187, 230]),
        1: ([24, 548], 'M42 548H88', [88, 548]),
        6: ([276, 382], 'M258 382H243L211 288', [211, 288]),
    }
    for num, (pos, line, dot) in leaders.items():
        x, y = pos
        svg += f'<path d="{line}" fill="none" stroke="{colors[num]}" stroke-width="1.7"/><circle cx="{dot[0]}" cy="{dot[1]}" r="3" fill="{colors[num]}"/>'
        svg += f'<circle cx="{x}" cy="{y}" r="15" fill="#fcfaf3" stroke="{colors[num]}" stroke-width="1.8"/><text x="{x}" y="{y+6}" text-anchor="middle" font-size="18" font-weight="600" fill="{colors[num]}">{num}</text>'
    return svg

def wrap_text(text, max_cells):
    lines, line, width = [], '', 0
    for char in text:
        cells = 2 if unicodedata.east_asian_width(char) in 'WF' else 1
        if width+cells > max_cells:
            lines.append(line)
            line, width = '', 0
        line += char
        width += cells
    if line:
        lines.append(line)
    closing = '，。；：！？、）】》”’'
    opening = '（【《“‘'
    for i in range(1, len(lines)):
        while lines[i] and lines[i][0] in closing:
            lines[i-1] += lines[i][0]
            lines[i] = lines[i][1:]
        while lines[i-1] and lines[i-1][-1] in opening:
            lines[i] = lines[i-1][-1]+lines[i]
            lines[i-1] = lines[i-1][:-1]
    lines = [line for line in lines if line]
    # Avoid leaving a few characters or punctuation alone on the final line.
    if len(lines) > 1 and len(lines[-1]) < 7:
        while len(lines[-1]) < 8 and len(lines[-2]) > 8:
            lines[-1] = lines[-2][-1]+lines[-1]
            lines[-2] = lines[-2][:-1]
        while lines[-1][0] in closing and lines[-2]:
            lines[-1] = lines[-2][-1]+lines[-1]
            lines[-2] = lines[-2][:-1]
    return lines

def text_block(text, x, y, max_cells, size=20, leading=30, attrs=''):
    lines = wrap_text(text, max_cells)
    spans = ''.join(f'<tspan x="{x}" y="{y+i*leading}">{escape(line)}</tspan>' for i, line in enumerate(lines))
    return f'<text {attrs} font-size="{size}" fill="#35412f">{spans}</text>', y+len(lines)*leading

def render_full(d):
    out = ['<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1110" viewBox="0 0 1400 1110" role="img" aria-labelledby="title desc">',
           f'<title id="title">{escape(d["title"])}</title><desc id="desc">六类组成成分的范围、完整注释、提示与原图图注。色带用于定位成分。</desc>',
           '<rect width="1400" height="1110" fill="#fcfaf3"/>',
           '<g font-family="PingFang SC,Noto Sans CJK SC,Microsoft YaHei,sans-serif">',
           f'<text x="40" y="55" font-size="30" font-weight="600" fill="#35412f">{escape(d["title"])}</text>',
           '<g transform="translate(545 120) scale(1.1)">'+bottle_art(d['parts'])+'</g>']
    positions = {'sugar': (40, 145), 'acids': (925, 145), 'tannins': (40, 555), 'ethanol': (925, 385), 'water': (40, 790), 'aroma': (925, 665)}
    for p in d['parts']:
        x, y = positions[p['id']]
        out += [f'<g data-component="{p["id"]}"><circle cx="{x+14}" cy="{y-7}" r="14" fill="{p["color"]}"/><text x="{x+14}" y="{y-1}" text-anchor="middle" font-size="17" fill="#fff">{p["number"]}</text>',
                f'<text x="{x+40}" y="{y}" font-size="24" font-weight="600" fill="#35412f">{escape(p["label"])}</text>',
                f'<text x="{x+40}" y="{y+33}" font-size="22" fill="{p["color"]}">{escape(p["range"])}</text>']
        cy = y+74
        for i, para in enumerate(p['paragraphs']):
            block, cy = text_block(para, x, cy, 44 if x==40 else 42, attrs=f'data-note="{p["id"]}-{i}"')
            out.append(block)
            cy += 14
        out.append('</g>')
    out.append('<path d="M40 920H1360" stroke="#d8d9cc"/>')
    block, _ = text_block(d['notice'], 40, 958, 140, 19, 29, 'data-notice="true"')
    out.append(block)
    block, _ = text_block(d['caption'], 40, 1010, 140, 18, 28, 'data-caption="true"')
    out += [block, '</g></svg>']
    return '\n'.join(out)+'\n'

def write_composition_assets(root, data):
    for u in data['units']:
        for s in u['sections']:
            d = s.get('diagram', {})
            if d.get('type') != 'composition' or not d.get('parts'):
                continue
            art = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="700" viewBox="0 0 300 700" role="img" aria-labelledby="title"><title id="title">葡萄酒瓶剖面示意：1水分、2乙醇、3糖分、4酸类、5单宁和颜色、6香气和风味物质。</title><g font-family="PingFang SC,Noto Sans CJK SC,Microsoft YaHei,sans-serif">'+bottle_art(d['parts'])+'</g></svg>\n'
            (root/'dist'/d['image']).write_text(art)
            (root/'dist'/d['fullImage']).write_text(render_full(d))
