import {fetchGoodList} from '@/utils/api'
export default{
    namespaced:true,
    state:{
        goodObj:{}
    },
    mutations:{
        updateGoodObj(state,payload){
            //向goodObj这个对象中添加元素
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
    getters:{

    },
    modules:{

    }

/* * state  //存储中心，所有需要被共享或缓存的数据都在这里定义
* getters //相当于组件中的计算属性computed,与state相关，发生变化
* mutations  //Vuex中专门用于更新state
* actions  //专门用来与后端backend API打交道
* mudules  放置状态管理Vuex */
}