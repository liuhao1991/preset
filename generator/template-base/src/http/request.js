/*
 * @Author: lh@metgs.com
 * @Date: 2020-08-24 09:19:04
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-03-24 14:04:24
 * @Description: axios封装
 */
import axios from 'axios'

import qs from 'qs'
<%_ if (options.platform === 'mobile') { _%>
import { Notify } from 'vant'
<%_ } else if (options.version === 'v2') { _%>
import { Message } from 'element-ui'
<%_ } else if (options.version === 'v3') { _%>
import { ElMessage } from 'element-plus'
<%_ } _%>

const duration = 3 * 1000;
function request (axiosConfig) {
  const service = axios.create({
    baseURL: process.env.VUE_APP_API_BASE,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest(params) {
      return qs.stringify(params)
    },
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
  })

  service.interceptors.request.use((config) => {
    // config.data = config.data || {};
    // if (!config.data.pcode) {
    //   config.data.pcode = process.env.VUE_APP_PCODE;
    // }
    return config
  })

  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
      const res = response.data
      // console.log(+res.status)
      // if the custom code is not 20000, it is judged as an error.
      if (+res.code !== 0) {
        <%_ if (options.platform === 'mobile') { _%>
        Notify({
          showClose: true,
          message: res.message || '系统错误',
          type: 'danger',
          duration,
        })
        <%_ } else if (options.version === 'v2') { _%>
        Message({
          showClose: true,
          message: res.message || '系统错误',
          type: 'error',
          duration
        })
        <%_ } else if (options.version === 'v3') { _%>
        ElMessage({
          showClose: true,
          message: res.message || '系统错误',
          type: 'error',
          duration
        })
        <%_ } _%>
        return Promise.reject(new Error(res.message || '系统错误'))
      } else {
        return res.data;
      }
    },
    (error) => {
      <%_ if (options.platform === 'mobile') { _%>
      Notify({
        message: error.message || '网络请求失败',
        type: 'danger',
        duration
      })
      <%_ } else if (options.version === 'v2') { _%>
      Message({
        showClose: true,
        message: error.message || '网络请求失败',
        type: 'error',
        duration
      })
      <%_ } else if (options.version === 'v3') { _%>
      ElMessage({
        showClose: true,
        message: error.message || '网络请求失败',
        type: 'error',
        duration
      })
      <%_ } _%>
      return Promise.reject(error)
    }
  )
  return service(axiosConfig);
}
