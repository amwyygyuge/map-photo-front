export default {
  pages: [
    'pages/around/Around',
    'pages/around/AroundPostList',
    'pages/create/Create',
    'pages/profile/Profile',
    'pages/profile/OtherProfile',
    'pages/profile/PostList',
    'pages/profile/PostDetail',
    'pages/profile/UserList',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/around/Around',
        iconPath: './image/around.png',
        selectedIconPath: './image/around.png',
        text: '周边',
      },
      // {
      //   pagePath: 'pages/around/index',
      //   selectedIconPath: './image/find.png',
      //   iconPath: './image/find.png',
      //   text: '发现',
      // },
      {
        pagePath: 'pages/create/Create',
        iconPath: './image/create.png',
        selectedIconPath: './image/create.png',
        text: '发布',
      },
      // {
      //   pagePath: 'pages/around/index',
      //   selectedIconPath: './image/focus.png',
      //   iconPath: './image/focus.png',
      //   text: '关注',
      // },
      {
        pagePath: 'pages/profile/Profile',
        selectedIconPath: './image/my.png',
        iconPath: './image/my.png',
        text: '我的',
      },
    ],
  },
  // plugins: {
  //   chooseLocation: {
  //     version: '1.0.5',
  //     provider: 'wx76a9a06e5b4e693e',
  //   },
  // },
};
