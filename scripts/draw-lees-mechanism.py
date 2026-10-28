"""Draw matched oak-barrel cutaways for settled and resuspended fine lees."""
from pathlib import Path
from html import escape

OUT = Path(__file__).resolve().parents[1] / 'dist/assets'
DEFS = '''<defs>
<linearGradient id="wood" x2="1" y2="1"><stop stop-color="#dfc08a"/><stop offset=".45" stop-color="#bc925e"/><stop offset="1" stop-color="#8e6846"/></linearGradient>
<linearGradient id="rim"><stop stop-color="#ecd4a6"/><stop offset=".5" stop-color="#c6a374"/><stop offset="1" stop-color="#e4c898"/></linearGradient>
<linearGradient id="wine" x2="0" y2="1"><stop stop-color="#f6edc9"/><stop offset=".55" stop-color="#e9d79e"/><stop offset="1" stop-color="#d5bc7e"/></linearGradient>
<linearGradient id="sediment" x2="0" y2="1"><stop stop-color="#c8af70"/><stop offset="1" stop-color="#a88c54"/></linearGradient>
<radialGradient id="haze"><stop stop-color="#d0b87d" stop-opacity=".55"/><stop offset="1" stop-color="#d0b87d" stop-opacity="0"/></radialGradient>
<clipPath id="staves"><path d="M270 116C360 100 435 140 468 220Q495 306 465 394C432 470 358 500 270 496Z"/></clipPath>
<clipPath id="inside"><circle cx="270" cy="306" r="164"/></clipPath>
<marker id="flow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L8 5L1 9" fill="none" stroke="#5e8b96" stroke-width="1.7"/></marker>
</defs>'''

def label(x, y, value, path, anchor='start'):
    return f'<path d="{path}" fill="none" stroke="#83907a" stroke-width="1.8"/><text x="{x}" y="{y}" text-anchor="{anchor}" fill="#46533e" font-size="23" font-weight="500">{value}</text>'

def render(stirred):
    title = '搅动后：细酒泥重新悬浮' if stirred else '静置后：细酒泥沉积在桶底'
    desc = ('橡木桶剖面中，搅桶棒接触桶底。蓝色箭头表示酒液流动，金色颗粒随搅动离开底部，在酒液中悬浮。' if stirred
            else '橡木桶剖面中，细酒泥形成底部的浅金色沉积层，上方为酒液。')
    body = '<ellipse cx="283" cy="505" rx="211" ry="15" fill="#dedccd" opacity=".7"/>'
    # Barrel body behind the exposed circular front; hoops and stave seams
    # remain visible, while the interior is a deliberately simplified cutaway.
    body += '<path d="M270 116C360 100 435 140 468 220Q495 306 465 394C432 470 358 500 270 496Z" fill="url(#wood)" stroke="#8e6d49" stroke-width="2.5"/>'
    body += '<g clip-path="url(#staves)">'
    for y, end in [(154,178),(211,228),(268,278),(326,327),(384,375),(442,424)]:
        body += f'<path d="M331 {y}Q416 {y-8} 471 {end}" fill="none" stroke="#8f6a44" stroke-width="1.7" opacity=".65"/>'
    body += '</g><path d="M403 139Q488 303 400 474L418 462Q506 306 422 150Z" fill="#8a948a" stroke="#636f63" stroke-width="2"/><path d="M410 146Q492 305 409 466" fill="none" stroke="#bcc3b2" stroke-width="3"/>'
    body += '<circle cx="270" cy="306" r="190" fill="url(#rim)" stroke="#8d6b47" stroke-width="3"/><circle cx="270" cy="306" r="176" fill="#a77c4c" stroke="#8d6b47" stroke-width="2"/><circle cx="270" cy="306" r="164" fill="#f2ecda" stroke="#785d3b" stroke-width="2"/>'
    # The same liquid level and interior outline make the two states comparable.
    body += '<g clip-path="url(#inside)"><rect x="101" y="170" width="338" height="307" fill="url(#wine)"/><path d="M104 174Q270 186 436 174" fill="none" stroke="#d8c286" stroke-width="2"/>'
    if stirred:
        body += '<ellipse cx="262" cy="351" rx="158" ry="140" fill="url(#haze)"/><path d="M105 459Q270 438 435 457V490H105Z" fill="url(#sediment)" opacity=".7"/>'
        for row in range(8):
            for col in range(9):
                x = 125 + col*35 + ((row*11+col*7)%17)
                y = 216 + row*31 + ((col*13+row*5)%15)
                if (x-270)**2+(y-306)**2 < 154**2 and not (238 < x < 282 and y > 300):
                    r = 2.3 + (row+col)%3*.65
                    body += f'<circle cx="{x}" cy="{y}" r="{r}" fill="#b29a5d" opacity=".88"/>'
        body += '<path d="M332 45L245 414" stroke="#718079" stroke-width="9"/><path d="M329 45L242 413" stroke="#d5d9c9" stroke-width="3"/><path d="M226 399L260 416L247 440L212 421Z" fill="#8c9b8d" stroke="#5e7266" stroke-width="2.5"/>'
        body += '<path d="M229 421C167 395 153 323 180 273" fill="none" stroke="#5e8b96" stroke-width="3.5" marker-end="url(#flow)"/><path d="M191 253C262 207 355 237 369 318" fill="none" stroke="#5e8b96" stroke-width="3.5" marker-end="url(#flow)"/><path d="M365 347Q349 392 301 405" fill="none" stroke="#5e8b96" stroke-width="3.5" marker-end="url(#flow)"/>'
    else:
        body += '<path d="M103 434Q270 412 437 433V493H103Z" fill="url(#sediment)"/><path d="M103 434Q270 412 437 433" fill="none" stroke="#a99159" stroke-width="2"/>'
        for row in range(4):
            for col in range(15):
                x, y = 125+col*21, 432+row*10+(col%3)*3
                body += f'<circle cx="{x}" cy="{y}" r="{2+(row+col)%2*.6}" fill="#8e794b" opacity=".48"/>'
    body += '<path d="M144 236Q116 307 142 374" fill="none" stroke="#fff8e4" stroke-width="6" opacity=".6"/></g>'
    if stirred:
        # The shaft above the bung remains outside the clipped barrel interior.
        body += '<path d="M332 45L305 158" stroke="#718079" stroke-width="9"/><path d="M329 45L302 158" stroke="#d5d9c9" stroke-width="3"/><rect x="324" y="31" width="18" height="30" rx="6" fill="#7a6248" transform="rotate(13 333 46)"/>'
        body += label(368,75,'搅桶棒','M332 75H353')
        body += label(270,555,'细酒泥随酒液流动、重新悬浮','M344 359L390 490L390 520H270',anchor='middle')
    else:
        body += label(510,213,'酒液','M376 255L500 220H505')
        body += label(270,555,'细酒泥沉积层','M259 448V520',anchor='middle')
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" role="img" aria-labelledby="title description"><title id="title">{escape(title)}</title><desc id="description">{escape(desc)}</desc>{DEFS}<rect width="600" height="600" rx="16" fill="#f5f2e8"/><g font-family="PingFang SC,Noto Sans CJK SC,Microsoft YaHei,sans-serif" stroke-linejoin="round" stroke-linecap="round">{body}</g></svg>\n'

for name, stirred in [('settled',False),('stirred',True)]:
    (OUT/f'lees-{name}-cutaway.svg').write_text(render(stirred))
