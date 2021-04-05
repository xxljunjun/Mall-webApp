import Vue from 'vue'
import App from './App.vue'

//配置路由router,挂载到实例上
import router from './router'

//配置状态管理vuex
import store from './store/'

//配置全局小icon
import img from './utils/img'
Vue.prototype.$img=img

//配置全局http请求的方法
import api from './utils/api'
Vue.prototype.$api=api

//配置vant图片字体
import { Icon } from 'vant';
Vue.use(Icon);

//配置layout布局
import { Col, Row } from 'vant';
Vue.use(Col);
Vue.use(Row);

//配置懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

//对于开发版本，会默认向控制台打印：
//设置为false就不会提示了
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

