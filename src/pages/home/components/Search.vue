<template>
    <div class="qf-search">
        <!-- 搜索框 -->
        <van-search
            disabled
            show-action
            shape="round"
            background="#C9192D"
            :placeholder="placeText"
            @click='howSearch'
        >
            <template #action>
                <div @touchstart="skipToLogin" class="login" v-if='!isLogin'>
                    登录
                </div>
            </template>
            <template #left>
                <div><van-icon name="wap-nav" color="#ffffff" size='0.8rem' @touchstart="skipToList"/></div>
            </template>
        </van-search>
    </div>
</template>

<script>
import {Search} from 'vant'
    export default {
        data(){
            return {
                isLogin:'',
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
        methods:{
            skipToList(){
                //跳转到列表页面
                this.$router.history.push('/find')
            },
            skipToLogin(){
                //跳转到登录页面
                // console.log(this.$router)
                // console.log(this.$route)
                this.$router.history.push('/login')
            },
            howSearch(){
                console.log(11)
                this.$router.push('/howsearch')
            }
        },
        computed:{
            placeText:function(){
                return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)].name
            },
        },
        //deactivated停用时
        //ErrorCaptured错误调用时
        // 当keep-alive激活我时
        activated(){
            this.isLogin = localStorage.getItem('token')
        },
        components:{
            [Search.name]:Search
        }
    }
</script>

<style lang="scss" scoped>
.qf-search{
    .login{
        color: #ffffff;
    }
}
</style>