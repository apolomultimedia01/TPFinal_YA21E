<template>
    <!-- redirecciono el submit para que vaya al login en vez de irse de la pag -->
    <div>
    <form @submit.prevent="login">
      <label v-if="error">Usuario o password incorrecto</label>
      <br><br>
      <label for="email">Email:</label>
      <input v-model="usuario.email" type="email" name="email" value>
      <br><br>
      <label for="pass">Password:</label>
      <input v-model="usuario.pass" type="password" name="pass" value>

      <button type="submit" name="button">Login</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            usuario: {
                email:'',
                pass:''
            },
            error: false
        }
    },
    computed: {
      ...mapGetters(['islogged'])
    },
    methods: {
        login(){
            this.$store
              .dispatch('login', this.usuario)
              .then(() => {
                this.error = !this.islogged
                if(!this.error){
                  this.$router.push({ name: 'Home' })
                }
              })
        }
    }
}
</script>

<style>

</style>