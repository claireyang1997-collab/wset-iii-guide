# coding: utf-8
"""Redraw the supplied carbonic process and appellation hierarchy as accessible SVGs."""
from pathlib import Path
from html import escape
root=Path(__file__).resolve().parents[1]
out=root/'dist/assets'
def text(x,y,lines,size=21,fill='#34412e',weight=400,step=31):
 if isinstance(lines,str):lines=[lines]
 return f'<text x="{x}" y="{y}" fill="{fill}" font-size="{size}" font-weight="{weight}">'+''.join(f'<tspan x="{x}" dy="{0 if i==0 else step}">{escape(line)}</tspan>' for i,line in enumerate(lines))+'</text>'
def box(x,y,w,h,fill='#fffdf7',stroke='#d9d9ca',r=16):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>'
def arrow(x1,y1,x2,y2):return f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="#8c947c" stroke-width="2.4" marker-end="url(#arrow)"/>'
def grape(x,y,scale=1):
 dots=[(0,0),(12,0),(24,0),(6,11),(18,11),(12,22)]
 return f'<g transform="translate({x} {y}) scale({scale})"><path d="M12 -10L12 0" stroke="#716043" stroke-width="3"/>'+''.join(f'<circle cx="{a}" cy="{b}" r="7" fill="url(#berry)" stroke="#6c4657" stroke-width=".6"/>' for a,b in dots)+'</g>'
def svg(w,h,title,desc,body):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="#8c947c"/></marker><radialGradient id="berry" cx="30%" cy="25%"><stop stop-color="#b48a99"/><stop offset="1" stop-color="#704759"/></radialGradient></defs><style>text{{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}}</style><rect width="100%" height="100%" fill="#f6f4eb"/>{body}</svg>'''

# Three base-path panels retain the original diagram's tank zones, free-run / press split and reunion.
p1=box(0,0,360,490)+text(20,34,'01  第一阶段',17,'#7a3f54',650)+text(20,72,'完整果粒 · 细胞内转化',25,weight=650)
p1+=text(20,110,'整串装罐，通入 CO₂ 排除氧气',20)
p1+='<path d="M36 153V345Q36 360 51 360H133Q148 360 148 345V153" fill="#e8ebdc" stroke="#71806a" stroke-width="3"/><path d="M38 290Q88 280 146 290V342Q146 358 130 358H54Q38 358 38 342Z" fill="#d7adb5"/>'
p1+=text(49,147,'CO₂',20,'#6c7e68',600)+arrow(93,112,93,128)
for x,y in [(60,188),(107,229),(65,309)]:p1+=grape(x,y,.8)
p1+=text(167,192,['完整果串','处于 CO₂ 气体中'],18,step=27)+text(167,283,['完整果粒','也可浸在缺氧液体中'],18,step=27)
p1+=text(20,394,['底部部分葡萄被自重压破，流出汁液。','缺氧使完整果粒内部产生少量酒精','及特色香气；糖尚未全部发酵完。'],19,step=29)
p2=box(0,0,360,490)+text(20,34,'过渡  分离与压榨',17,'#7a3f54',650)+text(20,72,'先取汁的基础路径',25,weight=650)+text(20,110,'先放出自流汁，再压榨果实',20)
p2+=box(28,146,304,66,'#ecefdf')+text(50,187,'果粒破裂或经压榨释放汁液',20)
p2+=arrow(110,212,110,243)+arrow(250,212,250,243)
p2+=box(20,254,154,77,'#f5e8e6')+text(39,287,['自流酒液','Free-run'],19,step=26)
p2+=box(186,254,154,77,'#ead9df')+text(205,287,['压榨酒液','Press wine'],19,step=26)
p2+='<path d="M97 331V357H263V331M180 357V385" fill="none" stroke="#8c947c" stroke-width="2.4" marker-end="url(#arrow)"/>'
p2+=text(20,419,['原图中，两者汇合继续完成发酵。','此工艺中，压榨酒的风味与品质','可优于自流酒，并非固定品质排序。'],19,step=29)
p3=box(0,0,360,490)+text(20,34,'02  第二阶段',17,'#7a3f54',650)+text(20,72,'酵母完成酒精发酵',25,weight=650)+text(20,110,'从部分转化到完成发酵',20)
p3+='<path d="M98 166V313Q98 330 114 330H246Q262 330 262 313V166" fill="#ead9df" stroke="#71806a" stroke-width="3"/><ellipse cx="180" cy="166" rx="82" ry="15" fill="#f9f5eb" stroke="#71806a" stroke-width="3"/><path d="M101 225Q180 211 259 225V310Q259 327 244 327H116Q101 327 101 310Z" fill="#bd8c9b"/>'
for x,y in [(132,270),(177,242),(220,287),(155,307),(235,249)]:p3+=f'<ellipse cx="{x}" cy="{y}" rx="4" ry="6" fill="#f6ebd5"/>'
p3+=text(140,205,'CO₂ ↑',19,'#60725a')+text(45,371,'糖 → 酒精 ＋ CO₂',24,'#7a3f54',600)
p3+=text(20,419,['由酵母把剩余糖继续转化为酒精。','细胞内阶段结束，并不等于成酒；','自流酒液和压榨酒液可共同发酵。'],19,step=29)

off=box(0,0,552,166,'#f4eee0')+text(22,37,'较早压榨 · 不带皮完成',24,weight=650)+text(22,77,['先分离果皮，再由酵母完成发酵。','通常颜色较浅、单宁较少，风格简单易饮。'],21,step=34)
on=box(0,0,552,166,'#eadde1')+text(22,37,'延后压榨 · 继续带皮发酵',24,'#713c50',650)+text(22,77,['先保留皮汁接触，完成更多发酵后再压榨。','通常果味更浓、单宁更多，颜色也更深。'],21,step=34)
body=text(30,39,'CARBONIC MACERATION',16,'#7a3f54',650)+text(30,82,'两阶段流程与后续带皮选择',34,weight=650)
for x,p in [(30,p1),(420,p2),(810,p3)]:body+=f'<g transform="translate({x} 116)">{p}</g>'
body+=arrow(392,350,415,350)+arrow(782,350,805,350)
body+=text(30,653,'第二阶段的变体：何时压榨，决定皮汁接触与提取',25,weight=650)
body+=f'<g transform="translate(30 680)">{off}</g><g transform="translate(618 680)">{on}</g>'
body+=text(30,897,['上方为先取汁的基础路径；下方比较后续是否继续带皮。','“带皮”变体把压榨时间延后，不能理解为已分皮的汁液自动重新带皮。'],20,'#65705b',step=29)
desc='完整果串装罐并通入二氧化碳。第一阶段包括气体中的完整果串、缺氧液体中的完整果粒及底部被自重压破的葡萄；完整果粒进行细胞内转化。基础路径先分离自流酒液、再压榨，二者可汇合，由酵母完成第二阶段酒精发酵。原图提示在此工艺中压榨酒可优于自流酒。较早压榨、不带皮完成时通常简单易饮、低单宁、颜色浅；继续带皮发酵、延后压榨时通常果味更浓、单宁更多、颜色更深。'
(out/'s5-carbonic-process-redrawn.svg').write_text(svg(1200,960,'二氧化碳浸渍的两阶段流程',desc,body))
# Mobile keeps the exact three panels and text, rearranged vertically; the variants wrap explicitly.
mobile=text(24,32,'CARBONIC MACERATION',14,'#7a3f54',650)+text(24,72,'两阶段流程与带皮选择',28,weight=650)
for y,p in [(102,p1),(630,p2),(1158,p3)]:mobile+=f'<g transform="translate(24 {y}) scale(1.2 1)">{p}</g>'
mobile+=text(24,1705,'第二阶段：何时压榨？',26,weight=650)
mobile+=box(24,1730,432,160,'#f4eee0')+text(44,1766,'较早压榨 · 不带皮完成',23,weight=650)+text(44,1806,['先分离果皮，再由酵母完成发酵。','通常颜色较浅、单宁较少，','风格简单易饮。'],20,step=29)
mobile+=box(24,1910,432,160,'#eadde1')+text(44,1946,'延后压榨 · 继续带皮发酵',23,'#713c50',650)+text(44,1986,['保留皮汁接触，更多发酵后再压榨。','通常果味更浓、单宁更多，','颜色也更深。'],20,step=29)
mobile+=text(24,2106,['基础路径先取汁；带皮变体延后压榨，','不是已分皮的汁液自动重新带皮。'],19,'#65705b',step=29)
(out/'s5-carbonic-process-mobile.svg').write_text(svg(480,2160,'二氧化碳浸渍的两阶段流程',desc,mobile))

hier=text(30,38,'BEAUJOLAIS · APPELLATIONS',16,'#7a3f54',650)+text(30,82,'三个层次，看产区名称',34,weight=650)
rows=[(140,128,720,162,'#744355','Cru · 十个独立法定产区','酒标突出各自名称，如 Fleurie、Morgon。','重点比较：风磨坊、摩尔贡；芙蓉、布鲁依。','#fffaf1'),(90,310,820,142,'#dce2ce','Beaujolais-Villages · 村庄级','北部与西部丘陵中的 39 个获准村庄。','可混合不同村庄的葡萄，常用集合名称。','#34412e'),(30,472,940,142,'#ede5d2','Beaujolais · 大区级','覆盖范围较广，东部与南部平原是教材重点。','常见风格：果味鲜明、较轻盈，适合年轻饮用。','#34412e')]
for x,y,w,h,fill,title,l1,l2,color in rows:
 hier+=box(x,y,w,h,fill,fill,12)+text(x+25,y+40,title,27,color,650)+text(x+25,y+83,[l1,l2],22,color,step=33)
hier+=text(30,657,'Nouveau 来自 Beaujolais 或 Beaujolais-Villages，不是第四级。',22,'#713c50',600)
hier+=text(30,697,'这里的 Cru 是独立产区，不能等同于勃艮第的 Grand Cru 特级葡萄园。',20,'#65705b')
hd='自上而下为十个博若莱Cru独立法定产区、Beaujolais-Villages村庄级、Beaujolais大区级。Nouveau新酒来自后两类，不是第四级。博若莱Cru不等同勃艮第Grand Cru。'
(out/'s5-beaujolais-hierarchy-redrawn.svg').write_text(svg(1000,730,'Cru、Villages、Beaujolais',hd,hier))
hm=text(24,33,'BEAUJOLAIS',14,'#7a3f54',650)+text(24,72,'三个层次，看产区名称',28,weight=650)
for y,fill,title,lines,color in [
 (106,'#744355','Cru · 十个独立法定产区',['酒标突出各自名称，如 Fleurie、Morgon。','重点：风磨坊、摩尔贡；芙蓉、布鲁依。'],'#fffaf1'),
 (287,'#dce2ce','Beaujolais-Villages · 村庄级',['北部与西部丘陵的 39 个获准村庄。','可混合不同村的葡萄，常用集合名称。'],'#34412e'),
 (468,'#ede5d2','Beaujolais · 大区级',['范围较广，教材重点为东部、南部平原。','常果味鲜明、较轻盈，适合年轻饮用。'],'#34412e')]:
 hm+=box(24,y,432,159,fill,fill)+text(42,y+39,title,23,color,650)+text(42,y+81,lines,19,color,step=31)
hm+=text(24,671,['Nouveau 来自大区级或村庄级，','不是额外的第四级，也不能用于十个 Cru。'],20,'#713c50',600,step=30)
hm+=text(24,755,['这里的 Cru 是独立产区，不能等同于','勃艮第的 Grand Cru 特级葡萄园。'],19,'#65705b',step=29)
(out/'s5-beaujolais-hierarchy-mobile.svg').write_text(svg(480,820,'Cru、Villages、Beaujolais',hd,hm))
print('Built four responsive Beaujolais SVG diagrams with full source concepts.')
