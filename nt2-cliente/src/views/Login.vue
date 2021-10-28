<template>
    <!-- redirecciono el submit para que vaya al login en vez de irse de la pag -->
    <div>
    <form @submit.prevent="login">
      <label v-text="error"></label><br>

      <label for="email">Email:</label>
      <input v-model="usuario.email" type="email" name="email" value>

      <label for="pass">Password:</label>
      <input v-model="usuario.pass" type="password" name="pass" value>

      <button type="submit" name="button">Login</button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            usuario: {
                email:'',
                pass:''
            },
            error: ''
        }
    },
    methods: {
        async login(){
            console.log('login');
            this.$store
              .dispatch('login', this.usuario)
              .then(() => {
                this.$router.push({ name: 'Home' })
              })
        }
    }
}
</script>

<style>

</style>