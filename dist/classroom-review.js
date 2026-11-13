const classroomCases = [
  {
    key: 'grafting', question: '1/graft', title: '嫁接题｜把「抗根瘤蚜」写完整',
    draft: '为了抗根瘤蚜。',
    answer: '欧亚种葡萄的根容易受到根瘤蚜危害，受损后植株会衰弱甚至死亡。把所需的欧亚种葡萄品种嫁接到具抗性的砧木上，可让抗性根系承担吸收功能，同时由接穗结出原品种的果实。',
    focus: '题目问为什么通常嫁接。写明受害部位、砧木怎样解决问题，以及为什么还能保留原品种。'
  },
  {
    key: 'heat', question: '1/heat', title: '高温与强光｜从葡萄成熟答到酒的风格',
    answer: '温度升高通常加快糖分积累和酸度下降。若发酵至干，较高糖分可带来较高酒精度，酸度也可能较低。若为保酸而提前采收，果实风味和单宁可能尚未充分成熟。极端热害可造成晒伤或抑制成熟，影响成酒风味。',
    focus: '题目问最终酒的风格。每一点都从生长变化接到酸度、酒精、果味或单宁，避免只写「葡萄成熟得快」。'
  },
  {
    key: 'vsp', question: '2/vsp', title: 'VSP｜光照和通风分别写',
    answer: '在凉爽、光照有限且较潮湿的园地，垂直引导新梢并管理叶幕可减少果区遮挡，让葡萄获得更多光照，有利于成熟。较开放的叶幕也改善通风，使雨后更快干燥，降低真菌病害风险，提高果实健康度。在炎热、强光园地则要保留适量叶片遮阴，减少晒伤。',
    focus: '先回答适合什么气候，再分别解释成熟和果实健康。篇幅允许时补适用条件。'
  },
  {
    key: 'harvest', question: '2/harvest', title: '采收题｜先选方法，再给该场景的理由',
    answer: '大批量长相思在地形、行距适合机器时可机采，以提高速度并降低单位人工成本。若山坡陡到机器难以安全作业，雷司令宜手采。贵腐葡萄成熟与感染程度不一，分批手采可逐次挑出合适果粒。波尔多 AOP 干红若园地适合机械且需赶在降雨前迅速采完，可选择机采。',
    focus: '按四行情境各写一项决定和一个相关理由。山坡是否能机采看具体坡度和设备，波尔多 AOP 本身也不足以决定方法。'
  },
  {
    key: 'must', question: '3/must', title: '葡萄醪调节｜糖与酸分开答',
    answer: '若原料糖分偏低，在法规允许时可提高发酵前的糖分，使酵母产生更多酒精，提高成酒的潜在酒精度。若酸度不足，可按允许方式增酸以改善清爽感与平衡。若酸度过高，可考虑减酸，使口感较柔和。',
    focus: '写明原料问题、调节方向和成酒结果。提高潜在酒精度与保留残糖是不同目标，实际调节受当地法规约束。'
  },
  {
    key: 'old-oak', question: '3/old-oak', title: '旧橡木桶｜容器作用与风味分开答',
    answer: '旧桶仍可在熟化时让酒缓慢接触少量氧气，有助红酒的单宁口感变柔和。使用过多次的桶通常赋予的橡木香气较少，因此可保留酒本身的果味。',
    focus: '一条解释熟化与质地，一条解释旧桶的香气影响。用桶选择要联系酒款风格。'
  },
  {
    key: 'vineyard', question: '6/vineyard-quality', title: '葡萄园管理｜每项措施各有品质结果',
    answer: '适当管理叶幕可改善果区受光和通风，有利于成熟并降低潮湿环境下的病害风险。若挂果过多，适度疏果可让剩余葡萄更有机会充分成熟。采收时剔除未熟或腐败果，可减少生青或腐败带来的异味。',
    focus: '按题干列三项操作，每项都写到葡萄或成酒品质。疏果的收益要从负载过高这个条件出发。'
  },
  {
    key: 'bordeaux-red', question: '6/red-options', title: '波尔多红酒工艺表｜沿同一环节比较选择',
    answer: '以萃取为例，大批量早饮酒可控制浸皮和萃取，以免粗涩单宁压过果味。果实成熟、目标是结构较强的优质红酒时，可采用较充分的萃取以取得更多颜色、风味和单宁，再结合熟化安排平衡结构。',
    focus: '先按原表逐行写选择。需要解释时再补该选择怎样服务目标风格。此例只示范萃取一行，其余环节回到原表练习。'
  },
  {
    key: 'frost', question: '5/spring-frost', title: '春霜｜同一题里的「解释」和「列举」',
    answer: '萌芽后遭遇春霜，幼嫩芽和新梢可能冻伤或死亡，带花序的新梢受损会降低当季产量。可列举的两种措施是葡萄园加热和使用风机。风机在有逆温的辐射霜冻中可混合上方较暖空气与近地冷空气。',
    focus: '影响部分写清因果链。措施部分按题干列出两项，先完成要求的数量。'
  },
  {
    key: 'nouveau', question: '5/nouveau-method', title: '博若莱新酒｜工艺步骤之后写风格',
    answer: '半二氧化碳浸渍时，将整串葡萄入罐，底部被压破的葡萄流出汁液，酵母发酵释放二氧化碳，使上层完整果粒发生胞内代谢。随后压榨，酵母继续完成酒精发酵。较短的带皮接触限制单宁萃取，胞内代谢可带来鲜明的果味与糖果般香气，形成适合早饮的低单宁红酒。',
    focus: '若答全二氧化碳浸渍，要交代从外部充入二氧化碳。选一种工艺说清气体来源、完整果粒发生的变化、发酵如何完成，再回到酒的风格。'
  },
  {
    key: 'white', question: '6/white-comparison', title: '比较波尔多干白｜两款酒沿同一组维度写',
    answer: '品种方面，入门酒可用长相思为主，突出清新果味；优质佩萨克–雷奥良可混合长相思与赛美蓉，以酸度和香气配合酒体。发酵方面，入门酒可用惰性容器控温，保留果味；优质酒可选择部分小橡木桶发酵，增添橡木影响。发酵后，入门酒可在惰性容器短期存放后较早上市；优质酒可用桶熟化和酒泥接触增加质感与复杂度。',
    focus: '沿原题的品种、发酵、发酵后三栏逐项对照。桶发酵和桶熟化可分别选择，实际做法随酒款而异。'
  },
  {
    key: 'sauternes', question: '6/sauternes-conditions-price', title: '苏玳｜自然条件与高价分别作答',
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
    ${item.draft ? '<p><strong>常见短答</strong>　' + safe(item.draft) + '</p>' : ''}
    <p><strong>参考作答</strong>　${safe(item.answer)}</p>
    <p><strong>答题检查</strong>　${safe(item.focus)}</p>
    <p><a href="#practice/classroom/answering">回看审题与选点 →</a>
      ${item.key === 'sauternes' ? ' · <a href="' + item.href + '">打开苏玳价格逻辑图 →</a>' : ''}</p>
  </details>`;
}

function methodFlow(label, steps) {
  return `<ol class="method-flow" aria-label="${safe(label)}" style="--steps:${steps.length}">${steps.map(([title, detail]) =>
    `<li><strong>${safe(title)}</strong><span>${safe(detail)}</span></li>`
  ).join('')}</ol>`;
}

function methodTerms(terms) {
  return `<dl class="method-terms">${terms.map(([title, detail]) =>
    `<div><dt>${safe(title)}</dt><dd>${safe(detail)}</dd></div>`
  ).join('')}</dl>`;
}

function classroomTips() {
  return `<div class="method-page">
    <header class="method-intro">
      <h2>老师线下 Tips</h2>
      <p>把题目拆开，每一点都答到它问的结果。</p>
      <nav class="method-jumps" aria-label="答题方法">
        <a href="#practice/classroom/answering">审题与选点</a>
        <a href="#practice/classroom/logic">三级因果链</a>
        <a href="#practice/classroom/price">价格题</a>
      </nav>
    </header>
    <section class="method-section" id="answering" aria-labelledby="answering-title">
      <h3 id="answering-title">审题与选点</h3>
      ${methodFlow('审题顺序', [
        ['找题目动词','先判断要列举、描述、解释，还是比较。'],
        ['圈定范围','看清题目问葡萄园还是酒庄，最终要答风格、品质还是价格。'],
        ['按分值分配篇幅','先覆盖所有小问，再挑独立的要点逐条展开。']
      ])}
      ${methodTerms([
        ['列举','给足题目要求的数量。'],
        ['描述','写出具体特征，比如香气、酒体或工艺步骤。'],
        ['解释','写清起因、作用和结果。'],
        ['比较','按相同维度并排写两款酒。']
      ])}
    </section>
    <section class="method-section" id="logic" aria-labelledby="logic-title">
      <h3 id="logic-title">三级因果链</h3>
      <figure class="method-figure">
        ${methodFlow('三级因果链', [
          ['A · 条件或选择','写出具体的气候、园地或操作。'],
          ['B · 发生的变化','说明它怎样改变葡萄、酒液或生产过程。'],
          ['C · 题目要的结果','写明风格、品质、成本或售价怎样受到影响。']
        ])}
        <figcaption>例如，果区通风改善 → 雨后更快干燥 → 真菌病害风险下降。</figcaption>
      </figure>
    </section>
    <section class="method-section" id="price" aria-labelledby="price-title">
      <h3 id="price-title">一款酒为什么贵？</h3>
      <figure class="method-figure">
        <div class="method-lanes">
          <section class="method-lane">
            <h4>葡萄园</h4>
            ${methodTerms([['天','天气是否让合格果实的供应受限？'],['地','园地条件是否限制产量或增加作业难度？'],['人','是否需要多次手采或严格筛选？']])}
          </section>
          <section class="method-lane">
            <h4>酒庄</h4>
            ${methodTerms([['发酵前','每公斤葡萄能取多少汁？'],['发酵中','是否增加监控、人工或容器投入？'],['发酵后','是否投入橡木桶、熟化时间和仓储？']])}
          </section>
        </div>
        <div class="method-branches">
          <div><strong>投入增加或可售酒量减少</strong><span>→ 每瓶生产成本上升</span></div>
          <div><strong>供应有限且有需求</strong><span>→ 稀缺性可支撑更高售价</span></div>
        </div>
        <figcaption>按葡萄园到酒庄的顺序找要点。只选该酒实际采用的做法，再写它影响成本还是售价。</figcaption>
      </figure>
    </section>
  </div>`;
}

function tastingView() {
  const satPdf = "https://www.wsetglobal.cn/wp-content/uploads/WSET_L3Wines_SAT_SC_Jun2023_Issue2C.pdf";
  return `<main id="main" class="wrap practice-shelf tasting-page">
    <header class="method-intro">
      <h1 class="page-title">SAT 系统品鉴</h1>
      <p>按顺序记录杯中证据，再判断质量、适饮程度与陈年潜力。</p>
      <nav class="method-jumps" aria-label="品鉴方法">
        <a href="#tasting/charts">中文品鉴表</a>
        <a href="#tasting/sat">四步品鉴</a>
        <a href="#tasting/aromas">三类香气</a>
        <a href="#tasting/blic">BLIC 与陈年</a>
      </nav>
    </header>
    <section class="method-section" id="charts" aria-labelledby="charts-title">
      <h2 id="charts-title">WSET 三级中文品鉴表</h2>
      <div class="tasting-charts">
        <a href="${satPdf}#page=1" target="_blank" rel="noopener">
          <strong>品鉴系统方法 ↗</strong><span>第 1 页 · 外观、嗅觉、口感与评估</span>
        </a>
        <a href="${satPdf}#page=2" target="_blank" rel="noopener">
          <strong>葡萄酒词汇表 ↗</strong><span>第 2 页 · 一类、二类与三类香气和风味</span>
        </a>
      </div>
      <p class="method-note">WSET 简体中文 PDF · 2023 年第 2C 版</p>
    </section>
    <section class="method-section" id="sat" aria-labelledby="sat-title">
      <h2 id="sat-title">一杯酒，按四步记录</h2>
      <figure class="method-figure">
        ${methodFlow('SAT 品鉴顺序', [
          ['看 · 外观','用白底观察。分别记澄清度、颜色深度和色调。'],
          ['闻 · 嗅觉','判断是否纯净、香气浓度、具体香气和发展程度。'],
          ['尝 · 口感','依次评甜度、酸度、单宁、酒精和酒体，再写风味浓度、具体风味和余味。起泡酒加记气泡口感。'],
          ['评 · 结论','用杯中证据支持质量判断，再判断现在是否适饮、继续陈年是否有益。']
        ])}
        <figcaption>每个等级项选一个程度。写香气和风味时，用具体感受到的词。</figcaption>
      </figure>
      <div class="method-observations">
        <figure class="method-observation">
          <div class="method-wine-sample" aria-hidden="true"><i></i></div>
          <div class="method-sample-labels"><span>边缘渐淡</span><span>中心看色调</span></div>
          <figcaption><strong>深浅和色调分开看</strong><span>酒杯倾向白底，观察颜色从中心到边缘的变化，再从色泽较明显处判断色调。</span></figcaption>
        </figure>
        <figure class="method-observation">
          <div class="method-finish" aria-hidden="true"><i></i></div>
          <div class="method-sample-labels"><span>吐出或吞下</span><span>风味消退</span></div>
          <figcaption><strong>余味看风味持续多久</strong><span>留意具体果味、香料等消失的时刻。酸感、酒精热感或涩感可持续更久。</span></figcaption>
        </figure>
      </div>
      <p class="method-note">口感容易混淆的两项是成熟果味与甜度、单宁的量与粗细。各自判断，分开记录。</p>
    </section>
    <section class="method-section" id="aromas" aria-labelledby="aromas-title">
      <h2 id="aromas-title">把香气写具体</h2>
      <figure class="method-figure">
        ${methodTerms([
          ['一类 · 葡萄与酒精发酵','柠檬、桃、红樱桃、玫瑰等。'],
          ['二类 · 酿造选择','酒泥可能带来面包香，苹果酸–乳酸转化可能带来奶油感，橡木可能带来香草或烘烤香。'],
          ['三类 · 陈年发展','随陈年条件与酒款发展，可见果干、蜂蜜、坚果、皮革或森林地表等。']
        ])}
        <figcaption>只写杯中感受到的特征。果香、花香和草本香同属一类，也能形成层次。</figcaption>
      </figure>
    </section>
    <section class="method-section" id="blic" aria-labelledby="blic-title">
      <h2 id="blic-title">用 BLIC 找质量证据</h2>
      <figure class="method-figure">
        ${methodTerms([
          ['B · 平衡 Balance','酸、甜、酒精、单宁与风味是否互相支撑？'],
          ['L · 长度 Length','咽下或吐出后，具体风味能持续多久？'],
          ['I · 浓度 Intensity','口中风味是否清晰集中，足以支撑酒的结构？'],
          ['C · 复杂度 Complexity','是否尝到多个清晰的风味层次？']
        ])}
        <figcaption>用这些证据解释质量结论。例如，高酸托住甜度，果味集中，余味仍有明显的杏干与柑橘皮。</figcaption>
      </figure>
      <h3 class="method-subheading">适饮程度与陈年潜力</h3>
      ${methodFlow('判断陈年潜力', [
        ['看现在','根据杯中表现，判断酒过于年轻、已经适饮，还是已过适饮期。'],
        ['看以后','结合果味浓度与结构，判断再存放是否有机会发展出更多层次。'],
        ['写结论','如果已经适饮，再说明是否适合继续陈年。']
      ])}
    </section>
  </main>`;
}
