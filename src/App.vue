<template>
  <div id="app">
    <my-nav></my-nav>
    <router-view/>
  </div>
</template>

<script>
import myNav from '@/components/commons/nav'

export default {
  name: 'App',
  components:{
   myNav
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
