
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }

  // 获取html节点和宽度
  var html= document.getElementsByTagName("html")[0],
    pageWidth = html.getBoundingClientRect().width;

  // 屏幕宽度/数值=结果
  html.style.fontSize = pageWidth/15 + "px";


</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    margin:0;
    padding:0;
    /*background: #f0f0f0;*/
    /*overflow: hidden;*/
  }
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 0px;
  }

  /*全局样式*/
  html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,i,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  html,body,fieldset,img,iframe,abbr {
    border: 0;
  }
  ol,ul {
    list-style: none;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration:none;
  }

  a,button {
    cursor: pointer;
    color: #000;
  }


</style>
