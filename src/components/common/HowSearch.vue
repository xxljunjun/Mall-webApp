<template>
    <div class="qf-howSearch">
        <van-search
            v-model="value"
            show-action
            :placeholder="placeText"
            @search="onSearch"
            shape='round'
        >
            <template #action>
                <div @click="onSearch" class="searchBtn">搜索</div>
            </template>
            <template #left>
                <div><van-icon name="arrow-left" color="#ccc" size='0.5rem' @touchstart="back"/></div>
            </template>
            </van-search>
            <van-divider
                :style="{ color: '#1989fa', borderColor: '#ccc',  }"
            >
        </van-divider>
    </div>
    
</template>

<script>
import { Search ,Icon,Divider } from 'vant';
export default {
    data(){
        return {
            value:'',
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
    computed:{
        placeText:function(){
            return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)].name
        },
    },
    components:{
        [Search.name]:Search ,
        [Icon.name]:Icon ,
        [Divider.name]:Divider 
    },
    methods:{
        onSearch(){

        },
        back(){
            this.$router.back()
        }
    }
}
</script>

<style lang="scss" scoped>
.qf-howSearch{
    .searchBtn{
        background: red;
        padding: 0 0.266667rem;
        border-radius: 0.133333rem;
        color: #fff;
    }
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
</style>