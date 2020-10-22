<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{navs[lang+'-main']}}</router-link> |
      <router-link to="/about">{{navs[lang+'-about']}}</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      lang:document.documentElement.lang,
      navs:{
        'ru-main':"Главная",
        'en-main':"Main",
        'ru-about':"О приложении",
        'en-about':"About",
      }
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
*{
  font-family: 'Roboto Mono', monospace;
}
h3{
  padding: 0;
  margin: 0;
  line-height: 18pt;
  font-size: 18pt;
  font-weight: 300;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
      text-shadow: 1px 1px 4px rgba($color: #000000, $alpha: 0.1);
    }
  }
}
.no-scroll{
  overflow: hidden;
}
</style>
