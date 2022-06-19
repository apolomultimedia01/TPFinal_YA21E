<template>
  <div class="container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="alert alert-danger" role="alert" v-if="error">
        Usuario o contraseña incorrecto
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="usuario.email"
          placeholder="Ingrese email"
        />
      </div>
      <div class="form-group">
        <label for="pass">Contraseña</label>
        <input
          type="password"
          v-model="usuario.pass"
          class="form-control"
          placeholder="Ingrese contraseña"
        />
      </div>
      <button type="submit" class="btn btn-success btn-block">Ingresar</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      usuario: {
        email: "",
        pass: "",
      },
      error: false,
    };
  },
  computed: {
    ...mapGetters(["islogged"]),
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.usuario).then(() => {
        this.error = !this.islogged;
        if (!this.error) {
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
};
</script>

<style>
</style>