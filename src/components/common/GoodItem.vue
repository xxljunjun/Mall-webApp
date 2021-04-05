<template>
    <div class="qf-good-item" @click='goodDetail'>
        <img :src="$img.imgBaseUrl+good.img" :alt="good.name">
        <div v-text='good.desc'></div>
        ￥<div v-text='good.price'></div>
    </div>
</template>

<script>
    export default {
        //父向子传值，props相当于data声明的变量
        props:{
            good:{
                Type:Object,
                required:false,
                default:function(){
                    return {}
                }
            }
        },
        data(){
            return {

            }
        },
        methods:{
            goodDetail(){
                // console.log(this.good)
                // console.log(111)
                this.$router.history.push('/good/detail/'+this.good._id)
            }
        }
    }
</script>

<style lang="scss" scoped>
.qf-good-item{
    background: #fff;
    text-align: center;
    img{
        display: block;
        width: 3.333333rem;
        height:3.333333rem;
        margin: 0 auto;
    }
}
</style>