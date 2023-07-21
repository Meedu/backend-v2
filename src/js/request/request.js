import { get, post, put, destroy } from "./http";

const Api = {
  Auth: {
    Login(params) {
      return post("/backend/api/v1/login", params);
    },
    Logout(params) {
      return post("/backend/api/v1/logout", params);
    },
    Captcha() {
      return get(`/backend/api/v1/captcha/image`);
    },
  },
  Administrator: {
    Detail() {
      return get(`/backend/api/v1/user`);
    },
    ChangePassword(params) {
      return put(`/backend/api/v1/administrator/password`, params);
    },
  },
  Dashboard: {
    Index() {
      return get(`/backend/api/v1/dashboard`);
    },
    SystemInfo() {
      return get(`/backend/api/v1/dashboard/system/info`);
    },
  },
  Resource: {
    VideosList(params) {
      return get(`/backend/api/v1/media/videos/index`, params);
    },
    VideosDestroyMulti(params) {
      return post(`/backend/api/v1/media/videos/delete/multi`, params);
    },
    AliyunTranscode(params) {
      return post(`/backend/addons/AliyunHls/transcode-submit`, params);
    },
    AliyunTranscodeRecords(params) {
      return get(`/backend/addons/AliyunHls/transcode-records`, params);
    },
    TencentTranscode(params) {
      return post(`/backend/addons/TencentCloudHls/transcode-submit`, params);
    },
    TencentTranscodeRecords(params) {
      return get(`/backend/addons/TencentCloudHls/transcode-records`, params);
    },
  },
  Stat: {
    Statistic(params) {
      return get(`/backend/api/v1/dashboard/graph`, params);
    },
  },
  Role: {
    List(params) {
      return get(`/backend/api/v1/role`, params);
    },
    Destory(id) {
      return destroy(`/backend/api/v1/role/${id}`);
    },
    Create(params) {
      return post(`/backend/api/v1/role`, params);
    },
    Detail(id) {
      return get(`/backend/api/v1/role/${id}`);
    },
    Update(id, params) {
      return put(`/backend/api/v1/role/${id}`, params);
    },
  },
  Order: {
    OrderList: {
      List(params) {
        return get(`/backend/api/v1/order`, params);
      },
      Refund(id, params) {
        return post(`/backend/api/v1/order/${id}/refund`, params);
      },
    },
    RefundList(params) {
      return get(`/backend/api/v1/order/refund/list`, params);
    },
    RefundDestory(id) {
      return destroy(`/backend/api/v1/order/refund/${id}`);
    },
    Detail(id) {
      return get(`/backend/api/v1/order/${id}`);
    },
    SetPaid(id) {
      return get(`/backend/api/v1/order/${id}/finish`);
    },
    RechargeOrders(params) {
      return get(`/backend/addons/TemplateOne/recharge/orders`, params);
    },
    PromoCode: {
      PromoCode(params) {
        return get(`/backend/api/v1/promoCode`, params);
      },
      DestroyMulti(params) {
        return post(`/backend/api/v1/promoCode/delete/multi`, params);
      },
      Create(params) {
        return post(`/backend/api/v1/promoCode`, params);
      },
      CreateMulti(params) {
        return post(`/backend/api/v1/promoCode/generator`, params);
      },
      Import(params) {
        return post(`/backend/api/v1/promoCode/import`, params);
      },
    },
    WithdrawOrders: {
      WithdrawOrders(params) {
        return get(`/backend/addons/multi_level_share/withdraw/index`, params);
      },
      Submit(params) {
        return post(
          `/backend/addons/multi_level_share/withdraw/handle`,
          params
        );
      },
    },
  },
  Media: {
    Image: {
      List(params) {
        return get(`/backend/api/v1/media/images`, params);
      },
    },
    Video: {
      List(params) {
        return get(`/backend/api/v1/media/videos/index`, params);
      },
      Store(params) {
        return post(`/backend/api/v1/media/videos/create`, params);
      },
      Destroy(params) {
        return post(`/backend/api/v1/media/videos/delete/multi`, params);
      },
    },
  },
  Miaosha: {
    Orders: {
      List(params) {
        return get(`/backend/addons/MiaoSha/orders/index`, params);
      },
    },
    Goods: {
      List(params) {
        return get(`/backend/addons/MiaoSha/goods/index`, params);
      },
      Destory(id) {
        return destroy(`/backend/addons/MiaoSha/goods/${id}`);
      },
      Store(params) {
        return post(`/backend/addons/MiaoSha/goods/create`, params);
      },
      Create(params) {
        return get(`/backend/addons/MiaoSha/goods/create`, params);
      },
      Detail(id) {
        return get(`/backend/addons/MiaoSha/goods/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/MiaoSha/goods/${id}`, params);
      },
    },
  },
  System: {
    Config: {
      All() {
        return get(`/backend/api/v1/setting`);
      },
      Save(params) {
        return post(`/backend/api/v1/setting`, params);
      },
      Config() {
        return get(`/backend/api/v2/system/config`);
      },
    },
    Addons: {
      LocalList(params) {
        return get(`/backend/api/v1/addons`, params);
      },
      Repository(params) {
        return get(`/backend/api/v1/addons/repository`, params);
      },
      Install(params) {
        return get(`/backend/api/v1/addons/repository/install`, params);
      },
      Upgrade(params) {
        return get(`/backend/api/v1/addons/repository/upgrade`, params);
      },
      Switch(params) {
        return post(`/backend/api/v1/addons/switch`, params);
      },
    },
    administrator: {
      List(params) {
        return get(`/backend/api/v1/administrator`, params);
      },
      Create() {
        return get(`/backend/api/v1/administrator/create`);
      },
      Store(params) {
        return post(`/backend/api/v1/administrator`, params);
      },
      Destory(id) {
        return destroy(`/backend/api/v1/administrator/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/administrator/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/administrator/${id}`, params);
      },
    },
    adminroles: {
      List(params) {
        return get(`/backend/api/v1/administrator_role`, params);
      },
      Create() {
        return get(`/backend/api/v1/administrator_role/create`);
      },
      Store(params) {
        return post(`/backend/api/v1/administrator_role`, params);
      },
      Destory(id) {
        return destroy(`/backend/api/v1/administrator_role/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/administrator_role/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/administrator_role/${id}`, params);
      },
    },
    Navs: {
      List(params) {
        return get(`/backend/api/v1/nav`, params);
      },
      Create() {
        return get(`/backend/api/v1/nav/create`);
      },
      Store(params) {
        return post(`/backend/api/v1/nav`, params);
      },
      Destroy(id) {
        return destroy(`/backend/api/v1/nav/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/nav/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/nav/${id}`, params);
      },
    },
    Sliders: {
      List(params) {
        return get(`/backend/api/v1/slider`, params);
      },
      Store(params) {
        return post(`/backend/api/v1/slider`, params);
      },
      Destroy(id) {
        return destroy(`/backend/api/v1/slider/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/slider/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/slider/${id}`, params);
      },
    },
    Links: {
      List(params) {
        return get(`/backend/api/v1/link`, params);
      },
      Store(params) {
        return post(`/backend/api/v1/link`, params);
      },
      Destroy(id) {
        return destroy(`/backend/api/v1/link/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/link/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/link/${id}`, params);
      },
    },
    Announcement: {
      List(params) {
        return get(`/backend/api/v1/announcement`, params);
      },
      Store(params) {
        return post(`/backend/api/v1/announcement`, params);
      },
      Destroy(id) {
        return destroy(`/backend/api/v1/announcement/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/announcement/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/announcement/${id}`, params);
      },
    },
    VideoUpload: {
      AliyunTokenRefresh(params) {
        return post(`/backend/api/v1/video/token/aliyun/refresh`, params);
      },
      AliyunTokenCreate(params) {
        return post(`/backend/api/v1/video/token/aliyun/create`, params);
      },
      TencentToken(params) {
        return post(`/backend/api/v1/video/token/tencent`, params);
      },
      LocalUpload(params) {
        return post(`/backend/addons/LocalUpload/upload`, params);
      },
      List(params) {
        return get(`/backend/addons/LocalUpload/video/index`, params);
      },
      Destroy(id) {
        return destroy(`/backend/addons/LocalUpload/video/${id}`);
      },
    },
    Log: {
      Admin(params) {
        return get(`/backend/api/v1/log/admin`, params);
      },
      UserLogin(params) {
        return get(`/backend/api/v1/log/userLogin`, params);
      },
      UploadImages(params) {
        return get(`/backend/api/v1/log/uploadImages`, params);
      },
    },
  },
  Course: {
    Vod: {
      List(params) {
        return get(`/backend/api/v1/course`, params);
      },
      Create() {
        return get(`/backend/api/v1/course/create`);
      },
      Store(params) {
        return post(`/backend/api/v1/course`, params);
      },
      Destory(id) {
        return destroy(`/backend/api/v1/course/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/course/${id}`);
      },
      UserImport(id, params) {
        return post(`/backend/api/v1/course/${id}/subscribe/import`, params);
      },
      Update(id, params) {
        return put(`/backend/api/v1/course/${id}`, params);
      },
      SubUsers(id, params) {
        return get(`/backend/api/v1/course/${id}/subscribes`, params);
      },
      SubUsersAdd(id, params) {
        return post(`/backend/api/v1/course/${id}/subscribe/create`, params);
      },
      SubUsersDel(id, params) {
        return get(`/backend/api/v1/course/${id}/subscribe/delete`, params);
      },
      Comment: {
        List(params) {
          return get(`/backend/api/v1/course_comment`, params);
        },
        Destroy(params) {
          return post(`/backend/api/v1/course_comment/delete`, params);
        },
      },
      Categories: {
        List(params) {
          return get(`/backend/api/v1/courseCategory`, params);
        },
        Create() {
          return get(`/backend/api/v1/courseCategory/create`);
        },
        Store(params) {
          return post(`/backend/api/v1/courseCategory`, params);
        },
        Destory(id) {
          return destroy(`/backend/api/v1/courseCategory/${id}`);
        },
        Detail(id) {
          return get(`/backend/api/v1/courseCategory/${id}`);
        },
        Update(id, params) {
          return put(`/backend/api/v1/courseCategory/${id}`, params);
        },
      },
      Chapters: {
        List(id, params) {
          return get(`/backend/api/v1/course_chapter/${id}`, params);
        },
        Store(id, params) {
          return post(`/backend/api/v1/course_chapter/${id}`, params);
        },
        Destory(id, ids) {
          return destroy(`/backend/api/v1/course_chapter/${id}/${ids}`);
        },
        Detail(id, ids) {
          return get(`/backend/api/v1/course_chapter/${id}/${ids}`);
        },
        Update(id, ids, params) {
          return put(`/backend/api/v1/course_chapter/${id}/${ids}`, params);
        },
      },
      Attach: {
        List(params) {
          return get(`/backend/api/v1/course_attach`, params);
        },
        Store(params) {
          return post(`/backend/api/v1/course_attach`, params);
        },
        Destory(id) {
          return destroy(`/backend/api/v1/course_attach/${id}`);
        },
      },
      Records: {
        List(id, params) {
          return get(`/backend/api/v1/course/${id}/watch/records`, params);
        },
        Del(id, params) {
          return post(
            `/backend/api/v1/course/${id}/watch/records/delete`,
            params
          );
        },
        Detail(id, userId, params) {
          return get(
            `/backend/api/v1/course/${id}/user/${userId}/watch/records`,
            params
          );
        },
      },
      Videos: {
        List(params) {
          return get(`/backend/api/v1/video`, params);
        },
        Create(id) {
          return get(`/backend/api/v1/course_chapter/${id}`);
        },
        Store(params) {
          return post(`/backend/api/v1/video`, params);
        },
        DestoryMulti(params) {
          return post(`/backend/api/v1/video/delete/multi`, params);
        },
        Detail(id) {
          return get(`/backend/api/v1/video/${id}`);
        },
        Update(id, params) {
          return put(`/backend/api/v1/video/${id}`, params);
        },
        Subscribe(id, params) {
          return get(`/backend/api/v1/video/${id}/subscribes`, params);
        },
        SubscribeDestory(id, params) {
          return get(`/backend/api/v1/video/${id}/subscribe/delete`, params);
        },
        WatchRecords(id, params) {
          return get(`/backend/api/v1/video/${id}/watch/records`, params);
        },
        ImportAct(params) {
          return post(`/backend/api/v1/video/import`, params);
        },
        Comment: {
          List(params) {
            return get(`/backend/api/v1/video_comment`, params);
          },
          Destroy(params) {
            return post(`/backend/api/v1/video_comment/delete`, params);
          },
        },
      },
    },
    Live: {
      Course: {
        List(params) {
          return get(`/backend/addons/zhibo/course/index`, params);
        },
        Create() {
          return get(`/backend/addons/zhibo/course/create`);
        },
        Store(params) {
          return post(`/backend/addons/zhibo/course/create`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/zhibo/course/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/zhibo/course/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/zhibo/course/${id}`, params);
        },
        Comment(params) {
          return get(`/backend/addons/zhibo/course_comment`, params);
        },
        CommentDestoryMulti(params) {
          return post(`/backend/addons/zhibo/course_comment/delete`, params);
        },
        CommentCheck(params) {
          return post(`/backend/addons/zhibo/course_comment/check`, params);
        },
        UserImport(id, params) {
          return post(`/backend/addons/zhibo/course/${id}/user/import`, params);
        },
        Category: {
          List() {
            return get(`/backend/addons/zhibo/course_category/index`);
          },
          Create() {
            return get(`/backend/addons/zhibo/course_category/create`);
          },
          Store(params) {
            return post(`/backend/addons/zhibo/course_category/create`, params);
          },
          Destory(id) {
            return destroy(`/backend/addons/zhibo/course_category/${id}`);
          },
          Detail(id) {
            return get(`/backend/addons/zhibo/course_category/${id}`);
          },
          Update(id, params) {
            return put(`/backend/addons/zhibo/course_category/${id}`, params);
          },
        },
        Chapter: {
          List(params) {
            return get(`/backend/addons/zhibo/course_chapter/index`, params);
          },
          Store(params) {
            return post(`/backend/addons/zhibo/course_chapter/create`, params);
          },
          Destory(id) {
            return destroy(`/backend/addons/zhibo/course_chapter/${id}`);
          },
          Detail(id) {
            return get(`/backend/addons/zhibo/course_chapter/${id}`);
          },
          Update(id, params) {
            return put(`/backend/addons/zhibo/course_chapter/${id}`, params);
          },
        },
        Users: {
          List(id, params) {
            return get(`/backend/addons/zhibo/course/${id}/users`, params);
          },
          Add(id, params) {
            return post(`/backend/addons/zhibo/course/${id}/user/add`, params);
          },
          Del(id, params) {
            return post(`/backend/addons/zhibo/course/${id}/user/del`, params);
          },
        },
        Video: {
          List(params) {
            return get(`/backend/addons/zhibo/course_video/index`, params);
          },
          Create() {
            return get(`/backend/addons/zhibo/course_video/create`);
          },
          Store(params) {
            return post(`/backend/addons/zhibo/course_video/create`, params);
          },
          Destory(id) {
            return destroy(`/backend/addons/zhibo/course_video/${id}`);
          },
          Detail(id) {
            return get(`/backend/addons/zhibo/course_video/${id}`);
          },
          Update(id, params) {
            return put(`/backend/addons/zhibo/course_video/${id}`, params);
          },
          Play(params) {
            return get(`/backend/addons/zhibo/zhibo/getParams`, params);
          },
          PlayInfo(params) {
            return post(`/backend/addons/zhibo/zhibo/playInfo`, params);
          },
          RoomAction(params) {
            return post(`/backend/addons/zhibo/zhibo/roomAction`, params);
          },
          Stop(params) {
            return get(`/backend/addons/zhibo/zhibo/stop`, params);
          },
          Watch(params) {
            return get(
              `/backend/addons/zhibo/course_video/watch/users`,
              params
            );
          },
          Chat(id, ids, params) {
            return get(`/backend/addons/zhibo/chat/${id}/${ids}`, params);
          },
          ChatDestoryMulti(params) {
            return post(`/backend/addons/zhibo/chat/delete`, params);
          },
          SendMessage(params) {
            return post(`/backend/addons/zhibo/chat/send`, params);
          },
          Stats(id, params) {
            return get(
              `/backend/addons/zhibo/course_video/${id}/stats`,
              params
            );
          },
        },
      },
      Teacher: {
        List(params) {
          return get(`/backend/addons/zhibo/teacher/index`, params);
        },
        Create() {
          return get(`/backend/addons/zhibo/teacher/create`);
        },
        Store(params) {
          return post(`/backend/addons/zhibo/teacher/create`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/zhibo/teacher/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/zhibo/teacher/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/zhibo/teacher/${id}`, params);
        },
      },
    },
    Topic: {
      Topic: {
        List(params) {
          return get(`/backend/addons/meedu_topics/topic/index`, params);
        },
        Create() {
          return get(`/backend/addons/meedu_topics/topic/create`);
        },
        Store(params) {
          return post(`/backend/addons/meedu_topics/topic/create`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/meedu_topics/topic/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/meedu_topics/topic/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/meedu_topics/topic/${id}`, params);
        },
        Users(id, params) {
          return get(`/backend/addons/meedu_topics/topic/${id}/users`, params);
        },
        Order(params) {
          return get(`/backend/addons/meedu_topics/orders`, params);
        },
        Comment(params) {
          return get(`/backend/addons/meedu_topics/comment`, params);
        },
        DestroyComment(id) {
          return destroy(`/backend/addons/meedu_topics/comment/${id}`);
        },
        CommentCheck(params) {
          return post(`/backend/addons/meedu_topics/comment/check`, params);
        },
        AddUser(params) {
          return post(`/backend/addons/meedu_topics/order/user/add`, params);
        },
        DelUser(params) {
          return post(`/backend/addons/meedu_topics/order/user/del`, params);
        },
      },
      Category: {
        List() {
          return get(`/backend/addons/meedu_topics/category/index`);
        },
        Create() {
          return get(`/backend/addons/meedu_topics/category/create`);
        },
        Store(params) {
          return post(`/backend/addons/meedu_topics/category/create`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/meedu_topics/category/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/meedu_topics/category/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/meedu_topics/category/${id}`, params);
        },
      },
    },
    LearnPath: {
      Path: {
        List(params) {
          return get(`/backend/addons/LearningPaths/path/index`, params);
        },
        Create() {
          return get(`/backend/addons/LearningPaths/path/create`);
        },
        Store(params) {
          return post(`/backend/addons/LearningPaths/path/create`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/LearningPaths/path/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/LearningPaths/path/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/LearningPaths/path/${id}`, params);
        },
        Users(id, params) {
          return get(`/backend/addons/LearningPaths/path/${id}/users`, params);
        },
        Category: {
          List() {
            return get(`/backend/addons/LearningPaths/category/index`);
          },
          Create(params) {
            return get(`/backend/addons/LearningPaths/category/create`, params);
          },
          Store(params) {
            return post(
              `/backend/addons/LearningPaths/category/create`,
              params
            );
          },
          Destory(id) {
            return destroy(`/backend/addons/LearningPaths/category/${id}`);
          },
          Detail(id) {
            return get(`/backend/addons/LearningPaths/category/${id}`);
          },
          Update(id, params) {
            return put(`/backend/addons/LearningPaths/category/${id}`, params);
          },
        },
      },
      NewStep: {
        List(params) {
          return get(`/backend/addons/LearningPaths/v2/step/index`, params);
        },
        Create() {
          return get(`/backend/addons/LearningPaths/v2/step/create`);
        },
        Store(params) {
          return post(`/backend/addons/LearningPaths/v2/step/create`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/LearningPaths/v2/step/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/LearningPaths/v2/step/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/LearningPaths/v2/step/${id}`, params);
        },
      },
      Step: {
        List(params) {
          return get(`/backend/addons/LearningPaths/step/index`, params);
        },
        Create() {
          return get(`/backend/addons/LearningPaths/step/create`);
        },
        Store(params) {
          return post(`/backend/addons/LearningPaths/step/create`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/LearningPaths/step/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/LearningPaths/step/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/LearningPaths/step/${id}`, params);
        },
        Users(id, params) {
          return get(`/backend/addons/LearningPaths/step/${id}/users`, params);
        },
        Relation: {
          List(params) {
            return get(
              `/backend/addons/LearningPaths/step/relation/index`,
              params
            );
          },
          Create() {
            return get(`/backend/addons/LearningPaths/step/relation/create`);
          },
          Store(params) {
            return post(
              `/backend/addons/LearningPaths/step/relation/create`,
              params
            );
          },
          Destory(id) {
            return destroy(`/backend/addons/LearningPaths/step/relation/${id}`);
          },
          Detail(id) {
            return get(`/backend/addons/LearningPaths/step/relation/${id}`);
          },
          Update(id, params) {
            return put(
              `/backend/addons/LearningPaths/step/relation/${id}`,
              params
            );
          },
        },
      },
    },
  },
  Singlepage: {
    Page: {
      List(params) {
        return get(`/backend/addons/single_page/page/index`, params);
      },
      Store(params) {
        return post(`/backend/addons/single_page/page/create`, params);
      },
      Destory(id) {
        return destroy(`/backend/addons/single_page/page/${id}`);
      },
      Detail(id) {
        return get(`/backend/addons/single_page/page/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/single_page/page/${id}`, params);
      },
    },
  },
  CreditMall: {
    Goods: {
      List(params) {
        return get(`/backend/addons/Credit1Mall/goods/index`, params);
      },
      Create() {
        return get(`/backend/addons/Credit1Mall/goods/create`);
      },
      Store(params) {
        return post(`/backend/addons/Credit1Mall/goods/create`, params);
      },
      Destory(id) {
        return destroy(`/backend/addons/Credit1Mall/goods/${id}`);
      },
      Detail(id) {
        return get(`/backend/addons/Credit1Mall/goods/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/Credit1Mall/goods/${id}`, params);
      },
    },
    Order: {
      List(params) {
        return get(`/backend/addons/Credit1Mall/orders/index`, params);
      },
      Detail(id) {
        return get(`/backend/addons/Credit1Mall/orders/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/Credit1Mall/orders/${id}`, params);
      },
      Send(id, params) {
        return post(`/backend/addons/Credit1Mall/orders/${id}/send`, params);
      },
    },
  },
  Meedubook: {
    Book: {
      List(params) {
        return get(`/backend/addons/meedu_books/book/index`, params);
      },
      Create() {
        return get(`/backend/addons/meedu_books/book/create`);
      },
      Store(params) {
        return post(`/backend/addons/meedu_books/book/create`, params);
      },
      Destory(id) {
        return destroy(`/backend/addons/meedu_books/book/${id}`);
      },
      Comments(params) {
        return get(`/backend/addons/meedu_books/book_comment/index`, params);
      },
      CommentDestoryMulti(params) {
        return post(
          `/backend/addons/meedu_books/book_comment/destroy/multi`,
          params
        );
      },
      CommentMulti(params) {
        return post(`/backend/addons/meedu_books/book_comment/checked`, params);
      },
      Detail(id) {
        return get(`/backend/addons/meedu_books/book/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/meedu_books/book/${id}`, params);
      },
      Users: {
        List(id, params) {
          return get(`/backend/addons/meedu_books/book/${id}/users`, params);
        },
        Add(id, params) {
          return post(
            `/backend/addons/meedu_books/book/${id}/user/add`,
            params
          );
        },
        Del(id, params) {
          return post(
            `/backend/addons/meedu_books/book/${id}/user/del`,
            params
          );
        },
      },
      Categories: {
        List() {
          return get(`/backend/addons/meedu_books/book_category/index`);
        },
        Store(params) {
          return post(
            `/backend/addons/meedu_books/book_category/create`,
            params
          );
        },
        Destory(id) {
          return destroy(`/backend/addons/meedu_books/book_category/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/meedu_books/book_category/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/meedu_books/book_category/${id}`, params);
        },
      },
      Chapters: {
        List(params) {
          return get(`/backend/addons/meedu_books/book_chapter/index`, params);
        },
        Store(params) {
          return post(
            `/backend/addons/meedu_books/book_chapter/create`,
            params
          );
        },
        Destory(id) {
          return destroy(`/backend/addons/meedu_books/book_chapter/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/meedu_books/book_chapter/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/meedu_books/book_chapter/${id}`, params);
        },
      },
      Article: {
        List(params) {
          return get(`/backend/addons/meedu_books/book_article/index`, params);
        },
        Create() {
          return get(`/backend/addons/meedu_books/book_article/create`);
        },
        Store(params) {
          return post(
            `/backend/addons/meedu_books/book_article/create`,
            params
          );
        },
        Destory(id) {
          return destroy(`/backend/addons/meedu_books/book_article/${id}`);
        },
        Detail(id) {
          return get(`/backend/addons/meedu_books/book_article/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/meedu_books/book_article/${id}`, params);
        },
        Comments(params) {
          return get(
            `/backend/addons/meedu_books/article_comment/index`,
            params
          );
        },
        CommentDestoryMulti(params) {
          return post(
            `/backend/addons/meedu_books/article_comment/destroy/multi`,
            params
          );
        },
        CommentMulti(params) {
          return post(
            `/backend/addons/meedu_books/article_comment/checked`,
            params
          );
        },
      },
    },
  },
  Wechat: {
    Reply: {
      List(params) {
        return get(`/backend/api/v1/mpWechatMessageReply`, params);
      },
      Create() {
        return get(`/backend/api/v1/mpWechatMessageReply/create`);
      },
      Store(params) {
        return post(`/backend/api/v1/mpWechatMessageReply`, params);
      },
      Destory(id) {
        return destroy(`/backend/api/v1/mpWechatMessageReply/${id}`);
      },
      Detail(id) {
        return get(`/backend/api/v1/mpWechatMessageReply/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/mpWechatMessageReply/${id}`, params);
      },
    },
    Menu: {
      Index() {
        return get(`/backend/api/v1/mpWechat/menu`);
      },
      Update(params) {
        return put(`/backend/api/v1/mpWechat/menu`, params);
      },
      Destroy() {
        return destroy(`/backend/api/v1/mpWechat/menu`);
      },
    },
  },
  CodeExchanger: {
    List(params) {
      return get(`/backend/addons/CodeExchanger/v2/activity/index`, params);
    },
    Create(params) {
      return get(`/backend/addons/CodeExchanger/v2/activity/create`, params);
    },
    Store(params) {
      return post(`/backend/addons/CodeExchanger/v2/activity/create`, params);
    },
    Destory(id) {
      return destroy(`/backend/addons/CodeExchanger/v2/activity/${id}`);
    },
    Detail(id) {
      return get(`/backend/addons/CodeExchanger/v2/activity/${id}`);
    },
    Update(id, params) {
      return put(`/backend/addons/CodeExchanger/v2/activity/${id}`, params);
    },
    Codes: {
      List(id, params) {
        return get(
          `/backend/addons/CodeExchanger/v2/activity/${id}/code/index`,
          params
        );
      },
      DestoryMulti(id, params) {
        return post(
          `/backend/addons/CodeExchanger/v2/activity/${id}/code/destroy`,
          params
        );
      },
      Generate(id, params) {
        return post(
          `/backend/addons/CodeExchanger/v2/activity/${id}/code/generate`,
          params
        );
      },
      Export() {
        return get(`/backend/addons/CodeExchanger/code/export`);
      },
    },
  },
  Wenda: {
    Question: {
      List(params) {
        return get(`/backend/addons/Wenda/question/index`, params);
      },
      Category() {
        return get(`/backend/addons/Wenda/category/index`);
      },
      DestoryMulti(params) {
        return post(`/backend/addons/Wenda/question/delete`, params);
      },
      Answer(id) {
        return get(`/backend/addons/Wenda/question/${id}/answers`);
      },
      DestoryAnswer(id, ids) {
        return destroy(`/backend/addons/Wenda/question/${id}/answers/${ids}`);
      },
      Comment(id) {
        return get(`/backend/addons/Wenda/question/answers/${id}/comments`);
      },
      DestoryComment(id) {
        return destroy(`/backend/addons/Wenda/question/answers/comments/${id}`);
      },
      SetAnswer(questionId, answerId) {
        return get(
          `/backend/addons/Wenda/question/${questionId}/answers/${answerId}/selected`
        );
      },
      Cate: {
        Destory(id) {
          return destroy(`/backend/addons/Wenda/category/${id}`);
        },
        Store(params) {
          return post(`/backend/addons/Wenda/category/create`, params);
        },
        Detail(id) {
          return get(`/backend/addons/Wenda/category/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/Wenda/category/${id}`, params);
        },
      },
    },
  },
  Member: {
    List(params) {
      return get(`/backend/api/v1/member`, params);
    },
    Create() {
      return get(`/backend/api/v1/member/create`);
    },
    Store(params) {
      return post(`/backend/api/v1/member`, params);
    },
    Edit(id) {
      return get(`/backend/api/v1/member/${id}`);
    },
    Update(id, params) {
      return put(`/backend/api/v1/member/${id}`, params);
    },
    Destroy(id) {
      return destroy(`/backend/api/v2/member/${id}`);
    },
    Import(params) {
      return post(`/backend/api/v1/member/import`, params);
    },
    Detail(id) {
      return get(`/backend/api/v1/member/${id}/detail`);
    },
    SendMessage(id, params) {
      return post(`/backend/api/v1/member/${id}/message`, params);
    },
    SendMessageMulti(params) {
      return post(`/backend/api/v1/member/message/multi`, params);
    },
    EditMulti(params) {
      return put(`/backend/api/v1/member/field/multi`, params);
    },
    UserCourses(id, params) {
      return get(`/backend/api/v1/member/${id}/detail/userCourses`, params);
    },
    UserVideos(params) {
      return get(`/backend/api/v2/member/videos`, params);
    },
    UserRoles(id, params) {
      return get(`/backend/api/v1/member/${id}/detail/userRoles`, params);
    },
    UserOrders(id, params) {
      return get(`/backend/api/v1/member/${id}/detail/userOrders`, params);
    },
    UserCredit1(id, params) {
      return get(`/backend/api/v1/member/${id}/detail/credit1Records`, params);
    },
    UserInviteRecords(id, params) {
      return get(`/backend/api/v1/member/${id}/detail/userInvite`, params);
    },
    UserVodWatchRecords(params) {
      return get(`/backend/api/v2/member/courses`, params);
    },
    UserVideoWatchRecords(params) {
      return get(`/backend/api/v2/member/course/progress`, params);
    },
    UserLiveWatchRecords(params) {
      return get(`/backend/api/v2/member/courses`, params);
    },
    UserBalanceRecords(params) {
      return get(
        `/backend/addons/multi_level_share/member/balanceRecords`,
        params
      );
    },
    TagUpdate(id, params) {
      return put(`/backend/api/v1/member/${id}/tags`, params);
    },
    RemarkUpdate(id, params) {
      return put(`/backend/api/v1/member/${id}/remark`, params);
    },
    Credit1Change(params) {
      return post(`/backend/api/v1/member/credit1/change`, params);
    },
    UserIOSRecords(params) {
      return get(`/backend/addons/TemplateOne/member/credit2Records`, params);
    },
    IOSRecharge(params) {
      return post(`/backend/addons/TemplateOne/member/recharge`, params);
    },
    Tag: {
      List(params) {
        return get(`/backend/api/v1/member/tag/index`, params);
      },
      Create() {
        return get(`/backend/api/v1/member/tag/create`);
      },
      Store(params) {
        return post(`/backend/api/v1/member/tag/create`, params);
      },
      Edit(id) {
        return get(`/backend/api/v1/member/tag/${id}`);
      },
      Update(id, params) {
        return put(`/backend/api/v1/member/tag/${id}`, params);
      },
      Destroy(id) {
        return destroy(`/backend/api/v1/member/tag/${id}`);
      },
    },
  },
  ViewBlock: {
    List(params) {
      return get(`/backend/api/v1/viewBlock/index`, params);
    },
    Create() {
      return get(`/backend/api/v1/viewBlock/create`);
    },
    Store(params) {
      return post(`/backend/api/v1/viewBlock/create`, params);
    },
    Edit(id) {
      return get(`/backend/api/v1/viewBlock/${id}`);
    },
    Update(id, params) {
      return put(`/backend/api/v1/viewBlock/${id}`, params);
    },
    Destroy(id) {
      return destroy(`/backend/api/v1/viewBlock/${id}`);
    },
  },
  MiaoSha: {
    List(params) {
      return get(`/backend/addons/MiaoSha/goods/index`, params);
    },
    Create() {
      return get(`/backend/addons/MiaoSha/goods/create`);
    },
    Store(params) {
      return post(`/backend/addons/MiaoSha/goods/create`, params);
    },
    Edit(id) {
      return get(`/backend/addons/MiaoSha/goods/${id}`);
    },
    Update(id, params) {
      return put(`/backend/addons/MiaoSha/goods/${id}`, params);
    },
    Destroy(id) {
      return destroy(`/backend/addons/MiaoSha/goods/${id}`);
    },
  },
  Multishare: {
    Poster: {
      List() {
        return get(`/backend/addons/multi_level_share/poster/index`);
      },
      Store(params) {
        return post(`/backend/addons/multi_level_share/poster/create`, params);
      },
      Detail(id) {
        return get(`/backend/addons/multi_level_share/poster/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/multi_level_share/poster/${id}`, params);
      },
      Destory(id) {
        return destroy(`/backend/addons/multi_level_share/poster/${id}`);
      },
    },
    Goods: {
      List(params) {
        return get(`/backend/addons/multi_level_share/goods/index`, params);
      },
      Create() {
        return get(`/backend/addons/multi_level_share/goods/create`);
      },
      Store(params) {
        return post(`/backend/addons/multi_level_share/goods/create`, params);
      },
      Detail(id) {
        return get(`/backend/addons/multi_level_share/goods/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/multi_level_share/goods/${id}`, params);
      },
      Destory(id) {
        return destroy(`/backend/addons/multi_level_share/goods/${id}`);
      },
      Rewards(params) {
        return get(`/backend/addons/multi_level_share/reward/index`, params);
      },
    },
  },
  TuanGou: {
    List(params) {
      return get(`/backend/addons/TuanGou/goods/index`, params);
    },
    Create() {
      return get(`/backend/addons/TuanGou/goods/create`);
    },
    Store(params) {
      return post(`/backend/addons/TuanGou/goods/create`, params);
    },
    Detail(id) {
      return get(`/backend/addons/TuanGou/goods/${id}`);
    },
    Update(id, params) {
      return put(`/backend/addons/TuanGou/goods/${id}`, params);
    },
    Destroy(id) {
      return destroy(`/backend/addons/TuanGou/goods/${id}`);
    },
    Order: {
      List(params) {
        return get(`/backend/addons/TuanGou/orders/index`, params);
      },
    },
    Refund: {
      List(params) {
        return get(`/backend/addons/TuanGou/refunds/index`, params);
      },
      Complete(id, params) {
        return get(`/backend/addons/TuanGou/refunds/${id}/handler`, params);
      },
    },
    Tuan: {
      List(id, params) {
        return get(`/backend/addons/TuanGou/goods/${id}/items`, params);
      },
      Detail(id, itemId) {
        return get(`/backend/addons/TuanGou/goods/${id}/item/${itemId}`);
      },
      Complete(params) {
        return get(`/backend/addons/TuanGou/goods/item/complete`, params);
      },
    },
  },
  Snapshot: {
    Images: {
      List(param) {
        return get("/backend/addons/Snapshot/images", param);
      },
      Destorymulti(param) {
        return post("/backend/addons/Snapshot/images/delete/multi", param);
      },
    },
  },
  Exam: {
    PaperJoinRecord(paperId, recordId) {
      return get(
        `/backend/addons/Paper/paper/${paperId}/userPaper/${recordId}/render`
      );
    },
    MockPaperJoinRecord(paperId, recordId) {
      return get(
        `/backend/addons/Paper/mock_paper/${paperId}/userPaper/${recordId}`
      );
    },
    Paper: {
      List(params) {
        return get(`/backend/addons/Paper/paper/index`, params);
      },
      Create() {
        return get(`/backend/addons/Paper/paper/create`);
      },
      Store(params) {
        return post(`/backend/addons/Paper/paper/create`, params);
      },
      Detail(id) {
        return get(`/backend/addons/Paper/paper/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/Paper/paper/${id}`, params);
      },
      Destroy(id) {
        return destroy(`/backend/addons/Paper/paper/${id}`);
      },
      Userpaper(id, params) {
        return get(`/backend/addons/Paper/paper/${id}/userPaper`, params);
      },
      Stat(id, params) {
        return get(`/backend/addons/Paper/paper/${id}/statistics`, params);
      },
      User(id, params) {
        return get(`/backend/addons/Paper/paper/${id}/user`, params);
      },
      Add(id, params) {
        return post(`/backend/addons/Paper/paper/${id}/user`, params);
      },
      DestoryUser(id, ids) {
        return destroy(`/backend/addons/Paper/paper/${id}/user/${ids}`);
      },
      Question(id, params) {
        return get(`/backend/addons/Paper/paper/${id}/questions`, params);
      },
      QuestionDestroy(id, ids) {
        return destroy(`/backend/addons/Paper/paper/${id}/questions/${ids}`);
      },
      QuestionDestoryMulti(id, params) {
        return post(
          `/backend/addons/Paper/paper/${id}/questions/deleteBatch`,
          params
        );
      },
      QuestionList(id, params) {
        return get(`/backend/addons/Paper/paper/${id}/questions`, params);
      },
      QuestionStoreMulti(id, params) {
        return post(`/backend/addons/Paper/paper/${id}/questions`, params);
      },
      Marking(id, ids, params) {
        return get(
          `/backend/addons/Paper/paper/${id}/userPaper/${ids}`,
          params
        );
      },
      SubmitScore(param) {
        return post(
          `/backend/addons/Paper/paper/${param.id}/userPaper/${param.user_paper_id}`,
          param
        );
      },
      Category: {
        List(params) {
          return get(`/backend/addons/Paper/paper_category/index`, params);
        },
        Create() {
          return get(`/backend/addons/Paper/paper_category/create`);
        },
        Store(params) {
          return post(`/backend/addons/Paper/paper_category/create`, params);
        },
        Detail(id) {
          return get(`/backend/addons/Paper/paper_category/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/Paper/paper_category/${id}`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/Paper/paper_category/${id}`);
        },
      },
    },
    Mockpaper: {
      List(params) {
        return get(`/backend/addons/Paper/mock_paper/index`, params);
      },
      Create(params) {
        return get(`/backend/addons/Paper/mock_paper/create`, params);
      },
      Store(params) {
        return post(`/backend/addons/Paper/mock_paper/create`, params);
      },
      Detail(id) {
        return get(`/backend/addons/Paper/mock_paper/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/Paper/mock_paper/${id}`, params);
      },
      Destory(id) {
        return destroy(`/backend/addons/Paper/mock_paper/${id}`);
      },
      Userpaper(id, params) {
        return get(`/backend/addons/Paper/mock_paper/${id}/records`, params);
      },
      Stat(id, params) {
        return get(`/backend/addons/Paper/mock_paper/${id}/statistics`, params);
      },
      User(id, params) {
        return get(`/backend/addons/Paper/mock_paper/${id}/users`, params);
      },
      Add(id, params) {
        return post(
          `/backend/addons/Paper/mock_paper/${id}/user/insert`,
          params
        );
      },
      DestoryUser(id, params) {
        return post(
          `/backend/addons/Paper/mock_paper/${id}/user/delete`,
          params
        );
      },
      Category: {
        List(params) {
          return get(`/backend/addons/Paper/paper_category/index`, params);
        },
        Create() {
          return get(`/backend/addons/Paper/paper_category/create`);
        },
        Store(params) {
          return post(`/backend/addons/Paper/paper_category/create`, params);
        },
        Detail(id) {
          return get(`/backend/addons/Paper/paper_category/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/Paper/paper_category/${id}`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/Paper/paper_category/${id}`);
        },
      },
    },
    Question: {
      List(params) {
        return get(`/backend/addons/Paper/question/index`, params);
      },
      Create() {
        return get(`/backend/addons/Paper/question/create`);
      },
      Store(params) {
        return post(`/backend/addons/Paper/question/create`, params);
      },
      Detail(id) {
        return get(`/backend/addons/Paper/question/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/Paper/question/${id}`, params);
      },
      DestoryMulti(params) {
        return post(`/backend/addons/Paper/question/destroy/multi`, params);
      },
      Import(param) {
        return post("/backend/addons/Paper/question/import/csv", param);
      },
      Category: {
        List(params) {
          return get(`/backend/addons/Paper/question_category/index`, params);
        },
        Create() {
          return get(`/backend/addons/Paper/question_category/create`);
        },
        Store(params) {
          return post(`/backend/addons/Paper/question_category/create`, params);
        },
        Detail(id) {
          return get(`/backend/addons/Paper/question_category/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/Paper/question_category/${id}`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/Paper/question_category/${id}`);
        },
      },
    },
    Practice: {
      List(params) {
        return get(`/backend/addons/Paper/practice/index`, params);
      },
      Create() {
        return get(`/backend/addons/Paper/practice/create`);
      },
      Store(params) {
        return post(`/backend/addons/Paper/practice/create`, params);
      },
      Detail(id) {
        return get(`/backend/addons/Paper/practice/${id}`);
      },
      Update(id, params) {
        return put(`/backend/addons/Paper/practice/${id}`, params);
      },
      Destroy(params) {
        return post(`/backend/addons/Paper/practice/delete/multi`, params);
      },
      User(id, params) {
        return get(`/backend/addons/Paper/practice/${id}/users`, params);
      },
      Add(id, params) {
        return post(`/backend/addons/Paper/practice/${id}/user/insert`, params);
      },
      Progress(id, ids) {
        return get(`/backend/addons/Paper/practice/${id}/user/${ids}/progress`);
      },
      DestroyUser(id, params) {
        return post(`/backend/addons/Paper/practice/${id}/user/delete`, params);
      },

      Category: {
        List(params) {
          return get(`/backend/addons/Paper/paper_category/index`, params);
        },
        Create() {
          return get(`/backend/addons/Paper/paper_category/create`);
        },
        Store(params) {
          return post(`/backend/addons/Paper/paper_category/create`, params);
        },
        Detail(id) {
          return get(`/backend/addons/Paper/paper_category/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/Paper/paper_category/${id}`, params);
        },
        Destory(id) {
          return destroy(`/backend/addons/Paper/paper_category/${id}`);
        },
      },
      Chapter: {
        List(params) {
          return get(`/backend/addons/Paper/practice_chapter/index`, params);
        },
        Create() {
          return get(`/backend/addons/Paper/practice_chapter/create`);
        },
        Store(params) {
          return post(`/backend/addons/Paper/practice_chapter/create`, params);
        },
        Detail(id) {
          return get(`/backend/addons/Paper/practice_chapter/${id}`);
        },
        Update(id, params) {
          return put(`/backend/addons/Paper/practice_chapter/${id}`, params);
        },
        DestoryMulti(params) {
          return post(
            `/backend/addons/Paper/practice_chapter/delete/multi`,
            params
          );
        },
        Question: {
          List(id, params) {
            return get(
              `/backend/addons/Paper/practice_chapter/${id}/questions`,
              params
            );
          },
          Create(id, params) {
            return get(
              `/backend/addons/Paper/practice_chapter/${id}/questions/params`,
              params
            );
          },
          StoreMulti(id, params) {
            return post(
              `/backend/addons/Paper/practice_chapter/${id}/questions`,
              params
            );
          },
          DestoryMulti(id, params) {
            return post(
              `/backend/addons/Paper/practice_chapter/${id}/questions/delete`,
              params
            );
          },
        },
      },
    },
  },
  Stats: {
    Member: {
      List(params) {
        return get(`/backend/api/v2/stats/user`, params);
      },
      UserTops(params) {
        return get(`/backend/api/v2/stats/user-paid-top`, params);
      },
      UserGraph(params) {
        return get(`/backend/api/v2/stats/user-graph`, params);
      },
    },
    Transaction: {
      List(params) {
        return get(`/backend/api/v2/stats/transaction`, params);
      },
      TransactionGraph(params) {
        return get(`/backend/api/v2/stats/transaction-graph`, params);
      },
    },
    Content: {
      List(params) {
        return get(`/backend/api/v2/stats/transaction-top`, params);
      },
    },
  },
  SinglePage: {
    List(params) {
      return get(`/backend/addons/single_page/page/index`, params);
    },
    Create() {
      return get(`/backend/addons/single_page/page/create`);
    },
    Store(params) {
      return post(`/backend/addons/single_page/page/create`, params);
    },
    Edit(id) {
      return get(`/backend/addons/single_page/page/${id}`);
    },
    Update(id, params) {
      return put(`/backend/addons/single_page/page/${id}`, params);
    },
    Destroy(id) {
      return destroy(`/backend/addons/single_page/page/${id}`);
    },
  },
  AliyunHls: {
    List(params) {
      return get(`/backend/addons/AliyunHls/videos`, params);
    },
    Submit(params) {
      return post(`/backend/addons/AliyunHls/videos/submitTransTask`, params);
    },
  },
  TencentHls: {
    List(params) {
      return get(`/backend/addons/TencentCloudHls/videos`, params);
    },
    Submit(params) {
      return get(
        `/backend/addons/TencentCloudHls/videos/submitTransTask`,
        params
      );
    },
  },
  Certificate: {
    List(params) {
      return get(`/backend/addons/Cert/cert/index`, params);
    },
    Create(params) {
      return get(`/backend/addons/Cert/cert/create`, params);
    },
    Store(params) {
      return post(`/backend/addons/Cert/cert/create`, params);
    },
    Destroy(id) {
      return destroy(`/backend/addons/Cert/cert/${id}`);
    },
    Detail(id) {
      return get(`/backend/addons/Cert/cert/${id}`);
    },
    Update(id, params) {
      return put(`/backend/addons/Cert/cert/${id}`, params);
    },
    User: {
      List(id, params) {
        return get(`/backend/addons/Cert/cert/${id}/users`, params);
      },
      Import(id, params) {
        return post(`/backend/addons/Cert/cert/${id}/user/import`, params);
      },
      Delete(id, params) {
        return post(`/backend/addons/Cert/cert/${id}/user/destroy`, params);
      },
    },
  },
  xiaoBanKe: {
    Order: {
      Index(param) {
        return get(`/backend/addons/XiaoBanKe/order`, param);
      },
      SetTeacherParams(param) {
        return get(`/backend/addons/XiaoBanKe/order/teacherParams`, param);
      },
      SetTeacher(id, param) {
        return put(`/backend/addons/XiaoBanKe/order/${id}/teacher`, param);
      },
    },
    Dashboard: {
      Index(param) {
        return get(`/backend/addons/XiaoBanKe/dashboard`, param);
      },
    },
    CourseCategory: {
      List(param) {
        return get(`/backend/addons/XiaoBanKe/course_category`, param);
      },
      Create(param) {
        return get(`/backend/addons/XiaoBanKe/course_category/create`, param);
      },
      Store(param) {
        return post(`/backend/addons/XiaoBanKe/course_category/create`, param);
      },
      Edit(id) {
        return get(`/backend/addons/XiaoBanKe/course_category/${id}`);
      },
      Update(id, param) {
        return put(`/backend/addons/XiaoBanKe/course_category/${id}`, param);
      },
      Destroy(id, param) {
        return destroy(
          `/backend/addons/XiaoBanKe/course_category/${id}`,
          param
        );
      },
    },
    Course: {
      List(param) {
        return get(`/backend/addons/XiaoBanKe/course`, param);
      },
      Create(param) {
        return get(`/backend/addons/XiaoBanKe/course/create`, param);
      },
      Store(param) {
        return post(`/backend/addons/XiaoBanKe/course/create`, param);
      },
      Edit(id) {
        return get(`/backend/addons/XiaoBanKe/course/${id}`);
      },
      Update(id, param) {
        return put(`/backend/addons/XiaoBanKe/course/${id}`, param);
      },
      Destroy(id, param) {
        return destroy(`/backend/addons/XiaoBanKe/course/${id}`, param);
      },
    },
    Teacher: {
      List(param) {
        return get(`/backend/addons/XiaoBanKe/teacher`, param);
      },
      Create(param) {
        return get(`/backend/addons/XiaoBanKe/teacher/create`, param);
      },
      Store(param) {
        return post(`/backend/addons/XiaoBanKe/teacher/create`, param);
      },
      Edit(id) {
        return get(`/backend/addons/XiaoBanKe/teacher/${id}`);
      },
      Update(id, param) {
        return put(`/backend/addons/XiaoBanKe/teacher/${id}`, param);
      },
      Destroy(id, param) {
        return destroy(`/backend/addons/XiaoBanKe/teacher/${id}`, param);
      },
    },
  },
};

export default Api;
