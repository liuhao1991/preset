import request from './request';

export function getWechatJssdk (params) {
  return request({
    method: 'GET',
    url: '/wechat/jssdk',
    params
  })
}

export function getSubscribeStatus (data) {
  return request({
    method: 'POST',
    url: '/wechat/subscribe',
    data
  })
}
