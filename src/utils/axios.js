
import axios from 'axios'//它是一个HTTP工具，用于与后端进行数据交互。
//生产环境
//测试环境
//开发环境
const baseURL ="http://localhost:8090"//要是跨域的话，就请求本地服务器跳转到vue.config.js解决跨域问题

//c创建一个axios实例
const instance =axios.create({
    baseURL,
    timeout:7000,
    headers:{}
})


//封装请求拦截器
instance.interceptors.request.use(function(config){
    //在请求被send出去之前，你可以在这里做一些事情
    //加token
    // console.log('请求拦截器', config)
 
//每次发送请求之前都要携带token鉴定身份去访问后端数据库
config.headers.Authorization = localStorage.getItem('token')

    return config
},function(error){
    return Promise.reject(error)
})

//封装响应拦截器
instance.interceptors.response.use(function(res){
    let response =null
    // console.log('响应拦截器', res)
    if(res.status==200){
        if(res.data&& res.data.err===0){
            response=res.data.data
        }else{
            console.log("调接口失败")
        }
    }else{
        console.log("调接口失败")
    }
    return response
},function(error){
    return Promise.reject(error)
})


export default instance