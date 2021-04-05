<template>
    <div class="qf-home">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> 
            <div class="danmu">
                <!-- 滚动弹幕 -->
                <van-notice-bar
                    left-icon="volume-o"
                    mode='closeable'
                    background='#C9192D'
                    color='#ffffff'
                    :text='msg'
                />
                <Search></Search>
            </div>
            <!-- 轮播图 -->
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="item in images" :key="item._id">
                    <img src="@/assets/lunbo_1.jpg" />
                </van-swipe-item>
            </van-swipe>
            <div class="qf-shopList">
                <!-- 商品列表提示图 -->
                <div class="good-list-tip">
                    <van-image src="//img12.360buyimg.com/img/s750x70_jfs/t1/124583/37/16524/12470/5f9bc181E48c91215/cac00c52cb0b2fa4.png" />
                </div>
                <!-- 商品列表 -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="商品没有了"
                    @load="onLoad"
                    :immediate-check='false'
                    offset='80'
                > 
                    <van-cell v-for="item in length" :key="item"  >
                        <GoodItem :good='goodArr[2*item-2]'/>
                        <GoodItem :good='goodArr[2*item-1]'/>
                    </van-cell>
                </van-list>
            </div>
        </van-pull-refresh>
        <TabBar></TabBar>
    </div>
</template>
<script>
import {GoodItem,TabBar} from '@/components/'//商品渲染,底部tabbar
import Search from './components/Search.vue'//引入搜索框组件
//按需引入组件，减小代码体积，优化性能
import {
    NoticeBar,
    Swipe,
    SwipeItem ,
    PullRefresh,
    Toast,
    Image,
    List,
    Cell
    } from 'vant'
export default {
    name:'home',
    data(){
        return {
            //弹幕
            msg:"xxl的京东商城，全场免费;xxl的京东商城，全场免费;xxl的京东商城，全场免费",
            //轮播图
            images:[
                {id:1,path:"../../assets/lunbo_1.jpg"},
                {id:2,path:"../../assets/lunbo_2.jpg"},
                {id:3,path:"../../assets/lunbo_3.jpg"}
            ],
            refreshing:false,//控制下拉刷新
            loading:false,// 每次触底加载后，都要重置为false
            finished:false,// 这个只用表示数据库已经没有数据了
            goodArr:[],
            page:1,
            total:0 ,
            token:localStorage.getItem('token')
        }
    },
    computed:{
        length:function(){
                return Math.floor(this.goodArr.length/2)
        }
    },
    components:{
        TabBar,
        GoodItem,
        Search,
        [NoticeBar.name]:NoticeBar ,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [PullRefresh.name]:PullRefresh,
        [Toast.name]:Toast,
        [Image.name]:Image,
        [List.name]:List ,
        [Cell.name]:Cell,
    },
    mounted(){
        //页面初始化
        // this.getList()
    },
    methods:{
        getList(){
            let params ={
                size:6,
                page:this.page,
                hot:undefined
            }
            //调接口，商品列表
            this.$api.fetchGoodList(params).then(res=>{
                // console.log('首页商品列表',res)
                this.total=res.total
                if(params.page===1){
                    this.goodArr=res.list
                    //重置完成状态，停止掉下拉刷新的状态
                    this.refreshing=false
                    //重置完成后，恢复List的触底功能
                    this.finished=false
                    this.loading=false
                }else{
                    this.goodArr=[...this.goodArr,...res.list]
                    this.loading=false
                }
            })
            //调接口，轮播图的图片
            this.$api.fetchAdList({}).then(res=>{
                // console.log(res)
                const imagesPick =res.list.filter(function(val,idx){
                    return idx<3
                })
                this.images=imagesPick
            })
        },
        onRefresh(){
            console.log('下拉刷新')
            this.page=1
            this.getList()
        },
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
        }
    }
}
</script>

<style lang="scss" scoped>
.qf-home{
    padding-bottom: 1.8rem;
    .danmu{
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 99;
    }
    .van-swipe {
        height: 3.6rem;
        padding-top:2.56rem ;
        img {
        display: block;
        height: 100%;
        width: 100%;
        }
    }   
    .qf-shopList{
        // background: #eee;
        .good-list-tip{
            padding-top:.33rem ;
            .van-image{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .van-cell{
            background: #eee;
            // background:rgba(247,247,247,1);
            &>div{
            display: flex;
                &>div{
                    flex:1;
                    margin:0.133333rem;
                }
            }   
        }
    }
}

</style>