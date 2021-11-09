<template>
  <div id="nav">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <div class="navbar-brand" href="#">MiTiendita.com</div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" v-show="!islogged" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-show="!islogged" to="/comprar"
                >Comprar</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-show="islogged" to="/categoria"
                >Categorias</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-show="islogged" to="/sucursal"
                >Sucursales</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-show="islogged" to="/producto"
                >Productos</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-show="!islogged" to="/login"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <!--<a class="nav-link" v-show="islogged" href="#" v-on:click="logout">Cerrar Sesión</a>-->
              <button v-show="islogged" v-on:click="logout">Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapGetters(["islogged"]),
    ...mapActions(["cerrarSesion"]),
  },
  methods: {
    logout() {
      this.cerrarSesion;
    }
  }
});
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
  margin-top: 30px;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
