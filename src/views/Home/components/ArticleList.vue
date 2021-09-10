<template>
  <div class="articleList">
    <van-pull-refresh :success-duration="1500" :success-text="pullRefreshText" v-model="isPullLoading" @refresh="onRefresh">
   <van-list
  v-model="loading"
  :finished="finished"
  :error.sync='error'
  error-text="请求失败，点击重新加载"
  finished-text="没有更多了"
  @load="onLoad"
>
<ArticleItem
v-for="item in list"
:key="item.art_id"
:articleItem='item'/>

</van-list>
</van-pull-refresh>

  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import { Toast } from 'vant'
import ArticleItem from '@/components/articleItem.vue'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      preTimestamp: Date.now(),
      error: false,
      isPullLoading: false,
      pullRefreshText: ''
    }
  },
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  created () {

  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      // 1.发送请求获取数据
      try {
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: this.preTimestamp,
          with_top: 1
        })
        if (Math.random() > 0.2) {
          console.log(13)
        }
        this.list.push(...res.results)
        this.preTimestamp = res.pre_timestamp
        // 3.加载状态结束
        this.loading = false
        // 4.数据全部加载完成
        if (!this.preTimestamp) {
          this.finished = true
        }
      } catch (err) {
        Toast.clear()
        this.loading = false
        this.err = true
      }
    },
    async onRefresh () {
      try {
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: Date.now(),
          with_top: 1
        })
        if (Math.random() > 0.5) {
          console.log(1)
        }
        this.isPullLoading = false
        this.list.unshift(...res.results)
        this.pullRefreshText = '亲，共刷新' + res.results.length + '条数据'
      } catch (err) {
        this.isPullLoading = false
        this.pullRefreshText = '亲，网络异常，稍后尝试'
      }
    }
    // 2.保存数据

  }
}

</script>

<style scoped lang='less'>
.articleList{
  height: 80vh;
  overflow-y: scroll;
}

</style>
