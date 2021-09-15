<template>
  <div>
<van-nav-bar
  :title="comment.reply_count ? comment.reply_count+'条回复':'暂无回复'"
>
<template #left>
  <van-icon @click="$emit('close-reply')" name="cross" />
 </template>
</van-nav-bar>
<div title="scroll-center">
  <CommentItem :row="comment"/>
<van-cell title="全部回复" />
<CommentList type="c" :source="comment.com_id" :list="list"/>
</div>
<div class="post-warp">
    <van-button round @click="isShowReplayComment=true">评论</van-button>
</div>
 <van-popup position="bottom" v-model="isShowReplayComment">
   <CommentPost  :target='comment.com_id' :artId="$route.params.articleId"
   @onPostSuccess='onPostSuccess'/>
 </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment_list.vue'
import CommentPost from './comment-post.vue'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: { CommentItem, CommentList, CommentPost },
  data () {
    return {
      list: [],
      isShowReplayComment: false
    }
  },

  created () {

  },

  methods: {
    onPostSuccess (obj) {
      this.list.unshift(obj)
      this.isShowReplayComment = false
    }
  }
}
</script>

<style scoped lang=less>
.post-warp {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hotpink;
  .van-button {
    width: 640px;
    height: 80px;
  }
}
.scroll-center{
  position: absolute;
  top:92px;
  bottom: 102px;
  width: 100%;
  overflow-y:scroll ;
}
</style>
