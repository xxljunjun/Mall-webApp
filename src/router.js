import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入组件（页面）
//路由懒加载
const home =()=>import('@/pages/home/Home.vue')
const cart =()=>import('@/pages/cart/Cart.vue')
const find =()=>import('@/pages/find/Find.vue')
const user =()=>import('@/pages/user/User.vue')
const login =()=>import('@/pages/user/Login.vue')
const GoodDetail =()=>import('@/pages/home/components/GoodDetail.vue')
const Register =()=>import('@/pages/user/Register.vue')
const HowSearch =()=>import('@/components/common/HowSearch.vue')

//匹配路由规则
 const router =new VueRouter({
    mode:'hash',
    routes:[
        {path:'/howsearch',component:HowSearch},
        {path:'/good/detail/:id',component:GoodDetail},
        {path:'/',components:{alive:home}},//路由命名
        {path:'/cart',component:cart},
        {path:'/find',component:find},
        {path:'/user',component:user},
        {path:'/login',component:login},
        {path:'/register',component:Register},
        {path:'/*',redirect:'/'}//重定向到首页
    ]
})

// 全局导航守卫（路由守卫）
// 它的作用，阻止未登录用户进入需要权限的页面
// router.beforeEach((to,from,next)=>{
//     // console.log('to',to)
//     // console.log('from',from)
//     let token =localStorage.getItem('token')
//     // 第一重判断：判断哪些页面需要被守卫（保护）
//     let pageArr=['/cart','/user']
//     if(pageArr.includes(to.path)){
//         // 第二重判断，用token表示用户是否登录。如果已登录，可以访问私密页面；
//         //如果未登录，不让访问私密页面。
//         if(token){
//             next()
//         }else{
//             next('/login')
//         }
//     }else{
//         next()
//     } 
// })



export default router