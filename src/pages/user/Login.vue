<template>
    <div class="qf-lofin">
        <h4>京东登录页面</h4>
        <van-form @submit="onSubmit">
            <van-field
                v-model="user.username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="user.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
        <div class="register">没有账号？请点击
            <span @click='register'>注册</span>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import {TabBar} from '@/components/'
import { Form ,Field ,Button,Toast} from 'vant';
    export default {
        data(){
            return {
                user:{
                    username:'',
                    password:''
                },
                timer:null
            }
        },
        methods:{
            onSubmit(){
                // console.log(this.user)
                //调登录接口
                this.$api.fetchLogin(this.user).then(res=>{
                    console.log(res)
                    Toast('登录成功');
                    //设置token
                    localStorage.setItem('token',res.token)
                    this.timer=setTimeout(()=>{
                        //跳转到
                        this.$router.back()
                    },1000)
                    
                })
            },
            register(){
                console.log(11)
                this.$router.history.push('/register')
            }
        },
        components:{
            [Form.name]:Form,
            [Field .name]:Field ,
            [Button.name]:Button,
            TabBar
        },
        beforeDestroy(){
            //组件销毁前清除定时器
            clearTimeout(this.timer)
        }
    }
</script>

<style lang="scss" scoped>
.qf-lofin{
    text-align: center;
    &>h4{
        text-align: center;
    }
    .register{
        font-size:0.346667rem;
        &>span{
            color: blue;
        }
    }
}
</style>