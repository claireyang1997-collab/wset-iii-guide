"""Reproduce the handout's seven area values as an exact, editable SVG chart."""
from pathlib import Path
from html import escape
from math import cos, sin, pi
import json

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/france-aop-area.json').read_text())
rows = DATA['regions']
assert len(rows) == 7 and len({r['english'] for r in rows}) == 7
assert all(isinstance(r['area'], int) and r['area'] > 0 for r in rows)
total = sum(r['area'] for r in rows)
parts = [f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="790" viewBox="0 0 1280 790" role="img" aria-labelledby="title desc">
<title id="title">{escape(DATA['title'])} · 讲义列示数据复现</title>
<desc id="desc">{escape('；'.join(f"{r['name']} {r['english']}：{r['area']:,} 公顷" for r in rows))}。统计年份未注明，扇形按上述七项数值计算；不是当前法国全部 AOP 面积。</desc>
<style>
text{{font-family:"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;fill:#303d35}}
.muted{{fill:#6b766e}} .number{{font-family:Arial,Helvetica,sans-serif;font-variant-numeric:tabular-nums}}
</style>
<rect width="1280" height="790" rx="12" fill="#fcfaf4"/>
<text x="44" y="64" font-size="36" font-weight="600">{escape(DATA['title'])}</text>
<text x="46" y="99" class="muted" font-size="20">{escape(DATA['subtitle'])}</text>
<rect x="1014" y="34" width="220" height="38" rx="19" fill="#e9ece2"/>
<text x="1124" y="59" text-anchor="middle" font-size="17" fill="#62714e">讲义列示数据复现</text>
<path d="M44 121H1236" stroke="#d9ded2" stroke-width="1.5"/>
''']

cx, cy, radius, angle = 312, 391, 220, -pi / 2
for i, row in enumerate(rows, 1):
    sweep = 2 * pi * row['area'] / total
    end = angle + sweep
    x1, y1 = cx + radius * cos(angle), cy + radius * sin(angle)
    x2, y2 = cx + radius * cos(end), cy + radius * sin(end)
    d = f'M{cx} {cy}L{x1:.6f} {y1:.6f}A{radius} {radius} 0 {int(sweep > pi)} 1 {x2:.6f} {y2:.6f}Z'
    parts.append(f'<path d="{d}" fill="{row["color"]}" stroke="#fcfaf4" stroke-width="3"><title>{escape(row["name"])}：{row["area"]:,} ha</title></path>')
    mid = angle + sweep / 2
    tx, ty = cx + radius * .77 * cos(mid), cy + radius * .77 * sin(mid)
    ink = '#304d5b' if i <= 3 else '#ffffff'
    parts.append(f'<text x="{tx:.3f}" y="{ty + 8:.3f}" text-anchor="middle" class="number" style="fill:{ink}" font-size="24" font-weight="600">{i}</text>')
    angle = end
assert abs(angle - (3 * pi / 2)) < 1e-12

parts.append('''<text x="312" y="652" text-anchor="middle" class="muted" font-size="18">图示 7 个产区合计</text>''')
parts.append(f'<text x="312" y="692" text-anchor="middle" class="number" font-size="34" font-weight="600">{total:,}<tspan font-size="19" font-weight="400"> ha</tspan></text>')
parts.append('''<text x="663" y="158" class="muted" font-size="17">产区 / Region</text>
<text x="1060" y="158" text-anchor="end" class="muted" font-size="17">面积（公顷）</text>
<text x="1226" y="158" text-anchor="end" class="muted" font-size="17">占图示合计</text>''')
for i, row in enumerate(rows, 1):
    y = 182 + (i - 1) * 64
    ink = '#304d5b' if i <= 3 else '#ffffff'
    parts.append(f'''<g id="region-{i}">
<circle cx="620" cy="{y + 18}" r="16" fill="{row['color']}"/>
<text x="620" y="{y + 24}" class="number" text-anchor="middle" style="fill:{ink}" font-size="17" font-weight="600">{i}</text>
<text x="663" y="{y + 20}" font-size="24" font-weight="500">{escape(row['name'])}</text>
<text x="663" y="{y + 45}" class="muted" font-size="17">{escape(row['english'])}</text>
<text x="1060" y="{y + 25}" text-anchor="end" class="number" font-size="26">{row['area']:,}</text>
<text x="1226" y="{y + 25}" text-anchor="end" class="number muted" font-size="22">{row['area'] / total * 100:.1f}%</text>
<path d="M600 {y + 57}H1236" stroke="#e1e4da"/>
</g>''')

parts.append('<path d="M44 719H1236" stroke="#d9ded2" stroke-width="1.5"/>')
for y, text in zip((748, 775), DATA['notes']):
    parts.append(f'<text x="46" y="{y}" class="muted" font-size="17">{escape(text)}</text>')
parts.append('</svg>')
output = ROOT / 'dist/assets/s5-france-area-chart-redrawn.svg'
output.write_text('\n'.join(parts), encoding='utf-8')
print(f'Built {output.name}: {len(rows)} regions, listed area total {total:,} ha.')

# A separate phone composition keeps all values readable without shrinking the table.
mobile = [f'''<svg xmlns="http://www.w3.org/2000/svg" width="640" height="1090" viewBox="0 0 640 1090" role="img" aria-labelledby="title desc">
<title id="title">{escape(DATA['title'])} · 讲义列示数据复现</title>
<desc id="desc">{escape('；'.join(f"{r['name']} {r['english']}：{r['area']:,} 公顷" for r in rows))}。统计年份未注明，不是当前法国全部 AOP 面积。</desc>
<style>text{{font-family:"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;fill:#303d35}}.muted{{fill:#6b766e}}.number{{font-family:Arial,Helvetica,sans-serif;font-variant-numeric:tabular-nums}}</style>
<rect width="640" height="1090" rx="12" fill="#fcfaf4"/>
<text x="28" y="48" font-size="31" font-weight="600">{escape(DATA['title'])}</text>
<text x="30" y="80" class="muted" font-size="21">{escape(DATA['subtitle'])}</text>
<path d="M28 101H612" stroke="#d9ded2" stroke-width="1.5"/>
''']
cx, cy, radius, angle = 320, 260, 132, -pi / 2
for i, row in enumerate(rows, 1):
    sweep = 2 * pi * row['area'] / total
    end = angle + sweep
    x1, y1 = cx + radius * cos(angle), cy + radius * sin(angle)
    x2, y2 = cx + radius * cos(end), cy + radius * sin(end)
    mid = angle + sweep / 2
    tx, ty = cx + radius * .78 * cos(mid), cy + radius * .78 * sin(mid)
    ink = '#304d5b' if i <= 3 else '#ffffff'
    mobile.append(f'<path d="M{cx} {cy}L{x1:.6f} {y1:.6f}A{radius} {radius} 0 {int(sweep > pi)} 1 {x2:.6f} {y2:.6f}Z" fill="{row["color"]}" stroke="#fcfaf4" stroke-width="2"/>')
    mobile.append(f'<text x="{tx:.3f}" y="{ty+7:.3f}" class="number" text-anchor="middle" style="fill:{ink}" font-size="21" font-weight="600">{i}</text>')
    angle = end
mobile.append(f'<text x="320" y="434" text-anchor="middle" font-size="23">图示 7 个产区合计 <tspan class="number" font-weight="600">{total:,} ha</tspan></text>')
mobile.append('''<text x="77" y="484" class="muted" font-size="20">产区 / Region</text>
<text x="458" y="484" text-anchor="end" class="muted" font-size="20">公顷</text>
<text x="610" y="484" text-anchor="end" class="muted" font-size="20">占图示合计</text>''')
for i, row in enumerate(rows, 1):
    y = 510 + (i - 1) * 66
    ink = '#304d5b' if i <= 3 else '#ffffff'
    mobile.append(f'''<g id="region-{i}">
<circle cx="43" cy="{y+17}" r="15" fill="{row['color']}"/>
<text x="43" y="{y+23}" text-anchor="middle" class="number" style="fill:{ink}" font-size="17" font-weight="600">{i}</text>
<text x="77" y="{y+18}" font-size="26" font-weight="500">{escape(row['name'])}</text>
<text x="77" y="{y+43}" class="muted" font-size="21">{escape(row['english'])}</text>
<text x="458" y="{y+23}" text-anchor="end" class="number" font-size="26">{row['area']:,}</text>
<text x="610" y="{y+23}" text-anchor="end" class="number muted" font-size="24">{row['area']/total*100:.1f}%</text>
<path d="M28 {y+55}H612" stroke="#e1e4da"/></g>''')
mobile.append('''<path d="M28 990H612" stroke="#d9ded2" stroke-width="1.5"/>
<text x="30" y="1022" class="muted" font-size="20">面积沿用讲义原值；占比按图示合计计算并四舍五入。</text>
<text x="30" y="1053" class="muted" font-size="20">年份未注明；图示合计不代表法国全部 AOP 面积。</text>
</svg>''')
mobile_output = ROOT / 'dist/assets/s5-france-area-chart-mobile.svg'
mobile_output.write_text('\n'.join(mobile), encoding='utf-8')
print(f'Built {mobile_output.name}: same seven values, phone composition.')
