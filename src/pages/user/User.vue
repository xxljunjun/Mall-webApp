<template>
    <div class="qf-user">
        <h1>user</h1>
         <button @click='outLogin'>退出登录</button>
        <TabBar></TabBar>
    </div>
</template>

<script>
import {TabBar} from '@/components/'
    export default {
        name:'find',
        components:{
            TabBar
        },
        methods:{
            outLogin(){
                localStorage.removeItem('token')
                this.$router.replace('/')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>