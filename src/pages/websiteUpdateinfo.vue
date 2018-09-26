<template>
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header layui-bg-green">
        <div class="layui-logo" @click="firstPage()">«返回首页</div>
        <!--
        <ul class="layui-nav layui-layout-right">
          <li class="layui-nav-item"><a href="javascript:;" @click="login()">登录</a></li>
        </ul>
        -->
      </div>

      <div class="layui-body">
        <div class="content">
            <div class="time_line">
              <div class="detail_title">小站功能技术更新时间线</div>
              <ul class="layui-timeline" v-for="(item ,i) in itemList" :key="i">
                <li class="layui-timeline-item">
                  <i class="layui-icon layui-timeline-axis"></i>
                  <div class="layui-timeline-content layui-text">
                    <h3 class="layui-timeline-title" >{{item.title}}</h3>
                    <p>
                      <span>{{item.time}}</span>
                      <span class="timeline_content" v-html="item.content"></span>
                    </p>
                  </div>
                </li>
              </ul>
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
  name: '',
  data: function () {
    return {
      itemList: []
    }
  },
  methods: {
    firstPage () {
      this.$router.push({path: 'firstPage'})
    }
  },
  created: function () {
    this.$http.post('/findAllTimeline.do', {}
    ).then(result => {
      console.info(typeof result)
      this.itemList = result
    })
  }

}
</script>

<style scoped>
  .layui-logo{
    color:#fff!important;
  }
  .time_line{
    background: #fff;
    padding: 25px;
    margin-top: 15px;
  }
  .detail_title{
    text-align: center;
    display: block;
    font-size: 23px;
    font-weight: 500;
  }
</style>
