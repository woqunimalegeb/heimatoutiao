<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled='!message'
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, Object, String],
      required: true
    },
    artId: {
      type: [Number, Object, String],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true
      })
      try {
        const res = await postComment({
          target: this.target + '',
          content: this.message,
          art_id: this.artId
        })
        console.log(res)
        Toast.success('评论成功')
        this.$emit('onPostSuccess', res.new_obj)
        this.message = ''
      } catch (err) {
        Toast('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
