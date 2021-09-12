<template>
  <div class="search-container">
<van-sticky>
  <form action="/">
  <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    background="#3296fa"
    @search="onSearch"
    @cancel="$router.go(-1)"
    @focus="isShowResults=false"
  />
  </form>
</van-sticky>
<SearchResults :searchText='searchText' v-if="isShowResults"/>
<SearchHistory @search='onSearch' :history='history' v-else-if="!searchText"/>
<SearchSuggestion @clickItem='onSearch' :searchText='searchText' v-else/>

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResults from './components/search-results.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      searchText: '',
      isShowResults: false,
      history: getItem('HMTT-HISTORY') || []
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },
  watch: {
    history: {
      deep: true,
      handler () {
        setItem('HMTT-HISTORY', this.history)
      }
    }
  },
  created () {

  },

  methods: {
    onSearch (val) {
      this.history.unshift(val)
      this.history = [...new Set(this.history)]
      this.searchText = val
      this.isShowResults = true
    }
  }
}
</script>

<style scoped lang='less'>
.search-container{
  .van-search__action{
    color: #fff;
  }
}
</style>
