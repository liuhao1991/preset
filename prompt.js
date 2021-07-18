
module.exports = [
  {
    name: 'version',
    type: 'list',
    message: 'Choose a version of Vue.js',
    choices: [
        {
          name: '2.x',
          value: 'v2',
        },
        {
          name: '3.x',
          value: 'v3',
        },
    ],
    default: 'v3',
  },
  {
    name: 'platform',
    type: 'list',
    message: 'Choose whether your app is a PC or a mobile(default:pc)',
    choices: [
      {
        name: 'PC',
        value: 'pc'
      },
      {
        name: 'mobile',
        value: 'mobile'
      },
    ],
    default: 'pc'
  },
];
