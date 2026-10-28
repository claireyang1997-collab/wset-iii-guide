"""Four matched equipment cutaways, including the two distinct rack/return states."""
from pathlib import Path
from html import escape
import math,re
OUT=Path(__file__).resolve().parents[1]/'dist/assets'
INK='#354335'; BLUE='#3c829a'; WINE='#793448'
DEFS='''<defs>
<linearGradient id="steel"><stop stop-color="#91a69c"/><stop offset=".2" stop-color="#d9e3d8"/><stop offset=".45" stop-color="#acbeb1"/><stop offset=".75" stop-color="#e8ece0"/><stop offset="1" stop-color="#7f9889"/></linearGradient>
<linearGradient id="wine" x2="0" y2="1"><stop stop-color="#a9576e"/><stop offset=".5" stop-color="#924258"/><stop offset="1" stop-color="#713344"/></linearGradient>
<linearGradient id="skins" x2="0" y2="1"><stop stop-color="#804153"/><stop offset="1" stop-color="#532c3c"/></linearGradient>
<linearGradient id="window" x2="1" y2=".3"><stop stop-color="#dbe5d6" stop-opacity=".4"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#e5eadb" stop-opacity=".2"/></linearGradient>
<filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#465943" flood-opacity=".1"/></filter>
<marker id="flow-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M1 1L5 3.5L1 6" fill="none" stroke="#3c829a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
</defs>'''

def text(x,y,t,size=24,color=INK,anchor='middle',weight=400):
 return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size}" fill="{color}" font-weight="{weight}">{escape(t)}</text>'

def arrow(path,w=3):
 return f'<path d="{path}" fill="none" stroke="{BLUE}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#flow-arrow)"/>'

def pipe(path):
 return f'<path d="{path}" fill="none" stroke="#789489" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="{path}" fill="none" stroke="#c8d6c5" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'

def fragments(x,y,w,h,count=55):
 out=''
 for i in range(count):
  px=x+8+(i*41)%(w-16); py=y+5+(i*19)%(max(6,h-10))
  r=4+i%4; color=['#9c5b6c','#754051','#af6a79','#6c3549'][i%4]
  out+=f'<path d="M{px-r} {py}q{-r//2} {-r} {r} {-r-1}q{r+3} -2 {r+4} {r}q-1 {r+3} {-r-3} {r+2}q{-r-1} 1 {-r-1} {-r-1}Z" fill="{color}" stroke="#b27680" stroke-opacity=".35" stroke-width=".6"/>'
 return out

def tank(liquid=280,cap=280,mode='flat'):
 b='<ellipse cx="245" cy="523" rx="170" ry="12" fill="#52694a" opacity=".05"/>'
 b+='<path d="M105 468L94 514H119L138 477M352 477L370 514H395L383 468" fill="url(#steel)" stroke="#789182" stroke-width="1.8"/>'
 b+='<path d="M85 157V460Q245 519 405 460V157Z" fill="url(#steel)" stroke="#789182" stroke-width="2" filter="url(#shadow)"/>'
 b+='<ellipse cx="245" cy="157" rx="160" ry="32" fill="#e3e8da" stroke="#789182" stroke-width="2"/><ellipse cx="245" cy="157" rx="145" ry="23" fill="#f4f3e7" stroke="#b6c5b2" stroke-width="1.5"/>'
 b+='<path d="M100 180V456Q245 505 390 456V180Q245 222 100 180Z" fill="#f6f3e9" stroke="#93a48e" stroke-width="1.3"/>'
 b+=f'<path d="M101 {liquid}Q245 {liquid-16} 389 {liquid}V455Q245 502 101 455Z" fill="url(#wine)"/>'
 b+=f'<ellipse cx="245" cy="{liquid}" rx="144" ry="21" fill="#b2667a" stroke="#8c455a" stroke-width="1.4"/>'
 if cap is not None:
  if mode=='punch':
   b+='<path d="M101 278Q142 266 179 273Q245 345 311 273Q350 266 389 278V310Q348 298 315 307Q245 379 175 307Q135 299 101 310Z" fill="url(#skins)" stroke="#603047" stroke-width="1.7"/>'
   b+=fragments(109,276,65,32,20)+fragments(316,276,66,32,20)
   b+='<g transform="translate(192 311) rotate(20)">'+fragments(0,0,80,25,16)+'</g>'
  else:
   b+=f'<path d="M101 {cap}Q245 {cap+34} 389 {cap}V{cap+34}Q245 {cap+72} 101 {cap+34}Z" fill="url(#skins)" stroke="#603047" stroke-width="1.5"/><ellipse cx="245" cy="{cap}" rx="144" ry="22" fill="#774052" stroke="#603047" stroke-width="1.3"/>'
   b+=fragments(109,cap-13,271,33,60)+fragments(114,cap+23,262,15,30)
 # The cut steel edges, rivets, rim and outlet make the section recognisable.
 b+='<path d="M98 179V456M392 179V456" stroke="#9bae98" stroke-width="5"/><path d="M85 157Q245 217 405 157" fill="none" stroke="#6f877a" stroke-width="3"/><path d="M88 155Q245 211 402 155" fill="none" stroke="#f2f4e8" stroke-width="1.5"/>'
 b+='<path d="M87 464Q245 521 403 464" fill="none" stroke="#e1e6d5" stroke-width="5"/><path d="M405 437H427V449H405Z" fill="url(#steel)" stroke="#789182" stroke-width="1.4"/>'
 b+='<path d="M414 435V425M408 426H421" fill="none" stroke="#789182" stroke-width="3" stroke-linecap="round"/>'
 for x,y in [(92,216),(92,395),(399,216),(399,395)]:b+=f'<circle cx="{x}" cy="{y}" r="2.5" fill="#e8ecde" stroke="#7b9381" stroke-width="1"/>'
 return b

def pump(x,y,k=1):
 return f'''<g transform="translate({x} {y}) scale({k})"><path d="M-25 29H33M-13 23L-18 29M23 20L28 29" fill="none" stroke="#7d9886" stroke-width="5"/><rect x="5" y="-16" width="42" height="33" rx="6" fill="url(#steel)" stroke="#708c7d" stroke-width="1.7"/><circle r="24" fill="#d4dfd0" stroke="#708c7d" stroke-width="2"/><circle r="15" fill="#a8beb0" stroke="#708c7d"/><path d="M0 -10L9 5L-9 5Z" fill="#799d90"/><circle r="3" fill="#edf0df"/></g>'''

def punch():
 b=tank(mode='punch')
 # Rod passes through the open rim; a perforated foot depresses the local cap.
 b+='<rect x="238" y="64" width="14" height="263" rx="3" fill="url(#steel)" stroke="#728f7d" stroke-width="1.5"/><rect x="208" y="55" width="74" height="12" rx="6" fill="url(#steel)" stroke="#728f7d" stroke-width="1.5"/>'
 b+='<path d="M192 327V335Q245 354 298 335V327Z" fill="#869e8b" stroke="#6e8775" stroke-width="1.6"/><ellipse cx="245" cy="327" rx="53" ry="12" fill="url(#steel)" stroke="#6e8775" stroke-width="1.5"/>'
 for x in [213,230,247,264,281]:b+=f'<ellipse cx="{x}" cy="327" rx="4" ry="2.2" fill="#768d77"/>'
 b+=arrow('M335 67V210')+text(375,80,'下压',23,BLUE)
 b+='<path d="M250 116H418" fill="none" stroke="#8ea38c" stroke-width="1.6"/>'+text(496,123,'压帽棒',24)
 b+='<path d="M306 325L430 314H562" fill="none" stroke="#8e5d6c" stroke-width="1.6"/>'+text(496,272,'酒帽局部',24,WINE)+text(496,301,'压入酒液',24,WINE)
 b+='<path d="M392 405H437" fill="none" stroke="#a26c7b" stroke-width="1.6"/>'+text(494,413,'酒液',24,WINE)
 b+=text(245,574,'工具把酒帽压回酒液中',24)
 return b

def pump_over():
 b=tank()
 b+=pipe('M427 443H476V416H549V77H245V209')
 b+=pump(476,443)+text(476,511,'泵',24)
 b+=arrow('M549 340V220')+arrow('M495 77H350')+arrow('M245 102V185')
 b+='<ellipse cx="245" cy="211" rx="49" ry="10" fill="#bacdbd" stroke="#759482" stroke-width="2"/>'
 for x in [201,222,245,268,289]:
  b+=f'<path d="M{x} 219L{x+(x-245)*.3:.1f} 257" stroke="#91465b" stroke-width="2.5" stroke-dasharray="5 5" stroke-linecap="round"/>'
 b+='<path d="M302 214H402" fill="none" stroke="#88a28c" stroke-width="1.6"/>'+text(471,203,'顶部淋洒',23)
 b+='<path d="M389 290H438" fill="none" stroke="#8c5d70" stroke-width="1.6"/>'+text(474,298,'酒帽',23,WINE)
 b+=text(245,574,'底部抽酒 → 顶部淋过酒帽',24)
 return b

def rack_return():
 b='<path d="M18 313H602" stroke="#dde1d2" stroke-width="1.5"/>'
 b+=text(22,35,'① 排酒：酒液转入接酒罐',25,anchor='start',weight=600)
 # In the drained state the cap has collapsed into the lower part of the fermenter.
 b+='<g transform="translate(-8 -14) scale(.55)">'+tank(liquid=438,cap=418)+'</g>'
 b+='<g transform="translate(345 -14) scale(.55)">'+tank(liquid=253,cap=None)+'</g>'
 b+=pipe('M227 230H290V236H391')+pump(291,236,.65)+arrow('M322 236H375')
 b+=text(124,299,'酒帽落下',23,WINE)+text(480,299,'酒液暂存',23,WINE)
 b+=text(22,355,'② 返浇：再把酒液整体送回',25,anchor='start',weight=600)
 b+='<g transform="translate(-8 307) scale(.55)">'+tank(liquid=310,cap=292)+'</g>'
 b+='<g transform="translate(345 307) scale(.55)">'+tank(liquid=452,cap=None)+'</g>'
 b+=pipe('M580 550H601V378H128V428')
 b+=arrow('M511 378H359')+arrow('M128 391V446')
 b+='<path d="M117 448L103 463M128 448V467M139 448L153 463" stroke="#9c4f65" stroke-width="3.5" stroke-linecap="round"/>'
 b+=text(125,610,'返浇冲散酒帽',23,WINE)+text(475,610,'接酒罐排空',23)
 return b

def rotary():
 b='<ellipse cx="300" cy="518" rx="235" ry="13" fill="#566e4b" opacity=".05"/>'
 # Stable frame and bearing rollers support a horizontal rotating fermenter.
 b+='<path d="M133 405L94 506H123L165 415M434 408L479 506H508L470 396" fill="url(#steel)" stroke="#758d7c" stroke-width="2"/><path d="M106 505H497" stroke="#849e87" stroke-width="8"/>'
 for x in [149,450]:
  b+=f'<circle cx="{x}" cy="414" r="28" fill="#b2c4b4" stroke="#738d7b" stroke-width="2"/><circle cx="{x}" cy="414" r="13" fill="#7b9783"/>'
 b+='<path d="M119 181Q65 181 65 294Q65 407 119 407H479Q537 407 537 294Q537 181 479 181Z" fill="url(#steel)" stroke="#758d7c" stroke-width="2.2" filter="url(#shadow)"/>'
 b+='<ellipse cx="479" cy="294" rx="57" ry="113" fill="url(#steel)" stroke="#758d7c" stroke-width="2"/><ellipse cx="479" cy="294" rx="45" ry="97" fill="none" stroke="#cbd6c4" stroke-width="2"/>'
 b+='<path d="M121 207Q91 207 91 294Q91 381 121 381H429V207Z" fill="#f5f2e8" stroke="#a4b5a0" stroke-width="1.6"/>'
 b+='<path d="M94 294Q258 311 427 292V380H122Q92 380 94 294Z" fill="url(#wine)"/>'
 # Skins occupy both the liquid and the lifted edge instead of remaining a flat cap.
 b+=fragments(111,315,301,55,62)
 b+='<path d="M122 217Q154 219 160 264Q167 309 183 338" fill="none" stroke="#8e5364" stroke-width="20" stroke-linecap="round"/>'+fragments(133,232,40,92,25)
 b+='<path d="M174 205Q150 295 174 383M383 205Q400 294 383 383" fill="none" stroke="#b3c1ad" stroke-width="6"/>'
 b+=arrow('M118 141C223 57 407 64 493 145',4)
 b+=text(304,76,'容器转动',25,BLUE,weight=600)
 b+=arrow('M233 267C286 226 360 248 382 300',3)
 b+='<path d="M537 294H568V443H536" fill="none" stroke="#79937e" stroke-width="7"/>'+pump(527,449,.75)
 b+='<path d="M395 346L449 446H448" fill="none" stroke="#9b6b7a" stroke-width="1.6"/>'+text(330,474,'皮渣与酒液混合',23,WINE)
 b+=text(301,574,'滚动使皮渣反复接触酒液',24)
 return b

PANELS=[('punch','压帽',punch),('pump-over','淋皮',pump_over),('rack-return','倒罐返浇',rack_return),('rotary','旋转式发酵',rotary)]

def svg(title,body):
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="620" height="640" viewBox="0 0 620 640" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title>{DEFS}<g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">{body}</g></svg>'

if __name__=='__main__':
 overview='<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="1470" viewBox="0 0 1280 1470"><rect width="1280" height="1470" fill="#fcfaf3"/>'+text(40,45,'酒帽管理的四条路径 · 设备剖面对照',30,anchor='start',weight=600)
 for i,(name,title,draw) in enumerate(PANELS):
  body=draw();full=svg(title,body)
  (OUT/f'cap-{name}-cutaway-v2.svg').write_text(full)
  mobile=re.sub(r'font-size="(\d+)"',lambda m:f'font-size="{max(int(m[1]),28)}"',full)
  (OUT/f'cap-{name}-cutaway-v2-mobile.svg').write_text(mobile)
  group=DEFS+'<g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">'+body+'</g>'
  group=re.sub(r'id="([^"]+)"',lambda m:f'id="p{i}-{m[1]}"',group)
  group=re.sub(r'url\(#([^)]+)\)',lambda m:f'url(#p{i}-{m[1]})',group)
  x=20+(i%2)*630;y=105+(i//2)*695
  overview+=f'<g transform="translate({x} {y})">'+text(8,-17,f'{i+1:02}  {title}',26,anchor='start',weight=600)+group+'</g>'
 overview+='</svg>'
 (OUT/'cap-management-overview-v2.svg').write_text(overview)
 print('Wrote four equipment cutaways, mobile variants and an overview.')
