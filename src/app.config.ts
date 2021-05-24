export default {
  pages: ['pages/around/index', 'pages/around/sendPost', 'pages/profile/index'],
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
        pagePath: 'pages/around/index',
        text: '周边',
      },
      {
        pagePath: 'pages/around/index',
        text: '热点',
      },
      {
        pagePath: 'pages/around/index',
        text: '关注',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
      },
    ],
  },
  plugins: {
    chooseLocation: {
      version: '1.0.5',
      provider: 'wx76a9a06e5b4e693e',
    },
  },
};
