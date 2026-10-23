const $=s=>document.querySelector(s);
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
let completed=read('wset3-completed',[]),answers=read('wset3-answers',{});
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}}
const notesKey=id=>'wset3-notes-'+id;
const svg=(body)=>`<svg viewBox="0 0 440 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="知识示意图" font-family="'PingFang SC',sans-serif" font-size="12" fill="#526044">${body}</svg>`;
const leaf=(x,y,r=0)=>`<path d="M ${x} ${y} q -35 -36 -47 -4 q 11 32 47 4 q 35 -36 47 -4 q -11 32 -47 4" fill="#839268" transform="rotate(${r} ${x} ${y})"/>`;
const grape=(x,y)=>`<g fill="#825165">${[[0,0],[13,0],[26,0],[6,12],[20,12],[13,24]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="8"/>`).join('')}</g>`;
const artInfo={
propagation:{alt:'两种繁殖方式的插画比较：左侧枝条扦插生根，右侧授粉受精后由种子长出幼苗',items:[['左侧 · 无性繁殖','枝条 → 扦插生根 → 新植株，保留原品种身份'],['右侧 · 有性繁殖','授粉与受精 → 种子 → 幼苗，产生新的遗传组合'],['继续区分 · 看种的关系','同种不同品种：crossing；不同种：hybrid']]},
cycle:{alt:'六幅葡萄藤年周期插画，依次为冬眠、萌芽、开花坐果、转色成熟、采收和落叶',items:[['① 冬眠 · Dormancy','上排左：落叶后留下木质部分与根系'],['② 萌芽 · Budburst','上排中：芽展开，长出当年新梢'],['③ 开花与坐果','上排右：花开后形成幼果'],['④ 转色与成熟','下排左：果实变软，颜色与成分继续变化'],['⑤ 采收 · Harvest','下排中：按成熟状况与目标风格采摘'],['⑥ 落叶 · Leaf fall','下排右：采后叶片继续工作，之后落叶、休眠']]},
roots:{alt:'嫁接葡萄藤插画：酒红色接穗、斜向嫁接点、赭黄色砧木和地下根系',items:[['接穗 · Scion','酒红色地上枝条，保留所需品种'],['嫁接点 · Graft union','主干的斜向连接处，位于地面上方'],['砧木 · Rootstock','赭黄色下部主干与根系']]},
needs:{alt:'葡萄藤生长需求图：阳光与二氧化碳进入叶片，水和养分由根系吸收，温度影响生长',items:[['阳光 · 左上太阳','提供光合作用所需的能量'],['CO₂ · 右上蓝色圆点','来自空气，参与光合作用'],['热量 · 右侧温度计','需要适合的温度，不是越高越好'],['水分 · 左下水滴','由根系从土壤吸收'],['养分 · 右下赭色圆点','由根系吸收，支持健康生长']]},
climate:{alt:'葡萄园环境插画：山坡上的不同海拔、坡向以及湖水和风的影响',items:[['海拔 · 山地','通常越高越凉，影响成熟条件'],['坡向 · 葡萄园坡面','改变阳光接收量，须结合半球判断'],['水体与风 · 湖畔','水体可缓和温度，风可能带来降温']]},
soil:{alt:'两种土壤剖面对比，左侧较粗颗粒利于排水，右侧较细颗粒保水较强',items:[['左侧 · 较粗颗粒','大孔隙较多，通常排水更快'],['右侧 · 较细颗粒','细孔隙较多，通常保水更强'],['判断 · 匹配环境','示意比较，不代表左好右坏；还要结合土层和结构']]}
};
const editorialArt=id=>`<div class="editorial-figure"><img src="assets/${id}-editorial.webp" alt="${artInfo[id].alt}" loading="lazy"><div class="art-key">${artInfo[id].items.map(([title,text])=>`<div><strong>${title}</strong><span>${text}</span></div>`).join('')}</div></div>`;
const diagrams={
roots:()=>editorialArt("roots"),
propagation:()=>editorialArt("propagation"),
cycle:()=>editorialArt("cycle"),
needs:()=>editorialArt("needs"),
climate:()=>editorialArt("climate"),
soil:()=>editorialArt("soil")
};
const flow=(...a)=>`<div class="flow">${a.map((s,i)=>`${i?'<b>→</b>':''}<span>${s}</span>`).join('')}</div>`;
const section=(t,p)=>`<section class="article-section"><h2>${t}</h2>${p}</section>`;
const callout=(label,p,green=false)=>`<aside class="callout ${green?'green':''}"><span class="label">${label}</span><p>${p}</p></aside>`;
const table=(heads,rows,tableClass='')=>`<div class="comparison-wrap"><table class="comparison${tableClass?' '+safe(tableClass):''}"><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const lessons=[
{id:'roots',n:'01',title:'砧木与嫁接',short:'砧木与嫁接',en:'ROOTSTOCKS & GRAFTING',tint:'#e6eadb',desc:'上面决定结什么葡萄，下面帮助它适应环境。',pages:'8—10',time:'00:00—15:35',duration:'6',deck:'接穗保留酿酒品种，砧木提供根系及环境适应性。',caption:'嫁接结构示意 · 接穗与砧木连接，但不是通过授粉产生新品种。',body:
section('为什么需要砧木？','<p>课堂从根瘤蚜说起：它会损害葡萄藤根部，严重时导致植株死亡。常见的解决方式，是把所需的欧亚葡萄品种 <i>Vitis vinifera</i> 嫁接到具有抗性的砧木上。</p>'+flow('根瘤蚜损害根系','吸水与生长受影响','采用抗性砧木'))+
section('上面与下面，各有职责','<p><strong>接穗 Scion</strong> 是所需酿酒品种的枝条，长出地上部分并结果。<strong>砧木 Rootstock</strong> 提供根系，选择时还要考虑当地的水分、盐碱等土壤条件，以及对葡萄藤长势的影响。不是每一种砧木都同时拥有全部优点。</p>'+table(['方式','什么时候用','理解重点'],[['室内嫁接 Bench grafting','苗圃中嫁接，再种入葡萄园','建立新葡萄园的常见方式'],['田间换接 Head grafting','在已建立的葡萄藤上更换接穗品种','利用既有根系，改种地上品种']]))+
callout('特别注意 · 嫁接 ≠ 杂交','嫁接是把两部分连接起来；杂交通过授粉与受精形成遗传组合。不能把嫁接后的葡萄藤称为「欧亚与美洲杂交出的新品种」。')+
section('把知识写成解释','<p>问「为什么使用砧木」，不要只答「因为更强」。应说清楚<strong>抵抗什么、解决什么问题、对植株有什么帮助</strong>。风味也不应解释成「美洲根系的味道传进了葡萄」。</p>'),question:'嫁接在美洲种类砧木上的霞多丽，会变成一个新的杂交品种吗？',answer:'不会。地上部分仍是霞多丽；嫁接连接接穗与砧木，没有通过授粉、受精创造新品种。'},
{id:'propagation',n:'02',title:'繁殖与葡萄品种',short:'繁殖与品种',en:'VARIETIES & PROPAGATION',tint:'#efe7dd',desc:'分清种、品种、品系，再理解繁殖与杂交。',pages:'7—13',time:'06:28—22:20',duration:'5',deck:'分清分类层级、繁殖方式及后代的品种身份。',caption:'繁殖路径示意 · 同一个品种可以包含不同品系。',body:
section('先分清分类层级',table(['概念','英文','例子'],[['种','Species','欧亚葡萄 Vitis vinifera'],['品种','Variety','Chardonnay 霞多丽、Pinot Noir 黑皮诺'],['品系','Clone','一个品种内，选出特定植株并无性繁殖的后代']])+'<p>品系之间可能表现出果粒大小、产量或成熟特性的差别；它们仍属于原来的品种。不要把「不同品系」写成「不同品种」。</p>')+
section('无性繁殖保留品种身份','<p>用枝条扦插等方式繁殖，能保留母株品种的遗传特性，所以栽培者能更有把握地延续想要的品种。嫁接常与这种繁殖方式结合使用。</p>'+callout('理解补充','「复制」便于理解，但不等于每株永远完全一样。长期繁殖中可能出现突变；这也是品种内部能选出不同品系的原因。',true))+
section('有性繁殖带来新的组合',table(['方式','亲本关系','结果'],[['种内杂交 Crossing','同一种内，不同品种','产生新的遗传组合'],['种间杂交 Hybrid','来自不同葡萄种','产生种间遗传组合']])+'<p>课堂用人类家庭作比喻，是为了帮助区分层级。复习时回到植物术语本身：<strong>种内与种间，看的是 species 层级，不是颜色、国家或产区。</strong></p>')+
callout('本课作业线索','讲义第 12—13 页要求复习已有的红白葡萄品种知识。先熟悉中英文名字，再逐步加入酸度、单宁与典型香气；实际表现仍受气候和酿造影响。'),question:'同一种葡萄内的两个品种授粉产生后代，叫 crossing 还是 hybrid？',answer:'在本课程的术语体系中叫 crossing（种内杂交）；hybrid 指不同种之间的杂交。'},
{id:'cycle',n:'03',title:'葡萄藤结构与年周期',short:'葡萄藤年周期',en:'THE ANNUAL VINE CYCLE',tint:'#eee9d4',desc:'从冬眠到采收，看懂不同阶段为什么怕不同的天气。',pages:'14—16',time:'22:20—33:14',duration:'5',deck:'南北半球季节相反；生长时点还受品种与年份影响。',caption:'年周期示意 · 先记顺序，再把天气风险放回对应阶段。',body:
section('六个阶段，一条主线',table(['阶段','发生什么','复习时关注'],[['冬眠 Dormancy','落叶后进入休眠，保留木质部分与根系','严重冬季冻害可能损伤永久结构'],['萌芽 Budburst','芽开始展开，长出当年的新梢','幼嫩组织容易受春季霜冻损伤'],['开花与坐果 Flowering / Fruit set','花开后，一部分形成幼果','开花期天气会影响坐果和潜在产量'],['转色 Véraison','成熟阶段开始，果实变软，颜色发生变化','白葡萄也有转色阶段'],['成熟 Ripening','糖分、酸及风味等继续变化','不同成熟指标未必同步'],['采收及采后','依据目标风格决定采收，采后叶片仍可继续工作','叶片落下前可帮助补充储备']]))+
callout('特别注意 · 新梢与一年生木','本年的绿色新梢会逐渐木质化。来年的新梢通常从一年生木上的芽长出；不能理解成「木质化以后再也没用」，也不能说「老木直接结葡萄」。')+
section('为什么要按阶段思考？','<p>同样一场霜冻，在休眠期与萌芽后造成的风险不同。题目中的时间线，是因果解释的一部分。<strong>先找受影响的组织，再说产量、成熟或品质可能怎样变化。</strong></p>'+flow('萌芽后遭霜冻','嫩芽与新梢受损','当年潜在产量下降'))+
callout('理解补充 · 采后并非立刻冬眠','采收结束、落叶、进入休眠不是同一个时刻。课堂转写把这些步骤连得很快，复习时应把它们拆开。',true),question:'白葡萄没有变成红色，是否说明它没有转色期？',answer:'不是。白葡萄同样经历 véraison：颜色可能由绿色趋向黄绿或金黄，果实也会变软，并进入成熟阶段。'},
{id:'needs',n:'04',title:'生长条件与风险',short:'生长条件与风险',en:'WHAT A VINE NEEDS',tint:'#e2e8d9',desc:'理解光合作用，并分清霜冻、冻害、干旱与晒伤。',pages:'15—18',time:'27:30—46:00',duration:'7',deck:'阳光、热量、水分、养分与二氧化碳需要平衡。',caption:'需求关系示意 · 阳光提供能量；水与二氧化碳参与形成糖。',body:
section('先理解糖从哪里来','<p>叶片利用光能，把水和二氧化碳转化为糖，同时释放氧气。糖既支持葡萄藤生长，也会在成熟过程中积累进果实。根系吸收水和矿物养分；<strong>土壤里的养分不是糖的直接来源。</strong></p>'+flow('叶片接收阳光','光合作用制造糖','支持生长与果实成熟'))+
callout('特别注意 · 高温不是无限加速','合适温度有利于生长，但极端炎热与缺水可能限制光合作用，造成晒伤、脱水或成熟失衡。不要背成「越热 → 光合作用越快 → 酒越好」。')+
section('霜冻与冬季冻害要分开',table(['风险','主要受影响的对象','应对思路'],[['春季霜冻 Frost','萌芽后的嫩芽、新梢等幼嫩组织','选址；适合条件下使用加热器、风机或喷灌'],['冬季冻害 Winter freeze','极端低温下的木质部分，可能伤及整株','在需要的地区埋土保护等']]))+
callout('理解补充 · 喷水防霜的原理','水持续结冰时会释放潜热，帮助保护组织；不是「冰块本身永远保持 0°C」。喷灌须有合适的条件、流量与持续供水。风机也依赖暖空气层等条件，并非对所有霜冻都有效。',true)+
section('水要够用，也要避免过量','<p>严重干旱会限制葡萄藤生长与成熟；水分过多则可能使长势过旺，湿润环境还会增加真菌病害风险。冰雹会直接损伤叶片和果实。</p><p>课堂强调灌溉的可控性。完整理解还要加上<strong>水源、成本、法规与当地需要</strong>；不能因此推断「没有降雨一定最好」或「只要灌溉就没有干旱风险」。</p>'),question:'为什么冬季冻害和春季霜冻不能用同一句「低温减产」概括？',answer:'受影响的生长阶段与组织不同。春霜主要威胁当年幼嫩组织；严重冬季冻害还可能损伤永久木质结构，带来重植成本与后续产量损失。'},
{id:'climate',n:'05',title:'气候、成熟与风格',short:'气候与天气',en:'CLIMATE, WEATHER & RIPENING',tint:'#e1e7e4',desc:'用两个维度理解气候，再解释葡萄的成熟与风格。',pages:'19—22',time:'46:00—1:03:12',duration:'7',deck:'热量水平与气候类型是两个分类维度。',caption:'风景示意 · 区域气候是起点，具体葡萄园还受海拔、风和水体调节。',body:
section('先把两种分类分开',table(['维度','分类','在问什么'],[['热量水平','凉爽 / 温和 / 温暖 / 炎热','葡萄在生长季获得多少热量？'],['气候类型','大陆性 / 海洋性 / 地中海','季节温差、降雨分布与水体影响如何？']])+'<p>因此一个地方可以同时是「凉爽的大陆性气候」。<strong>大陆度</strong>关注季节间的温差；<strong>昼夜温差</strong>关注一天内的温差。两者可能相关，但不是同一个指标。</p>')+
section('气候告诉你常态，天气决定这一年','<p>气候是长期典型状况；天气是特定时间发生的实际状况。开花期异常低温、临近采收的降雨等，都可能使某一年偏离常态，形成<strong>年份差异 Vintage variation</strong>。</p>'+table(['类型','记忆抓手','可能的风险'],[['大陆性','较大的季节温差','春霜、冬季冻害等，视地区而定'],['海洋性','水体缓和温度，常有较充分降雨','生长季降雨、病害或采收安排受影响'],['地中海','夏季通常干燥，降雨集中于冬季','水分不足、炎热及晒伤等']]))+
section('成熟不只是积累糖分','<p>课堂用糖与酸的变化解释品种为何要适应气候。糖、酸、香气、单宁与颜色的变化并不总是同步。采收时要结合品种、天气与目标风格，而不是只看甜不甜。</p>'+flow('环境与品种的组合','成熟速度与果实成分','潜在酒精、酸度与风味'))+
callout('特别注意 · 气候也会影响品质','课堂说「气候影响风格，不影响品质」，适合用来提醒我们：冷凉或温暖不能直接排品质高低。但不能照字面背诵；气候与天气会通过成熟程度、健康状况与平衡影响品质潜力。',false),question:'「大陆度大」是否就意味着这个产区一定炎热？',answer:'不是。大陆度反映季节温差，不是热量水平。凉爽与温暖地区都可能具有大陆性特征。'},
{id:'soil',n:'06',title:'地形与土壤',short:'地形与土壤',en:'SITE, SOIL & BALANCE',tint:'#eee4d5',desc:'把海拔、朝向、水体、排水与保水放到一起判断。',pages:'17、22—23',time:'1:03:12—1:08:38',duration:'6',deck:'结合当地的光、热、水与养分，判断地形和土壤的作用。',caption:'土壤剖面示意 · 排水与保水是并存的需求，比例要结合当地气候。',body:
section('地形改变葡萄园的实际条件',table(['因素','如何思考','注意条件'],[['海拔','通常越高，气温越低','不把录音中模糊的海拔数字当固定考点'],['朝向 Aspect','朝向赤道的坡面通常获得更多阳光','北半球向南，南半球向北；坡度和遮挡也重要'],['大面积水体','可缓和附近温度变化','具体影响受位置、风向、地形等制约'],['海风与遮挡','可能降温、挡风，也可能遮光','保护与遮阴之间要平衡'],['土壤热性质','有些土壤或石块可储热并在之后放热','不能把所有石头都理解成越多越好']]))+
section('排掉多余的水，留住需要的水','<p>在潮湿环境中，良好排水能帮助避免根区长期积水；在干燥环境中，保水能力又非常重要。同一种土壤特征，在不同气候下可能带来不同结果。</p>'+flow('先判断当地水分','再评估排水与保水','选择适合的土壤与管理'))+
section('养分不是越多越好','<p>养分不足会影响健康与叶片功能；过量也可能使枝叶生长过旺。叶片遮阴、果实成熟和管理成本需要一起考虑。看到黄化现象，应思考养分可利用性等条件，而不是把所有黄叶都归于同一个原因。</p>')+
callout('特别注意 · 土壤不等于酒里的味道','土壤通过水分、热量、养分及其对生长的影响参与形成风格。不要写成「石灰岩把石灰味传给葡萄酒」。课堂的「没有完美土壤」强调的是环境匹配。')+
callout('本课收束','用同一个问题检查自己的解释：这个因素改变了什么生长条件？怎样影响果实？又怎样影响风格、品质或成本？接下来学葡萄园管理时，继续沿着这条线。',true),question:'在干旱地区，为什么「排水越快的土壤越好」不成立？',answer:'因为还要保留足够水分供根系吸收。若排水很快、储水不足，又缺乏补水，水分胁迫可能限制生长与成熟。应结合降雨、灌溉和根区条件判断。'}
];
enrichCourse(lessons,section,table,callout,flow);
initSession2();
enrichTextbook();
integrateSession1();
integrateSession2();
prepareCourseBodies();
initBook();
const questions=[
{lesson:'roots',q:'接穗与砧木嫁接后，葡萄品种会怎样？',options:['形成欧亚与美洲杂交的新品种','接穗仍保持原来的品种身份','结出的葡萄变成砧木所属品种'],correct:1,why:'嫁接连接两个植物部分，不经过授粉和受精。接穗继续保留其品种身份。'},
{lesson:'propagation',q:'同一种内，两个不同品种通过授粉形成后代，属于什么？',options:['种内杂交 Crossing','种间杂交 Hybrid','田间换接 Head grafting'],correct:0,why:'种内与种间看的是 species 层级；嫁接则属于另一类操作。'},
{lesson:'cycle',q:'判断一次春季霜冻对当年产量的影响，首先要看什么？',options:['葡萄酒打算使用什么瓶塞','芽是否已经萌发、组织处于什么阶段','土壤的颜色是不是白色'],correct:1,why:'萌芽后的幼嫩组织容易受损。把事件放回生长阶段，才能解释潜在产量损失。'},
{lesson:'needs',q:'哪种解释喷水防霜的方式更准确？',options:['冰块无论环境多冷都会保持 0°C','水持续结冰时释放热量，需合适供水和条件','任何霜冻下喷一点水都足够'],correct:1,why:'结冰释放潜热是关键。防霜喷灌需要合适的启动时机、供水和流量，不能只理解成给芽包冰。'},
{lesson:'climate',q:'一个产区能否既凉爽，又是大陆性气候？',options:['不能，大陆性就代表炎热','可以，热量水平和气候类型是不同维度','不能，凉爽只能是海洋性'],correct:1,why:'凉爽描述热量水平；大陆性关注季节温差等气候特征。'},
{lesson:'climate',q:'如何理解「气候与品质」的关系？',options:['气候完全不影响品质','温暖地区的品质一定更高','不同气候都可产优质酒，但成熟、健康与平衡会受影响'],correct:2,why:'不能单凭气候温暖或凉爽排品质高低；也不能忽略环境对品质潜力的影响。'},
{lesson:'needs',q:'极端高温叠加缺水，最应避免哪种推断？',options:['可能限制光合作用','温度越高，光合作用必然越快','可能增加果实脱水或晒伤风险'],correct:1,why:'光合作用不是随温度无限增加。极端条件可能使生长、成熟与果实健康受到限制。'},
{lesson:'soil',q:'评估干旱地区的土壤，哪种判断更完整？',options:['只要石头越多越好','只追求最快排水','同时考虑保水、排水、补水与当地需求'],correct:2,why:'土壤的作用依赖环境。排水和保水要结合当地降雨与灌溉等条件。'}
];
const count=()=>completed.filter(id=>lessons.some(l=>l.id===id)).length;
const progress=()=>`<div class="progress-track"><div class="progress-fill" style="width:${count()/6*100}%"></div></div>`;
function home(){return bookHome()}
function lessonView(id){const l=lessons.find(x=>x.id===id);if(!l)return `<main class="wrap" id="main"><h1>暂未找到这个章节</h1><a href="#home">返回学习期刊 →</a></main>`;const i=lessons.indexOf(l),next=lessons[i+1];return `<main id="main" class="lesson-shell"><aside class="lesson-rail"><a href="#session1" class="back">← 第一课目录</a><div class="eyebrow">SESSION 1 · CONTENTS</div><p class="rail-title">葡萄藤与生长环境</p><nav class="rail-list" aria-label="本期章节">${lessons.map(x=>`<a href="#lesson/${x.id}" class="${l.id===x.id?'active':''}" ${l.id===x.id?'aria-current="page"':''}><span>${x.n}</span>${x.short}<i>${completed.includes(x.id)?'✓':''}</i></a>`).join('')}</nav><a class="rail-guide" href="#workbook/1">Session 1 练习册 ↗</a><a class="rail-guide" href="#quiz">第一课自测 ↗</a><a class="rail-guide" href="#home">全部课程记录 ↗</a><div class="rail-progress">本期已完成 ${count()} / 6${progress()}</div></aside><article class="lesson-content"><div class="eyebrow">SESSION 01 · UNIT ${l.n} / ${l.en}</div><h1>${l.title}</h1><p class="lesson-deck">${l.deck}</p><div class="reading-meta"><span>第一课 · 第 ${l.n} 单元</span><span>约 ${l.duration} 分钟阅读</span></div>${l.body.includes('data-figure="'+l.id+'"')?'':`<figure style="margin:0"><div class="lesson-visual" style="--tint:${l.tint}">${diagrams[l.id]()}</div><figcaption class="fig-caption">${l.caption}</figcaption></figure>`}${l.body}<details class="recall"><summary>停下来想一想 · ${l.question}</summary><p>${l.answer}</p></details><div class="notes"><label for="note-${l.id}">笔记 <small id="note-status">仅保存在当前浏览器</small></label><textarea id="note-${l.id}" data-note="${l.id}" placeholder="记录理解或疑问…">${safe(read(notesKey(l.id),''))}</textarea></div><div class="lesson-end"><button class="complete-btn ${completed.includes(l.id)?'done':''}" data-complete="${l.id}">${completed.includes(l.id)?'✓ 已完成阅读':'○ 标记本章已读'}</button><a class="next-link" href="${next?'#lesson/'+next.id:'#quiz'}">${next?'下一章 · '+next.short:'完成阅读，试试自测'} →</a></div></article></main>`}
function mapView(){return knowledgeMapView()}
function feedback(i){const a=answers[i],q=questions[i];if(a===undefined)return '';const ok=a===q.correct;return `<div class="quiz-feedback ${ok?'':'wrong-feedback'}" role="status"><strong>${ok?'✓ 理解正确':'再看一步 · 正确答案是 '+String.fromCharCode(65+q.correct)}</strong><br>${q.why}<a href="${q.lesson==='cycle'?'#read/6/cycle':bookLegacy['1/'+q.lesson]}">回到「${lessons.find(l=>l.id===q.lesson).short}」 →</a></div>`}
function quizView(){const n=Object.keys(answers).filter(k=>questions[k]).length,score=questions.filter((q,i)=>answers[i]===q.correct).length;return `<main id="main" class="wrap"><div class="page-intro"><a class="back" href="#practice">← 全部课程练习</a><div class="eyebrow">PAUSE & RECALL · SESSION 1</div><h1 class="page-title">第一课 · 选择自测</h1><p>8 道自编选择题，附解释练习。</p>${practiceModeNav(1,'quiz')}</div><div class="quiz-layout"><div>${questions.map((q,i)=>`<section class="quiz-card" id="question-${i}"><div class="eyebrow">QUESTION ${String(i+1).padStart(2,'0')} / 08</div><h2>${q.q}</h2>${q.options.map((o,j)=>`<button class="option ${answers[i]!==undefined?(j===q.correct?'correct':answers[i]===j?'wrong':''):''}" data-question="${i}" data-answer="${j}" ${answers[i]!==undefined?'disabled':''}>${String.fromCharCode(65+j)} · ${o}</button>`).join('')}${feedback(i)}</section>`).join('')}<section class="quiz-card"><div class="eyebrow">WRITE TO UNDERSTAND</div><h2>解释：为什么潮湿地区与干旱地区，对土壤水分管理的需求可能不同？</h2><p class="fine">写 3—5 句，对照提示自查，不自动评分。</p><p class="fine" id="note-status" role="status">答案自动保存到当前浏览器。</p><textarea class="short-answer" data-note="practice" aria-label="解释练习答案" placeholder="按「条件 → 影响 → 选择」作答。">${safe(read(notesKey('practice'),''))}</textarea><details class="recall"><summary>检查思路</summary><div class="checklist"><label><input type="checkbox">潮湿地区需要避免根区长期积水，并重视排水。</label><label><input type="checkbox">干旱地区需要保存足够的土壤水分供根系吸收。</label><label><input type="checkbox">严重缺水会限制生长、光合作用及成熟。</label><label><input type="checkbox">判断还结合降雨、土壤与灌溉，而不是宣布某种土壤永远最好。</label></div></details></section></div><aside class="quiz-summary"><div class="eyebrow">YOUR RECALL</div><div class="score"><span id="quiz-score">${score}</span><small style="font-size:20px"> / 8</small></div><h3>答题进度</h3><p id="quiz-progress">已回答 ${n} / 8 题${n===8?' · 本轮完成':''}</p><p>错题可返回对应单元复习。</p><button id="reset-quiz">重新开始本轮 ↻</button></aside></div></main>`}
function render(){
 cleanupUnitOutline();
 const raw=location.hash.slice(1)||'home',hash=bookCanonicalRoute(raw),parts=hash.split('/'),route=parts[0];
 if(hash!==raw&&typeof history!=='undefined')history.replaceState(null,'','#'+hash);
 const view=route==='chapter'?bookChapterView(parts[1]):route==='read'?bookReadView(parts[1],parts[2]):route==='practice'?practiceHub():route==='workbook'?workbookView(parts[1]):route==='session2quiz'?s2Quiz():route==='session2sources'?s2Sources():route==='map'?mapView():route==='quiz'?quizView():route==='guide'?guideView():bookHome();
 $('#app').innerHTML=view;
 document.querySelectorAll('[data-nav]').forEach(a=>{const yes=a.dataset.nav===(['practice','quiz','session2quiz','workbook'].includes(route)?'practice':route==='map'?'map':'home');a.classList.toggle('active',yes);if(yes)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 const unit=route==='read'?bookUnits.find(u=>u.chapter===Number(parts[1])&&u.id===parts[2]):null,ch=bookChapters.find(c=>c.id===Number(parts[1]));
 const name=unit?unit.title:route==='chapter'&&ch?'第 '+ch.id+' 章 · '+ch.title:route==='map'?'知识地图':route==='practice'?'练习与复习':route==='workbook'?'第'+(parts[1]==='2'?'二':'一')+'课练习册':route==='quiz'?'第一课 · 选择自测':route==='session2quiz'?'第二课 · 选择自测':['guide','session2sources'].includes(route)?'资料索引':'章节目录';
 document.title=name+' · WSET Ⅲ 通关指南';window.scrollTo(0,0);bindPage();const main=$('#main');main?.setAttribute('tabindex','-1');main?.focus({preventScroll:true});
 if(pendingSearchAnchor){let anchor=pendingSearchAnchor;pendingSearchAnchor='';const old=anchor.match(/^topic-(1|2)-([a-z]+)-(\d+)$/);if(old){const record=bookSectionOrigins[old[1]+'/'+old[2]+'/'+old[3]];anchor=record?.heading||'';}if(anchor)focusReadingTarget(anchor);}else if(route==='read'&&parts[3])focusReadingTarget(parts[3]);
}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2300)}
function bindPage(){bindUnitOutline();bindBook();bindSession2();bindWorkbook();bindKnowledgeMap();document.querySelectorAll("[data-course-task]").forEach(el=>el.addEventListener("change",()=>{if(!save("wset3-task-"+el.dataset.courseTask,el.checked)){el.checked=!el.checked;toast("任务状态保存失败，请重试。");}}));document.querySelectorAll('[data-note]:not([data-variety-note])').forEach(el=>el.addEventListener('input',()=>{const ok=save(notesKey(el.dataset.note),el.value);const s=$('#note-status');if(s)s.textContent=ok?'已保存到当前浏览器':'当前浏览器无法保存，请复制备份'}));document.querySelectorAll('[data-complete]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.complete;const next=completed.includes(id)?completed.filter(x=>x!==id):[...completed,id];if(!save('wset3-completed',next)){toast('阅读进度保存失败，请重试。');return;}completed=next;const ok=true;const y=window.scrollY;render();window.scrollTo(0,y);toast(ok?(completed.includes(id)?'本章已完成，进度已保存。':'已取消本章完成标记。'):'当前浏览器无法保存进度。')}));document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.question),a=Number(b.dataset.answer);const next={...answers,[i]:a};if(!save('wset3-answers',next)){toast('答案保存失败，请重试。');return;}answers=next;const q=questions[i],card=$('#question-'+i);card.querySelectorAll('.option').forEach((o,j)=>{o.disabled=true;o.classList.toggle('correct',j===q.correct);o.classList.toggle('wrong',j===a&&a!==q.correct)});card.insertAdjacentHTML('beforeend',feedback(i));$('#quiz-score').textContent=questions.filter((q,j)=>answers[j]===q.correct).length;const n=Object.keys(answers).filter(k=>questions[k]).length;$('#quiz-progress').textContent=`已回答 ${n} / 8 题${n===8?' · 本轮完成':''}`}));$('#reset-quiz')?.addEventListener('click',()=>{if(!save('wset3-answers',{})){toast('重置保存失败，原有答案已保留，请重试。');return;}answers={};render();toast('已开始新一轮练习。')})}
const searchTerms=[['根瘤蚜 Phylloxera','roots','根系受损与抗性砧木'],['接穗 Scion / 砧木 Rootstock','roots','地上品种与根系的分工'],['嫁接 Grafting / 室内 / 田间换接','roots','连接植株部分，不等于杂交'],['无性繁殖 / 扦插 / 品系 Clone','propagation','保留品种身份'],['种内杂交 Crossing / 种间杂交 Hybrid','propagation','分清种、品种和后代'],['冬眠 / 萌芽 / 开花 / 坐果 / 转色 Véraison','cycle','葡萄藤的年周期'],['光合作用 / 高温 / 干旱 / 糖','needs','需求与极端条件的限制'],['霜冻 Frost / 冬季冻害 Freeze / 防霜喷灌','needs','区分组织与风险'],['气候 / 天气 / 年份差异','climate','长期常态与当年实际状况'],['大陆性 / 海洋性 / 地中海 / 大陆度 / 昼夜温差','climate','分清两种分类维度'],['海拔 / 朝向 Aspect / 水体 / 海风','soil','葡萄园的具体条件'],['土壤 / 排水 / 保水 / 养分 / 黄化 / 腐殖质 / 围墙 / 博斯腾湖 / 风土 / 贵腐','soil','匹配当地需求与课堂视频'],['红葡萄 / 白葡萄 / Merlot / Syrah / Vidal / Gingin / 品种名单','propagation','品种原文、杂交例子与特征对照'],['纬度 / 反射 / 滴灌 / 漫灌 / 火灾 / 烟熏','needs','补全阳光、水分和灾害'],['温度 / 16.5 / 季风 / 新疆 / 山东','climate','气候数字与课堂比较']];
searchTerms.push(['Session 2 / 葡萄园管理 / 整枝 / 密度 / Training / Cordon / Head','s2:training','第二课 · 空间、骨架与高度'],['修剪 / Spur / Cane / Guyot / 冬剪 / 夏剪 / 芽','s2:pruning','第二课 · 木龄和两种冬剪'],['VSP / 冠层 / 搭架 / 叶幕 / Trellising','s2:canopy','第二课 · 光照、通风与成本'],['产量 / 质量 / 平衡 / 摘青 / Green harvesting','s2:balance','第二课 · 资源与负载'],['有机 / 生物动力 / 可持续 / 线虫 / 卷叶 / 皮尔斯 / 病虫害','s2:health','第二课 · 风险与栽培方式'],['采收 / 贵腐 / Hunter Valley / 人工 / 机械 / TBA / Botrytis','s2:harvest','第二课 · 采收决策']);
// Index the integrated reading bodies, so later course edits become searchable too.
const searchPlain=html=>String(html).replace(/<[^>]*>/g,' ').replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39);/g,m=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&nbsp;':' ','&#39;':"'"}[m])).replace(/&#(x[0-9a-f]+|[0-9]+);/gi,(_,n)=>String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):Number(n))).replace(/\s+/g,' ').trim();
const searchNormalize=s=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
let searchIndex;
let pendingSearchAnchor='';
function buildSearchIndex(){
 const entries=[];
 for(const unit of bookUnits){
  const base={chapter:unit.chapter,route:bookHref(unit),unit:unit.title};
  entries.push({...base,title:unit.title,anchor:'',text:unit.desc,terms:searchNormalize(unit.title+' '+unit.desc)});
  for(const m of bookContent(unit).matchAll(/<section class="article-section">([\s\S]*?)<\/section>/g)){
   const heading=m[1].match(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/);if(!heading)continue;
   const title=searchPlain(heading[2]),text=searchPlain(m[1].slice(heading.index+heading[0].length));
   entries.push({...base,title,anchor:heading[1],text,terms:searchNormalize(title+' '+text)});
  }
 }
 return entries;
}
function findKnowledge(query){
 if(!searchIndex)searchIndex=buildSearchIndex();
 const q=searchNormalize(query),words=q.split(' ').filter(Boolean);
 if(!q)return searchIndex.filter(e=>!e.anchor);
 return searchIndex.filter(e=>words.every(w=>e.terms.includes(w))).sort((a,b)=>Number(b.anchor!=='')-Number(a.anchor!=='')+2*(Number(searchNormalize(b.title).includes(q))-Number(searchNormalize(a.title).includes(q))));
}
function searchSnippet(text,query){
 const words=query.trim().split(/\s+/).filter(Boolean),lower=text.toLowerCase();
 const hits=words.map(w=>lower.indexOf(w.toLowerCase())).filter(n=>n>=0),start=Math.max(0,(hits.length?Math.min(...hits):0)-28);
 return (start?'…':'')+text.slice(start,start+130)+(text.length>start+130?'…':'');
}
function focusReadingTarget(id){
 const target=document.getElementById(id);if(!target)return;
 target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior:'smooth',block:'start'});
}
function search(){
 const query=$('#search-input').value.trim(),results=findKnowledge(query);
 $('#search-results').innerHTML=(query?`<p class="search-count" role="status">找到 ${results.length} 处${results.length>24?' · 显示前 24 处':''}</p>`:'<p class="search-count">搜索章节标题、正文与中英文术语。</p>')+(results.length?results.slice(0,24).map(e=>`<a class="search-result" href="${e.route}" data-search-anchor="${safe(e.anchor)}"><strong>${safe(e.title)}</strong><small>第 ${e.chapter} 章 · ${safe(e.unit)}</small><span class="search-snippet">${safe(searchSnippet(e.text,query))}</span></a>`).join(''):'<p class="search-empty">课程正文中未找到。试试较短的词，或中英文名称。</p>');
 $('#search-results').querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();$('#search-dialog').close();pendingSearchAnchor=a.dataset.searchAnchor;
  if(location.hash===a.getAttribute('href'))render();else location.hash=a.getAttribute('href');
 }));
}
$('#search-open').addEventListener('click',()=>{$('#search-dialog').showModal();search();$('#search-input').focus()});$('#search-input').addEventListener('input',search);$('#sources-open').addEventListener('click',()=>$('#sources-dialog').showModal());$('#coverage-link')?.addEventListener('click',()=>$('#sources-dialog').close());$('#session2-coverage-link')?.addEventListener('click',()=>$('#sources-dialog').close());document.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!document.querySelector('dialog[open]')){e.preventDefault();$('#search-open').click()}});$('.skip')?.addEventListener('click',e=>{e.preventDefault();focusReadingTarget('main')});window.addEventListener('hashchange',render);render();

document.addEventListener('click',e=>{const a=e.target.closest?.('[data-book-jump]');if(a){e.preventDefault();focusReadingTarget(a.dataset.bookJump);}});
