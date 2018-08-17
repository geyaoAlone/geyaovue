<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-green">
      <div class="layui-logo">葛耀-牛逼的网站</div>
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
        <li class="layui-nav-item"><a href="">登录</a></li>
      </ul>
    </div>

    <div class="layui-body">
      <div class="content">
        <div class="left-content">
          <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
            <legend>常规时间线</legend>
          </fieldset>
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
    openTimeline () {
      this.$router.push({path: 'timeline'})
    },
    firstPage () {
      this.$router.push({path: 'firstPage'})
    }

  },
  created () {
    // this.data = this.$store.state.session;
    // 证件类型（10:身份证 11:护照 12:军人证 13:港澳台通行证 20:其他）
    // var params = {"orgId":this.data.orgId,"name":this.data.name,"idcardno":this.data.idcardno};
    this.$http.post('/findAllTimeline.do', {}
    ).then(result => {
      console.info(typeof result);
      this.itemList = result
    })

  }

}
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
    height: 100%;
  }
  .right-content{
    display: inline-block;
    background: #FBFBFB;
    float: right;
    padding: 5px;
    width: 29%;
    height: 100%;
  }
</style>
