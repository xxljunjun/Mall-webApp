<template>
    <div class="qf-lofin">
        <h4>京东注册页面</h4>
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
            <van-field
                v-model="user.password2"
                type="password"
                name="密码"
                label="确认密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                注册
                </van-button>
            </div>
        </van-form>
        <div class="login">已有账号，点击
            <span @click='skipToLogin'>登录</span>
        </div>
    </div>
</template>

<script>
import { Form ,
        Field ,
        Button,
        Toast
} from 'vant';
    export default {
        data(){
            return {
                user:{
                    username:'',
                    password:'',
                    password2:''
                },
                timer:null
            }
        },
        methods:{
            onSubmit(){
                // console.log(this.user)
                //调注册接口
                this.$api.fetchRegister(this.user).then(res=>{
                    console.log(res)
                    Toast('注册成功');
                    this.timer=setTimeout(()=>{
                        this.$router.replace('/login')
                    },1000)
                })
            },
            skipToLogin(){
                this.$router.replace('/login')
            }
        },
        components:{
            [Form.name]:Form,
            [Field .name]:Field ,
            [Button.name]:Button
        },
        beforeDestroy(){
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
    .login{
        font-size: 0.373333rem;
        &>span{
            color: blue;
        }
    }
}
</style>