/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-24 13:31:36
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-07-16 17:09:01
 * @Description: 工具函数
 */
import { getWechatJssdk } from '@/http/api'

export * from './chart'
export * from './ww'
export * from './aqi'
export * from './caiyun'
export * from './svg'

/**
 * @description: 判断是否是微信打开
 * @param {*}
 * @return {*}
 */
export const isWeChat = (() => {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua = window.navigator.userAgent.toLowerCase()
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
})()

/**
 * @description: 获取微信jssdk权限
 * @param {*}
 * @return {*}
 */
export const resolveWxJssdk = async () => {
  try {
    const res = await getWechatJssdk({ data: { url: window.location.href } })
    window.wx.config({
      debug: process.env.NODE_ENV === 'development', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名
      jsApiList: [
        'getLocation', // 获取位置
        'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        'updateTimelineShareData' // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
      ] // 必填，需要使用的JS接口列表
    })
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

/**
 * @description: 深拷贝
 * @param {*}
 * @return {*}
 */
export const deepClone = (obj, clone) => {
  // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  const toString = Object.prototype.toString
  toString.call(obj) === '[object Array]'
    ? (clone = clone || [])
    : (clone = clone || {})
  for (const i in obj) {
    if (typeof obj[i] === 'object' && obj[i] !== null) {
      // 要考虑深复制问题了
      if (Array.isArray(obj[i])) {
        // 这是数组
        clone[i] = []
      } else {
        // 这是对象
        clone[i] = {}
      }
      deepClone(obj[i], clone[i])
    } else {
      clone[i] = obj[i]
    }
  }
  return clone
}

export const setDocTitle = (title) => {
  document.title = title + ' - ' + process.env.VUE_APP_TITLE
}
