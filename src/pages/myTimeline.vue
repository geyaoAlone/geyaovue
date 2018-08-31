<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo">给要的博客</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-bg-green layui-layout-left">
        <li class="layui-nav-item layui-this">
          <a href="javascript:;" >首页</a>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item"><a href="javascript:;" @click="logout()">退出登陆</a></li>
      </ul>
    </div>

    <div class="layui-body">
      <button class="layui-btn layui-btn-normal add" @click="save()">
        <i class="layui-icon">&#xe608;</i> 添加
      </button>
      <div class="content">

        <table class="layui-hide" id="timeline"></table>
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
      author: '',
      passwd: '',
      itemList: []
    }
  },
  // 这里写方法比如给元素绑定事件等等
  methods: {
    logout: function () {
      let _this = this
      var confirm = layer.confirm('确定要退出登录吗？'
        , {icon: 1}
        , function () {
          _this.$http.post('/loginOut.do', {name: _this.author}
          ).then(result => {
            layer.close(confirm)
            _this.$router.push({path: 'firstPage'})
          })
        })
    },
    save: function () {
      let passwd = this.passwd
      let name = this.author
      let _this = this
      layer.prompt({
        formType: 1,
        title: '身份验证：'
        // area: ['800px', '350px'] //自定义文本域宽高
      }, function (value, index) {
        if (value === passwd) {
          layer.open({
            type: 1,
            skin: 'layui-layer-rim',
            area: ['500px', '300px'],
            content: '<div class="save_content">' +
            '<input id="title" type="text" placeholder="标题" style="width:100%"/><br/>' +
            '<textarea id="content" placeholder="内容" style="width:100%;height: 143px;"></textarea>' +
            '</div>',
            btn: ['保存'],
            yes: function (index, layero) {
              var params = {title: $('#title').val(), content: $('#content').val(),name:name}
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
    let author = this.$route.query.name
    console.info(author)
    if (author === undefined || author === null || author === '') {
      layer.msg('请先登陆！', {time: 1000}, function () {
        _this.$router.push({path: 'firstPage'})
      })
    }
    let _this = this
    _this.author = author
    this.$http.post('/findAllTimeline.do', {name: author}
    ).then(result => {
      console.info(result)
      if (!result) {
        layer.msg('请先登陆！', {time: 1000}, function () {
          _this.$router.push({path: 'firstPage'})
        })
      }
      _this.itemList = result.dataList
      _this.passwd = result.checkData

      layui.use('table', function () {
        var table = layui.table
        table.render({
          elem: '#timeline',
          data: result.dataList,
          cellMinWidth: 150, // 全局定义常规单元格的最小宽度，layui 2.2.1 新增
          cols: [[
            {field: 'time', width: '20%', title: '时间', sort: true},
            {field: 'title', width: '30%', title: '标题', sort: true},
            {field: 'content', width: '50%', title: '内容', sort: true}
          ]]
        })
      })
    })
  }

}

</script>

<style>
  .layui-logo{
    color:#fff!important;
  }
  .layui-body{
    background-color: #ffffff;
    left: 0px;
  }
  .content{
    margin-left:10px;
    margin-right: 10px;
    height: 100%;
    clear: both;
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
  #timeline{
    width: 100%;
    margin: 15px;
  }
  .add{
    float: right;
    margin: 20px 30px 10px;
  }
</style>
