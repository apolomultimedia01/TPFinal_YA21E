<template>
  <h2>Logout</h2>
  <!-- redirecciono el submit para que vaya al login en vez de irse de la pag -->
    <form @submit.prevent='logout'> 
        <button type="submit">Logout</button>
    </form>
</template>

<script>
export default {
    name:'Logout',
    data() {
        return {
            usuario: {
                email:'',
                password:''
            }
        }
    },
    methods: {
        async logout(){
            console.log('logout');
            await this.$store.dispatch('logout')
            this.$router.push({name: 'Home'})
        }
    }
}
</script>

<style>

</style>