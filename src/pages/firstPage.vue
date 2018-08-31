
<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo">给要的博客</div>
      <!-- 头部区域（可配合layui已有的水平导航）
      <ul class="layui-nav layui-bg-green layui-layout-left">
        <li class="layui-nav-item layui-this">
          <a href="javascript:;" @click="firstPage()">首页</a>
        </li>
        <li class="layui-nav-item">
          <a href="javascript:;" @click="openTimeline()">我的时间线</a>
        </li>
      </ul>
      -->
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="login()">登录</a></li>
      </ul>
    </div>

    <div class="layui-body">
        <blockquote class="layui-elem-quote">
          2018年07月24日 葛耀的网站正式上线了！
        </blockquote>
        <div class="content">
          <div class="left-content">
            <div class="time-line">
              <ul class="layui-timeline" v-for="(item ,i) in itemList" :key="i">
                <li class="layui-timeline-item">
                  <i class="layui-icon layui-timeline-axis"></i>
                  <div class="layui-timeline-content layui-text">
                    <h3 class="layui-timeline-title" >{{item.title}}</h3>
                    <p>☞&ensp;{{item.time}}<br/>
                      ☞&ensp;{{item.author}}<br/>
                      <span class="timeline_content">{{item.content}}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="right-content">
            <fieldset class="layui-elem-field site-demo-button">
              <legend>所在公司友情连接{{height}}</legend>
              <div style="padding:20px">
                <a href="https://www.rongxintong.com" class="layui-btn" target="_blank">融信通金服科技股份有限公司</a>
                <a href="http://jiaofei.rongxintong.com" class="layui-btn" target="_blank">云缴费</a>
              </div>
            </fieldset>
          </div>
        </div>
    </div>

    <div class="layui-footer" style="left:0px;">
      <!-- 底部固定区域 -->
      © geyao
    </div>
  </div>
</template>

<script>
export default {
  name: '我的首页',
  data: function () {
    return {
      height: $('.left-content').height(),
      itemList: []
    }
  },
  // 这里写方法比如给元素绑定事件等等
  methods: {
    login: function () {
      let _this = this
      layer.open({
        type: 1,
        title: '登陆页',
        skin: 'layui-layer-rim',
        area: ['350px', '300px'],
        content: '<div class="login layui-form">' +
        '       <h2>管理员登陆</h2>' +
        '      <div class="layui-form-item">' +
        '        <label class="layui-form-label">登录名：</label>' +
        '        <div class="layui-input-inline">' +
        '          <input type="text" placeholder="请输入登录名" class="layui-input" id="name">' +
        '        </div>' +
        '        <div class="layui-form-mid layui-word-aux"></div>' +
        '      </div>' +
        '      <div class="layui-form-item">' +
        '        <label class="layui-form-label">密&emsp;码：</label>' +
        '        <div class="layui-input-inline">' +
        '          <input type="password" class="layui-input" placeholder="请输入密码" id="password">' +
        '        </div>' +
        '        <div class="layui-form-mid layui-word-aux"></div>' +
        '      </div>' +
        '  </div>',
        btn: ['登陆'],
        yes: function (index, layero) {
          var params = {name: $('#name').val(), passwd: $('#password').val()}
          if (!params.name || !params.passwd) {
            layer.msg('参数为空！')
            return
          }
          _this.$http.post('/checkLogin.do', params
          ).then(result => {
            if (result === '1') {
              layer.msg('登陆成功！',{time: 1500},function () {
                layer.close(index)
                _this.$router.push({path: 'timeline',query:{name:params.name}})
              })
            } else {
              layer.msg('登陆失败！')
            }
          })
        }
      })
    },
    openTimeline () {
      this.$router.push({path: 'timeline'})
    },
    firstPage () {
      this.$router.push({path: 'firstPage'})
    }

  },
  created: function () {
    this.$http.post('/findAllTimeline.do', {}
    ).then(result => {
      console.info(typeof result)
      this.itemList = result.dataList
    })
  }
}
$(document).ready(function () {
  $('.left-content').css('min-height', $(window).height())
})
</script>
<style>
  .layui-elem-quote{
    background-color: #ffffff;
  }
  .layui-logo{
    color:#fff!important;
  }
  .layui-body{
    left: 0px;
  }
  .layui-elem-quote{
    margin-top: 7px;
  }
  .content{
    margin-left:10px;
    margin-right: 10px;
    /*height: 100%;*/
  }
  .left-content{
    display: inline-block;
    background: #FBFBFB;
    width: 70%;
  }
  .right-content{
    display: inline-block;
    background: #FBFBFB;
    float: right;
    padding: 5px;
    width: 29%;
  }
  .login h2{
    margin-top: 30px;
    margin-bottom: 15px;
    text-align: center;
  }
  .time-line{
    margin: 34px;
  }
  .timeline_content{
    font-size: 15px;
    color: #000000;
  }
</style>
