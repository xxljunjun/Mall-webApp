import axios from './axios'


//get请求用params
//post请求用data


//1首页商品列表
// size, page, cate, hot
export function fetchGoodList(params){
    return axios({
        url:'/api/v1/jd/good/list',
        method:'GET',
        params
    })
}

//2品类列表
export function fetchAllCates(params){
    return axios({
        url:'/api/v1/jd/cates',
        method:'GET',
        params
    })
}

//3商品详情接口    id
export function fetchGoodDetail(params){
    return axios({
        url:'/api/v1/jd/good/detail',
        method:'GET',
        params
    })
}

//4商品购买   id   num
export function fetchGoodAdd(data){
    return axios({
        url:'/api/v1/jd/cart/add',
        method:'POST',
        data
    })
}

//5用户登录接口    { username, password }
export function fetchLogin(data){
    return axios({
        url:'/api/v1/user/login',
        method:'POST',
        data
    })
}

//6用户注册的接口 { username, password ,password2}
export function fetchRegister(data){
    return axios({
        url:'/api/v1/user/regist',
        method:'POST',
        data
    })
}

//7获取商品列表接口   无
export function fetchCart(params){
    return axios({
        url: '/api/v1/jd/cart/list',
        method: 'GET',
        params
    })
}

//8删除商品接口   { id: 购物车集合中文档的 _id }
export function fetchRemoveShop(params){
    return axios({
        url: '/api/v1/jd/cart/del',
        method: 'GET',
        params
    })
}

//9修改购物车数量    // { id: 同上, num: 修改后的数量 }
export function fetchUpdCart(data){
    return axios({
        url: '/api/v1/jd/cart/update',
        method: 'POST',
        data
    })
}

//10提交购物车接口
// { goods: String 用户已勾选的订单_id 连接而成的字符串 }
export function fetchSubmitCart(data){
    return axios({
        url: '/api/v1/jd/cart/submit',
        method: 'POST',
        data
    })
}

//11获取轮播图图片列表
export function fetchAdList(params){
    return axios({
        url:'/api/v1/ad/list',
        method:'GET',
        params
    })
}



// /cates
// /good/detail

// /cart/add
// /cart/list
// /cart/update
// /cart/del
// /cart/submit
export default{
    fetchGoodList,
    fetchAllCates,
    fetchGoodDetail,
    fetchGoodAdd,
    fetchLogin,
    fetchRegister,
    fetchCart,
    fetchRemoveShop,
    fetchUpdCart,
    fetchSubmitCart,
    fetchAdList
}