import type { HeritageCategory, HeritageItem } from '../types';

const imagePath = (file: string) => `${import.meta.env.BASE_URL}images/heritage/${file}`;

const coreHeritageData: HeritageItem[] = [
  {
    id: 'buhui-hua',
    name: '布糊画',
    category: 'craft',
    region: '承德市丰宁满族自治县',
    level: 'national',
    inheritor: '滕天一',
    description: '布糊画是以布为主要材料、以纸板为底，将丝绸、棉布等剪裁后分层粘贴成画面的丰宁满族传统手工艺。',
    details: '丰宁滕氏布糊画把花卉、满族题材、装饰纹样和布料肌理结合起来，既有绘画构图，又保留织物的光泽、厚度和触感。它不是简单贴布，而是通过选料、配色、剪裁、塑形、粘贴、覆膜等步骤形成浮雕般的层次。',
    history: '布糊画源于丰宁满族民间生活，20 世纪 80 年代由滕氏家族系统整理、创新和传播。作品曾在大型展览中亮相，并逐渐形成具有承德地域辨识度的非遗品牌。',
    techniques: ['布料选材', '花样剪裁', '分层粘贴', '立体塑形', '覆膜保护'],
    imageUrl: imagePath('buhui-hua.jpg'),
    images: [imagePath('buhui-hua.jpg')],
    tags: ['满族', '丰宁', '布艺', '国家级非遗'],
    featured: true,
  },
  {
    id: 'chengde-miansu',
    name: '承德面塑',
    category: 'craft',
    region: '承德市承德县',
    level: 'provincial',
    inheritor: '李全永',
    description: '承德面塑以面粉为主料，经调色、揉制、捏塑、刻画等步骤塑造人物、动物和民俗题材形象。',
    details: '承德面塑讲究手、眼、刀、色的配合。人物衣纹、表情、配饰和动物姿态常依靠手指与小型工具完成，兼具民间趣味和宫廷审美影响。',
    history: '承德面塑在李氏家族中已有多代传承，扎根皇家文化与塞外民俗交融的承德地区。传承人李全永长期从事面塑创作和教学，是河北省级非遗代表性传承人。',
    techniques: ['面团调色', '揉搓捻压', '工具刻画', '人物造型', '防腐保存'],
    imageUrl: imagePath('chengde-miansu.jpg'),
    images: [imagePath('chengde-miansu.jpg')],
    tags: ['面塑', '承德县', '省级非遗', '民间塑作'],
    featured: true,
  },
  {
    id: 'fengning-muzuo',
    name: '丰宁满族木作技艺',
    category: 'craft',
    region: '承德市丰宁满族自治县',
    level: 'provincial',
    inheritor: '梁宁',
    description: '丰宁满族木作技艺以榫卯结构见长，强调不钉不胶、以木构件自身咬合完成稳定组合。',
    details: '这门技艺重视开榫、凿卯、斜榫、打磨、上漆等工序。制作者需要根据木料纹理、干湿程度和结构受力判断尺寸，体现北方木作的精密经验。',
    history: '丰宁满族木作技艺可追溯至清康熙年间，选将营焦氏木作坊六代相传。近年来通过非遗保护、企业化实践和教学体验延续。',
    techniques: ['开榫凿卯', '斜榫制作', '木料判断', '结构咬合', '打磨上漆'],
    imageUrl: imagePath('fengning-muzuo.jpg'),
    images: [imagePath('fengning-muzuo.jpg')],
    tags: ['榫卯', '满族', '丰宁', '省级非遗'],
    featured: true,
  },
  {
    id: 'lun-hua',
    name: '抡花（元宵节抡花）',
    category: 'folk',
    region: '承德市滦平县火斗山镇',
    level: 'national',
    inheritor: '梁志福',
    description: '抡花是在正月十五夜间表演的传统铁花习俗，铁水经特制花笼抡洒后迸射如金色烟火。',
    details: '抡花兼具火神祭祀、祈年纳福和民间视觉奇观。表演者需要掌握铁水温度、花笼结构、抡甩角度与安全距离，才能形成圆弧状铁花。',
    history: '滦平大店子村抡花习俗相传起于清代康熙年间，三百余年来在梁氏家族和村落共同体中延续，是承德元宵节俗的重要代表。',
    techniques: ['铁水冶炼', '花笼制作', '抡甩控力', '安全防护', '祭祀仪式'],
    imageUrl: imagePath('lun-hua.jpg'),
    images: [imagePath('lun-hua.jpg')],
    tags: ['抡花', '铁花', '元宵节', '滦平', '国家级非遗'],
    featured: true,
  },
  {
    id: 'shantao-mudiaokeqin',
    name: '山桃木雕刻技艺',
    category: 'art',
    region: '承德市滦平县火斗山乡',
    level: 'provincial',
    inheritor: '邢士海',
    description: '山桃木雕刻以燕山山桃木为材料，制作桃符、民俗器物和艺术摆件，保留纯手工雕刻传统。',
    details: '山桃木质地坚硬、纹理细密，雕刻时需要顺势取形、避裂用刀。作品常连接桃木辟邪、祈福纳祥等民俗观念。',
    history: '山桃木雕刻在燕山地区绵延多代。传承人邢士海长期坚持古法手工制作，是承德民间木雕类非遗的重要代表。',
    techniques: ['山桃木选材', '顺纹雕刻', '桃符制作', '刻刀运用', '防腐处理'],
    imageUrl: imagePath('shantao-mudiaokeqin.jpg'),
    images: [imagePath('shantao-mudiaokeqin.jpg')],
    tags: ['山桃木', '雕刻', '滦平', '省级非遗'],
    featured: true,
  },
  {
    id: 'taiyang-miaohui',
    name: '太阳山庙会',
    category: 'folk',
    region: '承德市',
    level: 'municipal',
    inheritor: '民间传承',
    description: '太阳山庙会是承德地区传统民间庙会，汇聚祭祀、游艺、戏曲、手工艺和多民族民俗展示。',
    details: '庙会既是地方信仰活动，也是乡村公共文化空间。非遗展演、民间戏曲、传统小吃和节令仪式在同一场域中相互交织。',
    history: '太阳山庙会承载热河地区满族、蒙古族、汉族等多民族文化交融记忆，是承德民俗活态传承的重要场景。',
    techniques: ['传统祭祀', '民间戏曲', '手工艺展示', '民俗游艺', '节庆组织'],
    imageUrl: imagePath('taiyang-miaohui.jpg'),
    images: [imagePath('taiyang-miaohui.jpg')],
    tags: ['庙会', '民俗', '多民族', '承德'],
    featured: false,
  },
  {
    id: 'fengning-jianzhi',
    name: '丰宁满族剪纸',
    category: 'art',
    region: '承德市丰宁满族自治县',
    level: 'national',
    inheritor: '石俊凤、张冬阁等',
    description: '丰宁满族剪纸以阳刻为主、阴刻为辅，题材覆盖窗花、挂签、吉祥纹样和满族民俗生活。',
    details: '丰宁满族剪纸讲究批毛纤长、剪工精细，常见单色、点染、填色和复色组合形式。它把满族礼俗、农耕生活、节令装饰和吉祥观念凝聚在纸面之上。',
    history: '该技艺可追溯至清代康熙年间，乾隆时期逐渐形成地域风格。丰宁曾被命名为中国民间剪纸艺术之乡，丰宁满族剪纸也是中国剪纸的重要组成部分。',
    techniques: ['阳刻剪法', '阴刻辅助', '批毛技法', '点染填色', '复色组合'],
    imageUrl: imagePath('fengning-jianzhi.jpg'),
    images: [imagePath('fengning-jianzhi.jpg')],
    tags: ['剪纸', '丰宁', '满族', '国家级非遗'],
    featured: true,
  },
  {
    id: 'fengning-chaozihui',
    name: '丰宁满族吵子会',
    category: 'music',
    region: '承德市丰宁满族自治县',
    level: 'national',
    inheritor: '民间乐班传承',
    description: '丰宁满族吵子会是以唢呐和打击乐为核心的满族民间吹打乐，常见于庙会、节庆和花会。',
    details: '吵子会并不是“吵闹的会”，而是一套村落礼俗音乐系统。唢呐、锣鼓、曲牌、仪式节奏共同服务于迎神、庆典、行进和舞蹈伴奏。',
    history: '丰宁吵子会已有约三百年历史，八间房等村落在清乾隆年间已形成庙会音乐传统。早期多用口传心授和工尺谱，后整理为简谱传承。',
    techniques: ['唢呐吹奏', '锣鼓配合', '曲牌传承', '庙会仪式', '口传心授'],
    imageUrl: imagePath('fengning-chaozihui.jpg'),
    images: [imagePath('fengning-chaozihui.jpg')],
    tags: ['唢呐', '吹打乐', '丰宁', '满族'],
    featured: false,
  },
  {
    id: 'ergui-shuaijiao',
    name: '隆化满族二贵摔跤',
    category: 'dance',
    region: '承德市隆化县',
    level: 'national',
    inheritor: '民间传承',
    description: '隆化满族二贵摔跤由传统体育竞技演化而来，是一人操控道具表现两人摔跤的满族民间道具舞。',
    details: '表演者背负或操纵特制道具，通过假腿、假身和服饰机关模拟两个满族武士角力。翻、滚、踢、摔、转等动作需要体力、协调性和喜剧节奏。',
    history: '二贵摔跤大约形成于清代道光末年前后，已有一百八十多年历史。20 世纪 80 年代后，隆化文化部门对其进行挖掘整理，使其成为承德满族表演类非遗品牌。',
    techniques: ['道具操控', '摔跤模拟', '翻滚动作', '民间花会', '喜剧表演'],
    imageUrl: imagePath('ergui-shuaijiao.jpg'),
    images: [imagePath('ergui-shuaijiao.jpg')],
    tags: ['二贵摔跤', '满族', '隆化', '国家级非遗'],
    featured: true,
  },
  {
    id: 'kuancheng-beigan',
    name: '宽城背杆',
    category: 'dance',
    region: '承德市宽城满族自治县',
    level: 'national',
    inheritor: '民间花会传承',
    description: '宽城背杆俗称背歌，由下角男子顶架、上角儿童扮演戏曲人物，是春节花会中的大型民间舞蹈项目。',
    details: '每架背杆通常对应一出戏，上下角色共同完成造型、行进和舞动。它把戏曲故事、杆架制作、仪仗队伍、锣鼓唢呐和民俗节庆组织融合在一起。',
    history: '宽城背杆始于清代，主要流传于宽城镇北村等地。2007 年列入国家级非物质文化遗产名录，是承德大型花会传统的重要代表。',
    techniques: ['杆架绑缚', '上角造型', '戏曲扮演', '仪仗组织', '锣鼓伴奏'],
    imageUrl: imagePath('kuancheng-beigan.jpg'),
    images: [imagePath('kuancheng-beigan.jpg')],
    tags: ['背杆', '宽城', '花会', '国家级非遗'],
    featured: false,
  },
  {
    id: 'qidan-shizu',
    name: '契丹始祖传说',
    category: 'literature',
    region: '承德市平泉市',
    level: 'national',
    inheritor: '口头文学传承',
    description: '契丹始祖传说讲述白马神人与青牛天女在二水交汇处相遇、生八子、繁衍契丹八部的祖源故事。',
    details: '传说中的马盂山、老哈河、西拉木伦河、木叶山等意象，与《辽史》契丹祖源叙事互相呼应。它是平泉“契丹祖地”文化身份的重要口头文学资源。',
    history: '平泉及周边地区长期保存契丹、辽文化遗存和相关传说。该项目对研究北方民族神话、辽文化传播和地方文化认同具有价值。',
    techniques: ['口头讲述', '祖源叙事', '地名记忆', '民族神话', '地方传说'],
    imageUrl: imagePath('qidan-shizu.jpg'),
    images: [imagePath('qidan-shizu.jpg')],
    tags: ['契丹', '平泉', '民间文学', '国家级非遗'],
    featured: false,
  },
  {
    id: 'shanzhuang-laojiu',
    name: '山庄老酒传统酿造技艺',
    category: 'craft',
    region: '承德市平泉市',
    level: 'national',
    inheritor: '王玉学等',
    description: '山庄老酒传统酿造技艺以高粱为主料，辅以中高温大曲、续糟发酵、缓火蒸馏和陶罐贮存。',
    details: '智能体介绍该项目时只讲传统酿造文化和非遗价值，不鼓励饮酒，不提供可直接复制的酿酒配方。其核心价值在于北方蒸馏酒经验、清代承德皇家文化记忆和师徒传承体系。',
    history: '山庄老酒酿制技艺经历清初形成、康乾兴盛、近现代抢救复苏和文旅融合发展等阶段，现以非遗工坊、酒窖展示和研学体验延续。',
    techniques: ['培制大曲', '续糟配料', '清蒸混烧', '分段摘酒', '陶罐贮存'],
    imageUrl: imagePath('shanzhuang-laojiu.jpg'),
    images: [imagePath('shanzhuang-laojiu.jpg')],
    tags: ['酿造', '平泉', '酒文化', '国家级非遗'],
    featured: false,
  },
  {
    id: 'bancheng-shaoguo',
    name: '板城烧锅酒传统五甑酿造技艺',
    category: 'craft',
    region: '承德市承德县',
    level: 'national',
    inheritor: '王士敏等',
    description: '板城烧锅酒传统五甑酿造技艺归入蒸馏酒传统酿造技艺，核心在老五甑、多甑发酵和量质摘酒。',
    details: '智能体只介绍文化流程与工艺价值，不给酿造配方或饮用建议。五甑体系体现了投料、蒸煮、发酵、摘酒、贮存之间的经验组合。',
    history: '板城烧锅酒与承德县水土、滦河水系、清代避暑山庄文化和北方烧锅传统密切相关，也通过酒博物馆等方式进行工业文旅展示。',
    techniques: ['老五甑', '混蒸混烧', '量质摘酒', '分级贮存', '自然老熟'],
    imageUrl: imagePath('bancheng-shaoguo.jpg'),
    images: [imagePath('bancheng-shaoguo.jpg')],
    tags: ['五甑', '承德县', '蒸馏酒', '国家级非遗'],
    featured: false,
  },
  {
    id: 'chengde-qingyin',
    name: '承德清音会 / 热河清音',
    category: 'music',
    region: '承德市',
    level: 'provincial',
    inheritor: '民间乐社传承',
    description: '承德清音会传承和演奏清音十番，保存了与热河行宫、清代宫廷音乐相关的地方音乐记忆。',
    details: '清音会偏向清雅、合奏秩序和宫廷审美余绪，不同于庙会吹打乐的热闹场面。它连接避暑山庄、热河行宫和民间乐社。',
    history: '承德清音会形成于民国初年，长期在民间组织中保存清音十番曲目。现代展演将其从民间乐社带入剧场和非遗展示空间。',
    techniques: ['清音十番', '合奏秩序', '曲牌传承', '宫廷音乐遗存', '民间乐社'],
    imageUrl: imagePath('chengde-qingyin.jpg'),
    images: [imagePath('chengde-qingyin.jpg')],
    tags: ['清音', '热河', '传统音乐', '省级非遗'],
    featured: false,
  },
  {
    id: 'yanshan-daban',
    name: '燕山大板',
    category: 'performance',
    region: '承德市平泉市及燕山周边',
    level: 'municipal',
    inheritor: '民间曲艺传承',
    description: '燕山大板是流行于燕山一带的曲艺形式，以板类节奏、说唱叙事和群众性演出见长。',
    details: '它可单口、对口或群口表演，群口大板常吸收表演唱、歌舞和队形变化，适合广场、舞台和基层文艺活动。',
    history: '燕山大板与京东、冀北民间说唱、快板、数来宝等曲艺传统有关，在平泉及周边地区被用于地方风物、时代主题和乡村文化表达。',
    techniques: ['打板节奏', '说唱叙事', '群口表演', '队形变化', '地方语言'],
    imageUrl: imagePath('yanshan-daban.jpg'),
    images: [imagePath('yanshan-daban.jpg')],
    tags: ['曲艺', '平泉', '燕山', '说唱'],
    featured: false,
  },
  {
    id: 'yaotongning',
    name: '腰痛宁组方及其药物炮制工艺',
    category: 'medicine',
    region: '承德市',
    level: 'national',
    inheritor: '颈复康药业集团有限公司',
    description: '腰痛宁组方及其药物炮制工艺体现中医传统制剂方法、药物炮制经验和现代质量控制的结合。',
    details: '该条目只能作为文化与非遗知识介绍。智能体不得替代医生诊断，不给剂量、适应症判断、疗效承诺或自行配制建议；涉及用药问题应建议咨询医生或药师并遵循说明书。',
    history: '腰痛宁源于郭晓庄教授家传验方，经承德中药厂及颈复康药业长期研究和质量提升，于 2021 年入选第五批国家级非遗代表性项目名录。',
    techniques: ['中医组方', '马钱子炮制', '君臣佐使', '质量控制', '传统制剂'],
    imageUrl: imagePath('yaotongning.jpg'),
    images: [imagePath('yaotongning.jpg')],
    tags: ['传统医药', '承德', '炮制', '国家级非遗'],
    featured: false,
  },
  {
    id: 'rehe-piying',
    name: '热河皮影制作技艺',
    category: 'craft',
    region: '承德市',
    level: 'municipal',
    inheritor: '民间艺人传承',
    description: '热河皮影制作技艺包括选皮、刮皮、描样、镂刻、染色、熨平和缀结，是皮影戏演出的视觉基础。',
    details: '皮影制作与皮影演出共同构成“制影、操影、唱演”的完整生态。承德市级名录中还可见多项皮影演出相关条目，说明本地皮影传统具有系统性。',
    history: '承德及周边地区长期存在皮影戏演出传统，热河皮影制作技艺承载冀北民间戏曲、影人雕刻和乡村戏班记忆。',
    techniques: ['选皮刮皮', '描样制版', '镂刻染色', '熨平缀结', '操影配套'],
    imageUrl: imagePath('rehe-piying.jpg'),
    images: [imagePath('rehe-piying.jpg')],
    tags: ['皮影', '热河', '制作技艺', '市级非遗'],
    featured: false,
  },
  {
    id: 'chen-shupi-hua',
    name: '陈氏树皮画',
    category: 'art',
    region: '承德市隆化县',
    level: 'municipal',
    inheritor: '陈氏传承',
    description: '陈氏树皮画以树皮等自然材料为媒介，顺应纹理、色泽和裂纹拼贴塑形，形成山水、花鸟或民俗画面。',
    details: '树皮画的特点是借材成画。材料本身的肌理就是画面语言，创作者需要依据树皮形状、层次和色差组织构图。',
    history: '该项目列入承德市第六批市级非遗名录，也在承德非遗展示中心中作为隆化传统美术项目展示。',
    techniques: ['树皮选材', '纹理判断', '剪裁拼贴', '层次塑形', '生态审美'],
    imageUrl: imagePath('chen-shupi-hua.jpg'),
    images: [imagePath('chen-shupi-hua.jpg')],
    tags: ['树皮画', '隆化', '传统美术', '市级非遗'],
    featured: false,
  },
  {
    id: 'baijiazi-boyumian',
    name: '一百家子拨御面',
    category: 'craft',
    region: '承德市隆化县一百家子村',
    level: 'provincial',
    inheritor: '辛占锋等',
    description: '一百家子拨御面是隆化一带满族风味荞麦面食制作技艺，常与乾隆木兰秋狝后的地方传说联系在一起。',
    details: '拨御面的重点在面团、水温、和面、饧面、拨面手法和火候控制。智能体介绍“御面”名称时应使用“据地方资料记载”等审慎表述。',
    history: '地方资料称，乾隆木兰秋狝后在张三营行宫赐宴，当地拨面师傅制作荞麦拨面并获赐名。该项目体现塞外粗粮精做和热河行宫饮食记忆。',
    techniques: ['荞麦和面', '面团饧制', '拨面入锅', '火候控制', '满族风味'],
    imageUrl: imagePath('baijiazi-boyumian.jpg'),
    images: [imagePath('baijiazi-boyumian.jpg')],
    tags: ['拨御面', '隆化', '传统饮食', '省级非遗'],
    featured: false,
  },
  {
    id: 'manhan-quanxi',
    name: '满汉全席传统技艺',
    category: 'craft',
    region: '承德市',
    level: 'municipal',
    inheritor: '承德餐饮技艺传承',
    description: '满汉全席传统技艺是一套宫廷宴席制作和礼仪体系，承载满族饮食、汉族烹饪和热河行宫文化交汇。',
    details: '满汉全席不是单独一道菜，也不是固定不变的一份菜单，而是菜肴制作、器具陈设、宴饮礼仪、上菜秩序和文化寓意的综合体系。',
    history: '承德作为清代避暑山庄和热河行宫所在地，长期汇聚满、汉、蒙古等多民族饮食习俗和宫廷宴饮礼仪，为该项目提供了特殊文化语境。',
    techniques: ['宴席组织', '满汉菜点', '宫廷礼仪', '器具陈设', '菜名寓意'],
    imageUrl: imagePath('manhan-quanxi.jpg'),
    images: [imagePath('manhan-quanxi.jpg')],
    tags: ['满汉全席', '承德', '饮食技艺', '市级非遗'],
    featured: false,
  },
  {
    id: 'pingquan-yangtang',
    name: '平泉羊汤制作技艺',
    category: 'craft',
    region: '承德市平泉市',
    level: 'provincial',
    inheritor: '地方饮食传承',
    description: '平泉羊汤制作技艺以羊杂、羊骨汤和烧饼搭配形成地方风味，是热河日常饮食非遗的代表。',
    details: '羊汤的价值不只是味道，还在于原料处理、去膻、熬汤、火候、汤色和调味经验。智能体可介绍文化流程，不给商业配方或夸张功效。',
    history: '平泉旧称八沟，处在承德通往东北、内蒙古的交通文化走廊上。羊汤承载市井饮食、行旅饮食和家庭口味记忆。',
    techniques: ['原料处理', '去膻熬汤', '火候控制', '汤色把握', '烧饼搭配'],
    imageUrl: imagePath('pingquan-yangtang.jpg'),
    images: [imagePath('pingquan-yangtang.jpg')],
    tags: ['羊汤', '平泉', '传统饮食', '省级非遗'],
    featured: false,
  },
  {
    id: 'bagou-shidiao',
    name: '八沟石雕',
    category: 'art',
    region: '承德市平泉市',
    level: 'municipal',
    inheritor: '冯林等',
    description: '八沟石雕是平泉传统美术项目，以石材为载体制作石狮、石羊、建筑构件和民俗摆件。',
    details: '八沟石雕强调选石、构图、粗坯、錾刻、修光和细部刻画。其审美朴厚有力，体现平泉历史地名“八沟”的地方身份。',
    history: '平泉官方资料将八沟石雕与新石器遗址、夏家店文化、辽金造像和清末民国石刻遗存联系起来。当前项目面临年轻传承人不足等保护压力。',
    techniques: ['石材选择', '粗坯成形', '錾刻修光', '民俗造型', '建筑装饰'],
    imageUrl: imagePath('bagou-shidiao.jpg'),
    images: [imagePath('bagou-shidiao.jpg')],
    tags: ['石雕', '八沟', '平泉', '市级非遗'],
    featured: false,
  },
  {
    id: 'rehe-zhuo',
    name: '热河桌',
    category: 'craft',
    region: '承德市',
    level: 'municipal',
    inheritor: '热河桌传承人',
    description: '热河桌是一种地方木嵌桌面工艺，用小木块拼嵌吉祥图案，再以传统木工结构锁紧。',
    details: '热河桌的难点在拼和锁。小木块要在纹理、色泽、尺寸上协调，同时通过卯翘木工技法减少变形、开裂和松动。',
    history: '承德市政府报道介绍，热河桌起源于清雍正初年。传承人曾希望将这项带有热河名称的技艺带回承德传播和接续。',
    techniques: ['木块拼嵌', '纹理配色', '卯翘锁紧', '吉祥纹样', '家具制作'],
    imageUrl: imagePath('rehe-zhuo.jpg'),
    images: [imagePath('rehe-zhuo.jpg')],
    tags: ['热河桌', '木嵌', '家具', '市级非遗'],
    featured: false,
  },
  {
    id: 'houjiaban-suona',
    name: '唢呐“侯家班”吹打曲牌',
    category: 'music',
    region: '承德市平泉市',
    level: 'municipal',
    inheritor: '侯家班传承',
    description: '唢呐“侯家班”吹打曲牌是平泉乡村礼俗音乐系统，服务于婚丧嫁娶、庙会、节庆和公共仪式。',
    details: '侯家班的核心不是某一首曲子，而是围绕家族、师徒和乡村礼俗形成的曲牌传承。唢呐与锣鼓根据仪式阶段切换曲牌和节奏。',
    history: '2015 年，平泉相关项目被承德市列入第五批市级非物质文化遗产保护名录。它适合与丰宁满族吵子会对比讲解。',
    techniques: ['唢呐吹奏', '锣鼓配合', '曲牌转换', '礼俗仪式', '师徒传承'],
    imageUrl: imagePath('houjiaban-suona.jpg'),
    images: [imagePath('houjiaban-suona.jpg')],
    tags: ['唢呐', '侯家班', '平泉', '市级非遗'],
    featured: false,
  },
  {
    id: 'kuancheng-dakouluozi',
    name: '宽城大口落子',
    category: 'performance',
    region: '承德市宽城满族自治县',
    level: 'provincial',
    inheritor: '乡村剧团传承',
    description: '宽城大口落子是流传于宽城的地方戏曲形态，源头与莲花落有关，语言通俗、曲调贴近乡村生活。',
    details: '大口落子保留民间说唱传统，又吸收地方戏和乡村舞台表演。它依靠村落剧团、民间艺人和群众参与，是活态传承的地方表演传统。',
    history: '宽城县政府资料介绍，大口落子发源于清朝末期，由冀东一带艺人传入并在当地发展，南沟门村等地曾有广泛群众基础。',
    techniques: ['莲花落唱法', '地方语言', '村落剧团', '乡村舞台', '群众参与'],
    imageUrl: imagePath('kuancheng-dakouluozi.jpg'),
    images: [imagePath('kuancheng-dakouluozi.jpg')],
    tags: ['大口落子', '宽城', '地方戏', '省级非遗'],
    featured: false,
  },
  {
    id: 'fengning-tieyi-denglong',
    name: '丰宁铁艺灯笼',
    category: 'craft',
    region: '承德市丰宁满族自治县',
    level: 'provincial',
    inheritor: '张桂贞等',
    description: '丰宁铁艺灯笼把铁编结构与绘画、剪纸、编织、刺缝和裱布结合，是节庆灯彩类传统技艺。',
    details: '与纸扎灯笼相比，铁艺灯笼更强调骨架结构、耐用性和铁线造型。它既是春节、元宵节和庙会用品，也是非遗工坊、文创和就业帮扶案例。',
    history: '丰宁地区节庆民俗活动对灯笼、花灯、龙灯需求旺盛，推动铁艺灯笼发展。近年该项目多次进入非遗展示和新春制作报道。',
    techniques: ['铁线拉直', '拧花盘梁', '骨架制作', '裱布装饰', '灯彩造型'],
    imageUrl: imagePath('fengning-tieyi-denglong.jpg'),
    images: [imagePath('fengning-tieyi-denglong.jpg')],
    tags: ['铁艺灯笼', '丰宁', '灯彩', '省级非遗'],
    featured: false,
  },
  {
    id: 'wangshi-gongxiu',
    name: '王氏宫绣',
    category: 'art',
    region: '承德市隆化县',
    level: 'provincial',
    inheritor: '王国荣等',
    description: '王氏宫绣是隆化传统刺绣类非遗，以精细针法、典雅纹样和服饰文创应用见长。',
    details: '宫绣的“宫”主要指精致、端庄、色彩和纹样秩序感。王氏宫绣通过工作室、绣娘培训、高端定制和文创产品进入现代生活。',
    history: '公开报道介绍，代表性传承人王国荣在隆化创立工作室，带动当地绣娘就业，让传统刺绣转化为“指尖经济”。',
    techniques: ['针法组织', '纹样设计', '色彩搭配', '服饰应用', '绣娘培训'],
    imageUrl: imagePath('wangshi-gongxiu.jpg'),
    images: [imagePath('wangshi-gongxiu.jpg')],
    tags: ['宫绣', '隆化', '刺绣', '省级非遗'],
    featured: false,
  },
];

type CatalogSeed = {
  id: string;
  name: string;
  sourceCategory: string;
  category: HeritageCategory;
  county: string;
  sheet: string;
  image?: string;
  techniques?: string[];
  description?: string;
  details?: string;
  tags?: string[];
};

const coreAliasesById: Record<string, string[]> = {
  'buhui-hua': ['丰宁滕氏布糊画'],
  'chengde-miansu': ['面塑'],
  'fengning-muzuo': ['丰宁传统木作技艺'],
  'lun-hua': ['抡花'],
  'shantao-mudiaokeqin': ['山桃木雕刻技艺'],
  'taiyang-miaohui': ['太阳山庙会'],
  'fengning-jianzhi': ['丰宁剪纸'],
  'fengning-chaozihui': ['丰宁满族吵子会'],
  'ergui-shuaijiao': ['二贵摔跤'],
  'kuancheng-beigan': ['宽城背杆'],
  'qidan-shizu': ['契丹始祖传说'],
  'shanzhuang-laojiu': ['山庄老酒酿造技艺'],
  'bancheng-shaoguo': ['板城烧锅酒五甑酿造技艺'],
  'chengde-qingyin': ['承德清音会', '热河清音'],
  'yanshan-daban': ['燕山大板'],
  yaotongning: ['腰痛宁胶囊组方及马钱子等药物炮制工艺'],
  'rehe-piying': ['皮影雕刻技艺'],
  'baijiazi-boyumian': ['一百家子拨御面'],
  'manhan-quanxi': ['满汉全席传统制作技艺'],
  'pingquan-yangtang': ['平泉羊汤制作技艺'],
  'bagou-shidiao': ['八沟石雕工艺'],
  'kuancheng-dakouluozi': ['大口落子（宽城大口落子）'],
  'fengning-tieyi-denglong': ['丰宁铁艺灯笼'],
  'wangshi-gongxiu': ['宫绣'],
};

const regionByCounty: Record<string, string> = {
  承德: '承德市',
  丰宁: '承德市丰宁满族自治县',
  滦平: '承德市滦平县',
  宽城: '承德市宽城满族自治县',
  隆化: '承德市隆化县',
  平泉: '承德市平泉市',
  兴隆: '承德市兴隆县',
  围场: '承德市围场满族蒙古族自治县',
  双桥区: '承德市双桥区',
  承德双桥: '承德市双桥区',
  双滦区: '承德市双滦区',
  鹰营矿区: '承德市鹰手营子矿区',
  '双滦区 、围场': '承德市双滦区、围场满族蒙古族自治县',
};

const defaultImagesByCategory: Record<HeritageCategory, string> = {
  craft: 'fengning-muzuo.jpg',
  art: 'fengning-jianzhi.jpg',
  performance: 'kuancheng-dakouluozi.jpg',
  music: 'chengde-qingyin.jpg',
  dance: 'ergui-shuaijiao.jpg',
  literature: 'qidan-shizu.jpg',
  medicine: 'yaotongning.jpg',
  folk: 'taiyang-miaohui.jpg',
  sport: 'ergui-shuaijiao.jpg',
};

const defaultTechniquesByCategory: Record<HeritageCategory, string[]> = {
  craft: ['材料处理', '手工制作', '工序传承', '地方风味', '活态展示'],
  art: ['图样设计', '手工塑造', '材料运用', '纹样表达', '作品展示'],
  performance: ['唱念表演', '地方语言', '舞台组织', '曲目传承', '群众参与'],
  music: ['曲牌传承', '乐器演奏', '节奏组织', '口传心授', '仪式应用'],
  dance: ['身段动作', '道具运用', '节庆展演', '队形组织', '民间传承'],
  literature: ['口头讲述', '地名记忆', '人物叙事', '民间传说', '地方认同'],
  medicine: ['中医经验', '炮制工艺', '师承传习', '质量控制', '文化展示'],
  folk: ['节令仪式', '民俗组织', '村落传承', '祈福表达', '公共文化'],
  sport: ['身体训练', '竞技规则', '民间展演', '师徒传承', '安全保护'],
};

const categoryNouns: Record<HeritageCategory, string> = {
  craft: '传统技艺项目',
  art: '传统美术项目',
  performance: '地方表演项目',
  music: '传统音乐项目',
  dance: '民间舞蹈项目',
  literature: '民间文学项目',
  medicine: '传统医药项目',
  folk: '民俗项目',
  sport: '传统体育与竞技项目',
};

const catalogAdditionSeeds: CatalogSeed[] = [
  { id: 'qiaozhangzi-jianzhi', name: '剪纸(乔杖子剪纸)', sourceCategory: '传统美术', category: 'art', county: '承德', sheet: '传统民间美术', image: 'qiaozhangzi-jianzhi.jpg', techniques: ['图样起稿', '折剪刻制', '窗花纹样', '节令装饰', '民间传承'] },
  { id: 'luanping-nisu', name: '滦平泥塑', sourceCategory: '传统美术', category: 'art', county: '滦平', sheet: '传统民间美术', image: 'luanping-nisu.jpg', techniques: ['泥料处理', '手工捏塑', '人物塑形', '阴干修整', '设色装饰'], tags: ['泥塑'] },
  { id: 'kuancheng-jianzhi', name: '宽城剪纸', sourceCategory: '传统美术', category: 'art', county: '宽城', sheet: '传统民间美术', image: 'kuancheng-jianzhi.jpg', techniques: ['纹样设计', '折剪刻制', '窗花制作', '吉祥表达', '节庆装饰'], tags: ['剪纸'] },
  { id: 'tongban-fudiao-hua', name: '铜板浮雕画', sourceCategory: '传统美术', category: 'art', county: '宽城', sheet: '传统民间美术', image: 'tongban-fudiao-hua.jpg', techniques: ['铜板选材', '錾刻塑形', '浮雕层次', '肌理处理', '装饰陈设'] },
  { id: 'zhengshi-shayi', name: '郑氏砂艺', sourceCategory: '传统美术', category: 'art', county: '兴隆', sheet: '传统民间美术', image: 'zhengshi-shayi.jpg', techniques: ['砂材筛选', '构图铺排', '胶合定型', '色彩层次', '装饰展示'] },
  { id: 'erlongshan-long-wenhua', name: '滦平二龙山龙文化', sourceCategory: '民俗', category: 'folk', county: '滦平', sheet: '民俗', image: 'erlongshan-long-wenhua.jpg', techniques: ['龙文化叙事', '节庆仪式', '村落组织', '祈福表达', '民俗展示'] },
  { id: 'heshun-shenghui', name: '和顺圣会', sourceCategory: '民俗', category: 'folk', county: '滦平', sheet: '民俗', image: 'heshun-shenghui.jpg', techniques: ['会期组织', '仪仗队列', '民俗表演', '祭祀礼俗', '公共参与'] },
  { id: 'chengde-taigan', name: '抬杆(承德县）', sourceCategory: '民俗', category: 'folk', county: '承德', sheet: '民俗', image: 'chengde-taigan.jpg', techniques: ['杆架制作', '角色扮演', '队伍行进', '锣鼓伴奏', '节庆展演'] },
  { id: 'henghe-mengding-yanwu', name: '丰宁横河蒙丁演武', sourceCategory: '民俗', category: 'folk', county: '丰宁', sheet: '民俗', image: 'henghe-mengding-yanwu.jpg', techniques: ['演武仪式', '队列组织', '器械展示', '节庆表演', '村落传承'] },
  { id: 'fengning-manzu-hunsu', name: '丰宁满族婚俗', sourceCategory: '民俗', category: 'folk', county: '丰宁', sheet: '民俗', image: 'fengning-manzu-hunsu.jpg', techniques: ['婚礼仪程', '服饰礼俗', '祝颂表达', '亲族参与', '满族记忆'] },
  { id: 'huangqi-wuhui', name: '黄旗武会', sourceCategory: '民俗', category: 'folk', county: '丰宁', sheet: '民俗', image: 'huangqi-wuhui.jpg', techniques: ['武会组织', '器械演练', '庙会巡游', '队列表演', '安全传承'] },
  { id: 'weichang-manzu-cixiu', name: '满族刺绣', sourceCategory: '传统技艺', category: 'craft', county: '围场', sheet: '传统技艺', image: 'weichang-manzu-cixiu.jpg', techniques: ['针法组织', '纹样描摹', '配色绣制', '服饰应用', '满族审美'] },
  { id: 'qianhe-baimuxiang', name: '千鹤柏木香', sourceCategory: '传统技艺', category: 'craft', county: '宽城', sheet: '传统技艺', image: 'qianhe-baimuxiang.jpg', techniques: ['柏木取材', '香材处理', '手工成型', '晾晒保存', '礼俗应用'] },
  { id: 'tianmu-chenxiang', name: '天木陈香制作技艺', sourceCategory: '传统技艺', category: 'craft', county: '宽城', sheet: '传统技艺', image: 'tianmu-chenxiang.jpg', techniques: ['香材配伍', '研磨制坯', '手工塑形', '阴干熟化', '香事展示'] },
  { id: 'guqin-zhuozhi', name: '古琴斫制技艺', sourceCategory: '传统技艺', category: 'craft', county: '双桥区', sheet: '传统技艺', image: 'guqin-zhuozhi.jpg', techniques: ['选木制坯', '琴体斫制', '髹漆灰胎', '装配调音', '琴学传承'] },
  { id: 'weichang-shougong-cixiu', name: '围场满族蒙古族自治县民间手工刺绣', sourceCategory: '传统技艺', category: 'craft', county: '围场', sheet: '传统技艺', image: 'weichang-shougong-cixiu.jpg', techniques: ['民间针法', '纹样设计', '色线搭配', '服饰装饰', '家庭传承'] },
  { id: 'sunshi-taiji-laojia', name: '孙氏太极老架', sourceCategory: '传统手工技艺', category: 'sport', county: '承德双桥', sheet: '传统技艺', image: 'sunshi-taiji-laojia.jpg', techniques: ['拳架演练', '身法步法', '攻防意识', '师徒传承', '健身展示'] },
  { id: 'bazhen-yujiu', name: '八珍御酒酿造技艺', sourceCategory: '传统技艺', category: 'craft', county: '平泉', sheet: '食品', image: 'bazhen-yujiu.jpg', techniques: ['原料处理', '曲法经验', '发酵管理', '蒸馏贮存', '酒俗展示'] },
  { id: 'jiulongzui-jiu', name: '丰宁九龙醉酒酿造技艺', sourceCategory: '传统技艺', category: 'craft', county: '丰宁', sheet: '食品', image: 'jiulongzui-jiu.jpg', techniques: ['原料处理', '制曲发酵', '蒸馏摘酒', '陶坛贮存', '酒文化展示'] },
  { id: 'yushan-tangbing', name: '平泉御膳糖饼手工制作技艺', sourceCategory: '传统技艺', category: 'craft', county: '平泉', sheet: '食品', image: 'yushan-tangbing.jpg', techniques: ['面点和制', '馅料处理', '手工成型', '火候控制', '地方饮食'] },
  { id: 'wukuiyuan-gaidaorou', name: '平泉"五奎园"改刀肉制作技艺', sourceCategory: '传统手工技艺', category: 'craft', county: '平泉', sheet: '食品', image: 'wukuiyuan-gaidaorou.jpg', techniques: ['刀工处理', '火候掌握', '调味经验', '菜品成型', '饮食传承'] },
  { id: 'chenjia-xunji', name: '陈家熏鸡制作技艺', sourceCategory: '传统技艺', category: 'craft', county: '双桥区', sheet: '食品', image: 'chenjia-xunji.jpg', techniques: ['原料处理', '腌制入味', '烟火熏制', '火候控制', '地方风味'] },
  { id: 'chenshi-zhenggu', name: '陈氏正骨术', sourceCategory: '传统医药', category: 'medicine', county: '承德双桥', sheet: '传统医药', image: 'chenshi-zhenggu.jpg', techniques: ['诊察经验', '手法传承', '师承体系', '医德规范', '文化展示'] },
  { id: 'fengning-hudie-wu', name: '丰宁蝴蝶舞', sourceCategory: '民间舞蹈', category: 'dance', county: '丰宁', sheet: '传统音体舞', image: 'fengning-hudie-wu.jpg', techniques: ['道具扮演', '身段动作', '队形变化', '节庆展演', '满族民俗'] },
  { id: 'rehe-errenzhuan', name: '热河二人转', sourceCategory: '曲艺', category: 'performance', county: '宽城', sheet: '传统音体舞', image: 'rehe-errenzhuan.jpg', techniques: ['说唱表演', '地方语言', '手绢身段', '曲牌运用', '舞台互动'] },
  { id: 'longhua-badaguai', name: '八大怪', sourceCategory: '传统舞蹈', category: 'dance', county: '隆化', sheet: '传统音体舞', image: 'longhua-badaguai.jpg', techniques: ['角色扮演', '滑稽动作', '队形调度', '节庆展演', '民间传承'] },
  { id: 'longhua-bawangbian', name: '霸王鞭', sourceCategory: '传统舞蹈', category: 'dance', county: '隆化', sheet: '传统音体舞', image: 'longhua-bawangbian.jpg', techniques: ['鞭具敲击', '节奏配合', '舞步变化', '队形组织', '节庆表演'] },
  { id: 'longhua-zhongfan', name: '中幡', sourceCategory: '传统舞蹈', category: 'dance', county: '隆化', sheet: '传统音体舞', image: 'longhua-zhongfan.jpg', techniques: ['幡杆操控', '平衡技巧', '队列行进', '节庆展示', '安全保护'] },
  { id: 'xinglong-bengdahui', name: '蹦跶会', sourceCategory: '传统舞蹈', category: 'dance', county: '兴隆', sheet: '传统音体舞', image: 'xinglong-bengdahui.jpg', techniques: ['跳跃身法', '锣鼓节奏', '队形组织', '庙会展演', '民俗传承'] },
  { id: 'luanping-mianhuagui', name: '滦平棉花鬼', sourceCategory: '传统舞蹈', category: 'dance', county: '滦平', sheet: '传统音体舞', image: 'luanping-mianhuagui.jpg', techniques: ['面具装扮', '身段表演', '民俗叙事', '节庆巡游', '村落传承'] },
  { id: 'luanping-shifan-yue', name: '滦平十番乐', sourceCategory: '传统音乐', category: 'music', county: '滦平', sheet: '传统音体舞', image: 'luanping-shifan-yue.jpg', techniques: ['十番曲牌', '合奏配器', '节奏组织', '乐社传承', '仪式应用'] },
  { id: 'weichang-saman-wu', name: '萨满舞', sourceCategory: '传统舞蹈', category: 'dance', county: '围场', sheet: '传统音体舞', image: 'weichang-saman-wu.jpg', techniques: ['祭仪身段', '鼓点节奏', '服饰道具', '仪式叙事', '族群记忆'] },
  { id: 'nanyingzi-chuidayue', name: '丰宁南营子吹打乐', sourceCategory: '传统音乐', category: 'music', county: '丰宁', sheet: '传统音体舞', image: 'nanyingzi-chuidayue.jpg', techniques: ['唢呐吹奏', '锣鼓配合', '曲牌传承', '礼俗应用', '民间乐班'] },
  { id: 'qionglansi-yinyue', name: '穹览寺音乐', sourceCategory: '传统音乐', category: 'music', county: '双滦区', sheet: '传统音体舞', image: 'qionglansi-yinyue.jpg', techniques: ['寺庙音乐', '曲调传承', '仪式节奏', '合奏秩序', '文化记忆'] },
  { id: 'pingquan-zhuzhucha', name: '铢铢镲', sourceCategory: '传统音乐', category: 'music', county: '平泉', sheet: '传统音体舞', image: 'pingquan-zhuzhucha.jpg', techniques: ['镲具演奏', '锣鼓配合', '节奏变化', '礼俗应用', '民间传承'] },
  { id: 'fengning-zhuban-luozi', name: '竹板落子', sourceCategory: '民间舞蹈', category: 'dance', county: '丰宁', sheet: '传统音体舞', image: 'fengning-zhuban-luozi.jpg', techniques: ['竹板节奏', '说唱舞动', '队形变化', '节庆展演', '群众参与'] },
  { id: 'linghe-dagu', name: '凌河大鼓', sourceCategory: '曲艺', category: 'performance', county: '平泉', sheet: '传统音体舞', image: 'linghe-dagu.jpg', techniques: ['鼓书说唱', '地方语言', '板鼓伴奏', '故事叙事', '曲艺传承'] },
  { id: 'xinglong-tieban-dagu', name: '铁板大鼓', sourceCategory: '曲艺', category: 'performance', county: '兴隆', sheet: '传统音体舞', image: 'xinglong-tieban-dagu.jpg', techniques: ['铁板节奏', '大鼓伴奏', '说唱叙事', '口传心授', '舞台表演'] },
  { id: 'weichang-zhenzhuqiu', name: '珍珠球', sourceCategory: '杂技与竞技', category: 'sport', county: '围场', sheet: '传统音体舞', image: 'weichang-zhenzhuqiu.jpg', techniques: ['团队配合', '投接技巧', '竞技规则', '民族体育', '校园传承'] },
  { id: 'zhongxing-dakouluozi', name: '大口落子（中兴大口落子）', sourceCategory: '传统戏剧', category: 'performance', county: '兴隆', sheet: '传统音体舞', image: 'zhongxing-dakouluozi.jpg', techniques: ['地方唱腔', '戏剧情节', '舞台扮演', '村落剧团', '群众传承'] },
  { id: 'wuling-piyingxi', name: '皮影戏(雾灵皮影戏)', sourceCategory: '传统戏剧', category: 'performance', county: '兴隆', sheet: '传统音体舞', image: 'wuling-piyingxi.jpg', techniques: ['影人操控', '唱腔念白', '灯影配合', '剧目传承', '民间戏班'] },
  { id: 'pingquan-chuanshuo', name: '平泉的传说', sourceCategory: '民间文学', category: 'literature', county: '平泉', sheet: '民间文学', image: 'pingquan-chuanshuo.jpg', techniques: ['口头讲述', '地名故事', '历史记忆', '人物叙事', '地方认同'] },
  { id: 'kangxi-damiao-chuanshuo', name: '康熙与大庙的传说', sourceCategory: '民间文学', category: 'literature', county: '双滦区 、围场', sheet: '民间文学', image: 'kangxi-damiao-chuanshuo.jpg', techniques: ['口头传说', '帝王叙事', '地名记忆', '地方史话', '文化认同'] },
  { id: 'douerdun-chuanshuo', name: '窦尔墩传说', sourceCategory: '民间文学', category: 'literature', county: '兴隆', sheet: '民间文学', image: 'douerdun-chuanshuo.jpg', techniques: ['英雄叙事', '口头讲述', '地方传说', '戏曲关联', '民间记忆'] },
  { id: 'shouwangfen-chuanshuo', name: '寿王坟传说', sourceCategory: '民间文学', category: 'literature', county: '鹰营矿区', sheet: '民间文学', image: 'shouwangfen-chuanshuo.jpg', techniques: ['地名传说', '矿区记忆', '口头讲述', '历史想象', '地方认同'] },
  { id: 'yingshouyingzi-chuanshuo', name: '鹰手营子的传说', sourceCategory: '民间文学', category: 'literature', county: '鹰营矿区', sheet: '民间文学', image: 'yingshouyingzi-chuanshuo.jpg', techniques: ['地名传说', '口头讲述', '区域记忆', '人物故事', '民间文学'] },
];

const resolveRegion = (county: string) => regionByCounty[county] ?? `承德市${county}`;

const getCatalogDescription = (seed: CatalogSeed, region: string) =>
  seed.description ??
  `${seed.name}是${region}收录的${categoryNouns[seed.category]}，来自《承德非遗分类(2).xlsx》的“${seed.sheet}”门类。`;

const getCatalogDetails = (seed: CatalogSeed, region: string) => {
  if (seed.details) return seed.details;

  if (seed.category === 'medicine') {
    return `${seed.name}作为传统医药类非遗，只用于介绍承德地方医药文化、师承经验和保护传承，不提供诊疗结论、用药剂量或自行操作建议。`;
  }

  if (seed.name.includes('酒')) {
    return `${seed.name}的展示重点是传统酿造文化、作坊记忆、器具流程和地方商业史。智能体介绍时不应提供可复制配方、饮用建议或功效承诺。`;
  }

  if (seed.sheet === '食品') {
    return `${seed.name}体现了承德地方饮食经验和热河生活记忆。介绍时可讲原料处理、手工流程、节令场景和地域风味，但不提供商业配方。`;
  }

  return `该项目在${region}流传，兼具地方生活、节庆展演、手工经验或口头记忆价值。当前前端先按 Excel 分类建立项目档案，后续可继续补充代表性传承人、保护单位和更完整的历史资料。`;
};

const getCatalogHistory = (seed: CatalogSeed, region: string) =>
  `${region}处在热河文化、多民族交往和燕山地域生活交汇处，${seed.name}保存了当地群众在礼俗、技艺、审美或叙事中的长期经验，是承德非遗谱系的一部分。`;

const createCatalogItem = (seed: CatalogSeed): HeritageItem => {
  const region = resolveRegion(seed.county);
  const imageUrl = imagePath(seed.image ?? defaultImagesByCategory[seed.category]);
  const tags = Array.from(new Set([seed.sourceCategory, seed.county, seed.sheet, ...(seed.tags ?? [])]));

  return {
    id: seed.id,
    name: seed.name,
    category: seed.category,
    region,
    level: 'municipal',
    inheritor: '地方传承',
    description: getCatalogDescription(seed, region),
    details: getCatalogDetails(seed, region),
    history: getCatalogHistory(seed, region),
    techniques: seed.techniques ?? defaultTechniquesByCategory[seed.category],
    imageUrl,
    images: [imageUrl],
    tags,
    featured: false,
  };
};

const coreItemsWithCatalogAliases = coreHeritageData.map(item => {
  const aliases = coreAliasesById[item.id] ?? [];

  if (aliases.length === 0) return item;

  return {
    ...item,
    tags: Array.from(new Set([...(item.tags ?? []), ...aliases])),
  };
});

export const heritageData: HeritageItem[] = [
  ...coreItemsWithCatalogAliases,
  ...catalogAdditionSeeds.map(createCatalogItem),
];

// 搜索非遗项目
export function searchHeritage(query: string): HeritageItem[] {
  if (!query.trim()) return heritageData;
  const lower = query.toLowerCase();
  return heritageData.filter(
    item =>
      item.name.includes(query) ||
      item.description.toLowerCase().includes(lower) ||
      item.details?.toLowerCase().includes(lower) ||
      item.history?.toLowerCase().includes(lower) ||
      item.region.includes(query) ||
      item.inheritor?.includes(query) ||
      item.tags?.some(tag => tag.includes(query))
  );
}

// 按分类获取非遗项目
export function getHeritageByCategory(category: string): HeritageItem[] {
  if (!category) return heritageData;
  return heritageData.filter(item => item.category === category);
}

// 获取精选非遗
export function getFeaturedHeritage(): HeritageItem[] {
  return heritageData.filter(item => item.featured);
}
