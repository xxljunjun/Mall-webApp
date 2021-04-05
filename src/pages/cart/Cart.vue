<template>
    <div class="qf-cart">
        <!-- 当购物车为空时候，展示的页面 在页面初始化的时候判断条件-->
        <div v-if='isNoCart' class="no-good">
            <h6>购物车为空，请去买点东西吧！</h6>
        </div>
        <!-- 返回 -->
       <van-nav-bar title="购物车" left-text="返回" left-arrow fixed @click-left='onBack'>
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <!-- 商品 -->
        <van-swipe-cell v-for='item in list' :key='item._id'>
            <van-row type='flex' align='center'>
                <van-col span="4">
                    <!-- item.checked一个很特别的属性 -->
                    <van-checkbox v-model="item.checked" @click='rowChange'></van-checkbox>
                </van-col>
                <van-col span="20">
                    
                        <van-card
                            :num="item.num"
                            :price="item.good&&item.good.price"
                            :desc="item.good&&item.good.desc"
                            :title="item.good&&item.good.name"
                            class="goods-card"
                            :thumb="item.good&&$img.imgBaseUrl+item.good.img"
                        > 
                            <template #footer>
                                <van-button size="mini" @touchstart='update(item,"sub")'>-</van-button>
                                <van-button size="mini" @touchstart='update(item)'>+</van-button>
                            </template> 
                        </van-card>    
                </van-col>
            </van-row>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button"  @click='removeShop(item._id)' />
            </template>
        </van-swipe-cell>
        <!-- 提交按钮 -->
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="fullChecked" @click='fullChange'>全选</van-checkbox>
            <template #tip>
                你的收货地址不支持同城送, <span @click="skipToAddr">修改地址</span>
            </template>
        </van-submit-bar>
        <TabBar></TabBar>
    </div>
</template>

<script>
import {TabBar} from '@/components/'
import { 
    Col, 
    Row,
    Checkbox,
    CheckboxGroup,
    Card,
    SwipeCell ,
    Button,
    SubmitBar ,
    NavBar ,
    Icon,
    Toast
     } from 'vant';
    export default {
        name:'cart',
        components:{
            TabBar,
            [Col.name]:Col,
            [Row.name]:Row,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup ,
            [Card.name]:Card ,
            [SwipeCell.name]:SwipeCell ,
            [Button.name]:Button,
            [SubmitBar.name]:SubmitBar ,
            [NavBar.name]:NavBar ,
            [Icon.name]:Icon,
        },
        data(){
            return {
                fullChecked:false,
                list:[],
                timer:null,
                isNoCart:false
            }
        },
        mounted(){
            //初始化页面
            this.init()
        },
        computed:{
            total:function(){
                let t= 0
                this.list.map(ele=>{
                    if(ele.checked) t+=(ele.num*ele.good.price)*100
                }) 
                return t
            }
        },
        methods:{
            init(){
                //调接口显示商品
                this.$api.fetchCart({}).then(res=>{
                    // console.log(res)
                    this.list=res
                    if(this.list.length===0){
                        this.fullChecked=false
                        this.isNoCart=true
                    } 
                })
            },
            skipToAddr(){
                console.log('跳转选择地址')
            },
            onSubmit(){
                 console.log('提交付钱')
                //把勾选的id传过去
                let goods =''
                this.list.map(ele=>{
                    if(ele.checked) goods+=";"+ele._id
                })
                 //调接口提交商品
                 this.$api.fetchSubmitCart({goods}).then(()=>{
                     Toast('下单成功')
                     this.timer=setTimeout(()=>{
                         this.init()
                     },1000)
                 })
            },
            beforeDstory(){
                clearTimeout(this.timer)
            },
            onBack(){
                console.log('回到上一级')
                this.$router.back()
            },
            removeShop(id){
                //调取接口删除购物车商品
                let params ={
                        id
                }
                console.log(params)
                this.$api.fetchRemoveShop(params).then(res=>{
                    console.log(res)
                    this.init()
                })
            },
            update(item, flag) {
                let data = {
                    id: item._id,
                    num: flag ? item.num-1 : item.num+1
                }
                if(data.num<1) return Toast('商品不能少于1')
                this.$api.fetchUpdCart(data).then(()=>{
                    // 刷新
                    console.log('数量修改成功')
                    // this.init()
                    this.list.map((ele,idx,arr)=>{
                        //遍历数组，更改那个添加或减少了数量的商品num
                        if(ele._id === item._id) arr[idx].num = data.num
                    })
                })
            },
            fullChange(){
                //全选按钮
                this.list.map((ele,idx,arr)=>{
                    arr[idx].checked=this.fullChecked
                })
                
                //深复制，栈和堆的区别
                //先把数组转成json字符串，再解析字符串
                this.list = JSON.parse(JSON.stringify(this.list))
                // 强制执行diff运算，然后强制update页面
                // this.$forceUpdate()
            },
            rowChange(){
                //局部按钮
                // 每次发生行的勾选变量时，都要判断是否已经全选。那该怎么判断呢？
                // 思路：遍历this.list，查询被勾选的行的数量，是不是等于 this.list.length
                let arr =this.list.filter(ele=>ele.checked)
                if(arr && arr.length==this.list.length){
                    this.fullChecked=true
                }else{
                     this.fullChecked=false
                }
            }
        }
        
    }
</script>

<style lang="scss" scoped>
.qf-cart{
    padding-bottom:2rem ;
    padding-top:1.333333rem;
    .goods-card {
        margin: 0;
        background-color: white;
    }
    .delete-button {
        height: 100%;
    }
    .van-button{
        padding: 0.266667rem;
    }
    .van-swipe-cell{
        background: #fff;
    }
    .van-card{
        padding-left: 0;
        border-bottom:1px solid #eee ;
    }
}

</style>