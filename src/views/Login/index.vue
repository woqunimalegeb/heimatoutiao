<template>
  <div class="login-container">
<van-nav-bar
  title="登录"
 class="page-nav-bar"
/>
<van-form ref="form" @submit="onSubmit">
  <van-field
    v-model="form.mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="formrules.mobile"
    type="number"
    maxlength="11"
  >
  <template #left-icon>
    <i class="toutiao toutiao-shouji"></i>
  </template></van-field>
  <van-field
    v-model="form.code"
    name="code"
    placeholder="请输入验证码"
    :rules="formrules.code"
    type="number"
    maxlength="6"
  >
  <template #left-icon>
    <i class="toutiao toutiao-yanzhengma"></i>
  </template>
  <template #button>
    <van-count-down @finish='isShowCountDown=false' v-if="isShowCountDown" :time="60*1000" format="ss s" />
    <van-button v-else @click="onSendCode" native-type="button" class="send-btn" size="mini">发送验证码</van-button>
  </template>
  </van-field>
  <div class="login-btn">
    <van-button round block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login, sendCode } from '../../api/user'
import { Toast } from 'vant'
const mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      formrules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: mobileReg, message: '请输入正确的手机号' }
        ],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^[0-9]{6}$/, message: '请输入正确的验证码' }
        ]
      },
      isShowCountDown: false
    }
  },

  created () {

  },

  methods: {
    async  onSubmit () {
      const { data: res } = await login(this.form)
      console.log(res.data)
      Toast.success('登录成功')
      this.$router.push('/profile')
      this.$store.commit('setUser', res.data)
    },
    async onSendCode () {
      try {
        await this.$refs.form.validate('mobile')
      } catch (err) {
        if (err.respomse && err.response.status === 400) {
          return Toast('验证码错误或重新登录')
        }
        Toast.fail('系统异常')
      }
      // 校验成功做成功的操作

      try {
        await sendCode(this.form.mobile)
        Toast('亲，发送成功')
        this.isShowCountDown = true
      } catch (err) {
        if (err.response && err.response.status === 429) {
          return Toast('亲，操作频繁稍后重试')
        }
        Toast('亲，软件异常')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  .toutiao{
    font-size: 37px;
  }
  .send-btn {
    width: 152px;
    height: 46px;
    background: #EDEDED;
    border-radius: 23px;
    color: #666;
  }
  .login-btn{
    margin: 53px 28px;
    .van-button{
      width: 694px;
      height: 88px;
      background: #6DB4FB;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>
