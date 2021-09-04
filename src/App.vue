<template>
  <div id='app'>
app跟组件
<i class="toutiao toutiao-shouji"></i>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
<div class="box"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped>
.box{
  width: 1rem;
  height: 1rem;
  background-color: red;
}
</style>
