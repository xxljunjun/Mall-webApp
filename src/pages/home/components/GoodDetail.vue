<template>
    <div class="qf-gooddetail">
        <div class="img">
            <img :src="$img.imgBaseUrl+info.img" alt="0">
        </div>
        <div v-text='info.name' class="shopName"></div>
        <div v-text='info.price' class="shopPrice"></div>

        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" @click='buy' />
        </van-goods-action>
    </div>
</template>

<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton ,Toast } from 'vant';
    export default {
        data(){
            return {
                info:{},
                
            }
        },
        components:{
            [GoodsAction.name]:GoodsAction,
            [GoodsActionIcon.name]:GoodsActionIcon,
            [GoodsActionButton.name]:GoodsActionButton
        },
        methods:{
            buy(){
                let data={
                    good_id:this.info._id,
                    num:1
                }
                // console.log(data)
                //调取接口添加购物车
                this.$api.fetchGoodAdd(data).then(()=>{
                    Toast.success('加入购物车');
                    this.timer=setTimeout(()=>{
                        this.$router.replace('/cart')
                    },800)
                    
                })
                
            }
        },
        mounted(){
            let id =this.$route.params.id
            // console.log(this.id)
            //数据联调商品详情接口
            this.$api.fetchGoodDetail({id}).then(res=>{
                // console.log(res)
                this.info=res
            })
        }
    }
</script>

<style lang="scss" scoped>
.qf-gooddetail{
    .img{
        
        &>img{
            width: 4rem;
            height: 4rem;
        }
    }
    .shopName{
        text-align: center;
    }
    .shopPrice{
        text-align: center;
    }
}
</style>