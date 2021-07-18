/*
 * @Author: lh@metgs.com
 * @Date: 2020-08-24 09:19:04
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-07-06 15:41:04
 * @Description: axios封装
 */
import axios from "axios";

import qs from "qs";
<%_ if (options.platform === 'mobile') { _%>
import { Notify } from "vant";
<%_ } else if (options.version === 'v2') { _%>
import { Message } from 'element-ui';
<%_ } else if (options.version === 'v3') { _%>
import { ElMessage } from 'element-plus';
<%_ } _%>

const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest(params) {
    return qs.stringify(params);
  },
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});

service.interceptors.request.use((config) => {
  // config.data = config.data || {};
  // if (!config.data.pcode) {
  //   config.data.pcode = process.env.VUE_APP_PCODE;
  // }
  return config;
});

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
    const responseType = response.request.responseType;
    if (responseType === "arraybuffer") {
      return response.data;
    } else {
      const res = response.data;
      // console.log(+res.status)
      // if the custom code is not 20000, it is judged as an error.
      if (res.code && res.code !== 0 && +res.status !== 1) {
        <%_ if (options.platform === 'mobile') { _%>
        Notify({
          message: res.message || "系统错误",
          type: "danger",
          duration: 4 * 1000,
        });
        <%_ } else if (options.version === 'v2') { _%>
        Message({
          showClose: true,
          message: res.message || "系统错误",
          type: 'error',
          duration: 4 * 1000,
        });
        <%_ } else if (options.version === 'v3') { _%>
        ElMessage({
          showClose: true,
          message: res.message || "系统错误",
          type: 'error',
          duration: 4 * 1000,
        });
        <%_ } _%>
        return Promise.reject(new Error(res.message || "系统错误"));
      } else {
        return res.data || res.regeocode || res;
      }
    }
  },
  (error) => {
    if (!axios.isCancel(error)) {
      <%_ if (options.platform === 'mobile') { _%>
      Notify({
        message: "网络请求失败" || error.message,
        type: "danger",
        duration: 4 * 1000,
      });
      <%_ } else if (options.version === 'v2') { _%>
      Message({
        showClose: true,
        message: "网络请求失败" || error.message,
        type: 'error',
        duration: 4 * 1000,
      });
      <%_ } else if (options.version === 'v3') { _%>
      ElMessage({
        showClose: true,
        message: "网络请求失败" || error.message,
        type: 'error',
        duration: 4 * 1000,
      });
      <%_ } _%>
    }
    return Promise.reject(error);
  }
);

export default function instance({ method, url }) {
  return function http({
    data,
    params,
    headers,
    cancelToken,
    responseType,
    timeout,
  } = {}) {
    return service({
      method,
      url,
      data,
      params,
      headers,
      cancelToken,
      responseType,
      timeout,
    });
  };
}
