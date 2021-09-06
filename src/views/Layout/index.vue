<template>
  <div class="layout-container">
<router-view />
<van-tabbar route>
  <van-tabbar-item to="/home" icon="home-o">
    <span class="text">首页</span>
    <template #icon>
      <i class="toutiao toutiao-shouye"></i>
    </template>
  </van-tabbar-item>
  <van-tabbar-item to="/video" icon="search">
    <span class="text">视频</span>
    <template #icon>
      <i class="toutiao toutiao-shipin"></i>
    </template>
  </van-tabbar-item>
  <van-tabbar-item to="/wenda" icon="friends-o">
    <span class="text">问答</span>
    <template #icon>
      <i class="toutiao toutiao-wenda"></i>
    </template>
  </van-tabbar-item>
  <van-tabbar-item to="/profile" icon="setting-o">
    <span class="text">我的</span>
    <template #icon>
      <i class="toutiao toutiao-wode"></i>
    </template>
  </van-tabbar-item>
</van-tabbar>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>
.layout-container{
  .van-tabbar{
    .toutiao{
      font-size: 38px;
    }
  }
}
</style>
