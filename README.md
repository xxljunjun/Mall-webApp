# 一、环境搭建
```
//创建项目
//安装node.js
node -v:检测nodejs版本
npm -v:检测npm版本
npm install -g nrm
nrm ls:查看镜像地址
nrm use taobao

npm install @vue/cli -g

vue create vue-jindong

"start":"npm run serve"

//配置路由
npm install vue-router -S  

//配置状态管理 
npm install vuex -S   

//配置sass 
npm install sass-loader -D    
npm install node-sass -D
  
//配置UI组件库
npm install vant -S  
npm i babel-plugin-import -D
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```
# 二、书写静态页面
+ 首页
+ 发现页
+ 购物车页
+ 用户页

# 三、接口粘条
```
//配置axios.js
npm install axios -S
```

```
//跨域vue脚手架cli自带的方法vue.config.js
//文件API 请求代理到 API 服务器
module.exports={
    devServer:{
        port:8090,
        open:true,
        proxy:{
            '/api':{
                target:'http://10.20.158.29:9000',
                ws:true,
                changeOrigin: true
                //   http://10.20.158.29:9000      
                //   后端提供的api接口：/api/v1/user/login
            }
        }
    }
}
```
+ 书写请求后端接口的方法

# 四、重点小知识点总结
+ 1、按需引入vantUI组件库
```
import { Button } from 'vant';
export default{
  components:{
    [Button.name]:Button
  }
}
```

+ 2、keep-alive需要被缓存的页面，建议使用视图命名来解决
```
    <keep-alive>
          <router-view name='alive'></router-view>
    </keep-alive>
```

+ 3、下拉刷新
```
下拉刷新时可以触发refresh事件（vant组件库自带）
```

+ 4、List列表的触底加载功能<van-list>
```
  //@load="onLoad"
  //滚动条与底部距离小于 offset 时触发
  onLoad(){
            console.log('触底加载')
            //判断数据已到底
            if(this.goodArr.length<this.total){
                this.page++
                this.getList()
            }else{
                this.finished = true
                //显示"商品没有了"
            }
        },

```

+ 5、异步
```
//es6语法
async fn(){
  const res = await fn()
}
```

+ 6、深复制
```
 //深复制，栈和堆的区别
//先把数组转成json字符串，再解析字符串
this.list = JSON.parse(JSON.stringify(this.list))
```

+ 7、路由守卫
```
// 它的作用，阻止未登录用户进入需要权限的页面
router.beforeEach((to,from,next)=>{
    let token =localStorage.getItem('token')
    let pageArr=['/cart','/user']
    if(pageArr.includes(to.path)){
        if(token){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    } 
})
```

+ 8、发现页面----利用状态管理缓存数据
```
namespaced:true,
    state:{
        goodObj:{}
    },
    mutations:{
        updateGoodObj(state,payload){
            state.goodObj[payload.k]=payload.v
            // 深复制，让Vuex知道goodObj发生了变化
            state.goodObj=JSON.parse(JSON.stringify(state.goodObj))
        },
        //用于清楚缓存
        clearGoodObj(state){
            state.goodObj={}
        }
    },
    actions:{
        fetchList(store,params){
            //调取接口获取当前品类下的商品列表
            fetchGoodList(params).then(res=>{
                console.log('当前品类下的商品列表', res)
                let payload={
                    k:params.index,
                    v:res.list
                }
                store.commit('updateGoodObj',payload)
            })
        }
    },
```

# 五、项目总结
路由怎么安装和使用的？

Vuex怎么安装和使用的？

怎么支持Sass的？

REM布局怎么搞的？（引入rem.js文件，在编辑器中安装 cssrem 插件，并设置转化尺寸为 75。

Vant-UI怎么安装的？（注意babel.config.js文件的配置）

#项目总结

1、技术栈（REM）vue  vue-router   vuex   sass  vant（至少10个组件）
2、团队：前端1人，后端1人
3、功能模块：商品展示模块（首页、广告页、促销页、商品详情页）、购物车模块、个人中心模块、订单模块
4、必问技术：性能优化、SEO优化、图片优化、埋点、下拉刷新、触底加载
5、项目亮点：
6、项目难点：UI还原度很高、交互体验要求高

+ 这是一个电商类Web移动app的to B产品，采用的开发框架是vue框架，UI组件库是vantUI组件库。
+ 主要运用的技术栈是vue.CLI脚手架，vuex(状态管理)，vue-router,axios,sass,，(REM),
vantUI组件库：layout布局组件，Search搜索组件，loading加载组件，pullrefresh下拉刷新组件，Swiper轮播组件，TabBar组件，Toast轻提示组件，Icon图标组件，Form表单组件。业务组件：Card商品卡片组件，SubmitBar组件。
+ 该项目是由1名前端和1名后端配合完成的to B类的电商类web移动app，里面的功能模块主要有首页模块，商品展示模块，个人中心模块（登录和注册模块），订单模块和购物车模块。项目开发时间总共用了3个多月

+ 项目开发初期：配置相关环境:（1）检查电脑是否安装nodejs环境，nrm的镜像地址是否为国内地址;通过安装node-sass和sass-loader来支持sass文件的编写;（2）通过安装vuex状态管理和main.js入口文件配置vuex挂载到#app实例中;（3）通过安装vue-router和配置路由匹配规则，在main.js入口文件挂载到#app实例中;（4）通过安装axios和配置aixos.js文件（请求拦截器和响应拦截器），通过封装的api.js中的方法进行数据的接口联调;（5）通过安装babel-plugin-import和配置 babel.config.js文件来实现vantUI组件库的按需引入。

+ 项目开发中期：完成项目中的模块布局和交互，例如模块与模块之间的跳转链接。再进行数据的接口联调。例如（1）首页模块中的下拉刷新，通过vantUI组件库中的pullrefresh下拉刷新组件，调取后端接口获取后端商品数据。（2）首页模块中List列表的触底加载功能，通过组件生命周期中的mounted获取数据的数量，再判断数据是否已经全部加装完成。（3）首页模块通过动态路由的方式传递数据（id），接收数据的组件再通过this.$route.params接收数据(id)，模块再通过id去获取后端数据。（4）商品展示模块中用vantUI组件库中的sidebar侧边导航组件中的，再通过相对定位进行左右布局，组件中的change 方法来监听切换导航项时的事件;在mounted中初始化页面,通过async...awiat方法先调接口获取品类列表，再调接口获取当前品类的商品详情。（5）商品展示模块通过vuex状态管理存储数据，访问品类时，先去vuex中看看是否有当前品类的数据，如果有就不需要再次调接口，直接展示渲染数据。mutations无法改变state中的数据时，要采用深复制的方法：this.list = JSON.parse(JSON.stringify(this.list))（6）购物车模块中，通过数组的方法map，foreach，filter等处理数据。（7）用户模块中的登录和注册模块，需要用到token技术，setItem,removeItem,getItem。

+ 项目开发后期：对项目进行优化：（1）图片优化，在utils中建立img.js文件，再在原型链中Vue.prototype.$img=img，这样整个项目的的图片都可以通过this.$img去访问，便于图片的统一化管理在img.js中管理路径。在工程化环境中，尽可能地避免使用 background-image 来展示图片。当图片很小、并且几乎不用考虑图片优化时，可以把图片放在assets目录，它会成为代码的一部分。当图片不是特别小、未来项目上线时有可能要进行CDN加速等优化，建议放在public目录中，当项目打包时，不会改变public的图片。代码中使用图片，建议使用模块化来管理，不要在组件中使用相对路径、绝对路径来引入图片。（2）数据接口联调的方法可以通过绑在原型链上，Vue.prototype.$api=api，通过this.$api去调取方法。（3）SEO优化:搜索引擎优化，让用户更多地找到你,SEO优化的原则：尽量减少js、css功能，尽可能多地使用静态html,EO策略：官网、移动官网;数据能用静态渲染，尽量使用渲染,h1-h6  ,尽量不要都使用div,html5语义化标签 header footer article nav aside,加上title属性,加上图片alt属性,  meta 元数据、关键词,title 标签。（4）网站上线的三个条件：已备案的域名、稳定的服务器、代码。（5）打包时要考虑以下问题：api baseURL，img baseURL，publicPath。（6）通过路由命名的方式需要被缓存的页面<keep-alive>。（7）在全局的router.js中设置路由守卫，阻止未登录用户进入需要权限的页面router.beforeEach((to,from,next)=>{}

+ 在项目的开发过程中，也遇到了许多问题，但在前端和后端的密切沟通配合下，顺利的解决了遇到的项目bug和项目难点。例如：（1）在做数据的接口联调时，后端数据接口复杂繁多，但是在与后端工程师沟通，实时跟进后端开发的进度和了解项目接口的变化之后，问题也就迎刃而解了。（2）还有后端返回的数据不是前段想要的数据类型，需要前端工程师对后端返回的数据进行处理后在渲染到页面中。（3）UI要求还原度要高，其中的交互体验也是十分的复杂，在开发过程中，需要要求前端工程师正确使用vantUI组件库，并通过sass修改其的css样式，来达到还原UI设计稿的目的。

