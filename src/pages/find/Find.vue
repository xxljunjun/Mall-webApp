<template>
    <div class="qf-find">
        <div class="search">
            <van-search
                disabled
                show-action
                :placeholder="placeText"
                @click="onSearch"
                shape='round'
            >
                <template #action>
                    <van-icon name="ellipsis" size='0.7rem' />
                </template>
                <template #left>
                    <div><van-icon name="arrow-left" color="#ccc" size='0.5rem' @touchstart="back"/></div>
                </template>
            </van-search>
            <!-- 下划线 -->
            <van-divider
                :style="{ color: '#1989fa', borderColor: '#ccc',  }"
            >
            </van-divider>
        </div>
        <!-- 左边导航栏 -->
        <div class="qff-left">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item  v-for='item in cateArr' :key='item._id' :title="item.cate_zh" />
            </van-sidebar>
        </div>
        <!-- 右边商品详情 -->
        <div class="qff-right">
            <van-grid :border="false" :column-num='3'>
                <van-grid-item v-for='item in goodObj[activeKey]' :key='item._id'>
                    <div class="good-item">
                        <img :src="$img.imgBaseUrl+item.img" />
                    <div v-text='item.name'></div>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import {TabBar} from '@/components/'
import {mapActions,mapState,mapMutations} from 'vuex'
import { 
    Divider ,
    Icon,
    Search,
    Sidebar, 
    SidebarItem,
    Grid,
    GridItem
 } from 'vant';
    export default {
        name:'find',
        data(){
            return {
                activeKey:0,
                cateArr:[],
                //搜索框
                hotGoods:[
                    {id:1,name:'针式打印机'},
                    { id: 2, name: '行车记录仪' },
                    { id: 3, name: '云南白药1' },
                    { id: 4, name: '云南白药2' },
                    { id: 5, name: '云南白药3' },
                    { id: 6, name: '云南白药4' }
                ]
            }
        },
        components:{
            TabBar,
            [Sidebar.name]:Sidebar,
            [SidebarItem.name]:SidebarItem,
            [Grid.name]:Grid,
            [GridItem.name]:GridItem,
            [Search.name]:Search,
            [Icon.name]:Icon,
            [Divider.name]:Divider 
        },
        mounted(){
            //页面初始化
            this.init()
        },
        beforeDestroy(){
            this.clearGoodObj()
        },
        watch:{
            //在这里实现缓存
            // 当侧边栏发生品类切换时，我们首先要去判断goodObj有没有我想要的数据
            // 如果有直接用，不必调接口
            // 如果没有，再调接口，并缓存
            activeKey:function(){
                let arr =this.goodObj[this.activeKey]
                // console.log(arr)
                if(!(arr && arr.length>0)){
                    let params={
                        cate:this.cateArr[this.activeKey].cate,
                        size:1000000,
                        index:this.activeKey
                    }
                    //触发actions
                    this.fetchList(params)
                }
            }
        },
        methods:{
            ...mapActions('good',['fetchList']),
            ...mapMutations('good',['clearGoodObj']),
            async init(){
                //第一步完成 获取品类列表
                const res =await this.$api.fetchAllCates({})
                this.cateArr=res.list
                console.log(res)
                //第二部，根据第一个品类下面的商品列表
                let params={
                    cate:this.cateArr[this.activeKey].cate,
                    size:1000000,
                    index:this.activeKey//通过index去调取接口
                }
                //触发actions
                this.fetchList(params)
            },
            onSearch(){
                this.$router.push('/howsearch')
            },
            back(){
                this.$router.back()
            }
        },
        computed:{
            ...mapState('good',['goodObj']),
            placeText:function(){
                return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)].name
            }
        }
    }
</script>
<style lang="scss" scoped>
.qf-find{
    .search{
        position: fixed;
        top: 0;
        z-index: 9999;
        width: 100%;
        .van-search{
            padding: 0;
        }
        .van-divider {
        margin-top:0 ;
        }
        .van-icon{
            padding: 0.133333rem;
            padding-bottom:0.373333rem;
        }
    }
    .qff-left{
        padding-top: 1.3rem;
        position: absolute;
        top: 0;
        left: 0;
        bottom:1.33rem ;
        z-index: 99;
        overflow: auto;
        width:2.13rem ;
    }
    .qff-right{
        padding-top:1.3rem;
        position: absolute;
        left:2.13rem ;
        top: 0;
        bottom: 1.33rem;
        right: 0;
        overflow: auto;
        .good-item {
            &>img {
                display: inline-block;
                width: 1.6rem;
                height: 1.6rem;
            }
            &>div {
                font-size: .4rem;
            }
        }
    }
}
</style>