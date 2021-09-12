<template>
  <div class="search-container">
<van-cell title="搜索历史">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template>
    <div class="right" v-if="isDel">
      <span @click="$emit('cleaar-history')">全部删除</span>
      <span @click="isDel=false">完成</span>
    </div>
    <van-icon @click="isDel=true" v-else name="delete-o"/>
  </template>
</van-cell>
<van-cell :title="item" :key="item" v-for="item in history" @click="onClickHistoryItem(index,i)">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template>
    <van-icon name="close" v-if="isDel" />
  </template>
</van-cell>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDel: false
    }
  },

  created () {

  },

  methods: {
    onClickHistoryItem (index) {
      if (this.isDel) {
        this.history.splice(index, 1)
      } else {
        this.$emit('search', this.history[index])
      }
    }

  }
}
</script>

<style scoped lang='less'>
.search-container{
  .van-cell{
    .right{
      span:nth-child(1){
        margin-right: 8px;
      }
    }
  }
}
</style>
