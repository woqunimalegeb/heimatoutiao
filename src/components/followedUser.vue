<template>
  <div>
<van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="!isFollowed"
            @click="onFollowed"
          >关注</van-button>
           <van-button
            class="follow-btn"
            round
            size="small"
            v-else
            @click="onFollowed"
          >关注</van-button>
  </div>
</template>

<script>
import { addFollowUser, removeFollowUser } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, Object],
      required: true
    }
  },
  model: {
    prop: 'isFollowed',
    event: 'updateFollowed'
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    async onFollowed () {
      try {
        if (this.is_followed) {
          await removeFollowUser(this.autId)
          Toast.success('取消关注成功')
        } else {
          await addFollowUser(this.autId)
          Toast.success('添加关注成功')
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('updateFollowed', !this.isFollowed)
      } catch (err) {
        Toast.fail('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped>

</style>
