export default [
  {
    name: "title.dashboard",
    key: "Dashboard",
    children: [],
    permission: "dashboard",
    icon: "icon-icon-study-n",
  },
  {
    name: "title.decoration",
    key: "Decoration",
    icon: "icon-icon-decorate",
    children: [
      {
        name: "title.decoration_pc",
        key: "DecorationPC",
        permission: "viewBlock",
      },
      {
        name: "title.decoration_h5",
        key: "DecorationH5",
        permission: "viewBlock",
      },
      {
        name: "title.singlepage.index",
        key: "SinglePage",
        permission: "addons.SinglePage.page.list",
      },
    ],
  },
  {
    name: "title.resource",
    key: "Resource",
    icon: "icon-icon-file",
    children: [
      {
        name: "title.resource_videos",
        key: "ResourceVideos",
        permission: "media.video.list",
      },
    ],
  },
  {
    name: "title.coursename",
    key: "Course",
    icon: "icon-icon-lesson",
    children: [
      {
        name: "title.course.vod.index",
        key: "Vod",
        permission: "course",
      },
      {
        name: "title.live.name",
        key: "LiveCourse",
        permission: "addons.Zhibo.course.list",
      },
      {
        name: "title.meedubook.book.index",
        key: "Meedubook",
        permission: "addons.meedu_books.book.list",
      },
      {
        name: "title.topic.name",
        key: "Topic",
        permission: "addons.meedu_topics.topic.list",
      },
      {
        name: "title.course.xiaobanke.course.index",
        key: "K12Course",
        permission: "addons.XiaoBanKe.course.list",
      },
      {
        name: "title.learningpath.path.name",
        key: "LearningPath",
        permission: "addons.learnPaths.path.list",
      },
    ],
  },
  {
    name: "title.exam.name",
    key: "Exam",
    icon: "icon-icon-exam-n",
    children: [
      {
        name: "title.exam.question.name",
        key: "ExamQuestion",
        permission: "addons.Paper.question.list",
      },
      {
        name: "title.exam.paper.index",
        key: "ExamPaper",
        permission: "addons.Paper.paper.list",
      },
      {
        name: "title.exam.mockpaper.name",
        key: "ExamMockpaper",
        permission: "addons.Paper.mock_paper.list",
      },
      {
        name: "title.exam.practice.index",
        key: "ExamPractice",
        permission: "addons.Paper.practice.list",
      },
    ],
  },
  {
    name: "title.member.name",
    key: "Member",
    icon: "icon-icon-me-n",
    children: [
      {
        name: "title.member.index",
        key: "MemberIndex",
        permission: "member",
      },
      // {
      //   name: "title.snapshot.index",
      //   key: "SnapshotIndex",
      //   permission: "addons.Snapshot.images",
      // },
      {
        name: "title.certificate.index",
        key: "Certificate",
        permission: "addons.cert.list",
      },
    ],
  },
  {
    name: "title.finance",
    key: "Finance",
    icon: "icon-icon-money-n",
    children: [
      {
        name: "title.order",
        key: "Orderlist",
        permission: "order",
      },
      {
        name: "title.rechargeorder",
        key: "RechargeOrder",
        permission: "addons.TemplateOne.rechargeOrders.list",
      },
      {
        name: "title.withdrawOrders",
        key: "WithdrawOrders",
        permission: "addons.MultiLevelShare.withdraw.list",
      },
    ],
  },
  {
    name: "title.operate",
    key: "Operate",
    icon: "icon-icon-operate",
    children: [
      {
        name: "title.role",
        key: "Role",
        permission: "role",
      },
      {
        name: "title.creditMall.name",
        key: "CreditMall",
        permission: "addons.credit1Mall.goods.list",
      },
      {
        name: "title.tuangou.goods.index",
        key: "TuangouGoods",
        permission: "addons.TuanGou.goods.list",
      },
      {
        name: "title.miaosha.goods.index",
        key: "MiaoshaGoods",
        permission: "addons.MiaoSha.goods.list",
      },
      {
        name: "title.multi_level_share.goods.index",
        key: "ShareGoods",
        permission: "addons.MultiLevelShare.goods.list",
      },
      {
        name: "title.wenda.question.index",
        key: "Question",
        permission: "addons.Wenda.question.list",
      },
      {
        name: "title.codeExchanger.index",
        key: "CodeExchanger",
        permission: "addons.CodeExchanger.activity.list",
      },
      {
        name: "title.promocode",
        key: "Promocode",
        permission: "promoCode",
      },
      {
        name: "title.wechat.messagereply.index",
        key: "MessageReply",
        permission: "mpWechatMessageReply",
      },
    ],
  },
  {
    name: "title.stats.name",
    key: "Stats",
    icon: "icon-icon-data-n",
    children: [
      {
        name: "title.stats.transaction.name",
        key: "StatsTransaction",
        permission: "stats.transaction",
      },
      {
        name: "title.stats.course.name",
        key: "StatsContent",
        permission: "stats.course",
      },
      {
        name: "title.stats.member.name",
        key: "StatsMember",
        permission: "stats.user",
      },
    ],
  },
  {
    name: "title.system",
    key: "System",
    icon: "icon-icon-setting-n",
    children: [
      {
        name: "title.system-administrator",
        key: "SystemAdministrator",
        permission: "administrator",
      },
      {
        name: "title.system-config",
        key: "SystemIndex",
        permission: "setting",
      },
      {
        name: "title.system-log",
        key: "SystemLog",
        permission: "system-log",
      },
      {
        name: "title.system-application",
        key: "SystemApplication",
        permission: "super-slug",
      },
    ],
  },
];
