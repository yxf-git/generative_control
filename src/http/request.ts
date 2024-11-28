import axios from "./base";

const baseUrl = ""
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8"

//通用请求方式
export const sendMethod = (method: string, url: string, params: any, headers = {}) => {
    //默认header
    let headerTem = {
        'Content-Type': 'application/json',
    }
    if (JSON.stringify(headers) != "{}") {
        Object.assign(headerTem, headers)
    }
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: params,
            headers: headerTem
        })
            .then(res => {
                console.log("sendMethod res info", res)
                resolve(res.data)
            })
            .catch(err => {
                console.log("sendMethod err info", err)
                reject(err)
            })
    })
}


//get方法
export function sendGet(url: string, data: {}, funcSuccess: any, funcError: any) {
    // 可选地，上面的请求可以这样做
    axios.get(baseUrl + url, {
        params: data
    }).then(function (res) {
        // console.log("sendGet res info :",res);
        funcSuccess(res)
    }).catch(funcError ? funcError : function (err) {
        console.log("sendGet err info :" + err);
        console.log(err)
    });
}


//post方法
export function sendPost(url: string, data: any, headers = {}, funcSuccess: any, funcError: any) {
    let headerTem = {
        'content-Type': 'application/json;charset=UTF-8',
    }
    if (JSON.stringify(headers) != "{}") {
        Object.assign(headerTem, headers)
    }
    axios.post(url, data, {
        headers: headerTem
    })
        .then(function (res) {
            funcSuccess(res);
        })
        .catch((err) => {
            console.log("sendPost err info :" + err);
            if (funcError) {
                funcError(err);
            }
        });
}


//post方法
export function sendPostCanAbort(url: string, data: any, headers = {}, signal: any, funcSuccess: any, funcError: any) {
    let headerTem = {
        'content-Type': 'application/json;charset=UTF-8',
    }
    if (JSON.stringify(headers) != "{}") {
        Object.assign(headerTem, headers)
    }
    axios.post(url, data, {
        headers: headerTem,
        signal: signal
    })
        .then(function (res) {
            funcSuccess(res);
        })
        .catch((err) => {
            console.log("sendPost err info :" + err);
            if (funcError) {
                funcError(err);
            }
        });
}