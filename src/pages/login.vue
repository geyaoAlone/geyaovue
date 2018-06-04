
<script>
layui.use('form', function () {
  var form = layui.form
})
export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      if(!this.name){
        layer.msg('请填登录名')
        return;
      }
      if(!this.password){
        layer.msg('请填密码')
        return;
      }
      this.$post('find.do?name='+this.name+'&passwd='+this.password,'').then(res => {
          console.log(res);
      });
      this.$router.push({path: '/firstPage'})
    },
    register:function(){
      layer.msg('注册功能未开通')
    }
  }
}

</script>
<template>
  <div class="login layui-form">
      <div class="layui-form-item">
        <label class="layui-form-label">登录名：</label>
        <div class="layui-input-inline">
          <input type="text" placeholder="请输入登录名" class="layui-input" v-model="name">
        </div>
        <div class="layui-form-mid layui-word-aux"></div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">密&emsp;码：</label>
        <div class="layui-input-inline">
          <input type="password" class="layui-input" placeholder="请输入密码" v-model="password">
        </div>
        <div class="layui-form-mid layui-word-aux"></div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" @click = login>登陆</button>
          <button class="layui-btn layui-btn-primary" @click = register>注册</button>
        </div>
      </div>
  </div>
</template>
<style>
  body{
    background:url(../assets/bigbg.jpg) no-repeat;
    background-size: 100%;
  }
  .login{
    background: #ffffff;
    position: fixed;
    top:50%;
    left:50%;
    margin-top: -200px;
    margin-left: -250px;
    padding-left:50px;
    padding-top:80px;
    height: 300px;
    width: 400px;
    box-shadow: 0 0px 20px rgba(0,0,0,0.6);
  }
</style>
