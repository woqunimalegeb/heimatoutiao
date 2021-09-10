<template>
  <div class="channel-edit">
<div class="my-channel channel">
  <van-cell :border='false' title="我的频道">
<template>
  <van-button
  @click="isEdit=!isEdit"
   color="red"
   plain size="mini"
   round>
   {{isEdit?'完成':'编辑'}}
   </van-button>
 </template>
 </van-cell>
 <van-grid :gutter="10">
  <van-grid-item
  @click="onClickMyItem(index,item.id)"
  :class="{active: index===activeIndex}"
  :icon="(isEdit && index !==0)?'close' : ''"
  v-for="(item,index) in myChannels"
  :key="item.id"
  :text="item.name" />
</van-grid>
</div>
<div class="recommend-channel channel">
  <van-cell :border='false' title="推荐频道">
 </van-cell>
 <van-grid :gutter="10" direction="horizontal" icon-size="0.32rem">
  <van-grid-item
    @click="addToMycChannels(item)"
    icon="plus"
    v-for="item in recommendChannels"
    :key="item.id"
    :text="item.name" />
</van-grid>
</div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getAllChannels, addUserChannel, deleteUserChannel } from '../../../api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },

  created () {
    this.loadAllChannels()
  },
  computed: {
    recommendChannels () {
      // const recommendArr = this.allChannels.filter(channelItem => {
      //   const flag = this.myChannels.some(myItem => {
      //     return myItem.id === channelItem.id
      //   })
      //   return !flag
      // })
      // return recommendArr
      return this.allChannels.filter(channelItem => {
        return !this.myChannels.some(myItem => myItem.id === channelItem.id)
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async loadAllChannels () {
      try {
        const { channels } = await getAllChannels()
        this.allChannels = channels
      } catch (err) {
        Toast('异常')
      }
    },
    async addToMycChannels (item) {
      this.myChannels.push(item)
      if (this.user) {
        try {
          await addUserChannel({
            id: item.id,
            seq: this.myChannels.length
          })
          Toast('添加成功')
        } catch (err) {
          Toast('添加失败')
        }
      } else {
        setItem('HMTT-CHANNELS', this.myChannels)
      }
    },
    onClickMyItem (index, id) {
      if (this.isEdit) {
        if (index === 0) return
        if (index <= this.activeIndex) {
          this.$emit('update-active', this.activeIndex - 1, true)
        }
        this.myChannels.splice(index, 1)
        this.deleteStorage(id)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    async  deleteStorage (id) {
      if (this.user) {
        try {
          await deleteUserChannel(id)
          Toast.success('删除成功')
        } catch (err) {
          Toast.fail('删除失败')
        }
      } else {
        setItem('HMTT-CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit{
  .channel{
    /deep/.van-grid{
      .van-grid-item__content{
        width: 160px;
        height: 86px;
        background: #F4F5F6;
        border-radius: 6px;
        .van-grid-item__text{
          font-size: 20px;
          color: #222;
        }
      }
      .van-grid-item__content::after{
        border: none;
      }
    }
  }

  padding-top: 90px;
  .my-channel{
    .van-grid-item__icon+.van-grid-item__text{
      margin: 0;
    }
    /deep/.active{
      .van-grid-item__text{
        color: red !important;
      }
    }
    .van-cell{
      align-items: center;
      display: flex;
    }
    .van-button{
      width: 103px;
      height: 50px;
    }
   /deep/.van-icon-close{
      position: absolute;
      font-size: 32px;
      right: -10px;
      top:-10px
    }
  }
}
</style>
