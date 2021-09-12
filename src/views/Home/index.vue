<template>
  <div class="home-container">
<van-nav-bar
 class="page-nav-bar"
 fixed>
  <template #title>
    <van-button to="/search" class="search-btn" icon="search" type="primary">搜索</van-button>
  </template>
</van-nav-bar>
<van-tabs class="header-tabs" v-model="active" animated swipeable>
  <van-tab v-for="item in channels" :key="item.id" :title="item.name">
    <ArticleList :channelId='item.id' />
  </van-tab>

  <template #nav-right>
    <div class="right-btn" @click="isShowEditPopup=true">
      <i class="toutiao toutiao-gengduo"></i>
    </div>
    <div class="placeholder-box"></div>
  </template>
</van-tabs>
<van-popup
 closeable
 close-icon-position='top-left'
 v-model="isShowEditPopup"
 position="bottom"
:style="{ height: '90%' }"
  >
  <ChannelEdit @update-active='onUpdateActive' :myChannels="channels" :activeIndex='active'/>
  </van-popup>
  </div>
</template>

<script>
import ChannelEdit from './components/ChannelEdit.vue'
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
import { Toast } from 'vant'
import { getItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      isShowEditPopup: false
    }
  },
  components: { ArticleList, ChannelEdit },
  created () {
    this.loadUserchannels()
  },

  methods: {
    async loadUserchannels () {
      try {
        const localChannel = getItem('HMTT-CHANNELS')
        if (!this.$store.state.user && localChannel) {
          this.channels = localChannel
        } else {
          const res = await getUserChannels()
          this.channels = res.channels
        }
      } catch (err) {
        console.log(err)
        Toast('系统异常')
      }
    },
    onUpdateActive (val, isshow) {
      this.active = val
      this.isShowEditPopup = isshow
    }
  }
}
</script>

<style scoped lang='less'>
.home-container{
  padding-top: 172px;
  /deep/.van-nav-bar__title{
    max-width: unset;
  }
  .search-btn{
    width: 555px;
height: 64px;
background: rgba(255,255,255,.2);
border-radius: 32px;
border: none;
.van-icon-search{
  color: #fff;
}
  }
 /deep/.header-tabs{
    .van-tabs__wrap{
      height: 80px;
      border-bottom: 1px solid #EDEFF3;
      position: fixed;
      width: 100%;
      top: 92px;
      z-index: 2;
    }
    .van-tabs__nav--line{ padding: 0;}
    .van-tab{
      width: 200px;
      border-right: 1px solid #EDEFF3;
      .van-tab_text{
        font-size: 28px;
        color: #777;
      }
    }
    .van-tab-active{
      .van-tab__text{
        font-size: 30px;
        color: #333;
      }
    }
    .van-tabs__line{
     width: 31px;
height: 6px;
background: #3296FA;
border-radius: 3px;
bottom: 8px;
    }
    .right-btn{
      width: 66px;
      height: 80px;
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .toutiao-gengduo{
        font-size: 33px;
      }
      &::before{
        content: '';
        width: 2px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        position: absolute;
        left: 0;
        background-size: 100% 100%;
      }
    }
    .placeholder-box{
      width: 66px;
      flex-shrink: 0;
    }
  }
}
</style>
