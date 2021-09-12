<template>
  <div>
<van-cell @click="onClickItem(item)" v-for="(item,index) in suggestions" :title="item" :key="index" icon="search">
 <template #title>
<div v-html="formatStr(item)"></div>
 </template>
 <van-empty v-if='!suggestions.length' image="search" description="暂无建议" />
 </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { Toast } from 'vant'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      immediate: true,
      handler (newVal) {
        this.setId && clearTimeout(this.setId)
        this.setId = setTimeout(() => {
          this.loadSearchSuggestion()
        }, 800)
      }
    }
  },
  data () {
    return {
      suggestions: []
    }
  },

  created () {

  },
  beforeDestroy () {
    clearTimeout(this.setId)
  },
  methods: {
    async loadSearchSuggestion () {
      try {
        const { options: res } = await getSearchSuggestion(this.searchText)
        this.suggestions = res
      } catch (err) {
        Toast('获取联想建议失败')
      }
    },
    formatStr (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    },
    onClickItem (item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style scoped>

</style>
