/**
 * @file fetch.js
 * @author deo
 */
import axios from 'axios';
import Promise from 'bluebird';
import { history } from 'freed-spa/lib/store';

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/fc-web';

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
};

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );

// http response 拦截器
axios.interceptors.response.use(
    res => {
        const result = res.data;
        if (result.meta) {
            const code = result.meta.code;
            if (code === 200) {
                return result.data;
            }

            if (code === 401) {
                // return Promise.reject(new Error(401));
            }
        }

        return res;
    },
    err => {
        return new Promise((resolve, reject) => {
            if (err.response) {
                const status = err.response.status;
                if (status === 401) {
                    // serviceRefreshLogin
                }
            }

            throw err;
        });
    }
);

export const send = (url, params, type) => {
    return axios[type](url, {
        params
    });
}

export const get = (url, params) => send(url, params, 'get');

export const post = (url, params) => send(url, params, 'post');

export default axios;
