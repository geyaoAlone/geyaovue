<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo">葛耀的网站</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-bg-green layui-layout-left">
        <li class="layui-nav-item ">
          <a href="javascript:;" @click="firstPage()">首页</a>
        </li>
        <li class="layui-nav-item layui-this">
          <a href="javascript:;" @click="openTimeline()">我的时间线</a>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="login()">登录</a></li>
      </ul>
    </div>

    <div class="layui-body">
      <div class="content">
        <div class="left-content">
          <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
            <legend>时间线</legend>
          </fieldset>
          <a class="layui-btn cha_ru" @click="save()">插入</a>
          <ul class="layui-timeline" v-for="(item ,i) in itemList" :key="i">
            <li class="layui-timeline-item">
              <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <h3 class="layui-timeline-title" >{{item.time}}</h3>
                <p>{{item.title}}<br/>
                  {{item.content}}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="right-content">

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
  name: '我的时间',
  data () {
    return {
      itemList: []
    }
  },
  // 这里写方法比如给元素绑定事件等等
  methods: {
    login: function () {
      layer.open({
        type: 1,
        skin: 'layui-layer-rim',
        area: ['300px', '400px'],
        content: '<div class="save_content">' +
        '<input id="title" type="text" placeholder="标题" size="35"/><br/>' +
        '<textarea id="content" placeholder="内容" size="35"></textarea>' +
        '</div>',
        btn: ['登陆'],
        yes: function (index, layero) {

        }
      })
    },
    openTimeline () {
      this.$router.push({path: 'timeline'})
    },
    firstPage () {
      this.$router.push({path: 'firstPage'})
    },
    save: function () {
      let _this = this
      layer.prompt({
        formType: 1,
        title: '身份验证：'
        // area: ['800px', '350px'] //自定义文本域宽高
      }, function (value, index) {
        if (value === '323898') {
          layer.open({
            type: 1,
            skin: 'layui-layer-rim',
            area: ['300px', '200px'],
            content: '<div class="save_content">' +
            '<input id="title" type="text" placeholder="标题" size="35"/><br/>' +
            '<textarea id="content" placeholder="内容" size="35"></textarea>' +
            '</div>',
            btn: ['保存'],
            yes: function (index, layero) {
              var params = {title: $('#title').val(), content: $('#content').val()}
              if (!params.title || !params.content) {
                layer.msg('参数为空！')
                return
              }
              _this.$http.post('/saveTimeline.do', params
              ).then(result => {
                layer.msg(result, {time: 1000})
                location.reload([true])
              })
            }
          })
        } else {
          layer.msg('密码错误')
        }
        layer.close(index)
      })
    }
  },
  created () {
    // this.data = this.$store.state.session;
    // 证件类型（10:身份证 11:护照 12:军人证 13:港澳台通行证 20:其他）
    // var params = {"orgId":this.data.orgId,"name":this.data.name,"idcardno":this.data.idcardno};
    this.$http.post('/findAllTimeline.do', {}
    ).then(result => {
      console.info(typeof result)
      this.itemList = result
    })
  }

}
$(document).ready(function () {
  $('.left-content').css('min-height', $(window).height())
  var height = $('.left-content').height()
  $('.right-content').height(height)
})
</script>

<style>
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
    height: 100%;
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
  .cha_ru{
    float: right;
    margin-top: -25px;
    margin-right: 10px;
  }
  .save_content{
    margin:15px;
  }
  .save_content input{
    margin-bottom: 10px;
    height: 25px;
    padding-left: 7px;

  }
  .save_content #content{
    height: 44px;
    width: 260px;
    padding-left: 7px;
  }
</style>
