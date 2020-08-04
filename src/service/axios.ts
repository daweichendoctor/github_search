import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASEURL } from 'utils/constants';
import { AppStore } from 'store';

const instance = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
    headers: {
        'Accept': 'application/json',
    }
});

// 添加请求拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (AppStore.auth) {
        config.headers = { ...config.headers, Authorization: 'Bearer ' + AppStore.auth }
    } else {
        // TODO to login
        // TODO CancelToken
        console.log('无授权 去登录')
    }
    // 在发送请求之前做些什么
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
    // 对响应数据做点什么
    return response;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;
