// http请求封装
import axios from './axios';
import { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
// http请求 urlParam存在时: urlParam 为 url上带的参数 queryData 为 path路径上 带的参数

export default async (api: { method: Method; url: string }, data: any): Promise<any> => {
    let { url, method } = api;
    let searchData: any = {};
    Object.entries(data).forEach(([key, value]: [string, any]) => {
        const paramStr = `{${key}}`;
        if (url.includes(paramStr)) {
            // 替换/{id}/为/idValue/
            url.replace(paramStr, value);
        } else {
            searchData[key] = value;
        }
    })
    let option: AxiosRequestConfig = { method, url };
    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
        option.data = searchData;
    } else {
        option.params = searchData;
    }
    return new Promise((resolve, reject) => {
        axios(option).then(
            (res: AxiosResponse) => {
                const { status, data } = res;
                if (status >= 200 && status < 300) {
                    resolve(data);
                } else if (data !== undefined) {
                    resolve(res);
                } else {
                    reject('请求失败');
                }
            },
            (err) => reject(`请求失败:${err}`)
        );
    });
};