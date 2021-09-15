<template>

<van-icon
 :color="value?'#32967A' : '#777'"
 :name="value?'star': 'star-o'"
 @click="onCollected"
/>

</template>

<script>
import { addCollected, removeCollected } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, Object],
      required: true
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    async onCollected () {
      try {
        if (this.value) {
          await removeCollected(this.artId)
          Toast.success('取消收藏')
        } else {
          await addCollected(this.artId)
          Toast.success('添加收藏')
        }
        this.$emit('input', !this.value)
      } catch (err) {
        Toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
