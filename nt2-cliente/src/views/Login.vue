<template>
    <!-- redirecciono el submit para que vaya al login en vez de irse de la pag -->
    <div>
    <form @submit.prevent="login">
      <label for="email">
        Email:
      </label>
      <input v-model="usuario.email" type="email" name="email" value>

      <label for="password">
        Password:
      </label>
      <input v-model="usuario.pass" type="password" name="pass" value>

      <button type="submit" name="button">
        Login
      </button>
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
            }
        }
    },
    methods: {
        async login(){
            console.log('login');
            await this.$store.dispatch('login',{usuario: this.usuario})
            this.$router.push({name: 'Sistema'})
        }
    }
}
</script>

<style>

</style>