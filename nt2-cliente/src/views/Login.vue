<template>
    <h2>Login</h2>
    <!-- redirecciono el submit para que vaya al login en vez de irse de la pag -->
    <form @submit.prevent='login'> 
        <p>Usuario <input type="email" v-model="usuario.email"></p>
        <p>Contraseña <input type="password" v-model="usuario.password"></p>
        <button type="submit">Login</button>
    </form>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            usuario: {
                email:'',
                password:''
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