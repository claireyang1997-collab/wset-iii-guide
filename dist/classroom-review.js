const classroomCases = [
  {
    key: 'grafting', question: '1/graft', title: '嫁接题｜把「抗根瘤蚜」写完整', source: '09:34 转写 · 01:10:37 起',
    draft: '为了抗根瘤蚜。',
    answer: '欧亚种葡萄的根容易受到根瘤蚜危害，受损后植株会衰弱甚至死亡。把所需的欧亚种葡萄品种嫁接到具抗性的砧木上，可让抗性根系承担吸收功能，同时由接穗结出原品种的果实。',
    focus: '题目问为什么通常嫁接。写明受害部位、砧木怎样解决问题，以及为什么还能保留原品种。'
  },
  {
    key: 'heat', question: '1/heat', title: '高温与强光｜从葡萄成熟答到酒的风格', source: '11:36 转写 · 01:00:14 后',
    answer: '温度升高通常加快糖分积累和酸度下降。若发酵至干，较高糖分可带来较高酒精度，酸度也可能较低。若为保酸而提前采收，果实风味和单宁可能尚未充分成熟。极端热害可造成晒伤或抑制成熟，影响成酒风味。',
    focus: '题目问最终酒的风格。每一点都从生长变化接到酸度、酒精、果味或单宁，避免只写「葡萄成熟得快」。'
  },
  {
    key: 'vsp', question: '2/vsp', title: 'VSP｜光照和通风分别写', source: '14:01 转写 · 02:11:22',
    answer: '在凉爽、光照有限且较潮湿的园地，垂直引导新梢并管理叶幕可减少果区遮挡，让葡萄获得更多光照，有利于成熟。较开放的叶幕也改善通风，使雨后更快干燥，降低真菌病害风险，提高果实健康度。在炎热、强光园地则要保留适量叶片遮阴，减少晒伤。',
    focus: '先回答适合什么气候，再分别解释成熟和果实健康。篇幅允许时补适用条件。'
  },
  {
    key: 'harvest', question: '2/harvest', title: '采收题｜先选方法，再给该场景的理由', source: '09:34 转写 · 01:44:33–01:47:11',
    answer: '大批量长相思在地形、行距适合机器时可机采，以提高速度并降低单位人工成本。若山坡陡到机器难以安全作业，雷司令宜手采。贵腐葡萄成熟与感染程度不一，分批手采可逐次挑出合适果粒。波尔多 AOP 干红若园地适合机械且需赶在降雨前迅速采完，可选择机采。',
    focus: '按四行情境各写一项决定和一个相关理由。山坡是否能机采看具体坡度和设备，波尔多 AOP 本身也不足以决定方法。'
  },
  {
    key: 'must', question: '3/must', title: '葡萄醪调节｜糖与酸分开答', source: '14:01 转写 · 30:23–32:11',
    answer: '若原料糖分偏低，在法规允许时可提高发酵前的糖分，使酵母产生更多酒精，提高成酒的潜在酒精度。若酸度不足，可按允许方式增酸以改善清爽感与平衡。若酸度过高，可考虑减酸，使口感较柔和。',
    focus: '写明原料问题、调节方向和成酒结果。提高潜在酒精度与保留残糖是不同目标，实际调节受当地法规约束。'
  },
  {
    key: 'old-oak', question: '3/old-oak', title: '旧橡木桶｜容器作用与风味分开答', source: '14:01 转写 · 34:45–35:20',
    answer: '旧桶仍可在熟化时让酒缓慢接触少量氧气，有助红酒的单宁口感变柔和。使用过多次的桶通常赋予的橡木香气较少，因此可保留酒本身的果味。',
    focus: '一条解释熟化与质地，一条解释旧桶的香气影响。用桶选择要联系酒款风格。'
  },
  {
    key: 'vineyard', question: '6/vineyard-quality', title: '葡萄园管理｜每项措施各有品质结果', source: '11:36 转写 · 36:20 起',
    answer: '适当管理叶幕可改善果区受光和通风，有利于成熟并降低潮湿环境下的病害风险。若挂果过多，适度疏果可让剩余葡萄更有机会充分成熟。采收时剔除未熟或腐败果，可减少生青或腐败带来的异味。',
    focus: '按题干列三项操作，每项都写到葡萄或成酒品质。疏果的收益要从负载过高这个条件出发。'
  },
  {
    key: 'bordeaux-red', question: '6/red-options', title: '波尔多红酒工艺表｜沿同一环节比较选择', source: '11:36 转写 · 07:03–08:19',
    answer: '以萃取为例，大批量早饮酒可控制浸皮和萃取，以免粗涩单宁压过果味。果实成熟、目标是结构较强的优质红酒时，可采用较充分的萃取以取得更多颜色、风味和单宁，再结合熟化安排平衡结构。',
    focus: '先按原表逐行写选择。需要解释时再补该选择怎样服务目标风格。此例只示范萃取一行，其余环节回到原表练习。'
  },
  {
    key: 'frost', question: '5/spring-frost', title: '春霜｜同一题里的「解释」和「列举」', source: '14:01 转写 · 课程开头至约 06:23',
    answer: '萌芽后遭遇春霜，幼嫩芽和新梢可能冻伤或死亡，带花序的新梢受损会降低当季产量。可列举的两种措施是葡萄园加热和使用风机。风机在有逆温的辐射霜冻中可混合上方较暖空气与近地冷空气。',
    focus: '影响部分写清因果链。措施部分按题干列出两项，先完成要求的数量。'
  },
  {
    key: 'nouveau', question: '5/nouveau-method', title: '博若莱新酒｜工艺步骤之后写风格', source: '14:01 转写 · 01:24:59 后至 01:37:01',
    answer: '半二氧化碳浸渍时，将整串葡萄入罐，底部被压破的葡萄流出汁液，酵母发酵释放二氧化碳，使上层完整果粒发生胞内代谢。随后压榨，酵母继续完成酒精发酵。较短的带皮接触限制单宁萃取，胞内代谢可带来鲜明的果味与糖果般香气，形成适合早饮的低单宁红酒。',
    focus: '若答全二氧化碳浸渍，要交代从外部充入二氧化碳。选一种工艺说清气体来源、完整果粒发生的变化、发酵如何完成，再回到酒的风格。'
  },
  {
    key: 'white', question: '6/white-comparison', title: '比较波尔多干白｜两款酒沿同一组维度写', source: '09:34 转写 · 01:19:27 前后的波尔多干白讲评',
    answer: '品种方面，入门酒可用长相思为主，突出清新果味；优质佩萨克–雷奥良可混合长相思与赛美蓉，以酸度和香气配合酒体。发酵方面，入门酒可用惰性容器控温，保留果味；优质酒可选择部分小橡木桶发酵，增添橡木影响。发酵后，入门酒可在惰性容器短期存放后较早上市；优质酒可用桶熟化和酒泥接触增加质感与复杂度。',
    focus: '沿原题的品种、发酵、发酵后三栏逐项对照。桶发酵和桶熟化可分别选择，实际做法随酒款而异。'
  },
  {
    key: 'sauternes', question: '6/sauternes-conditions-price', title: '苏玳｜自然条件与高价分别作答', source: '09:34 转写 · 01:33:41–01:44:33，及课堂白板与讲解',
    answer: 'a）湿润晨雾利于灰葡萄孢感染成熟果实，随后干燥天气有助限制腐烂并让果粒失水，浓缩糖分和风味。b）适合贵腐的果实供应有限，在有需求时稀缺性可支持较高售价。贵腐程度不一，需要多次入园手采，增加人工。果实失水降低出汁率，投入由更少成酒分摊，推高每瓶成本。',
    focus: '原题 a、b 共 6 分，材料未给出分题配分。先让两问都有答案。若还需扩展价格，可选高糖酒醪的发酵监控，或实际采用的小橡木桶发酵、熟化，逐项说明成本来源。上述参考写法是练习示例。',
    href: '#workbook/6/wb-price-method-6'
  }
];

function classroomQuestionReview(session, id) {
  const item = classroomCases.find(example => example.question === session + '/' + id);
  if (!item) return '';
  return `<details class="practice-resource lesson-review-case" id="classroom-${item.key}">
    <summary>${practiceSourceBadge('classroom')} <strong>${safe(item.title)}</strong></summary>
    <p class="fine">${safe(item.source)}</p>
    ${item.draft ? '<p><strong>常见短答</strong>　' + safe(item.draft) + '</p>' : ''}
    <p><strong>参考作答</strong>　${safe(item.answer)}</p>
    <p><strong>答题检查</strong>　${safe(item.focus)}</p>
    <p><a href="#practice/lesson1/answering">回看审题与选点 →</a>
      ${item.key === 'sauternes' ? ' · <a href="' + item.href + '">打开苏玳价格逻辑图 →</a>' : ''}</p>
  </details>`;
}

function classroomLessonOne() {
  const cards = classroomCases.map(item => {
    const session = item.question.split('/')[0];
    return `<li><a href="#workbook/${session}/classroom-${item.key}">${safe(item.title)} →</a></li>`;
  }).join('');
  return `<main id="main" class="wrap practice-hub practice-shelf">
    <header class="page-intro">
      <a href="#practice/classroom" class="back">← 老师讲解整理</a>
      ${practiceSourceBadge('classroom')}
      <h1 class="page-title">线下课 1 · 作业讲评</h1>
      <p>11 月 7 日课堂。各题的讲评与参考作答可在对应原题下展开。</p>
      <nav class="practice-source-tabs" aria-label="线下课复习入口">
        <a href="#practice/lesson1/answering">审题与选点</a>
        <a href="#workbook/6/classroom-sauternes">苏玳示例</a>
        <a href="#practice/tasting">SAT 品鉴</a>
      </nav>
    </header>
    <section class="practice-panel" id="answering">
      <h2>怎样写出完整答案</h2>
      <ol>
        <li><strong>圈出任务和范围。</strong> 列举要给足数量，描述要写具体特征，解释要交代为什么，比较要用同一组维度写双方。圈出题目限定的葡萄园、酒庄、自然因素或人为选择，以及要解释的价格、风格或品质。</li>
        <li><strong>按分值选不同的要点。</strong> 有小问就先逐问覆盖。分值用来安排篇幅和时间，具体配分以题目为准。葡萄园可用天、地、人检索，酒庄可用发酵前、中、后检索。</li>
        <li><strong>把每个解释落到题目的结果。</strong> 用「具体条件或选择 → 作用 → 题目要的结果」检查是否跳步。一条完整因果链可以写成一句。写价格时，分清单位生产成本上升和供需支持售价两条路径。</li>
      </ol>
      <p class="fine">下列示例根据课堂讲评和站内已核对知识整理，机构评分细则尚待提供。</p>
      <ul class="classroom-question-index">${cards}</ul>
    </section>
    <p class="fine">讲评取自 11 月 7 日三份 Word 转写的可辨段落，并与课堂白板及站内正文交叉核对。原始音频与机构评分细则待补。</p>
  </main>`;
}

function classroomTasting() {
  return `<main id="main" class="wrap practice-hub practice-shelf">
    <header class="page-intro">
      <a href="#practice" class="back">← 练习与复习</a>
      <h1 class="page-title">SAT 系统品鉴</h1>
      <p>第三级葡萄酒品鉴顺序与用词练习。</p>
    </header>
    <section class="practice-panel" id="sat">
      <h2>SAT 品鉴 · 先描述，再评价</h2>
      <p>按所提供的 2023 年第 2C 版品鉴卡与词汇表整理。记录分为外观、嗅觉、口感和结论。</p>
      <dl>
        <dt><strong>外观</strong></dt><dd>在白色背景上观察，分别写澄清度、颜色深度、颜色。沉淀和气泡等按观察补充。</dd>
        <dt><strong>嗅觉</strong></dt><dd>记录纯净性、香气浓度、具体香气和发展程度。用实际闻到的词，例如红樱桃、香草或森林地表。</dd>
        <dt><strong>口感</strong></dt><dd>逐项检查甜度、酸度、单宁、酒精、酒体、风味浓度、具体风味与余味。起泡酒另观察气泡口感。粗涩是质地，单宁的量仍需单独判断。判断余味时留意风味持续多久。</dd>
        <dt><strong>结论</strong></dt><dd>用平衡、余味、浓度、复杂度（BLIC）支持质量判断，再独立判断适饮程度与陈年潜力。例：甜味有酸度支撑，果味清晰，但风味很快消失、层次有限。</dd>
      </dl>
      <h3>用词汇表定位香气</h3>
      <ul>
        <li>一类来自葡萄和酒精发酵。可从花、果、草本或香料找具体描述，例如柠檬、桃或红樱桃。</li>
        <li>二类来自酿造过程中的选择。酒泥可带来饼干或面包气息，苹果酸–乳酸转化可出现奶油感，橡木可带来香草或烘烤气息。</li>
        <li>三类与陈年发展有关。按酒的实际表现写果干、坚果、蜂蜜、皮革或森林地表等。</li>
      </ul>
      <p>等级量表每项选一个合适的等级。香气和风味选实际感知到的词。一类香气内部也可以有多个清楚的层次。</p>
    </section>
    <section class="practice-panel">
      <h2>本次课堂资料</h2>
      <p>品鉴框架对照了两张 2023 年第 2C 版卡片照片，课堂说明取自 11 月 7 日转写的可辨段落。反光遮挡的词条及无法确认的课堂酒款暂待核实。</p>
    </section>
  </main>`;
}
