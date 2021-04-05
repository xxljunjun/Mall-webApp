<template>
<div class="app">
    <!-- 需要被缓存的页面，建议使用视图命名来解决 -->
    <keep-alive>
      <router-view name='alive'></router-view>
    </keep-alive>
    
    <!-- 不需要被缓存的组件，用default容器来显示 -->
    <router-view></router-view>
</div>
</template>
<script>
export default {
  name: 'App',
  components: {
    
  }
}
</script>
<style lang='scss'>
html,body{
  padding: 0;
  margin: 0;
}
//样式的层级问题不够，放全局
.van-checkbox{
        &>div{
            margin: 0 auto;
        }
    }
</style>
