import instance from './instance'

export function getWechatJssdk (options) {
  return instance({
    method: 'POST',
    url: '/wechat/jssdk'
  })(options)
}

export function getSubscribeStatus (options) {
  return instance({
    method: 'POST',
    url: '/wechat/subscribe'
  })(options)
}
