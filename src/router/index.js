import Vue from "vue";
import VueRouter from "vue-router";
import i18n from "@/js/i18n";
import index from "@/views/index/index";
import Utils from "@/js/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "title.login",
      pure: true,
    },
  },
  {
    path: "/dashboard",
    component: index,
    name: "Dashboard",
    meta: {
      title: "title.dashboard",
    },
  },
  {
    path: "/role",
    component: () => import("@/views/role/index"),
    name: "Role",
    meta: {
      title: "title.role",
      keepAlive: true,
    },
  },
  {
    path: "/addrole",
    component: () => import("@/views/role/create"),
    name: "Addrole",
    meta: {
      title: "title.role",
    },
  },
  {
    path: "/editrole",
    component: () => import("@/views/role/update"),
    name: "Editrole",
    meta: {
      title: "title.role",
    },
  },
  {
    path: "/resource/videos/index",
    component: () => import("@/views/resource/videos/index"),
    name: "ResourceVideos",
    meta: {
      title: "title.resource_videos",
      keepAlive: true,
    },
  },
  {
    path: "/order/index",
    component: () => import("@/views/order/index"),
    name: "Orderlist",
    meta: {
      title: "title.order",
      keepAlive: true,
    },
  },
  {
    path: "/order/detail",
    component: () => import("@/views/order/detail"),
    name: "OrderDetail",
    meta: {
      title: "title.order-detail",
    },
  },
  {
    path: "/order/refund",
    component: () => import("@/views/order/refund"),
    name: "OrderRefund",
    meta: {
      title: "title.order-refund",
      keepAlive: true,
    },
  },
  {
    path: "/order/recharge",
    component: () => import("@/views/order/recharge"),
    name: "RechargeOrder",
    meta: {
      title: "title.rechargeorder",
      keepAlive: true,
    },
  },
  {
    path: "/promocode",
    component: () => import("@/views/order/promocode"),
    name: "Promocode",
    meta: {
      title: "title.promocode",
      keepAlive: true,
    },
  },
  {
    path: "/createcode",
    component: () => import("@/views/order/create_code"),
    name: "Createcode",
    meta: {
      title: "title.promocodecreate",
    },
  },
  {
    path: "/createmulticode",
    component: () => import("@/views/order/createmulti_code"),
    name: "CreateMulticode",
    meta: {
      title: "title.promocode_export",
    },
  },
  {
    path: "/order/code-import",
    component: () => import("@/views/order/code-import"),
    name: "CodeImport",
    meta: {
      title: "title.promocode_import",
    },
  },
  {
    path: "/withdrawOrders",
    component: () => import("@/views/order/withdrawOrders"),
    name: "WithdrawOrders",
    meta: {
      title: "title.withdrawOrders",
      keepAlive: true,
    },
  },
  {
    path: "/systemLog/index",
    component: () => import("@/views/systemLog/index"),
    name: "SystemLog",
    meta: {
      title: "title.system-log",
    },
  },
  {
    path: "/system/index",
    component: () => import("@/views/system/index"),
    name: "SystemIndex",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/config",
    component: () => import("@/views/system/config"),
    name: "SystemConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/playerConfig",
    component: () => import("@/views/system/playerConfig"),
    name: "SystemPlayerConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/mp_wechatConfig",
    component: () => import("@/views/system/mp_wechatConfig"),
    name: "SystemMpwechatConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/creditSignConfig",
    component: () => import("@/views/system/creditSignConfig"),
    name: "SystemCreditSignConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/liveConfig",
    component: () => import("@/views/system/liveConfig"),
    name: "SystemLiveConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/messageConfig",
    component: () => import("@/views/system/messageConfig"),
    name: "SystemMessageConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/saveImagesConfig",
    component: () => import("@/views/system/saveImagesConfig"),
    name: "SystemSaveImagesConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/videoHlsConfig",
    component: () => import("@/views/system/videoHlsConfig"),
    name: "SystemVideoHlsConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/topicConfig",
    component: () => import("@/views/system/topicConfig"),
    name: "SystemTopicConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/bookConfig",
    component: () => import("@/views/system/bookConfig"),
    name: "SystemBookConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/paymentConfig",
    component: () => import("@/views/system/paymentConfig"),
    name: "SystemPaymentConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/videoSaveConfig",
    component: () => import("@/views/system/videoSaveConfig"),
    name: "SystemVideoSaveConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/iosConfig",
    component: () => import("@/views/system/iosConfig"),
    name: "SystemIOSConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/wechat_miniConfig",
    component: () => import("@/views/system/wechat_miniConfig"),
    name: "SystemWechatMiniConfig",
    meta: {
      title: "title.system-config",
    },
  },
  {
    path: "/system/application",
    component: () => import("@/views/system/application"),
    name: "SystemApplication",
    meta: {
      title: "title.system-application",
    },
  },
  {
    path: "/administrator/change-password",
    component: () => import("@/views/administrator/change-password"),
    name: "AdministratorChangePassword",
    meta: {
      title: "title.administrator.change-password",
    },
  },
  {
    path: "/system/administrator",
    component: () => import("@/views/system/administrator/index"),
    name: "SystemAdministrator",
    meta: {
      title: "title.system-administrator",
      keepAlive: true,
    },
  },
  {
    path: "/system/administrator/create",
    component: () => import("@/views/system/administrator/create"),
    name: "AdministratorCreate",
    meta: {
      title: "title.createadmin",
    },
  },
  {
    path: "/system/administrator/update",
    component: () => import("@/views/system/administrator/update"),
    name: "AdministratorUpdate",
    meta: {
      title: "title.updateadmin",
    },
  },
  {
    path: "/system/adminroles",
    component: () => import("@/views/system/adminroles/index"),
    name: "SystemAdminroles",
    meta: {
      title: "title.system-adminroles",
    },
  },
  {
    path: "/system/adminroles/create",
    component: () => import("@/views/system/adminroles/create"),
    name: "AdminrolesCreate",
    meta: {
      title: "title.createadminroles",
    },
  },
  {
    path: "/system/adminroles/update",
    component: () => import("@/views/system/adminroles/update"),
    name: "AdminrolesUpdate",
    meta: {
      title: "title.updateadminroles",
    },
  },
  {
    path: "/course/vod/index",
    component: () => import("@/views/course/vod/index"),
    name: "Vod",
    meta: {
      title: "title.course.vod.index",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/video-import",
    component: () => import("@/views/course/vod/video/import.vue"),
    name: "VodImport",
    meta: {
      title: "title.course.vod.video-import",
    },
  },
  {
    path: "/course/vod/create",
    component: () => import("@/views/course/vod/create"),
    name: "VodCreate",
    meta: {
      title: "title.course.vod.create",
    },
  },
  {
    path: "/course/vod/update",
    component: () => import("@/views/course/vod/update"),
    name: "VodUpdate",
    meta: {
      title: "title.course.vod.update",
    },
  },
  {
    path: "/course/vod/:id/view",
    component: () => import("@/views/course/vod/detail"),
    name: "VodView",
    meta: {
      title: "title.course.vod.detail",
    },
  },
  {
    path: "/course/vod/components/vod-comments",
    component: () => import("@/views/course/vod/components/vod-comments"),
    name: "CourseComments",
    meta: {
      title: "title.course.vod.comment",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/category/index",
    component: () => import("@/views/course/vod/category/index"),
    name: "CourseCategories",
    meta: {
      title: "title.course.vod.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/chapter/index",
    component: () => import("@/views/course/vod/chapter/index"),
    name: "CourseChapters",
    meta: {
      title: "title.course.vod.chapter.index",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/attach/index",
    component: () => import("@/views/course/vod/attach/index"),
    name: "CourseAttach",
    meta: {
      title: "title.course.vod.attach.index",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/attach/create",
    component: () => import("@/views/course/vod/attach/create"),
    name: "AttachCreate",
    meta: {
      title: "title.course.vod.attach.create",
    },
  },
  {
    path: "/course/vod/video/index",
    component: () => import("@/views/course/vod/video/index"),
    name: "CourseVideos",
    meta: {
      title: "title.course.vod.video.index",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/video/create",
    component: () => import("@/views/course/vod/video/create"),
    name: "VideosCreate",
    meta: {
      title: "title.course.vod.video.create",
    },
  },
  {
    path: "/course/vod/video/update",
    component: () => import("@/views/course/vod/video/update"),
    name: "VideosUpdate",
    meta: {
      title: "title.course.vod.video.update",
    },
  },
  {
    path: "/course/vod/video/subscribe",
    component: () => import("@/views/course/vod/video/subscribe"),
    name: "VideoSubscribe",
    meta: {
      title: "title.course.vod.video.subscribe",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/video/watch-records",
    component: () => import("@/views/course/vod/video/watch-records"),
    name: "VideoWatchRecords",
    meta: {
      title: "title.course.vod.video.watch-records",
      keepAlive: true,
    },
  },
  {
    path: "/course/vod/video/comments",
    component: () => import("@/views/course/vod/video/comments"),
    name: "VideoComments",
    meta: {
      title: "title.course.vod.video.comments",
      keepAlive: true,
    },
  },
  {
    path: "/certificate/index",
    component: () => import("@/views/certificate/index"),
    name: "Certificate",
    meta: {
      title: "title.certificate.index",
      keepAlive: true,
    },
  },
  {
    path: "/certificate/create",
    component: () => import("@/views/certificate/create"),
    name: "CertificateCreate",
    meta: {
      title: "title.certificate.create",
      pure: true,
    },
  },
  {
    path: "/certificate/update",
    component: () => import("@/views/certificate/update"),
    name: "CertificateUpdate",
    meta: {
      title: "title.certificate.update",
      pure: true,
    },
  },
  {
    path: "/certificate/users",
    component: () => import("@/views/certificate/users"),
    name: "CertificateUsers",
    meta: {
      title: "title.certificate.users",
      keepAlive: true,
    },
  },
  {
    path: "/singlepage/index",
    component: () => import("@/views/singlepage/page/index"),
    name: "SinglePage",
    meta: {
      title: "title.singlepage.index",
      keepAlive: true,
    },
  },
  {
    path: "/singlepage/create",
    component: () => import("@/views/singlepage/page/create"),
    name: "SinglePageCreate",
    meta: {
      title: "title.singlepage.create",
    },
  },
  {
    path: "/singlepage/update",
    component: () => import("@/views/singlepage/page/update"),
    name: "SinglePageUpdate",
    meta: {
      title: "title.singlepage.update",
    },
  },
  {
    path: "/meedubook/book/index",
    component: () => import("@/views/meedubook/book/index"),
    name: "Meedubook",
    meta: {
      title: "title.meedubook.book.index",
      keepAlive: true,
    },
  },
  {
    path: "/meedubook/book/create",
    component: () => import("@/views/meedubook/book/create"),
    name: "MeedubookCreate",
    meta: {
      title: "title.meedubook.book.create",
    },
  },
  {
    path: "/meedubook/book/update",
    component: () => import("@/views/meedubook/book/update"),
    name: "MeedubookUpdate",
    meta: {
      title: "title.meedubook.book.update",
    },
  },
  {
    path: "/meedubook/book/comment",
    component: () => import("@/views/meedubook/book/comment"),
    name: "MeedubookComment",
    meta: {
      title: "title.meedubook.book.comment",
      keepAlive: true,
    },
  },
  {
    path: "/meedubook/book/users",
    component: () => import("@/views/meedubook/book/users"),
    name: "MeedubookUsers",
    meta: {
      title: "title.meedubook.book.users",
      keepAlive: true,
    },
  },
  {
    path: "/meedubook/category/index",
    component: () => import("@/views/meedubook/book/category/index"),
    name: "MeedubookCategory",
    meta: {
      title: "title.meedubook.book.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/meedubook/chapter/index",
    component: () => import("@/views/meedubook/book/chapter/index"),
    name: "MeedubookChapter",
    meta: {
      title: "title.meedubook.book.chapter.index",
      keepAlive: true,
    },
  },
  {
    path: "/meedubook/article/index",
    component: () => import("@/views/meedubook/book/article/index"),
    name: "MeedubookArticle",
    meta: {
      title: "title.meedubook.book.article.index",
      keepAlive: true,
    },
  },
  {
    path: "/meedubook/article/create",
    component: () => import("@/views/meedubook/book/article/create"),
    name: "MeedubookArticleCreate",
    meta: {
      title: "title.meedubook.book.article.create",
    },
  },
  {
    path: "/meedubook/article/update",
    component: () => import("@/views/meedubook/book/article/update"),
    name: "MeedubookArticleUpdate",
    meta: {
      title: "title.meedubook.book.article.update",
    },
  },
  {
    path: "/meedubook/article/comment",
    component: () => import("@/views/meedubook/book/article/comment"),
    name: "MeedubookArticleComment",
    meta: {
      title: "title.meedubook.book.article.comment",
      keepAlive: true,
    },
  },
  {
    path: "/member/index",
    component: () => import("@/views/member/index"),
    name: "MemberIndex",
    meta: {
      title: "title.member.index",
      keepAlive: true,
    },
  },
  {
    path: "/member/import",
    component: () => import("@/views/member/user-import"),
    name: "MemberImport",
    meta: {
      title: "title.member.import",
    },
  },
  {
    path: "/member/profile",
    component: () => import("@/views/member/profile"),
    name: "MemberProfile",
    meta: {
      title: "title.member.profile",
    },
  },
  {
    path: "/member/:userId",
    component: () => import("@/views/member/detail"),
    name: "MemberDetail",
    meta: {
      title: "title.member.detail",
    },
  },
  {
    path: "/member/tag/index",
    component: () => import("@/views/member/tag/index"),
    name: "MemberTagIndex",
    meta: {
      title: "title.member.tag.index",
    },
  },
  {
    path: "/member/tag/create",
    component: () => import("@/views/member/tag/create"),
    name: "MemberTagCreate",
    meta: {
      title: "title.member.tag.create",
    },
  },
  {
    path: "/member/tag/:id",
    component: () => import("@/views/member/tag/edit"),
    name: "MemberTagEdit",
    meta: {
      title: "title.member.tag.edit",
    },
  },
  {
    path: "/wechat/messagereply/index",
    component: () => import("@/views/wechat/messagereply/index"),
    name: "MessageReply",
    meta: {
      title: "title.wechat.messagereply.index",
      keepAlive: true,
    },
  },
  {
    path: "/wechat/messagereply/create",
    component: () => import("@/views/wechat/messagereply/create"),
    name: "ReplyCreate",
    meta: {
      title: "title.wechat.messagereply.create",
    },
  },
  {
    path: "/wechat/messagereply/update",
    component: () => import("@/views/wechat/messagereply/update"),
    name: "ReplyUpdate",
    meta: {
      title: "title.wechat.messagereply.update",
    },
  },
  {
    path: "/wenda/question/index",
    component: () => import("@/views/wenda/question/index"),
    name: "Question",
    meta: {
      title: "title.wenda.question.index",
      keepAlive: true,
    },
  },
  {
    path: "/wenda/question/answer",
    component: () => import("@/views/wenda/question/answer"),
    name: "QuestionAnswer",
    meta: {
      title: "title.wenda.question.answer",
      keepAlive: true,
    },
  },
  {
    path: "/wenda/question/comment",
    component: () => import("@/views/wenda/question/comment"),
    name: "QuestionComment",
    meta: {
      title: "title.wenda.question.comment",
    },
  },
  {
    path: "/wenda/question/category/index",
    component: () => import("@/views/wenda/question/category/index"),
    name: "QuestionCategory",
    meta: {
      title: "title.wenda.question.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/wenda/question/category/create",
    component: () => import("@/views/wenda/question/category/create"),
    name: "QuestionCategoryCreate",
    meta: {
      title: "title.wenda.question.category.create",
    },
  },
  {
    path: "/wenda/question/category/update",
    component: () => import("@/views/wenda/question/category/update"),
    name: "QuestionCategoryUpdate",
    meta: {
      title: "title.wenda.question.category.update",
    },
  },
  {
    path: "/miaosha/orders/index",
    component: () => import("@/views/miaosha/orders/index"),
    name: "MiaoshaOrders",
    meta: {
      title: "title.miaosha.orders.index",
      keepAlive: true,
    },
  },
  {
    path: "/miaosha/goods/index",
    component: () => import("@/views/miaosha/goods/index"),
    name: "MiaoshaGoods",
    meta: {
      title: "title.miaosha.goods.index",
      keepAlive: true,
    },
  },
  {
    path: "/miaosha/goods/create",
    component: () => import("@/views/miaosha/goods/create"),
    name: "MiaoshaGoodsCreate",
    meta: {
      title: "title.miaosha.goods.create",
    },
  },
  {
    path: "/miaosha/goods/update",
    component: () => import("@/views/miaosha/goods/update"),
    name: "MiaoshaGoodsUpdate",
    meta: {
      title: "title.miaosha.goods.update",
    },
  },
  {
    path: "/tuangou/goods/index",
    component: () => import("@/views/tuangou/goods/index"),
    name: "TuangouGoods",
    meta: {
      title: "title.tuangou.goods.index",
      keepAlive: true,
    },
  },
  {
    path: "/tuangou/goods/create",
    component: () => import("@/views/tuangou/goods/create"),
    name: "TuangouGoodsCreate",
    meta: {
      title: "title.tuangou.goods.create",
    },
  },
  {
    path: "/tuangou/goods/update",
    component: () => import("@/views/tuangou/goods/update"),
    name: "TuangouGoodsUpdate",
    meta: {
      title: "title.tuangou.goods.update",
    },
  },
  {
    path: "/tuangou/goods/detail",
    component: () => import("@/views/tuangou/goods/detail"),
    name: "TuangouGoodsDetail",
    meta: {
      title: "title.tuangou.goods.detail",
    },
  },
  {
    path: "/tuangou/goods/order",
    component: () => import("@/views/tuangou/goods/order"),
    name: "TuangouGoodsOrder",
    meta: {
      title: "title.tuangou.goods.order",
      keepAlive: true,
    },
  },
  {
    path: "/tuangou/goods/refund",
    component: () => import("@/views/tuangou/goods/refund"),
    name: "TuangouGoodsRefund",
    meta: {
      title: "title.tuangou.goods.refund",
    },
  },
  {
    path: "/tuangou/goods/tuanorder",
    component: () => import("@/views/tuangou/goods/tuanorder"),
    name: "TuangouGoodsTuanorder",
    meta: {
      title: "title.tuangou.goods.tuanorder",
    },
  },
  {
    path: "/learningpath/path/index",
    component: () => import("@/views/learningpath/path/index"),
    name: "LearningPath",
    meta: {
      title: "title.learningpath.path.index",
      keepAlive: true,
    },
  },
  {
    path: "/learningpath/path/create",
    component: () => import("@/views/learningpath/path/create"),
    name: "LearningPathCreate",
    meta: {
      title: "title.learningpath.path.create",
    },
  },
  {
    path: "/learningpath/path/update",
    component: () => import("@/views/learningpath/path/update"),
    name: "LearningPathUpdate",
    meta: {
      title: "title.learningpath.path.update",
    },
  },
  {
    path: "/learningpath/path/category/index",
    component: () => import("@/views/learningpath/path/category/index"),
    name: "LearningPathCategories",
    meta: {
      title: "title.learningpath.path.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/learningpath/path/user",
    component: () => import("@/views/learningpath/path/user"),
    name: "LearningUser",
    meta: {
      title: "title.learningpath.path.user",
      keepAlive: true,
    },
  },
  {
    path: "/learningpath/step/index",
    component: () => import("@/views/learningpath/step/index"),
    name: "LearningStep",
    meta: {
      title: "title.learningpath.step.index",
      keepAlive: true,
    },
  },
  {
    path: "/learningpath/step/create",
    component: () => import("@/views/learningpath/step/create"),
    name: "LearningStepCreate",
    meta: {
      title: "title.learningpath.step.create",
    },
  },
  {
    path: "/learningpath/step/update",
    component: () => import("@/views/learningpath/step/update"),
    name: "LearningStepUpdate",
    meta: {
      title: "title.learningpath.step.update",
    },
  },
  {
    path: "/learningpath/step/relation/index",
    component: () => import("@/views/learningpath/step/relation/index"),
    name: "Steprelation",
    meta: {
      title: "title.learningpath.step.relation.index",
      keepAlive: true,
    },
  },
  {
    path: "/learningpath/step/relation/create",
    component: () => import("@/views/learningpath/step/relation/create"),
    name: "SteprelationCreate",
    meta: {
      title: "title.learningpath.step.relation.create",
    },
  },
  {
    path: "/learningpath/step/relation/update",
    component: () => import("@/views/learningpath/step/relation/update"),
    name: "SteprelationUpdate",
    meta: {
      title: "title.learningpath.step.relation.update",
    },
  },
  {
    path: "/multi_level_share/poster/index",
    component: () => import("@/views/multi_level_share/poster/index"),
    name: "MultiPoster",
    meta: {
      title: "title.multi_level_share.poster.index",
    },
  },
  {
    path: "/multi_level_share/poster/create",
    component: () => import("@/views/multi_level_share/poster/create"),
    name: "MultiPosterCreate",
    meta: {
      title: "title.multi_level_share.poster.create",
    },
  },
  {
    path: "/multi_level_share/poster/update",
    component: () => import("@/views/multi_level_share/poster/update"),
    name: "MultiPosterUpdate",
    meta: {
      title: "title.multi_level_share.poster.update",
    },
  },
  {
    path: "/multi_level_share/goods/index",
    component: () => import("@/views/multi_level_share/goods/index"),
    name: "ShareGoods",
    meta: {
      title: "title.multi_level_share.goods.index",
    },
  },
  {
    path: "/multi_level_share/goods/create",
    component: () => import("@/views/multi_level_share/goods/create"),
    name: "ShareGoodsCreate",
    meta: {
      title: "title.multi_level_share.goods.create",
    },
  },
  {
    path: "/multi_level_share/goods/update",
    component: () => import("@/views/multi_level_share/goods/update"),
    name: "ShareGoodsUpdate",
    meta: {
      title: "title.multi_level_share.goods.update",
    },
  },
  {
    path: "/multi_level_share/goods/rewards",
    component: () => import("@/views/multi_level_share/goods/rewards"),
    name: "ShareGoodsRewards",
    meta: {
      title: "title.multi_level_share.goods.rewards",
    },
  },
  {
    path: "/live/teacher/index",
    component: () => import("@/views/live/teacher/index"),
    name: "LiveTeacher",
    meta: {
      title: "title.live.teacher.index",
      keepAlive: true,
    },
  },
  {
    path: "/live/course/index",
    component: () => import("@/views/live/course/index"),
    name: "LiveCourse",
    meta: {
      title: "title.live.course.index",
      keepAlive: true,
    },
  },
  {
    path: "/live/course/create",
    component: () => import("@/views/live/course/create"),
    name: "LiveCourseCreate",
    meta: {
      title: "title.live.course.create",
    },
  },
  {
    path: "/live/course/update",
    component: () => import("@/views/live/course/update"),
    name: "LiveCourseUpdate",
    meta: {
      title: "title.live.course.update",
    },
  },
  {
    path: "/live/course/comment",
    component: () => import("@/views/live/course/comment"),
    name: "LiveCourseComment",
    meta: {
      title: "title.live.course.comment",
      keepAlive: true,
    },
  },
  {
    path: "/live/course/category/index",
    component: () => import("@/views/live/course/category/index"),
    name: "LiveCourseCategory",
    meta: {
      title: "title.live.course.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/live/course/chapter/index",
    component: () => import("@/views/live/course/chapter/index"),
    name: "LiveCourseChapter",
    meta: {
      title: "title.live.course.chapter.index",
      keepAlive: true,
    },
  },
  {
    path: "/live/course/users/index",
    component: () => import("@/views/live/course/users/index"),
    name: "LiveCourseUsers",
    meta: {
      title: "title.live.course.users.index",
      keepAlive: true,
    },
  },
  {
    path: "/live/course/video/index",
    component: () => import("@/views/live/course/video/index"),
    name: "LiveCourseVideo",
    meta: {
      title: "title.live.course.video.index",
      keepAlive: true,
    },
  },
  {
    path: "/live/course/video/create",
    component: () => import("@/views/live/course/video/create"),
    name: "LiveCourseVideoCreate",
    meta: {
      title: "title.live.course.video.create",
    },
  },
  {
    path: "/live/course/video/update",
    component: () => import("@/views/live/course/video/update"),
    name: "LiveCourseVideoUpdate",
    meta: {
      title: "title.live.course.video.update",
    },
  },
  {
    path: "/codeExchanger/index",
    component: () => import("@/views/codeExchanger/index"),
    name: "CodeExchanger",
    meta: {
      title: "title.codeExchanger.index",
      keepAlive: true,
    },
  },
  {
    path: "/codeExchanger/create",
    component: () => import("@/views/codeExchanger/create"),
    name: "CodeExchangerCreate",
    meta: {
      title: "title.codeExchanger.create",
    },
  },
  {
    path: "/codeExchanger/update",
    component: () => import("@/views/codeExchanger/update"),
    name: "CodeExchangerUpdate",
    meta: {
      title: "title.codeExchanger.update",
    },
  },
  {
    path: "/codeExchanger/codes",
    component: () => import("@/views/codeExchanger/codes"),
    name: "CodeExchangerCodes",
    meta: {
      title: "title.codeExchanger.codes",
      keepAlive: true,
    },
  },
  {
    path: "/topic/index",
    component: () => import("@/views/topic/index"),
    name: "Topic",
    meta: {
      title: "title.topic.index",
      keepAlive: true,
    },
  },
  {
    path: "/topic/create",
    component: () => import("@/views/topic/create"),
    name: "TopicCreate",
    meta: {
      title: "title.topic.create",
    },
  },
  {
    path: "/topic/update",
    component: () => import("@/views/topic/update"),
    name: "TopicUpdate",
    meta: {
      title: "title.topic.update",
    },
  },
  {
    path: "/topic/category/index",
    component: () => import("@/views/topic/category/index"),
    name: "TopicCategory",
    meta: {
      title: "title.topic.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/topic/comment",
    component: () => import("@/views/topic/comment"),
    name: "TopicComment",
    meta: {
      title: "title.topic.comment",
      keepAlive: true,
    },
  },
  {
    path: "/topic/order",
    component: () => import("@/views/topic/order"),
    name: "TopicOrder",
    meta: {
      title: "title.topic.order",
      keepAlive: true,
    },
  },
  {
    path: "/exam/paper/paperShow",
    component: () => import("@/views/exam/paper/paperShow"),
    name: "ExamPaperShow",
    meta: {
      title: "查看考试",
    },
  },
  {
    path: "/exam/paper/index",
    component: () => import("@/views/exam/paper/index"),
    name: "ExamPaper",
    meta: {
      title: "title.exam.paper.index",
      keepAlive: true,
    },
  },
  {
    path: "/exam/paper/create",
    component: () => import("@/views/exam/paper/create"),
    name: "ExamPaperCreate",
    meta: {
      title: "title.exam.paper.create",
    },
  },
  {
    path: "/exam/paper/update",
    component: () => import("@/views/exam/paper/update"),
    name: "ExamPaperUpdate",
    meta: {
      title: "title.exam.paper.update",
    },
  },
  {
    path: "/exam/paper/category/index",
    component: () => import("@/views/exam/paper/category/index"),
    name: "PaperCategories",
    meta: {
      title: "title.exam.paper.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/exam/paper/marking",
    component: () => import("@/views/exam/paper/marking"),
    name: "ExamPaperScore",
    meta: {
      title: "title.exam.paper.marking",
    },
  },
  {
    path: "/exam/paper/question",
    component: () => import("@/views/exam/paper/question"),
    name: "ExamPaperQuestion",
    meta: {
      title: "title.exam.paper.question",
      keepAlive: true,
    },
  },
  {
    path: "/exam/paper/questionadd",
    component: () => import("@/views/exam/paper/questionadd"),
    name: "ExamPaperQuestionCreate",
    meta: {
      title: "title.exam.paper.questionadd",
      keepAlive: true,
    },
  },
  {
    path: "/exam/practice/index",
    component: () => import("@/views/exam/practice/index"),
    name: "ExamPractice",
    meta: {
      title: "title.exam.practice.index",
      keepAlive: true,
    },
  },
  {
    path: "/exam/practice/create",
    component: () => import("@/views/exam/practice/create"),
    name: "ExamPracticeCreate",
    meta: {
      title: "title.exam.practice.create",
    },
  },
  {
    path: "/exam/practice/update",
    component: () => import("@/views/exam/practice/update"),
    name: "ExamPracticeUpdate",
    meta: {
      title: "title.exam.practice.update",
    },
  },
  {
    path: "/exam/practice/chapter/index",
    component: () => import("@/views/exam/practice/chapter/index"),
    name: "PracticeChapter",
    meta: {
      title: "title.exam.practice.chapter.index",
      keepAlive: true,
    },
  },
  {
    path: "/exam/practice/chapter/create",
    component: () => import("@/views/exam/practice/chapter/create"),
    name: "PracticeChapterCreate",
    meta: {
      title: "title.exam.practice.chapter.create",
    },
  },
  {
    path: "/exam/practice/chapter/update",
    component: () => import("@/views/exam/practice/chapter/update"),
    name: "PracticeChapterUpdate",
    meta: {
      title: "title.exam.practice.chapter.update",
    },
  },
  {
    path: "/exam/practice/chapter/question/index",
    component: () => import("@/views/exam/practice/chapter/question/index"),
    name: "PracticeChapterQuestion",
    meta: {
      title: "title.exam.practice.chapter.question.index",
      keepAlive: true,
    },
  },
  {
    path: "/exam/practice/chapter/question/create",
    component: () => import("@/views/exam/practice/chapter/question/create"),
    name: "PracticeChapterQuestionCreate",
    meta: {
      title: "title.exam.practice.chapter.question.create",
    },
  },
  {
    path: "/exam/practice/user",
    component: () => import("@/views/exam/practice/user"),
    name: "PracticeUser",
    meta: {
      title: "title.exam.practice.user",
      keepAlive: true,
    },
  },
  {
    path: "/exam/paper/user",
    component: () => import("@/views/exam/paper/user"),
    name: "PaperUser",
    meta: {
      title: "title.exam.paper.user",
    },
  },
  {
    path: "/exam/practice/progress",
    component: () => import("@/views/exam/practice/progress"),
    name: "PracticeProgress",
    meta: {
      title: "title.exam.practice.progress",
      keepAlive: true,
    },
  },
  {
    path: "/exam/mockpaper/index",
    component: () => import("@/views/exam/mockpaper/index"),
    name: "ExamMockpaper",
    meta: {
      title: "title.exam.mockpaper.index",
      keepAlive: true,
    },
  },
  {
    path: "/exam/mockpaper/paperShow",
    component: () => import("@/views/exam/mockpaper/paperShow"),
    name: "ExamMockpaperShow",
    meta: {
      title: "查看模拟考试",
    },
  },
  {
    path: "/exam/mockpaper/create",
    component: () => import("@/views/exam/mockpaper/create"),
    name: "ExamMockpaperCreate",
    meta: {
      title: "title.exam.mockpaper.create",
    },
  },
  {
    path: "/exam/mockpaper/update",
    component: () => import("@/views/exam/mockpaper/update"),
    name: "ExamMockpaperUpdate",
    meta: {
      title: "title.exam.mockpaper.update",
    },
  },
  {
    path: "/exam/mockpaper/user",
    component: () => import("@/views/exam/mockpaper/user"),
    name: "MockpaperUser",
    meta: {
      title: "title.exam.mockpaper.user",
    },
  },
  {
    path: "/exam/question/index",
    component: () => import("@/views/exam/question/index"),
    name: "ExamQuestion",
    meta: {
      title: "title.exam.question.index",
      keepAlive: true,
    },
  },
  {
    path: "/exam/question/create",
    component: () => import("@/views/exam/question/create"),
    name: "ExamQuestionCreate",
    meta: {
      title: "title.exam.question.create",
    },
  },
  {
    path: "/exam/question/update",
    component: () => import("@/views/exam/question/update"),
    name: "ExamQuestionUpdate",
    meta: {
      title: "title.exam.question.update",
    },
  },
  {
    path: "/exam/question/import",
    component: () => import("@/views/exam/question/import"),
    name: "ExamQuestionImport",
    meta: {
      title: "title.exam.question.import",
    },
  },
  {
    path: "/exam/question/category/index",
    component: () => import("@/views/exam/question/category/index"),
    name: "ExamQuestionCategories",
    meta: {
      title: "title.exam.question.category.index",
      keepAlive: true,
    },
  },
  {
    path: "/decoration/mp-wechat-menu",
    name: "MpWechatMenu",
    component: () => import("@/views/decoration/mp-wechat-menu.vue"),
    meta: {
      title: "微信公众号菜单",
    },
  },
  {
    path: "/snapshot/index",
    component: () => import("@/views/snapshot/index"),
    name: "SnapshotIndex",
    meta: {
      title: "title.snapshot.index",
      keepAlive: true,
    },
  },
  {
    path: "/snapshot/images",
    component: () => import("@/views/snapshot/images"),
    name: "SnapshotImages",
    meta: {
      title: "title.snapshot.images",
    },
  },
  {
    path: "/course/vod/video/hls/aliyun",
    component: () => import("@/views/course/video/aliyun-hls"),
    name: "CourseVodVideoAliyunHls",
    meta: {
      title: "title.course.vod.video.hls.aliyun",
    },
  },
  {
    path: "/course/vod/video/hls/tencent",
    component: () => import("@/views/course/video/tencent-hls"),
    name: "CourseVodVideoTencentHls",
    meta: {
      title: "title.course.vod.video.hls.tencent",
    },
  },
  {
    path: "/K12/XiaoBanKe/teacher/index",
    component: () => import("@/views/course/K12/teacher/index"),
    name: "K12Teacher",
    meta: {
      title: "title.course.xiaobanke.teacher.index",
      keepAlive: true,
    },
  },
  {
    path: "/K12/XiaoBanKe/teacher/create",
    component: () => import("@/views/course/K12/teacher/create"),
    name: "K12TeacherCreate",
    meta: {
      title: "title.course.xiaobanke.teacher.create",
    },
  },
  {
    path: "/K12/XiaoBanKe/teacher/update",
    component: () => import("@/views/course/K12/teacher/update"),
    name: "K12TeacherUpdate",
    meta: {
      title: "title.course.xiaobanke.teacher.update",
    },
  },
  {
    path: "/K12/XiaoBanKe/course/index",
    component: () => import("@/views/course/K12/course/index"),
    name: "K12Course",
    meta: {
      title: "title.course.xiaobanke.course.index",
      keepAlive: true,
    },
  },
  {
    path: "/K12/XiaoBanKe/course/create",
    component: () => import("@/views/course/K12/course/create"),
    name: "K12CourseCreate",
    meta: {
      title: "title.course.xiaobanke.course.create",
    },
  },
  {
    path: "/K12/XiaoBanKe/course/update",
    component: () => import("@/views/course/K12/course/update"),
    name: "K12CourseUpdate",
    meta: {
      title: "title.course.xiaobanke.course.update",
    },
  },
  {
    path: "/K12/XiaoBanKe/categories/index",
    component: () => import("@/views/course/K12/categories/index"),
    name: "K12Categories",
    meta: {
      title: "title.course.xiaobanke.categories.index",
      keepAlive: true,
    },
  },
  {
    path: "/K12/XiaoBanKe/order/index",
    component: () => import("@/views/course/K12/order/index"),
    name: "K12CourseOrder",
    meta: {
      title: "title.course.xiaobanke.order.index",
      keepAlive: true,
    },
  },
  {
    path: "/K12/XiaoBanKe/order/teacher",
    component: () => import("@/views/course/K12/order/teacher"),
    name: "K12CourseOrderTeacher",
    meta: {
      title: "title.course.xiaobanke.order.teacher",
    },
  },
  {
    path: "/decoration/h5",
    name: "DecorationH5",
    component: () => import("@/views/decoration/h5.vue"),
    meta: {
      title: "移动端装修",
      pure: true,
    },
  },
  {
    path: "/decoration/pc",
    name: "DecorationPC",
    component: () => import("@/views/decoration/pc.vue"),
    meta: {
      title: "电脑端装修",
      pure: true,
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test/test.vue"),
    meta: {
      title: "Test",
      pure: true,
    },
  },
  {
    path: "/creditMall/index",
    component: () => import("@/views/creditMall/index"),
    name: "CreditMall",
    meta: {
      title: "title.creditMall.index",
      keepAlive: true,
    },
  },
  {
    path: "/creditMall/create",
    component: () => import("@/views/creditMall/create"),
    name: "CreditMallCreate",
    meta: {
      title: "title.creditMall.create",
    },
  },
  {
    path: "/creditMall/update",
    component: () => import("@/views/creditMall/update"),
    name: "CreditMallUpdate",
    meta: {
      title: "title.creditMall.update",
    },
  },
  {
    path: "/creditMall/orders/index",
    component: () => import("@/views/creditMall/orders/index"),
    name: "CreditMallOrders",
    meta: {
      title: "title.creditMall.orders.index",
      keepAlive: true,
    },
  },
  {
    path: "/creditMall/orders/update",
    component: () => import("@/views/creditMall/orders/update"),
    name: "CreditMallOrdersUpdate",
    meta: {
      title: "title.creditMall.orders.update",
    },
  },
  {
    path: "/creditMall/orders/send",
    component: () => import("@/views/creditMall/orders/send"),
    name: "CreditMallOrdersSend",
    meta: {
      title: "title.creditMall.orders.send",
    },
  },
  {
    path: "/stats/member/index",
    component: () => import("@/views/stats/member/index"),
    name: "StatsMember",
    meta: {
      title: "title.stats.member.index",
    },
  },
  {
    path: "/stats/transaction/index",
    component: () => import("@/views/stats/transaction/index"),
    name: "StatsTransaction",
    meta: {
      title: "title.stats.transaction.index",
    },
  },
  {
    path: "/stats/content/index",
    component: () => import("@/views/stats/content/index"),
    name: "StatsContent",
    meta: {
      title: "title.stats.course.index",
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 设置标题
  document.title = i18n.t(to.meta.title);

  if (to.name !== "Login" && !Utils.getToken()) {
    router.replace({
      name: "Login",
    });
  } else {
    next();
  }
});

export default router;
