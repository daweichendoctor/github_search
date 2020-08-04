// github graphQL api请求封装
import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { GRAPH_QL, ACCESS_TOKEN } from 'utils/constants';

const instance: AxiosInstance = axios.create({
    baseURL: GRAPH_QL,
    timeout: 15000,
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + ACCESS_TOKEN
    },
    method: 'post',
});

export default async (jsonString: string, type: graphApiType = 'query'): Promise<any> => {
    // github graphQL api 只有post请求 
    const option: AxiosRequestConfig = { data: { [type]: jsonString } };
    return new Promise((resolve, reject) => {
        instance(option).then(
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