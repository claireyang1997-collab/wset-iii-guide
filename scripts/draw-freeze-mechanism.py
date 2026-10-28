"""Matched editorial cutaways: frozen fruit and separation during frozen pressing."""
from pathlib import Path
from html import escape
import math
import re

OUT=Path(__file__).resolve().parents[1]/'dist/assets'
INK='#354335'; BLUE='#397f99'; GOLD='#a66c20'
DEFS='''<defs>
<radialGradient id="skin" cx="32%" cy="27%" r="85%"><stop stop-color="#d2c78a"/><stop offset=".4" stop-color="#a8a36c"/><stop offset="1" stop-color="#686b48"/></radialGradient>
<radialGradient id="juice" cx="37%" cy="28%" r="80%"><stop stop-color="#fff0b8"/><stop offset=".55" stop-color="#f0d186"/><stop offset="1" stop-color="#d6ac5b"/></radialGradient>
<radialGradient id="flesh" cx="35%" cy="25%" r="80%"><stop stop-color="#f8e7b0"/><stop offset=".65" stop-color="#dec58c"/><stop offset="1" stop-color="#b59c64"/></radialGradient>
<linearGradient id="steel"><stop stop-color="#9daea8"/><stop offset=".22" stop-color="#e5ebe5"/><stop offset=".42" stop-color="#bccac2"/><stop offset=".8" stop-color="#eff1e8"/><stop offset="1" stop-color="#8b9d96"/></linearGradient>
<linearGradient id="steel-dark"><stop stop-color="#7e948a"/><stop offset=".45" stop-color="#b6c4ba"/><stop offset="1" stop-color="#71887d"/></linearGradient>
<linearGradient id="glass"><stop stop-color="#fbfaf0" stop-opacity=".12"/><stop offset=".18" stop-color="#fff" stop-opacity=".7"/><stop offset=".4" stop-color="#cfe1d7" stop-opacity=".12"/><stop offset="1" stop-color="#dde8da" stop-opacity=".5"/></linearGradient>
<linearGradient id="liquid" x2="0" y2="1"><stop stop-color="#f3d17e"/><stop offset="1" stop-color="#c89032"/></linearGradient>
<linearGradient id="ice" x2=".8" y2="1"><stop stop-color="#fff"/><stop offset=".4" stop-color="#e2f2f5"/><stop offset="1" stop-color="#a6d2df"/></linearGradient>
<filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#3d513d" flood-opacity=".10"/></filter>
<marker id="blue-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M1 1L5 3.5L1 6" fill="none" stroke="#397f99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
<marker id="gold-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M1 1L5 3.5L1 6" fill="none" stroke="#b8832b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
<marker id="pressure-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M1 1L5 3.5L1 6" fill="none" stroke="#865466" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
</defs>'''

def text(x,y,t,size=22,color=INK,anchor='middle',weight=400):
 return f'<text x="{x}" y="{y}" fill="{color}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}">{escape(t)}</text>'

def crystal(x,y,k=1,rotation=0):
 # Irregular, interlocking ice plates; blue interfaces distinguish them from flesh.
 return f'''<g transform="translate({x} {y}) rotate({rotation}) scale({k})">
 <path d="M-29 -5L-19 -23L-3 -17L7 -32L21 -21L18 -6L33 0L24 17L9 15L-2 29L-15 16L-30 18L-35 4Z" fill="url(#ice)" stroke="#78acbc" stroke-width="1.8"/>
 <path d="M-19 -23L-12 -5L7 -9L7 -32M-12 -5L-2 9L9 15M7 -9L18 -6L24 17M-30 18L-2 9L-2 29" fill="none" stroke="#9ac4d0" stroke-width="1.4"/>
 <path d="M-26 -7L-20 -15M9 -26L16 -20" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
 </g>'''

def berry(x,y,r,rotation=0):
 result=f'<g transform="translate({x} {y}) rotate({rotation})"><ellipse rx="{r}" ry="{r*1.08:.1f}" fill="url(#skin)" stroke="#78805a" stroke-width="1.4"/>'
 # Subtle wrinkle contours and granular surface frost are deliberately reproducible.
 result+=f'<path d="M{-r*.6:.1f} {-r*.55:.1f}Q{-r*.8:.1f} 0 {-r*.5:.1f} {r*.55:.1f}M{r*.5:.1f} {-r*.7:.1f}Q{r*.7:.1f} 0 {r*.48:.1f} {r*.5:.1f}" fill="none" stroke="#71805d" stroke-opacity=".38" stroke-width="1.4"/>'
 result+=f'<path d="M{-r*.76:.1f} {-r*.48:.1f}Q0 {-r*1.12:.1f} {r*.70:.1f} {-r*.49:.1f}" fill="none" stroke="#eff6f0" stroke-width="6" stroke-linecap="round"/>'
 for i in range(27):
  a=i*2.39996; radius=math.sqrt((i+.5)/27)*r*.82
  px=math.cos(a)*radius; py=math.sin(a)*radius*.8-r*.15
  result+=f'<circle cx="{px:.1f}" cy="{py:.1f}" r="{.7+(i%3)*.35}" fill="#f6faf3" opacity="{.35+(i%4)*.13}"/>'
 return result+'</g>'

def frozen_fruit():
 b='<ellipse cx="176" cy="428" rx="105" ry="12" fill="#586a4a" opacity=".045"/>'
 b+='<path d="M42 150Q115 103 236 127" fill="none" stroke="#7f6951" stroke-width="11" stroke-linecap="round"/><path d="M154 121L157 187M157 155L113 201M157 158L201 198" fill="none" stroke="#7c8455" stroke-width="5" stroke-linecap="round"/>'
 b+='<path d="M53 142Q123 103 222 122" fill="none" stroke="#ecf3ed" stroke-width="4" stroke-linecap="round"/>'
 for x,y,r,rot in [(117,208,34,-18),(170,201,35,9),(211,234,34,23),(99,260,36,-14),(151,260,36,6),(193,283,35,20),(123,316,34,-15),(166,333,36,9),(146,383,32,10)]:b+=berry(x,y,r,rot)
 b+='<path d="M211 288L266 234M197 321L263 382" fill="none" stroke="#a4b3a5" stroke-width="1.6" stroke-dasharray="5 6"/>'
 b+='<ellipse cx="405" cy="331" rx="147" ry="153" fill="url(#skin)" stroke="#7a7e4f" stroke-width="2" filter="url(#shadow)"/><ellipse cx="405" cy="331" rx="135" ry="141" fill="url(#flesh)" stroke="#e8d49b" stroke-width="3"/><ellipse cx="405" cy="331" rx="126" ry="132" fill="url(#juice)"/>'
 # Faint fruit flesh fibres, with no solid sugar particles.
 for angle in [15,52,101,146,194,242,293,331]:
  r=math.radians(angle);px=405+118*math.cos(r);py=331+126*math.sin(r)
  b+=f'<path d="M405 331Q{(405+px)/2+12:.1f} {(331+py)/2:.1f} {px:.1f} {py:.1f}" fill="none" stroke="#fff5d2" stroke-opacity=".35" stroke-width="1.3"/>'
 for args in [(359,271,.85,-18),(435,249,.75,27),(476,309,.9,12),(340,349,.82,-14),(412,350,.72,15),(448,414,.7,35)]:b+=crystal(*args)
 b+='<path d="M435 249L489 139H561" fill="none" stroke="#5c98ac" stroke-width="1.8"/><circle cx="435" cy="249" r="3.5" fill="#5c98ac"/>'
 b+=text(486,111,'冰晶',24,BLUE,weight=600)+text(486,137,'部分水结成冰',18,BLUE)
 b+='<path d="M478 379L521 494H568" fill="none" stroke="#b38b44" stroke-width="1.8"/><circle cx="478" cy="379" r="3.5" fill="#b38b44"/>'
 b+=text(440,532,'未冻结的汁液',24,GOLD,weight=600)+text(440,559,'糖与酸溶解在汁液中',19,GOLD)
 b+=text(119,465,'冻态葡萄',20)+text(404,169,'果粒剖面 · 放大',18,'#798475')
 return b

def frozen_press():
 b='<ellipse cx="248" cy="474" rx="203" ry="13" fill="#54694e" opacity=".06"/>'
 # Hydraulic cylinder, frame and piston form a recognisable press.
 b+='<path d="M58 132V454H81V132M411 132V454H434V132" fill="url(#steel)" stroke="#758e80" stroke-width="1.6"/><rect x="43" y="117" width="405" height="26" rx="5" fill="url(#steel)" stroke="#71897d" stroke-width="2"/>'
 b+='<rect x="212" y="42" width="67" height="76" rx="8" fill="url(#steel-dark)" stroke="#71897d" stroke-width="2"/><ellipse cx="245.5" cy="43" rx="33.5" ry="6" fill="#d6e0d5" stroke="#71897d" stroke-width="1.4"/><path d="M224 54V101" stroke="#e1e7dc" stroke-width="3" opacity=".7"/><rect x="237" y="117" width="17" height="67" fill="url(#steel)" stroke="#71897d" stroke-width="1.5"/>'
 b+='<path d="M142 58V173" fill="none" stroke="#865466" stroke-width="3" marker-end="url(#pressure-arrow)"/>'+text(141,43,'施压',21,'#865466')
 # Outer basket shell, retaining curved walls/rims while exposing the front half.
 b+='<path d="M103 223V378Q245 421 388 378V223Z" fill="url(#steel)" stroke="#748d7e" stroke-width="2"/>'
 b+='<ellipse cx="245.5" cy="223" rx="142.5" ry="29" fill="#d9d8b5" stroke="#748d7e" stroke-width="2"/>'
 b+='<path d="M119 234Q245 257 372 234V373Q245 406 119 373Z" fill="#ebd7a0" stroke="#9b9e77" stroke-width="1.4"/>'
 # Compressed skins have curved, folded outlines, distinct from pale angular ice.
 for i in range(32):
  x=135+(i*61)%220;y=253+(i*29)%115
  b+=f'<path d="M{x-10} {y}Q{x-15} {y-8} {x-4} {y-9}Q{x+9} {y-13} {x+11} {y-2}Q{x+9} {y+7} {x} {y+4}Q{x-8} {y+8} {x-10} {y}Z" fill="{["#9d925b","#b5a368","#c4ad70"][i%3]}" stroke="#948551" stroke-width=".8"/>'
 for args in [(155,270,.65,-8),(217,269,.70,32),(298,265,.65,-12),(347,291,.58,22),(179,323,.7,-20),(258,324,.65,17),(324,348,.7,33),(219,368,.55,-5)]:b+=crystal(*args)
 # Pressure plate hovers immediately on the frozen fruit bed.
 b+='<path d="M112 204V216Q246 252 380 216V204Z" fill="url(#steel-dark)" stroke="#71877b" stroke-width="1.8"/><ellipse cx="246" cy="204" rx="134" ry="24" fill="url(#steel)" stroke="#71877b" stroke-width="1.8"/><ellipse cx="246" cy="200" rx="23" ry="7" fill="#abbdb1" stroke="#71877b" stroke-width="1.4"/>'
 # Perforated floor: short gold paths show liquid passing through and joining the tray.
 b+='<path d="M108 380Q246 415 384 380V391Q246 427 108 391Z" fill="url(#steel-dark)" stroke="#71877b" stroke-width="1.4"/>'
 for i in range(17):
  x=120+i*15;y=389+24*(1-((x-246)/138)**2)
  b+=f'<ellipse cx="{x}" cy="{y:.1f}" rx="3" ry="2" fill="#edf0e4" stroke="#6e897c" stroke-width=".7"/>'
 for x,y in [(157,405),(218,414),(279,414),(338,405)]:
  b+=f'<path d="M{x} {y-5}V{y+18}" fill="none" stroke="#c59131" stroke-width="3" stroke-linecap="round"/>'
 b+='<path d="M75 425Q246 461 416 425L399 445Q246 478 91 445Z" fill="url(#steel)" stroke="#71897d" stroke-width="1.8"/><path d="M93 431Q246 461 399 431" fill="none" stroke="#d7b35e" stroke-width="3"/>'
 b+='<path d="M408 436H529V467" fill="none" stroke="#72897b" stroke-width="12" stroke-linejoin="round"/><path d="M408 436H529V467" fill="none" stroke="#d6c085" stroke-width="6" stroke-linejoin="round"/><path d="M443 436H501" fill="none" stroke="#b8832b" stroke-width="2" marker-end="url(#gold-arrow)"/>'
 # A transparent receiver makes the collected juice an obvious separate product.
 b+='<path d="M479 491V565Q528 586 577 565V491" fill="url(#glass)" stroke="#90a798" stroke-width="2.2"/><ellipse cx="528" cy="491" rx="49" ry="9" fill="none" stroke="#a7b8a7" stroke-width="1.8"/>'
 b+='<path d="M483 530V562Q529 580 573 562V530Z" fill="url(#liquid)"/><ellipse cx="528" cy="530" rx="45" ry="8" fill="#edc568"/><path d="M488 503V555" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/><path d="M529 474C524 482 519 488 529 492C539 488 534 482 529 474Z" fill="#d5a03c"/>'
 # Labels sit outside the equipment; leaders end at the relevant part.
 b+='<path d="M349 302L420 262H584" fill="none" stroke="#5c98ac" stroke-width="1.7"/><circle cx="349" cy="302" r="3.5" fill="#5c98ac"/>'
 b+=text(500,211,'留在机内',23,BLUE,weight=600)+text(500,240,'冰晶与果皮',19,BLUE)
 b+='<path d="M150 407L105 506H30" fill="none" stroke="#899f8d" stroke-width="1.7"/>'+text(88,535,'筛底与集汁槽',19)
 b+=text(370,546,'流出',19,GOLD)+text(370,576,'浓缩葡萄汁',23,GOLD,weight=600)
 return b

def write(name,title,desc,body):
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="620" height="620" viewBox="0 0 620 620" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>{DEFS}<g font-family="system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">{body}</g></svg>'
 svg=re.sub(r'font-size="(\d+)"',lambda m:f'font-size="{max(int(m[1]),22)}"',svg)
 (OUT/name).write_text(svg)
 mobile=re.sub(r'font-size="(\d+)"',lambda m:f'font-size="{max(int(m[1]),26)}"',svg)
 mobile=mobile.replace('x="88" y="535"','x="110" y="535"')
 (OUT/name.replace(".svg","-mobile.svg")).write_text(mobile)

if __name__=='__main__':
 write('freeze-grape-cutaway-v2.svg','冻态葡萄与果粒剖面','带有白霜的葡萄与放大果粒剖面；浅蓝色冰晶占据部分果肉，金色区域是仍含溶解糖和酸的未冻结汁液。',frozen_fruit())
 write('freeze-press-cutaway-v2.svg','冻态压榨与汁液收集','篮式压榨原理剖面：压板向下施压，冰晶与果皮留在篮中；金色汁液穿过筛底，汇入集汁槽，经出汁口流入独立容器。',frozen_press())
 print('Wrote two 620 × 620 frozen-grape mechanism cutaways.')
