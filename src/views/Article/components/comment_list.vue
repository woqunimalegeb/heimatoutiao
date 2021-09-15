<template>
  <div>
<van-list
  v-model="loading"
  :immediate-check="false"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<CommentItem @click-reply="$emit('click-reply',$event)"  v-for="item in list" :row='item' :key="item.com_id + ''"/>

</van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/article.js'
import CommentItem from './comment-item.vue'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    type: {
      type: String,
      default: 'a'
    },
    source: {
      type: [Number, Object, String],
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  components: { CommentItem },
  created () {
    this.onLoad()
  },

  methods: {
    async onLoad () {
      const res = await getCommentList({
        type: this.type,
        source: this.source + '',
        offset: this.offset,
        limit: this.limit

      })
      this.$emit('updateTotal', res.total_count)
      this.list.push(...res.results)

      console.log(res)
      this.loading = false

      if (!res.last_id || this.list.length >= res.total_count) {
        this.finished = true
      } else {
        this.offset = res.last_id
      }
    }

  }

}
</script>

<style scoped>

</style>
