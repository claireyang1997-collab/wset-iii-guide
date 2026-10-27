"""Render the source-audited process graphs as selectable-text SVG assets."""
from html import escape

PALETTE = {
    'required': ('#e7eddf', '#75866a'),
    'choice': ('#f4ead0', '#ba9d57'),
    'whole-required': ('#e9e4ee', '#7c6c92'),
    'whole-choice': ('#dce8ee', '#64879b'),
    'rose': ('#f0dfe0', '#ae7b83'),
}

def render_graph(g):
    w, h = g['width'], g['height']
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title description">',
           f'<title id="title">{escape(g["title"])}</title>',
           f'<desc id="description">{escape(g["caption"])}</desc>',
           '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L8 5L1 9" fill="none" stroke="#657061" stroke-width="1.4"/></marker></defs>',
           f'<rect width="{w}" height="{h}" fill="#fcfaf3"/>',
           '<g font-family="PingFang SC,Noto Sans CJK SC,Microsoft YaHei,sans-serif" fill="#35412f">',
           f'<text x="24" y="30" font-size="23" font-weight="600">{escape(g.get("layoutTitle", g["title"]))}</text>']
    for stage in g.get('stages', []):
        out.append(f'<rect x="{stage["x"]}" y="55" width="360" height="535" rx="14" fill="#f5f3e9" stroke="#e1e1d4"/>')
        out.append(f'<text x="{stage["x"]+18}" y="88" font-size="20" font-weight="600">{escape(stage["title"])}</text>')
    for e in g['edges']:
        pts = e['points']
        path = 'M' + 'L'.join(f'{x} {y}' for x, y in pts)
        out.append(f'<path data-from="{e["from"]}" data-to="{e["to"]}" d="{path}" fill="none" stroke="#657061" stroke-width="1.8" stroke-linejoin="round" marker-end="url(#arrow)"/>')
    for n in g['nodes']:
        fill, stroke = PALETTE[n['color']]
        x, cy, nw, nh = n['x'], n['y'], n['w'], n['h']
        rx = nh / 2 if n['kind'] == 'material' else 3
        font = n.get('fontSize', 19 if len(n['label']) > 12 else 20)
        out += [f'<g data-node="{n["id"]}"><rect x="{x}" y="{cy-nh/2:g}" width="{nw}" height="{nh}" rx="{rx:g}" fill="{fill}" stroke="{stroke}" stroke-width="1.8"/>',
                f'<text x="{x+nw/2:g}" y="{cy+7}" font-size="{font}" text-anchor="middle">{escape(n["label"])}</text></g>']
    for note in g['notes']:
        for i, line in enumerate(note['lines']):
            out.append(f'<text x="{note["x"]}" y="{note["y"]+i*26}" font-size="17" fill="#56604e">{escape(line)}</text>')
    ly = g['legendY']
    out += [f'<path d="M24 {ly-25}H{w-24}" stroke="#d8d9cc"/>',
            f'<rect x="24" y="{ly-8}" width="30" height="20" rx="2" fill="none" stroke="#657061"/><text x="65" y="{ly+8}" font-size="17">过程</text>',
            f'<rect x="175" y="{ly-8}" width="40" height="20" rx="10" fill="none" stroke="#657061"/><text x="228" y="{ly+8}" font-size="17">加入／产出</text>']
    for i, item in enumerate(g['legend']):
        x, y = 24+(i%2)*(w//2), ly+49+(i//2)*34
        fill, stroke = PALETTE[item['color']]
        out.append(f'<rect x="{x}" y="{y-16}" width="20" height="20" rx="3" fill="{fill}" stroke="{stroke}"/><text x="{x+32}" y="{y}" font-size="17">{escape(item["text"])}</text>')
    out.append('</g></svg>')
    return '\n'.join(out)+'\n'

def write_process_flows(root, data):
    for graph in data.get('processGraphs', []):
        destination = root / 'dist' / graph['image']
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(render_graph(graph))
