<template>
  <div>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text='请求失败，点击重新加载'
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { getSearchResults } from '../../../api/search.js'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const res = await getSearchResults({
          page: this.page,
          per_page: 10,
          q: this.searchText
        })
        if (Math.random() > 0.5) {
          console.log(1)
        }
        this.page++
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        this.list.push(...res.results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= res.total_count) {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}

</script>

<style scoped>

</style>
