/* Stable topic IDs connect future courses to the same concepts. Checks are self-assessment prompts, not official exam scores. */
const knowledgeTopics = [
  {
    id: 's1:needs', session: 1, unit: 'needs', title: '生长条件', stage: 'conditions',
    summary: '光、热、水与养分共同支持叶片工作；过量与不足都可能妨碍成熟。',
    image: 'assets/needs-editorial.webp', requires: [], quiz: [{session: 1, index: 3}, {session: 1, index: 6}],
    checks: [
      {id: 'explain', label: '解释糖从哪里来', question: '把阳光、水、二氧化碳、叶片和糖连成一句解释；热量与养分各起什么作用？', hint: '光提供能量，叶片利用水和二氧化碳制造糖；适当温度支持生长，养分维持植株功能。糖不是从土里吸上来的。'},
      {id: 'compare', label: '分清两种低温风险', question: '冬季冻害与萌芽后春霜，受损组织和当年收成的风险有什么不同？', hint: '先说明生长阶段：冬季极冷可伤芽、永久木甚至整株；萌芽后幼嫩组织受霜冻伤害会减少潜在产量。'},
      {id: 'apply', label: '判断炎热缺水的后果', question: '强光、高温又缺水时，为什么不能推断糖积累一定更快？请连接叶片功能与果实风险。', hint: '严重缺水、高温可能限制光合作用，伴随果实脱水、晒伤与过热；需要的是适度平衡，并非把每个条件加到最大。'}
    ]
  },
  {
    id: 's1:climate', session: 1, unit: 'climate', title: '气候与成熟', stage: 'conditions',
    summary: '气候决定常见成熟条件，天气改变当年结果；品种须与热量相匹配。',
    image: 'assets/climate-editorial.webp', requires: ['s1:needs'], quiz: [{session: 1, index: 4}, {session: 1, index: 5}],
    checks: [
      {id: 'explain', label: '连接温度与风格', question: '怎样从生长季温度，解释糖、酸与风味成熟的变化，再连接到潜在酒精度？', hint: '较高温度通常加快成熟、促进糖积累与酸下降，但糖、风味和酚类成熟未必同步；还须看品种、极端天气和目标风格。'},
      {id: 'compare', label: '分开气候的两个维度', question: '为什么一个地区可以既凉爽又具有大陆性气候？再用一句话区分气候与天气。', hint: '凉爽描述热量水平，大陆性描述季节温差等特征；气候是长期模式，天气是具体时段的状况。'},
      {id: 'apply', label: '解释一次异常雨年', question: '某温暖产区今年成熟期持续阴雨，为什么不能照搬往年的成熟和品质判断？', hint: '把少光、果粒吸水和潮湿风险分别连接到糖积累、稀释与腐烂，再看实际成熟度；温暖的气候标签不能替代当年观察。'}
    ]
  },
  {
    id: 's1:soil', session: 1, unit: 'soil', title: '园地与土壤', stage: 'conditions',
    summary: '地形改变光、热与积冷；土壤通过供水、排水和养分影响长势。',
    image: 'assets/soil-editorial.webp', requires: ['s1:needs', 's1:climate'], quiz: {session: 1, index: 7},
    checks: [
      {id: 'explain', label: '把土壤接到成熟上', question: '不用“石头味进入酒中”的说法，解释土壤怎样通过水、热或养分影响果实成熟。', hint: '例如保水影响根区供水与叶片功能；石块蓄热影响局地温度；肥力影响长势、遮阴与成熟。选择一条路径讲完整。'},
      {id: 'compare', label: '比较保水与排水', question: '砂石较多与黏土较多的土壤，各有什么水分取舍？为什么不能单凭土壤名称排序好坏？', hint: '砂石通常排水较快、保水较弱；黏土可提高保水，过多且结构不佳时可能排水不良。还要看雨量、蒸发、土层和可靠补水。'},
      {id: 'apply', label: '判断干旱园地的选择', question: '炎热少雨、灌溉有限的地点，要优先检查土壤的哪些条件？若同园还有洼地，春霜风险怎样变化？', hint: '检查土层、可利用储水和排水，避免只追求最快排水；冷空气易在低洼处积聚，萌芽后更需留意霜冻。'}
    ]
  },
  {
    id: 's1:propagation', session: 1, unit: 'propagation', title: '品种与繁殖', stage: 'vine',
    summary: '无性繁殖延续品种性状；授粉受精重新组合基因，形成新的后代。',
    image: 'assets/propagation-editorial.webp', requires: [], quiz: {session: 1, index: 1},
    checks: [
      {id: 'explain', label: '解释保留品种的方法', question: '想扩种同一酿酒品种，为什么通常使用扦插等无性繁殖，而不是播种？克隆选择又保留什么？', hint: '无性繁殖延续母株品种性状，种子后代有新的遗传组合；克隆选择保留同一品种中有价值的变异。'},
      {id: 'compare', label: '比较杂交与嫁接', question: '种内杂交、种间杂交和嫁接，分别按什么来区分？赤霞珠与抗性砧木各可放在哪条路径？', hint: '杂交看亲本是否同属一个 species；嫁接连接植物部分，不经过授粉受精。赤霞珠是品丽珠与长相思的种内杂交后代，抗性砧木育种可涉及不同葡萄种。'},
      {id: 'apply', label: '识别压条的限制', question: '在根瘤蚜风险园地，把欧亚葡萄枝条压入土中使其生根，能代替抗性砧木嫁接吗？请讲清根系来自哪里。', hint: '压条延续母株性状，新根仍来自原植株；它不会自动获得另一个抗性砧木的根系与抗性。'}
    ]
  },
  {
    id: 's1:cycle', session: 1, unit: 'cycle', title: '结构与年周期', stage: 'vine',
    summary: '一年生木上的芽长出当年结果新梢；天气的后果取决于生长阶段。',
    image: 'assets/cycle-editorial.webp', requires: ['s1:needs'], quiz: {session: 1, index: 2},
    checks: [
      {id: 'explain', label: '说清结果的位置', question: '把多年生木、一年生木、芽、当年新梢和果串按结构关系连起来，果实到底长在哪里？', hint: '永久骨架上保留一年生枝段；芽萌发为当年绿色新梢，结果新梢带花序与果串。果实不是直接长在老主干上。'},
      {id: 'compare', label: '分开转色与采收', question: '转色、成熟、采收分别是什么？白葡萄不变红，是否也经历转色？', hint: '转色标志成熟开始，果实软化并改变颜色或透明感；成熟继续发展糖酸与风味，采收是按目标风格和实际条件作出的决定。白葡萄也有转色。'},
      {id: 'apply', label: '把天气放回阶段', question: '同样是寒冷阴雨，发生在开花坐果期与成熟期，可能通过哪些不同路径影响收成？', hint: '开花坐果期可妨碍受精、增加落花和小粒果，减少产量；成熟期少光限制糖积累，雨水还可带来稀释及腐烂风险。'}
    ]
  },
  {
    id: 's1:roots', session: 1, unit: 'roots', title: '砧木与嫁接', stage: 'vine',
    summary: '砧木保护根区、适应土壤；接穗保留所需酿酒品种的地上部分。',
    image: 'assets/roots-editorial.webp', requires: ['s1:propagation', 's1:soil'], quiz: {session: 1, index: 0},
    checks: [
      {id: 'explain', label: '解释根系与抗性', question: '根系的三项功能是什么？根瘤蚜伤害根系后，为什么会影响整株葡萄藤？', hint: '根系吸收水和养分、固定植株、储存碳水化合物。取食及继发感染损伤根系，使供水和生长受影响，抗性砧木减少这种伤害。'},
      {id: 'compare', label: '比较两种嫁接场景', question: '建立新园的室内嫁接与保留成熟主干的田间换接，在目的、结果等待时间与比较成本的基准上有何区别？', hint: '室内嫁接培育新苗，新栽园通常第三年起有商业收成；换接保留既有根系和主干，成功后可次年结果，相对整园重植通常更快、更省，但仍需田间人工。'},
      {id: 'apply', label: '选择砧木并保留品种', question: '想在有根瘤蚜风险、供水有限的园地种霞多丽，选砧木要同时考虑什么？嫁接后结出的是什么品种？', hint: '兼顾根瘤蚜抗性、土壤及水分适配和长势，不存在集齐所有优点的砧木。接穗为霞多丽，结果品种仍是霞多丽。'}
    ]
  },
  {
    id: 's2:training', session: 2, unit: 'training', title: '密度与整枝', stage: 'management',
    summary: '资源决定竞争与空间需求，永久骨架再影响冠层安排和作业。',
    image: 'assets/textbook-management.webp', requires: ['s1:roots', 's1:cycle', 's1:soil'],
    checks: [
      {id: 'explain', label: '解释密度的条件', question: '水分很有限时为什么常考虑较低密度？水足而肥力低时，较高密度为何又可能有用？', hint: '低密度减少争水；水足时仍可能长势旺盛，竞争配合适量留芽可限制单株长势。密度须与资源、骨架和负载一起判断。'},
      {id: 'compare', label: '看木龄识别骨架', question: '头状与主蔓整枝怎样区分？一条水平绑缚的长枝为什么未必是永久主蔓？', hint: '看是否有长久保留的水平多年生木臂。头状也可把一年生结果长枝水平绑缚并每年替换；方向不能确定木龄。'},
      {id: 'apply', label: '评估大树型与通行', question: '肥沃多雨、长势极旺，又计划机械作业的园地，只提高密度够吗？还需检查什么？', hint: '可考虑更大的单株空间、骨架与冠层来分配长势，检查行距、地形、树形及设备通行；不能只靠一个密度数字作决定。'}
    ]
  },
  {
    id: 's2:pruning', session: 2, unit: 'pruning', title: '修剪与留芽', stage: 'management',
    summary: '冬剪安排下一季潜在新梢与负载，夏剪调节当年的绿色冠层。',
    image: 'assets/textbook-management.webp', requires: ['s1:cycle', 's2:training'], quiz: [{session: 2, index: 0}, {session: 2, index: 1}],
    checks: [
      {id: 'explain', label: '连接留芽与产量', question: '冬剪留下的芽怎样变成下一季的潜在产量？为什么芽数不能直接等同最终收成？', hint: '芽萌发成可能结果的新梢；芽的结果力、萌芽率、坐果、霜冻及病虫害仍会改变实际果串与产量。'},
      {id: 'compare', label: '比较短枝与替换长枝', question: '短枝与替换长枝通常各留多少芽？它们更新什么，又保留什么？', hint: '短枝通常2–3芽，长枝约8–20芽；两者都安排一年生木的芽，永久主干或主蔓可继续保留。少数长枝与多个短枝可能有相近总芽数。'},
      {id: 'apply', label: '匹配芽的结果力', question: '某品种基部芽结果力低，为什么替换长枝可能更适合？这是否意味着基部芽不能萌发？', hint: '长枝能保留更远端的芽，提高可利用结果芽的机会；结果力低与不能萌发不同。还须看总负载、长势和人工投入。'}
    ]
  },
  {
    id: 's2:canopy', session: 2, unit: 'canopy', title: '搭架与冠层', stage: 'management',
    summary: '冠层在受光、通风、遮阴与有效叶面积之间取得平衡。',
    image: 'assets/session2-management.webp', requires: ['s1:needs', 's1:climate', 's2:training', 's2:pruning'], quiz: [{session: 2, index: 2}, {session: 2, index: 3}],
    checks: [
      {id: 'explain', label: '解释开放冠层的作用', question: '整理新梢、适量摘叶，怎样同时影响叶片受光、果区湿气与喷洒覆盖？', hint: '减少互相遮阴，让空气流通、湿气更快散去，喷洒更容易到达目标；仍需足够健康叶片制造糖。'},
      {id: 'compare', label: '比较开放与遮阴', question: '凉爽潮湿地点的VSP，与炎热强光地点允许顶梢下垂的调整型VSP，分别在平衡什么？', hint: '前者侧重有效受光和通风干燥；后者保留果区遮阴以减轻过热与晒伤。两者均不能无限减少叶面积。'},
      {id: 'apply', label: '根据条件摘叶', question: '看到果区很阴就把叶片全摘掉，为什么不稳妥？请给出需要先确认的条件与一个过度操作后果。', hint: '先看气候、方位、时机与果实暴露程度。摘叶过多可能损失光合作用叶面积，或导致果实晒伤、过热。'}
    ]
  },
  {
    id: 's2:balance', session: 2, unit: 'balance', title: '产量与平衡', stage: 'management',
    summary: '果实负载要匹配资源与叶幕能力，低产本身不能证明品质更高。',
    image: 'assets/textbook-cases.webp', requires: ['s1:soil', 's2:pruning', 's2:canopy'], quiz: {session: 2, index: 4},
    checks: [
      {id: 'explain', label: '解释负载与成熟', question: '光、热或水受限时，过多果串为什么可能成熟不足？资源充足时，为什么较高产也可能成熟良好？', hint: '比较果实需求与健康叶片制造、分配糖的能力；关键是匹配，不能仅由每公顷产量决定品质。'},
      {id: 'compare', label: '分清三种数量', question: '每公顷株数、每株留芽数、每公顷产量分别衡量什么？冬剪与摘青调整负载的时机有何不同？', hint: '密度是株／公顷，留芽是潜在新梢及结果点，产量是吨或百升／公顷；冬剪先设潜力，摘青在生长季减少实际果串。'},
      {id: 'apply', label: '决定是否摘青', question: '预计产量偏高时，为什么不能直接宣布“摘得越早、越多越好”？还要比较哪些收益和代价？', hint: '过早可能被剩余果粒增大抵消，过晚改善有限；需看剩余成熟时间、资源、目标风格、人工与减少可售产量的成本。'}
    ]
  },
  {
    id: 's2:health', session: 2, unit: 'health', title: '健康与防护', stage: 'management',
    summary: '先识别受害组织和传播路径，再匹配防护工具、监测与管理。',
    image: 'assets/textbook-environment.webp', requires: ['s1:roots', 's1:cycle', 's2:canopy'], quiz: {session: 2, index: 5},
    checks: [
      {id: 'explain', label: '由受害部位解释损失', question: '根系、叶片、果实分别受害，怎样通过不同路径影响成熟、产量或品质？', hint: '根伤妨碍供水和养分，叶伤减少光合作用，果伤直接损失果实并增加腐烂入口。不能用同一种冠层措施处理所有对象。'},
      {id: 'compare', label: '辨别病害与工具', question: '霜霉、白粉与灰腐的主要表现或受害部位怎样区分？为什么普通杀菌喷雾不能直接治愈病毒？', hint: '霜霉可见叶斑及叶背绒状物，白粉为灰白粉层且可使果实开裂，灰腐主要破坏果实。病毒须考虑繁殖材料、媒介及感染植株。'},
      {id: 'apply', label: '组合而非替代防护', question: '潮湿园地既有果腐风险又有鸟啄，冠层整理、防鸟网和病害监测应怎样分工？有机标签是否意味着无需用药？', hint: '通风减少滞湿，网防鸟啄及伤口，监测指导针对性防护；有机是按认证限制投入，并非不喷药，也不自动保证酒质。'}
    ]
  },
  {
    id: 's2:harvest', session: 2, unit: 'harvest', title: '采收与风格', stage: 'management',
    summary: '成熟指标与天气决定何时采，地形、整串和选择性要求决定怎样采。',
    image: 'assets/textbook-management.webp', requires: ['s1:cycle', 's2:balance', 's2:health'], quiz: [{session: 2, index: 6}, {session: 2, index: 7}],
    checks: [
      {id: 'explain', label: '从成熟解释采收时间', question: '确定采收日时，为什么要同时看糖、酸、风味、单宁、健康与天气？晚采为什么不一定得到甜酒？', hint: '各项成熟不同步，要匹配目标风格和实际风险；糖影响潜在酒精度，最终残糖还取决于原料及后续发酵。'},
      {id: 'compare', label: '分开采收时间与方法', question: '人工与机械分别在整串、选择性、速度和夜间作业上有什么取舍？“人工一定优质”为什么不成立？', hint: '人工可整串剪采和细选，机械快且可凉夜作业但通常收果粒；两者均需健康适熟果、及时运输与处理，方法本身不决定品质。'},
      {id: 'apply', label: '解释贵腐采收成本', question: '成熟白葡萄有雾湿早晨、温暖干燥下午，为什么可能出现贵腐？为何还需反复选采，不能用持续潮湿替代这组条件？', hint: '早晨帮助感染，干燥下午利失水并限制破坏性腐烂；感染发展不均需反复挑选，出汁少且天气风险高。持续湿润可能转为灰腐。'}
    ]
  }
];

const knowledgeCases = [
  {
    id: 'dry-vineyard', title: '炎热干旱：怎样把有限的水用在成熟上？',
    context: '内陆园地炎热、强光、少雨，灌溉水极有限，但土层有良好保水能力。你需要安排种植空间、果区暴露与负载。',
    topics: ['s1:needs', 's1:soil', 's2:training', 's2:canopy', 's2:balance'],
    image: 'assets/textbook-cases.webp',
    stages: [
      {id: 'conditions', label: '① 找限制', prompt: '最紧缺的资源是什么？土壤保水与强光分别怎样改变风险？', hint: '水是主要限制，储水有帮助但不能保证持续足量；强光高温还带来过热和晒伤风险。'},
      {id: 'vine', label: '② 解释植株', prompt: '植株间争水和严重缺水，会怎样影响叶片及果实成熟？', hint: '争水会增加单株水分压力；严重缺水可限制光合作用，妨碍成熟，并可能带来脱水。'},
      {id: 'choice', label: '③ 选措施', prompt: '分别提出密度、冠层和负载方面的一项选择，并说明它解决什么问题。', hint: '低密度减少争水；灌木或下垂顶梢保留适度遮阴，同时留足健康叶片；负载匹配可用水和成熟能力，不能无限追求低产。'},
      {id: 'outcome', label: '④ 说结果与代价', prompt: '这些选择预期怎样影响成熟、果实健康与成本？什么条件变化会让你重新调整？', hint: '缓解水分竞争及晒伤，支持适宜成熟；灌木可能节省部分搭架投入，却通常需人工采收。补水、天气和长势改变后须再评估。'}
    ],
    pitfalls: ['强光不能替代水；热量越多不代表光合作用无限加快。', '低密度与保水土壤是条件组合，不能推广为所有炎热园地的唯一方案。', '不搭架节省部分建园成本，不等于全生命周期必然更便宜。']
  },
  {
    id: 'humid-vineyard', title: '凉爽潮湿：怎样让葡萄见光，又减少腐烂？',
    context: '一块凉爽、多云、雨水充足的园地，枝叶拥挤，果区长时间潮湿，距目标采收还有一段时间。需要提高成熟机会并控制破坏性果腐。',
    topics: ['s1:climate', 's1:needs', 's2:pruning', 's2:canopy', 's2:health', 's2:harvest'],
    image: 'assets/textbook-environment.webp',
    stages: [
      {id: 'conditions', label: '① 找限制', prompt: '日照与湿度分别带来什么困难？为什么先观察年份、冠层和果实状况？', hint: '少光限制叶片工作，滞湿有利于腐烂；气候概括不能说明当年的雨量、叶幕拥挤程度或果实是否已经感染。'},
      {id: 'vine', label: '② 解释植株', prompt: '拥挤叶幕怎样同时影响糖积累与果实健康？把两个机制分开说明。', hint: '相互遮阴降低有效受光；通风差使湿气滞留、干燥慢，增加病害发生条件。'},
      {id: 'choice', label: '③ 选措施', prompt: '怎样安排新梢、摘叶和病害监测？为什么不能只写“全摘叶”或“只喷药”？', hint: '利用开放VSP、整理新梢、适量摘叶改善受光通风，保留足够健康叶片；监测与针对性防护配合，接近采收遵守安全间隔。'},
      {id: 'outcome', label: '④ 说结果与代价', prompt: '预期改善什么，仍无法保证什么？若采前继续下雨，采收决定要增加哪些判断？', hint: '预期帮助成熟、加快果区干燥及防护覆盖，但不能保证无病或修复全部损伤。再比较糖酸风味、健康、雨势及等待风险，并协调采收与酒厂能力。'}
    ],
    pitfalls: ['开放冠层需要保留有效叶面积；叶片越少并非越好。', 'Botrytis感染不等于有益贵腐，成熟度与交替湿干天气条件仍重要。', '冠层改善条件，不能代替识别病原、持续监测和针对性防护。']
  },
  {
    id: 'whole-bunch-harvest', title: '陡坡与整串：坏天气前怎样安排采收？',
    context: '陡坡小园的葡萄接近目标成熟度，酒款需要完整果串。预报临近有强降雨，但人工有限，采摘后还要送到酒厂及时处理。',
    topics: ['s1:cycle', 's1:climate', 's2:training', 's2:health', 's2:harvest'],
    image: 'assets/textbook-management.webp',
    stages: [
      {id: 'conditions', label: '① 找限制', prompt: '区分采收时间与采收方法：哪些是天气与成熟条件，哪些是地形、整串和作业限制？', hint: '强降雨与成熟度影响采摘窗口；陡坡、完整果串与劳动力影响方法和速度；酒厂容量又限制可接收的节奏。'},
      {id: 'vine', label: '② 解释果实', prompt: '继续等待或遇强降雨，对糖酸风味和果实健康分别可能有什么收益与风险？', hint: '等待可能改善未完成的风味成熟，也可能继续降酸；雨水可使果粒膨大、稀释并增加腐烂，需依据实测而非只看日历。'},
      {id: 'choice', label: '③ 选措施', prompt: '提出符合陡坡和整串要求的采收安排，并说明选果、容器和运输怎样配合。', hint: '常规采收机受陡坡限制且通常收果粒；组织人工剪采整串，必要时选除坏果，使用小而浅的容器，并分批协调及时运输与处理。'},
      {id: 'outcome', label: '④ 说结果与代价', prompt: '比较这项方案的完整性、速度、人工成本与成熟取舍；什么依据能支持提前或继续等待？', hint: '人工满足整串和选择性，但耗工、速度较慢；提前或等待要由目标成熟、天气风险、可调人员及酒厂接收能力共同支持，不能只凭人工或机械标签判断品质。'}
    ],
    pitfalls: ['采收时间与采收方法是两个决定，早采不等于机械采收。', '机器速度快，不能因此忽略陡坡通行和完整果串要求。', '整串要求来自具体酿造目标，不能套用到某产区的所有酒款。']
  }
];

const knowledgeFuture = [
  {id: 'winemaking', title: '酿造、陈年与价格', summary: '第 7–10 章正文已整合：通用原理 → 白／甜 → 红／桃红 → 成本与价格。可进入章节阅读，地图自查题另待整理。', added: false, href: '#chapter/7', status: '正文已收录 · 自查待整理'},
  {id: 'regions', title: '产区与风格', summary: '把环境、品种与管理放入具体产区，比较相同品种为什么会有不同表现。', added: false},
  {id: 'tasting', title: '品鉴与品质判断', summary: '把杯中的酸度、酒体、单宁和风味，接回成熟、酿造与陈年的证据。', added: false}
];
