<template>
    <div class="qf-tabBar">
        <van-tabbar route active-color='#F30F05'>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to='/find'>发现</van-tabbar-item>
            <van-tabbar-item icon="friends-o"  to='/cart'>购物车</van-tabbar-item>
            <van-tabbar-item 
            icon="setting-o" 
            :to='isLogin?"/user":"/login"'
            >{{isLogin?"我的":"登录"}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
//vant组件库的基本用法
import { Tabbar, TabbarItem } from 'vant'
    export default {
        data(){
            return {
                isLogin: false
            }
        },
        components:{
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        },
        mounted(){
            this.isLogin = localStorage.getItem('token')
        },
        //deactivated停用时
        //ErrorCaptured错误调用时
        // 当keep-alive激活我时
        activated() {
            this.isLogin = localStorage.getItem('token')
        }
    }
</script>

<style lang="scss" scoped>

</style>