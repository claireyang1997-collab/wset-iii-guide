"""Illustrate terraced manual vineyard work and its cost pathway."""
from pathlib import Path
from html import escape
import math
OUT=Path(__file__).resolve().parents[1]/'dist/assets'
DEFS='''<defs>
<linearGradient id="hill" x2=".2" y2="1"><stop stop-color="#d9e3c2"/><stop offset="1" stop-color="#bacba1"/></linearGradient>
<linearGradient id="soil" x2="0" y2="1"><stop stop-color="#e6dfbe"/><stop offset="1" stop-color="#cbc49d"/></linearGradient>
<linearGradient id="wall" x2="0" y2="1"><stop stop-color="#b6b29a"/><stop offset="1" stop-color="#8e9581"/></linearGradient>
<linearGradient id="leaf" x2=".8" y2="1"><stop stop-color="#819855"/><stop offset="1" stop-color="#496b42"/></linearGradient>
<marker id="arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M1 1L5 3.5L1 6" fill="none" stroke="#9b7c3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
</defs>'''

def text(x,y,t,size=25,anchor='middle',color='#354335',weight=400):
 return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" fill="{color}" font-weight="{weight}">{escape(t)}</text>'

def leaf(x,y,k=1,rot=0):
 return f'<g transform="translate({x} {y}) rotate({rot}) scale({k})"><path d="M0 12L-16 5L-11 -3L-17 -11L-4 -12L0 -23L6 -13L18 -15L15 -4L22 2L8 9Z" fill="url(#leaf)" stroke="#5e7b44" stroke-width=".8"/><path d="M0 12L0 -16M0 1L-10 -8M1 -1L12 -9" fill="none" stroke="#a5b775" stroke-width="1"/></g>'

def vine(x,y,k=1,i=0):
 b=f'<g transform="translate({x} {y}) scale({k})"><path d="M0 1L-1 -46" stroke="#8a7255" stroke-width="4"/><path d="M0 -15Q-11 -32 -29 -32M0 -15Q13 -39 31 -38" fill="none" stroke="#705f43" stroke-width="3"/>'
 for px,py,rot in [(-22,-34,-27),(-3,-41,14),(23,-39,37),(8,-23,-4)]:b+=leaf(px,py,.8,rot+i%3*9)
 for bx,by in [(-19,-22),(18,-25)]:
  for dx,dy in [(-4,0),(3,0),(0,6),(-3,5),(1,11)]:b+=f'<circle cx="{bx+dx}" cy="{by+dy}" r="3.5" fill="#5e4b61" stroke="#a29894" stroke-width=".5"/>'
 return b+'</g>'

def worker(x,y,k=1,carry=False):
 b=f'<g transform="translate({x} {y}) scale({k})">'
 # Feet, trousers, jacket, face, hat and hands form a small clothed silhouette.
 b+='<path d="M-5 -23L-9 -3L-20 0M6 -23L14 -6L25 -5" fill="none" stroke="#687c6b" stroke-width="11" stroke-linecap="round"/><path d="M-21 1H-7M18 -4H30" stroke="#6b6251" stroke-width="6" stroke-linecap="round"/>'
 b+='<path d="M-10 -62Q4 -68 14 -53L12 -24Q0 -17 -12 -26Z" fill="#b4875f" stroke="#94704e" stroke-width="1.5"/><path d="M-10 -59L-25 -48L-34 -30M11 -55L-6 -40L-23 -24" fill="none" stroke="#b4875f" stroke-width="10" stroke-linecap="round"/><path d="M-34 -30L-38 -26M-23 -24L-27 -20" stroke="#d2b694" stroke-width="6" stroke-linecap="round"/>'
 b+='<ellipse cx="0" cy="-73" rx="10" ry="12" fill="#d6b894"/><path d="M-11 -79Q0 -97 11 -79Z" fill="#cab68c" stroke="#9b8d68"/><ellipse cx="0" cy="-79" rx="20" ry="4" fill="#c9b38a" stroke="#a89672"/>'
 if carry:
  b+='<path d="M-23 -63H-4L-6 -31L-25 -35Z" fill="#9b7957" stroke="#7f674b" stroke-width="1.5"/><path d="M-23 -54H-5M-24 -45H-5" stroke="#c3a27b" stroke-width="2"/>'
  for i in range(9):b+=f'<circle cx="{-22+(i%3)*6}" cy="{-65-(i//3)*4}" r="4" fill="#69536a"/>'
 return b+'</g>'

def landscape():
 b='<path d="M31 420C169 365 246 226 410 152Q602 57 837 58V571H31Z" fill="url(#hill)" opacity=".7"/>'
 terraces=[[(355,135),(576,40),(815,75),(591,187)],[(266,230),(525,115),(813,164),(563,301)],[(170,345),(440,215),(808,282),(535,421)],[(75,465),(365,325),(800,398),(490,550)]]
 for level,pts in enumerate(terraces):
  points=' '.join(f'{x},{y}' for x,y in pts)
  b+=f'<polygon points="{points}" fill="url(#soil)" stroke="#b6be95" stroke-width="1.4"/>'
  # Soil and paving marks follow the terrace plane.
  for j in range(16):
   t=(j+.5)/16;x=pts[0][0]+(pts[3][0]-pts[0][0])*t;y=pts[0][1]+(pts[3][1]-pts[0][1])*t
   b+=f'<path d="M{x:.1f} {y-6:.1f}l15 -6" stroke="#b8b58c" stroke-width="1.1" opacity=".5"/>'
  a,d=pts[0],pts[3]
  b+=f'<path d="M{a[0]} {a[1]}L{d[0]} {d[1]}V{d[1]+22}L{a[0]} {a[1]+22}Z" fill="url(#wall)" stroke="#899782" stroke-width="1.1"/>'
  for j in range(1,17):
   t=j/17;x=a[0]+(d[0]-a[0])*t;y=a[1]+(d[1]-a[1])*t
   b+=f'<path d="M{x:.1f} {y:.1f}v11l15 3v10M{x-8:.1f} {y+11:.1f}l23 5" fill="none" stroke="#d6d4bb" stroke-width=".9"/>'
  # Trellis rows follow each platform; varied leaves replace schematic T-posts.
  sx=a[0]+22;sy=a[1]-18;ex=d[0]-30;ey=d[1]-18;k=.68+level*.12
  b+=f'<path d="M{sx} {sy-37*k}L{ex} {ey-37*k}M{sx} {sy-15*k}L{ex} {ey-15*k}" stroke="#99a78a" stroke-width="1.2"/>'
  for row in [1,0]:
   for j in range(8):
    t=j/7;x=sx+(ex-sx)*t+row*83;y=sy+(ey-sy)*t-row*48
    b+=vine(x,y,k*(.92 if row else 1),j+row)
 # Narrow steps form a visibly separate route along the slope.
 b+='<path d="M591 539L747 145L773 149L617 549Z" fill="#b7b49c" stroke="#87957b" stroke-width="1.5"/>'
 for i in range(25):
  t=i/24;x=595+(750-595)*t;y=537+(148-537)*t
  b+=f'<path d="M{x} {y}l23 8v6l-23 -8Z" fill="#d8d4b8" stroke="#9ba58e" stroke-width=".8"/>'
 b+=worker(398,341,.94)+worker(680,353,.96,True)+worker(553,171,.65)
 b+='<path d="M645 470L675 399" stroke="#9b7c3d" stroke-width="2.6" fill="none" marker-end="url(#arrow)"/>'
 b+=text(696,505,'沿坡搬运',25,color='#8d723d')
 b+='<path d="M386 279L302 202H118" fill="none" stroke="#9b8260" stroke-width="1.5"/>'+text(204,183,'人工采收',25,color='#8a7050')
 b+='<path d="M317 534L237 579H63" fill="none" stroke="#829276" stroke-width="1.5"/>'+text(152,607,'梯田与挡土墙',24,color='#647a56')
 return b

def svg(body):return '<svg xmlns="http://www.w3.org/2000/svg" width="860" height="640" viewBox="0 0 860 640" role="img" aria-labelledby="title desc"><title id="title">陡坡梯田葡萄园的人工采收与搬运</title><desc id="desc">沿坡分层的梯田、石质挡土墙、成行的葡萄藤和窄台阶；工人手工采收，并沿坡搬运葡萄。用场景表现机械进入和作业受限制。</desc>'+DEFS+'<g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">'+body+'</g></svg>'

if __name__=='__main__':
 body=landscape();(OUT/'steep-vineyard-work-v2.svg').write_text(svg(body))
 overview='<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="700" viewBox="0 0 1280 700"><rect width="1280" height="700" fill="#fcfaf3"/>'+DEFS+'<g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">'+text(36,48,'陡坡如何转化为成本 · 因果示意',30,anchor='start',weight=600)
 overview+='<g transform="translate(0 80) scale(.83)">'+body+'</g>'
 for i,(head,sub) in enumerate([('机械进入与作业受限制','坡度、狭窄梯田与搬运路径'),('需要更多人工与时间','采收、维护与搬运更困难'),('单位葡萄生产成本增加','还需结合产量、工资与规模')]):
  y=135+i*150
  overview+=f'<circle cx="790" cy="{y+10}" r="22" fill="#e8ecdc" stroke="#b8c5a2"/>'+text(790,y+18,str(i+1),22)
  overview+=text(838,y+6,head,26,anchor='start',weight=600)+text(838,y+46,sub,22,anchor='start',color='#728169')
  if i<2:overview+=f'<path d="M790 {y+45}V{y+105}" fill="none" stroke="#9b7c3d" stroke-width="2" marker-end="url(#arrow)"/>'
 overview+=text(755,642,'售价还受需求、声誉和利润影响',23,anchor='start',color='#886d3c')+'</g></svg>'
 (OUT/'steep-cost-overview-v2.svg').write_text(overview)
 print('Wrote vineyard work scene and cost overview.')
