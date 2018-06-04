<script>
  layui.use('form', function(){
    var form = layui.form;

    //监听提交
    form.on('submit(formDemo)', function(data){
      layer.msg(JSON.stringify(data.field));
      return false;
    });
  });
  export default {
    name: "login"
  }
$(document).ready(function(){
  $("#register").on("click",function(){
    layer.msg('注册功能未开通');
  })
})

</script>
<template>
  <div class="login">
    <form class="layui-form" action="">
      <div class="layui-form-item">
        <label class="layui-form-label">登录名：</label>
        <div class="layui-input-inline">
          <input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-mid layui-word-aux"></div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">密&emsp;码：</label>
        <div class="layui-input-inline">
          <input type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-mid layui-word-aux"></div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">登陆</button>
          <button class="layui-btn layui-btn-primary" id="register">注册</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style>
  body{
    background: #9F9F9F;
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
