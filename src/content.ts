export type Language = "zh" | "en";

export const content = {
  zh: {
    nav: ["精选项目", "AI 实践", "职业经历", "联系我"],
    skip: "跳转至正文",
    menu: "菜单",
    close: "关闭",
    enlarge: "查看大图",
    eyebrow: "程璐 / 品牌传播 · 内容策略 · AI 共创",
    headline: ["CHENG", "LU"],
    intro: "一个在感性与理性之间工作的文化转译者。",
    bio: "我做了十多年的品牌与内容工作，待过科技公司、广告行业媒体和创意公司。喜欢先弄明白人为什么会被一件事打动，再考虑该怎么讲、怎么做。最近，我也在用 AI 做研究、搭网页，尝试把自己的想法做出来。",
    tags: ["品牌与增长", "AI 与产品", "旅行与文化"],
    explore: "看我做过的项目",
    resume: "下载简历",
    portrait: "程璐在户外的个人照片",
    portraitNote: "工作之外，喜欢旅行，也喜欢好吃的。",
    location: "现在在上海",
    stats: [
      ["10+ 年", "品牌传播与跨领域实践"],
      ["0 → 10 万+", "群玉山账号一年粉丝增长"],
      ["1,000 万+", "和路雪项目品牌话题曝光"],
    ],
    focusLabel: "01 / 最近在做的事",
    focusTitle: ["今年，", "主要在做品牌出海。"],
    focusYear: "2026 · 品牌出海",
    focusIntro:
      "最近的工作，一部分是在 Instagram、TikTok、YouTube 上找合适的海外达人，推进内容合作和投放；另一部分是线下活动和展厅项目，需要到现场，把计划里的事情一件件做完。",
    focusSteps: [
      [
        "海外达人合作",
        "根据品牌和受众挑选达人，沟通内容方向，跟进合作与发布。",
      ],
      ["活动现场", "参与前期筹备和现场执行，协调活动中的具体问题。"],
      ["展厅项目", "参与展厅落地，跟进空间里的品牌呈现与执行细节。"],
    ],
    focusCaption: "品牌活动现场 · 项目示意",
    focusAlt: "品牌活动现场，来宾在汽车展示空间合影",
    workLabel: "02 / 精选项目",
    workTitle: "一些做过的项目",
    workIntro:
      "有从零开始的品牌，也有活动、达人合作和旅行产品。这里放了几件比较有代表性的。",
    projectDetail: "展开看我具体做了什么",
    projects: [
      {
        id: "mountains",
        category: "品牌策略 / 内容增长",
        client: "群玉山咨询",
        title: "群玉山：从零搭起品牌内容",
        image: "mountains",
        alt: "群玉山咨询品牌官网与山峦视觉",
        metric: "0 → 10 万+",
        metricLabel: "一年内账号粉丝增长",
        description:
          "公司刚成立时，我负责公关策略、创始人 IP、媒体合作和社群。要做的事很具体：让大家知道群玉山是谁，有什么观点，为什么值得关注。",
        detail:
          "我制定公关与内容策略，围绕创始人观点和行业议题持续做内容，建立了 20+ 核心自媒体、10+ 官方媒体的合作网络。活动时，也会直接协调设计、客户、供应商和媒体。账号在一年内从零增长到 10 万+ 粉丝。",
      },
      {
        id: "walls",
        category: "达人营销 / 内容优化",
        client: "和路雪",
        title: "和路雪：换一个更好看的卖点",
        image: "",
        alt: "",
        metric: "1,000 万+",
        metricLabel: "项目品牌话题曝光",
        description:
          "这次投放合作了 100 多位达人。我负责内容方向、达人组合和发布节奏，也会根据内容表现调整后续合作。",
        detail:
          "最初主打“芝士流心”，后来根据内容表现，调整为镜头里更直观的“芝士拉丝”，同时优化达人筛选。项目覆盖 4 类达人，品牌话题获得 1,000 万+ 曝光。",
      },
      {
        id: "travel",
        category: "旅行体验 / AI 辅助原型",
        client: "铁瓷儿旅行",
        title: "铁瓷儿：带外国游客逛上海",
        image: "travel",
        alt: "外国游客参与上海本地美食文化体验",
        metric: "从路线到产品",
        metricLabel: "研究 · 体验设计 · 内容表达",
        description:
          "我参与设计菜市场、美食、陶瓷等上海本地体验，也研究入境游市场、写产品内容。希望外国游客能理解这些日常生活有什么好玩，以及自己会怎样参与。",
        detail:
          "我把适合人群、体验流程、路线亮点和信任信息整理到产品详情页，用 AI 辅助搭出原型。同时在小红书、Reddit、Instagram 和 YouTube 上做内容传播。",
      },
      {
        id: "tibet",
        category: "文化研究 / 品牌叙事",
        client: "自然堂 · 西藏文化调研",
        title: "自然堂：去西藏找品牌故事",
        image: "tibet",
        alt: "西藏实地文化调研时与当地人的合影",
        metric: "一手文化研究",
        metricLabel: "非遗语境与品牌叙事",
        description:
          "围绕自然堂的“喜马拉雅源头”定位，我研究了邦典织造技艺及其文化背景，为品牌传播寻找合适的故事和表达。",
        detail:
          "研究材料、工艺，以及这门手艺和当地生活的关系，再整理成品牌团队能使用的内容，为后续传播提供文化研究和叙事依据。",
      },
      {
        id: "adquan",
        category: "整合营销 / 行业连接",
        client: "广告门",
        title: "广告门：把行业里的朋友聚在一起",
        image: "adquan",
        alt: "广告门大型行业活动现场",
        metric: "5+ 场",
        metricLabel: "大型行业活动策划与统筹",
        description:
          "在广告门，我策划过大型行业活动，也参与了与丁香医生、百度等品牌的合作。工作从定主题、写内容，到沟通客户、邀请嘉宾和现场统筹。",
        detail:
          "参与广告门 × 丁香医生、广告门 × 百度等项目，负责活动主题、内容结构、合作沟通与传播。任职期间，两年内将单一客户合作体量从 0 提升至 100 万元。",
      },
      {
        id: "soul",
        category: "品牌体验 / 线下展览",
        client: "Soul",
        title: "Soul：第一次线下艺术展",
        image: "soul",
        alt: "Soul 线下艺术展的沉浸式光影装置",
        metric: "10,000+",
        metricLabel: "线下展览参与者",
        description:
          "参与策划并落地 Soul 首次线下艺术展，让用户在线下也能体验到这款社交产品里的情绪和关系。",
        detail:
          "工作包括展览内容、用户体验、传播物料和现场执行。展览吸引了 10,000+ 人参与。",
      },
    ],
    aiLabel: "03 / AI 实践",
    aiTitle: ["我也在用 AI，", "做些自己的东西。"],
    aiIntro:
      "刚开始是用 AI 整理资料、辅助写作，后来开始尝试搭网页和互动应用。这个网站，以及面向外国游客的旅行产品页面，都是我的练习。做的过程中，我会反复想：别人打开这个页面，能不能看懂？下一步要做什么？",
    aiSteps: [
      [
        "先把问题说清楚",
        "比如外国游客想体验上海本地生活，他们要先了解哪些信息，才会决定参加？",
      ],
      [
        "把信息排好",
        "适合谁、会去哪里、具体做什么，哪些内容应该先出现，哪些可以留到后面。",
      ],
      ["做一版出来看看", "用 AI 辅助搭出页面，自己走一遍，再修改不顺的地方。"],
    ],
    notebook: "一个具体的例子 / 旅行产品页",
    question: "“这个行程适合我吗？”",
    notebookIntro:
      "做入境游产品时，我会先把游客可能问的问题列出来，再决定页面怎么写。",
    flow: [
      ["谁来看", "第一次来上海、想体验本地生活的外国游客"],
      ["想知道", "去哪里、做什么、自己能不能参与"],
      ["页面内容", "适合人群、体验流程、路线介绍和信任信息"],
      ["做出来", "用 AI 辅助搭建产品详情页原型"],
    ],
    aiNote: "也在整理项目知识库，尝试互动应用。还在学，也一直在做。",
    aiLink: "查看旅行体验案例",
    experienceLabel: "04 / 职业经历",
    experienceTitle: "我走过的几段路",
    experienceIntro:
      "工作过，也重新回到学校读过书。不同的经历，让我看问题时多了几个角度。",
    experience: [
      [
        "2026.01 — 2026.08",
        "铁瓷儿旅行",
        "市场经理 · 远程",
        "海外达人传播与投放；入境游市场研究、体验产品打磨、AI 产品详情页与社交媒体内容。",
      ],
      [
        "2025.01 — 2025.12",
        "自由职业",
        "内容策划 · 上海",
        "服务自然堂、和路雪及文旅项目，涵盖品牌叙事、达人投放与活动执行。平行光品牌冷启动一个月获得 2,000+ 早期用户；横沙岛项目获得 200+ 人参与、10 万+ 曝光。",
      ],
      [
        "2024.10 — 2024.12",
        "SDG Changemaker",
        "助理研究员 · 远程",
        "围绕可持续材料、社区应用与循环经济完成英文研究，为跨国可持续商业项目提供研究支持。",
      ],
      [
        "2022.01 — 2023.04",
        "群玉山咨询",
        "公关总监 · 上海",
        "从 0 到 1 建立公关、内容与创始人 IP 体系，统筹媒体、社群及品牌活动。",
      ],
      [
        "2020.12 — 2022.01",
        "SGAD 胜加广告",
        "公关总监 · 上海",
        "拓展新消费与科技媒体合作，维护行业协会关系，策划内容系列、申报行业奖项，并参与企业团建旅行服务。",
      ],
      [
        "2017.10 — 2020.10",
        "广告门",
        "高级策划经理 · 上海",
        "策划整合营销及行业活动。知乎粉丝从 1,000 增长至 30,000，公众号从 0 增长至 10,000+。",
      ],
      [
        "2015.02 — 2017.09",
        "极链科技",
        "商务经理 · 直播事业部 · 上海",
        "拓展直播及互联网视频平台客户，推动 AI SaaS 产品商业化，策划直播创意内容与服务案例。",
      ],
    ],
    educationLabel: "教育与研究",
    education: [
      [
        "2023.09 — 2024.11",
        "兰卡斯特大学",
        "创业与创新硕士",
        "定性研究旅游消费中的社交需求。",
      ],
      ["2010.09 — 2014.07", "南昌航空大学科技学院", "英语专业学士", ""],
    ],
    aboutTitle: "我对很多事都好奇。",
    about:
      "我喜欢旅行、生活和新鲜事物。比起很快下判断，更愿意先走进一个地方，听听那里的故事，看看人们怎么生活。做品牌、研究产品的时候，我也习惯先这样做。",
    contactLabel: "05 / 保持联系",
    contactTitle: ["有想聊的事，", "就来找我。"],
    contactIntro: "工作机会、项目合作，或者关于 AI 和旅行的新想法，都欢迎。",
    wechat: "微信联系",
    wechatAlt: "程璐的微信联系二维码",
    email: "发送邮件",
    footer: "谢谢你看到这里。",
    top: "回到顶部",
    meta: "程璐 Cheng Lu｜品牌传播、AI 实践与文化体验",
    description:
      "程璐的个人作品集。10 年以上品牌传播与内容经验，涵盖品牌出海、海外达人营销、线下活动与展厅执行、AI 产品原型与旅行体验。",
  },
  en: {
    nav: ["Selected work", "AI practice", "Experience", "Let’s talk"],
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    enlarge: "View full image",
    eyebrow: "BRAND COMMUNICATIONS / CONTENT / AI",
    headline: ["CHENG", "LU"],
    intro: "A curious mind, working between strategy and feeling.",
    bio: "I’ve spent over a decade working with technology companies, industry media and creative businesses. I’m interested in what makes people care, and how that shapes a brand or an experience. Lately, I’ve also been using AI to research, build websites and try out ideas of my own.",
    tags: ["Brand & growth", "AI & product", "Travel & culture"],
    explore: "Explore my work",
    resume: "Résumé (中文 PDF)",
    portrait: "Cheng Lu outdoors",
    portraitNote: "Stay curious. Be there in person.",
    location: "SHANGHAI, CHINA / OPEN TO THE WORLD",
    stats: [
      ["10+ years", "Across brands, content & experiences"],
      ["0 → 100K+", "Followers in one year at Qunyu Mountain"],
      ["10M+", "Brand-topic views for a Wall’s campaign"],
    ],
    focusLabel: "01 / IN FOCUS",
    focusTitle: ["Across borders.", "Closer to people."],
    focusYear: "2026 · BRANDS GOING GLOBAL",
    focusIntro:
      "This year, my work has focused on helping brands reach international audiences — connecting overseas creator campaigns with the delivery of events and showroom experiences.",
    focusSteps: [
      [
        "Overseas creator campaigns",
        "Matching creators to communication goals and coordinating content partnerships and campaign delivery across Instagram, TikTok and YouTube.",
      ],
      [
        "Events on the ground",
        "Supporting preparation and on-site coordination to bring planned experiences to life.",
      ],
      [
        "Showroom delivery",
        "Supporting showroom execution, with attention to how the brand comes across in the space and its details.",
      ],
    ],
    focusCaption: "A moment at a brand activation · Illustrative project photo",
    focusAlt: "Guests posing together at an automotive brand activation",
    workLabel: "02 / SELECTED WORK",
    workTitle: "A few things I’ve worked on.",
    workIntro:
      "From a brand’s first story to a shared experience. A selection of projects I have helped shape and deliver.",
    projectDetail: "The thinking & my contribution",
    projects: [
      {
        id: "mountains",
        category: "BRAND STRATEGY / CONTENT GROWTH",
        client: "Qunyu Mountain Consulting",
        title: "Giving a new brand a voice worth remembering.",
        image: "mountains",
        alt: "Qunyu Mountain Consulting website and mountain imagery",
        metric: "0 → 100K+",
        metricLabel: "Account followers within one year",
        description:
          "Built a brand PR and content programme from the ground up, connecting founder perspectives, industry content and community relationships.",
        detail:
          "Developed the PR strategy and founder profile, building a network of 20+ specialist media accounts and 10+ official media outlets. Coordinated designers, vendors, clients and media to carry the brand through both content and events.",
      },
      {
        id: "walls",
        category: "CREATOR MARKETING / CONTENT OPTIMISATION",
        client: "Wall’s",
        title: "Finding the moment people want to watch.",
        image: "",
        alt: "",
        metric: "10M+",
        metricLabel: "Campaign brand-topic views",
        description:
          "Planned a mix of 100+ creators across four categories, refining creator selection and publishing schedules around content performance.",
        detail:
          "Shifted the creative focus from a “molten cheese centre” to a more visually engaging “cheese pull”, translating a product feature into a social-first creative direction. Views refer to the project’s brand topic.",
      },
      {
        id: "travel",
        category: "TRAVEL EXPERIENCE / AI PROTOTYPING",
        client: "Tieci Travel",
        title: "Making a city something you can take part in.",
        image: "travel",
        alt: "International visitors exploring local food culture in Shanghai",
        metric: "From route to product",
        metricLabel: "Research · Experience design · Content",
        description:
          "Shaped local Shanghai experiences for international visitors, translating food markets, cuisine and ceramics into accessible travel offerings.",
        detail:
          "Conducted qualitative research into the inbound travel market. Structured audience fit, itineraries, experience highlights and trust signals into AI-assisted product-page prototypes, with content across Xiaohongshu, Reddit, Instagram and YouTube.",
      },
      {
        id: "tibet",
        category: "CULTURAL RESEARCH / BRAND NARRATIVE",
        client: "Chando · Cultural research in Tibet",
        title: "Finding a brand story rooted in a real place.",
        image: "tibet",
        alt: "A group photograph during cultural fieldwork in Tibet",
        metric: "First-hand research",
        metricLabel: "Living heritage & brand storytelling",
        description:
          "Explored the cultural context of traditional Pangden weaving, connecting Himalayan craft with the brand’s Himalayan origins.",
        detail:
          "Studied materials, craft and everyday life to identify narrative threads. Translated cultural research into accessible brand value, providing a grounded basis for campaign storytelling.",
      },
      {
        id: "adquan",
        category: "INTEGRATED CAMPAIGNS / INDUSTRY COMMUNITY",
        client: "Adquan",
        title: "Turning industry connections into shared moments.",
        image: "adquan",
        alt: "A large-scale Adquan industry event",
        metric: "5+ events",
        metricLabel: "Major industry events planned & coordinated",
        description:
          "Brought together content, speakers, clients and live experiences through major industry events and cross-brand partnerships.",
        detail:
          "Worked on collaborations including Adquan × DXY and Adquan × Baidu, covering themes, content structure, partnerships and communications. Grew one client relationship from zero to RMB 1 million in business over two years.",
      },
      {
        id: "soul",
        category: "BRAND EXPERIENCE / EXHIBITION",
        client: "Soul",
        title: "Giving online emotions a physical space.",
        image: "soul",
        alt: "An immersive light installation at the Soul art exhibition",
        metric: "10,000+",
        metricLabel: "In-person exhibition participants",
        description:
          "Planned and delivered Soul’s first offline art exhibition, translating digital connections and emotional expression into a shared physical experience.",
        detail:
          "Worked across exhibition content, visitor experience, communication materials and on-site coordination, making an abstract brand feeling something people could explore, interact with and share.",
      },
    ],
    aiLabel: "03 / AI IN PRACTICE",
    aiTitle: ["Understand the problem.", "Then build something."],
    aiIntro:
      "I use AI to move research and ideas into tangible prototypes. My starting point is the person using the product: what do they need, and how can the experience be clearer and more useful?",
    aiSteps: [
      [
        "Understand",
        "Use market and qualitative research to identify what prevents people from understanding an offer or making a choice.",
      ],
      [
        "Structure",
        "Define the use case, information architecture and experience flow, breaking an idea into practical parts.",
      ],
      [
        "Prototype",
        "Build pages and interactive applications with AI, then review the content and journey in a working interface.",
      ],
    ],
    notebook: "FIELD NOTES / START WITH A HUMAN QUESTION",
    question: "“Is this experience right for me?”",
    notebookIntro:
      "A travel product page: turning a decision into a clear information structure.",
    flow: [
      ["WHO", "An international visitor discovering Shanghai"],
      ["NEED", "Understand a local experience and decide if it fits"],
      ["STRUCTURE", "Who it’s for → What happens → Reasons to trust"],
      ["OUTPUT", "An AI-assisted product-page prototype"],
    ],
    aiNote:
      "Explorations include travel pages, this portfolio, interactive applications and project knowledge systems.",
    aiLink: "Explore the travel case",
    experienceLabel: "04 / EXPERIENCE",
    experienceTitle: "The route so far.",
    experienceIntro:
      "A growing perspective across brands, technology and travel — from understanding a need to making things happen.",
    experience: [
      [
        "2026.01 — 2026.08",
        "Tieci Travel",
        "Marketing Manager · Remote",
        "Overseas creator campaigns; inbound travel research, experience design, AI-assisted product pages and social content.",
      ],
      [
        "2025.01 — 2025.12",
        "Independent",
        "Content & Campaign Planning · Shanghai",
        "Brand storytelling, creator campaigns and event delivery for Chando, Wall’s and travel projects. Helped Parallel Light gain 2,000+ early users in one month; the Hengsha Island project attracted 200+ participants and 100K+ views.",
      ],
      [
        "2024.10 — 2024.12",
        "SDG Changemaker",
        "Assistant Researcher · Remote",
        "English-language research on sustainable materials, community applications and circular economy models for international sustainable-business projects.",
      ],
      [
        "2022.01 — 2023.04",
        "Qunyu Mountain Consulting",
        "PR Director · Shanghai",
        "Established PR, content and founder-brand programmes from scratch, coordinating media, communities and brand events.",
      ],
      [
        "2020.12 — 2022.01",
        "SGAD",
        "PR Director · Shanghai",
        "Expanded consumer and technology media partnerships, developed content series and industry relationships, supported award submissions and corporate travel experiences.",
      ],
      [
        "2017.10 — 2020.10",
        "Adquan",
        "Senior Planning Manager · Shanghai",
        "Integrated campaigns and industry events. Grew Zhihu followers from 1,000 to 30,000 and a WeChat account from zero to 10,000+.",
      ],
      [
        "2015.02 — 2017.09",
        "Video++",
        "Business Manager, Live-streaming Division · Shanghai",
        "Developed platform partnerships and supported AI SaaS commercialisation, alongside creative live-streaming campaigns and client case studies.",
      ],
    ],
    educationLabel: "EDUCATION & RESEARCH",
    education: [
      [
        "2023.09 — 2024.11",
        "Lancaster University",
        "MSc Entrepreneurship and Innovation",
        "Qualitative research into social needs in travel consumption.",
      ],
      [
        "2010.09 — 2014.07",
        "Nanchang Hangkong University · College of Science and Technology",
        "BA English",
        "",
      ],
    ],
    aboutTitle: "Get closer. Understand more.",
    about:
      "I’m drawn to travel, local food and real people. A market, a showroom or an unfamiliar neighbourhood often reveals something a desk cannot. That curiosity shapes how I work.",
    contactLabel: "05 / GET IN TOUCH",
    contactTitle: ["SOMETHING", "IN MIND?"],
    contactIntro:
      "A brand, a new product, or a place more people should experience — let’s talk.",
    wechat: "Connect on WeChat",
    wechatAlt: "Cheng Lu’s WeChat contact QR code",
    email: "Send an email",
    footer: "Stay curious. Make it real.",
    top: "Back to top",
    meta: "Cheng Lu | Brands, AI & Cultural Experiences",
    description:
      "Cheng Lu’s portfolio. Over a decade in brand communications and content, with work spanning global creator campaigns, events, showrooms, AI prototyping and travel experiences.",
  },
};
