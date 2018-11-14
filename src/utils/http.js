'use strict'

import axios from 'axios'
import { Indicator } from 'mint-ui'
const BASE_URL = 'http://120.79.240.9:9999/'
//'http://10.10.10.125:9999/'
axios.interceptors.request.use(config => {
  // loading opend
  Indicator.open('加载中...')
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading close
  Indicator.close()
  try {
    if (/^(200|304|400){1}$/.test(response.status)) {
      return response.data
    }

    if (+response.status === 500) {
      alert('系统异常')
    }
  } catch (e) {
    alert('网络异常')
  }
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: BASE_URL,
      url,
      data,
      timeout: 15000
    }).then(response => checkStatus(response))
  },
  BASE_URL
}
