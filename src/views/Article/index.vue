<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.art_id" class="article-detail" ref="content">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | formatDate}}</div>
          <!-- <FollowUser
          :isFollowed='article.is_followed'
          @updateFollowed='article.is_followed=$event'
          :autId='article.aut_id'
          /> -->
          <FollowUser
          v-model="article.is_followed"
          :autId="article.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <CommentList @click-reply='onClickReply' :list='list' @updateTotal='totalCount=$event' :source="article.art_id"/>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="is404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div v-if="article.art_id" class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isShowPostComment=true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="totalCount"
        color="#777"
      />
      <ArticleCollected
      v-model="article.is_collected"
      :artId='article.art_id'
      />

      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup
     v-model="isShowPostComment"
     position="bottom"
     :style="{ height: '30%' }">
     <CommentPost @on-post-success="onPostSuccess" :target='articleId' />
    </van-popup>
      <van-popup position="bottom" v-model="isShowPostReplayComment" style="height:100%;">
     <CommentReply v-if="isShowPostReplayComment" @close-reply='isShowPostReplayComment=false' :comment='comment'/>

    </van-popup>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article.js'
import { ImagePreview } from 'vant'
import ArticleCollected from '../../components/articleCollected.vue'
import FollowUser from '../../components/followedUser.vue'
import CommentList from './components/comment_list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
import './github-markdown.css'
export default {
  components: { FollowUser, ArticleCollected, CommentList, CommentPost, CommentReply },
  data () {
    return {
      article: {},
      isLoading: true,
      is404: false,
      isShowPostComment: false,
      totalCount: 0,
      list: [],
      isShowPostReplayComment: false,
      comment: {}
    }
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  created () {
    this.loadArticleInfo()
  },

  methods: {
    async loadArticleInfo () {
      this.isLoading = true
      try {
        const res = await getArticleDetail(this.articleId)
        this.article = res
        this.isLoading = false
        this.$nextTick(() => {
          this.previewImg()
        })
      } catch (err) {
        this.isLoading = false
        if (err.response && err.response.status === 404) {
          this.is404 = true
        }
      }
    },
    previewImg () {
      const contentEl = this.$refs.content
      const images = []
      const imgs = contentEl.querySelectorAll('img')
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = function () {
          console.log('点击了', index)
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (obj) {
      this.isShowPostComment = false
      this.list.unshift(obj)
    },
    onClickReply (comment) {
      this.isShowPostReplayComment = true
      this.comment = comment
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
