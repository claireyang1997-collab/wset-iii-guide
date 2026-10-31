"""Detailed native SVG material studies; geometry is explanatory, not a device blueprint."""
from pathlib import Path
from html import escape
import random, math
R=Path(__file__).resolve().parents[1]/'dist/assets'
DEFS='''<defs>
<linearGradient id="cellulose" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#e9e2c7"/><stop offset=".28" stop-color="#f8f3de"/><stop offset=".7" stop-color="#d9d5b8"/><stop offset="1" stop-color="#b6bba2"/></linearGradient>
<linearGradient id="cutedge" x2="0" y2="1"><stop stop-color="#c9c9a9"/><stop offset="1" stop-color="#9ba78c"/></linearGradient>
<linearGradient id="membrane"><stop stop-color="#a2b8ad"/><stop offset=".25" stop-color="#e5ede0"/><stop offset=".55" stop-color="#c3d4c4"/><stop offset="1" stop-color="#8aa99d"/></linearGradient>
<linearGradient id="cork"><stop stop-color="#ac7b47"/><stop offset=".15" stop-color="#cca16a"/><stop offset=".4" stop-color="#e1bd82"/><stop offset=".72" stop-color="#c79c61"/><stop offset="1" stop-color="#97663a"/></linearGradient>
<radialGradient id="corktop" cx=".4" cy=".3"><stop stop-color="#edcf9a"/><stop offset="1" stop-color="#bd935d"/></radialGradient>
<linearGradient id="poly"><stop stop-color="#ba9e72"/><stop offset=".16" stop-color="#e4d3ad"/><stop offset=".42" stop-color="#f2e6c8"/><stop offset=".78" stop-color="#e1cca6"/><stop offset="1" stop-color="#b89a6e"/></linearGradient>
<linearGradient id="metal"><stop stop-color="#512e3b"/><stop offset=".14" stop-color="#7e4b5b"/><stop offset=".3" stop-color="#b87a88"/><stop offset=".48" stop-color="#d29ba5"/><stop offset=".63" stop-color="#965f70"/><stop offset=".9" stop-color="#663646"/><stop offset="1" stop-color="#432532"/></linearGradient>
<radialGradient id="metalTop" cx=".4" cy=".2"><stop stop-color="#c3939d"/><stop offset=".65" stop-color="#916071"/><stop offset="1" stop-color="#663b4b"/></radialGradient>
<linearGradient id="liner"><stop stop-color="#a6b8b0"/><stop offset=".35" stop-color="#eff2e8"/><stop offset=".7" stop-color="#d2dbcf"/><stop offset="1" stop-color="#879e95"/></linearGradient>
<linearGradient id="glass"><stop stop-color="#456b5b" stop-opacity=".65"/><stop offset=".23" stop-color="#b6c9b2" stop-opacity=".55"/><stop offset=".43" stop-color="#ecedc9" stop-opacity=".35"/><stop offset=".72" stop-color="#7f9c7a" stop-opacity=".6"/><stop offset="1" stop-color="#3d6553" stop-opacity=".8"/></linearGradient>
<radialGradient id="particle"><stop stop-color="#b37082"/><stop offset=".7" stop-color="#854556"/><stop offset="1" stop-color="#663443"/></radialGradient>
<filter id="shadow" x="-.4" y="-.5" width="1.8" height="2"><feGaussianBlur stdDeviation="8"/></filter>
<marker id="arrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="6" markerHeight="6" orient="auto"><path d="M2 2L10 6L2 10" fill="none" stroke="#4a8b9e" stroke-width="1.8"/></marker>
</defs>'''

def text(x,y,t,size=24,anchor='middle',color='#52654f'):
 return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size}" fill="{color}">{escape(t)}</text>'
def path(d,c='#74836a',w=1,fill='none',extra=''):
 return f'<path d="{d}" fill="{fill}" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" {extra}/>'
def arrow(d,w=3):return path(d,'#4a8b9e',w,extra='marker-end="url(#arrow)"')
def dot(x,y,r):return f'<circle cx="{x}" cy="{y}" r="{r}" fill="url(#particle)" stroke="#fff6e9" stroke-width="1.3"/>'
def write(name,title,desc,body,w=600,h=500,defs=''):
 (R/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>{DEFS}{defs}<rect width="{w}" height="{h}" rx="15" fill="#f5f2e8"/><g font-family="PingFang SC,Noto Sans CJK SC,Microsoft YaHei,sans-serif" fill="#354b40">{body}</g></svg>\n')

# Depth: a thick, irregular fibrous bed. Paths represent flow, not pores of a given size.
rng=random.Random(732)
front='M208 140Q239 129 276 139L390 137Q401 201 395 256L402 372Q320 387 210 376Q218 323 209 265Z'
defs=f'<defs><clipPath id="depth-face"><path d="{front}"/></clipPath></defs>'
b='<ellipse cx="315" cy="404" rx="140" ry="14" fill="#8d9276" opacity=".12" filter="url(#shadow)"/>'
b+=path('M208 140L246 108Q319 104 429 111L390 137Z','#b9bd9e',1.5,'#e3dfc5')
b+=path('M390 137L429 111Q437 242 438 349L402 372Q399 251 390 137Z','#9da98d',1.5,'url(#cutedge)')
for i in range(55):
 y=120+i*4.2;b+=path(f'M{414+math.sin(i)*4:.1f} {y:.1f}q9 3 18 -2','#b8c3a4',.8)
b+=path(front,'#a5ad91',1.6,'url(#cellulose)')
b+='<g clip-path="url(#depth-face)">'
for i in range(142):
 x=rng.uniform(196,398);y=rng.uniform(126,390);dx=rng.uniform(35,100);dy=rng.uniform(-50,50)
 c=rng.choice(['#b9b99b','#dad7b7','#aeb497','#ece8cc','#929e82'])
 b+=path(f'M{x:.1f} {y:.1f}c{dx*.3:.1f} {dy-15:.1f} {dx*.55:.1f} {dy+28:.1f} {dx:.1f} {dy:.1f}',c,rng.uniform(.65,1.8))
for y in [196,262,326]:b+=path(f'M210 {y}C252 {y-18} 272 {y+23} 306 {y}S365 {y-15} 404 {y+4}','#6dabb4',2.4,extra='opacity=".55"')
for x,y,r in [(229,178,10),(268,240,8),(326,312,7),(363,205,5),(242,345,9),(302,163,5)]:b+=dot(x,y,r)
for i in range(18):
 x=rng.uniform(215,390);y=rng.uniform(150,365);b+=path(f'M{x:.1f} {y:.1f}q17 -11 27 6','#f4f0dc',1.8)
b+='</g>'
b+=arrow('M32 262H190',4)+arrow('M453 262H566',4)
for x,y,r in [(48,193,8),(95,307,10),(150,215,6),(167,333,5)]:b+=dot(x,y,r)
b+=text(100,88,'含颗粒酒液',25)+text(516,88,'过滤后酒液',23)
b+=path('M303 312L343 432H520','#8e7963',1.4)+text(381,463,'内部不同深处截留',25)
b+=text(318,62,'厚滤材剖面',25)
write('filtration-depth-study-v3.svg','深层过滤：厚滤材内部截留颗粒','放大的厚滤材剖面有交织纤维和曲折流路，酒红色颗粒分布在内部不同深度；蓝色箭头由左向右。',b,defs=defs)

# Surface: thin membrane seen from an oblique angle; holes pass liquid, particles stop upstream.
rng=random.Random(746)
b='<ellipse cx="325" cy="405" rx="110" ry="13" fill="#8d9276" opacity=".1" filter="url(#shadow)"/>'
b+=path('M281 126L333 107L360 123L308 141Z','#8ea799',1.7,'#dbe4d6')
b+=path('M308 141L360 123V370L308 390Z','#87a496',1.7,'url(#membrane)')
b+=path('M281 126L308 141V390L281 374Z','#8ea799',1.7,'#bccfbd')
for row in range(11):
 for col in range(3):
  x=317+col*14;y=153+row*20-col*4
  b+=f'<ellipse cx="{x}" cy="{y}" rx="3.2" ry="5" fill="#668d83" opacity=".8"/>'
  b+=path(f'M{x-2} {y-4}q4 -2 5 3','#edf0e2',.7)
for y in [178,247,320]:
 b+=path(f'M292 {y}L335 {y-12}L352 {y-5}','#548fa0',1.8,extra='opacity=".65"')
b+=arrow('M35 261H260',4)+arrow('M376 261H565',4)
for x,y,r in [(55,190,8),(105,315,7),(157,214,11),(190,340,5),(264,157,10),(270,201,8),(271,249,9),(272,298,10),(271,349,7)]:b+=dot(x,y,r)
b+=text(108,88,'含颗粒酒液',25)+text(510,88,'过滤后酒液',23)
b+=path('M341 167L403 420H554','#7a8d76',1.4)+text(475,461,'薄膜与微孔',25)
b+=path('M271 298L201 428H42','#8e7963',1.4)+text(156,461,'上游表面截留',25)
write('filtration-surface-study-v3.svg','表面过滤：薄膜上游截留颗粒','斜向放大的薄膜带有微孔，蓝色流路穿过薄膜；酒红色颗粒停留在左侧上游表面。孔径与厚度均为概念示意。',b)

# Material studies share a cylindrical silhouette, making texture differences legible.
CYL='M190 132C190 110 370 110 370 132V359C370 393 190 393 190 359Z'
def cork_study(kind):
 rng=random.Random(817 if kind=='natural' else 818)
 defs=f'<defs><clipPath id="body"><path d="{CYL}"/></clipPath><clipPath id="top"><ellipse cx="280" cy="132" rx="90" ry="31"/></clipPath></defs>'
 b='<ellipse cx="287" cy="410" rx="126" ry="17" fill="#82765b" opacity=".12" filter="url(#shadow)"/>'
 b+=path(CYL,'#947249',1.7,'url(#cork)')+'<g clip-path="url(#body)">'
 if kind=='natural':
  for i in range(70):
   y=rng.uniform(120,390);x=rng.uniform(183,360);w=rng.uniform(8,35)
   b+=path(f'M{x:.1f} {y:.1f}q{w*.5:.1f} -2 {w:.1f} {rng.uniform(-4,5):.1f}',rng.choice(['#a67c46','#ebcc93','#c29760']),rng.uniform(.6,1.8))
  for i in range(140):
   x=rng.uniform(190,370);y=rng.uniform(135,377);w=rng.uniform(1,8);h=rng.uniform(.6,2.4)
   b+=f'<ellipse cx="{x:.2f}" cy="{y:.2f}" rx="{w:.2f}" ry="{h:.2f}" transform="rotate({rng.uniform(-20,20):.1f} {x:.2f} {y:.2f})" fill="{rng.choice(["#a27b47","#7e5d33","#c19761"])}" opacity="{rng.uniform(.3,.75):.2f}"/>'
 else:
  for i in range(270):
   x=rng.uniform(184,376);y=rng.uniform(112,390);rad=rng.uniform(2.5,8.5);verts=[]
   for k in range(6):
    angle=k*math.pi/3;rr=rad*rng.uniform(.65,1.35);verts.append((x+rr*math.cos(angle),y+rr*math.sin(angle)))
   pp='M'+'L'.join(f'{x:.1f} {y:.1f}' for x,y in verts)+'Z'
   b+=path(pp,'#a47b46',.45,rng.choice(['#b28b56','#cfaa72','#e4c48e','#c49b65','#d7b77c']),extra='opacity=".72"')
  for i in range(130):
   x=rng.uniform(190,370);y=rng.uniform(135,380);b+=f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rng.uniform(.6,1.5):.1f}" fill="#876334" opacity=".4"/>'
 b+='</g><ellipse cx="280" cy="132" rx="90" ry="31" fill="url(#corktop)" stroke="#aa8150" stroke-width="1.5"/>'
 b+='<g clip-path="url(#top)">'
 for i in range(85):
  x=rng.uniform(190,370);y=rng.uniform(105,162);b+=f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{rng.uniform(.8,4):.1f}" ry="{rng.uniform(.6,1.4):.1f}" fill="#936b3a" opacity=".45"/>'
 b+='</g>'+path('M201 151V356Q204 369 222 373','#f0d9a5',2,extra='opacity=".6"')
 b+=path('M196 358Q280 392 364 358','#9e7745',1,extra='opacity=".6"')
 b+=path('M209 217L131 192H35','#9b947b',1.3)
 b+=text(117,174,'整块软木' if kind=='natural' else '软木颗粒',25)
 b+=text(280,456,'天然纹理与皮孔' if kind=='natural' else '颗粒构成示意',24)
 write('closure-'+kind+'-study-v3.svg','天然软木塞' if kind=='natural' else '技术软木塞','立体软木塞的顶面和侧面材质放大；天然软木显示不规则纹理，技术软木显示大小不同的软木颗粒。',b,defs=defs)
cork_study('natural');cork_study('technical')

rng=random.Random(819)
defs=f'<defs><clipPath id="body"><path d="{CYL}"/></clipPath></defs>'
b='<ellipse cx="287" cy="410" rx="126" ry="17" fill="#82765b" opacity=".1" filter="url(#shadow)"/>'+path(CYL,'#ad9876',1.7,'url(#poly)')
b+='<g clip-path="url(#body)">'
for i in range(580):
 x=rng.uniform(186,375);y=rng.uniform(120,390);rad=rng.uniform(.4,1.9)
 b+=f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{rad:.1f}" ry="{rad*.6:.1f}" fill="none" stroke="#b8a682" stroke-width=".65" opacity=".4"/>'
b+='</g><ellipse cx="280" cy="132" rx="90" ry="31" fill="#eee0bf" stroke="#c3ad86" stroke-width="1.5"/>'
for i in range(140):
 a=rng.random()*2*math.pi;rad=math.sqrt(rng.random());x=280+85*rad*math.cos(a);y=132+27*rad*math.sin(a);b+=f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rng.uniform(.5,1.9):.1f}" fill="#d2c5a6" opacity=".65"/>'
b+=path('M203 157V352Q206 365 220 370','#fff6df',4,extra='opacity=".75"')
b+=path('M360 170V353','#9d8663',1,extra='opacity=".5"')
b+=path('M210 226L136 193H35','#9b947b',1.3)+text(111,173,'合成材料',25)+text(280,456,'材质与截面示意',24)
write('closure-synthetic-study-v3.svg','合成塞材质示意','有顶面与圆柱侧面的浅色合成塞，细小材料纹理用于辨认；不表示所有品牌的具体结构。',b,defs=defs)

# Screwcap exploded study: cap, liner, and glass mouth stay physically distinct.
b='<ellipse cx="255" cy="466" rx="124" ry="13" fill="#82765b" opacity=".1" filter="url(#shadow)"/>'
b+=path('M154 115C154 83 352 83 352 115V239C352 265 154 265 154 239Z','#593343',1.7,'url(#metal)')
for i in range(38):
 x=159+i*5;y=115+18*math.sin((i/37)*math.pi)
 b+=path(f'M{x:.1f} {y:.1f}V225', '#e0adb3' if i%2 else '#4b2937',.9,extra='opacity=".35"')
b+='<ellipse cx="253" cy="114" rx="99" ry="32" fill="url(#metalTop)" stroke="#704353" stroke-width="1.7"/>'
b+='<ellipse cx="253" cy="112" rx="86" ry="24" fill="none" stroke="#d2a1a9" stroke-width="1.2" opacity=".5"/>'
b+=path('M154 227Q253 264 352 227V245Q253 282 154 245Z','#613848',1,'#82505f')
for y in [231,239]:b+=path(f'M160 {y}Q253 {y+30} 346 {y}','#d5a3ac',.7,extra='opacity=".55"')
b+=path('M253 277V302','#91a398',1.5,extra='stroke-dasharray="5 5"')
b+='<ellipse cx="253" cy="322" rx="88" ry="20" fill="#91a69b" stroke="#789589" stroke-width="1.5"/><ellipse cx="253" cy="315" rx="88" ry="20" fill="url(#liner)" stroke="#a1b5a9" stroke-width="1.5"/><ellipse cx="253" cy="313" rx="75" ry="14" fill="none" stroke="#e9eee0" stroke-width="1"/>'
b+=path('M253 345V369','#91a398',1.5,extra='stroke-dasharray="5 5"')
b+=path('M173 391Q253 414 333 391V469H173Z','#819f88',1.3,'url(#glass)')
for y in [414,427,440]:b+=path(f'M174 {y}Q253 {y+17} 332 {y-5}','#648671',2,extra='opacity=".7"')
b+='<ellipse cx="253" cy="390" rx="80" ry="20" fill="#b8cbb0" stroke="#7d9b81" stroke-width="1.5"/><ellipse cx="253" cy="390" rx="63" ry="12" fill="#496a52" opacity=".62"/>'
b+=path('M184 414V465','#f0edcf',4,extra='opacity=".55"')
b+=path('M344 154H397L410 135','#8b8c78',1.3)+text(472,128,'金属盖',25)
b+=path('M339 315H397L408 302','#8b8c78',1.3)+text(472,295,'内衬',25)
b+=path('M332 390H397L410 376','#8b8c78',1.3)+text(472,370,'玻璃瓶口',24)
b+=text(253,57,'分解示意',24)+text(480,438,'内衬控制',24)+text(480,470,'透氧表现',24)
write('closure-screwcap-study-v3.svg','螺旋盖：金属盖、内衬与瓶口的分解示意','立体金属螺旋盖带压纹和下缘，独立内衬位于其下方，再下方为带螺纹的玻璃瓶口；三部分沿同一轴线对应。',b)
print('Wrote six detailed material illustrations.')
