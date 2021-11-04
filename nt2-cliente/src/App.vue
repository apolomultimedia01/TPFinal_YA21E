<template>
  <div>
    <div id="nav">
      <router-link to="/">Home | </router-link>
      <router-link to="/about">About | </router-link>
      <router-link v-show="islogged" to="/sistema">Sistema | </router-link>
      <router-link v-show="islogged" to="/categoria">Categorias | </router-link>
      <router-link v-show="!islogged" to="/login">Login | </router-link>
      <a v-show="islogged" href="#" v-on:click="logout">Logout</a>
      
    </div>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapGetters(['islogged']),
    ...mapActions(['logout'])
  }
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
