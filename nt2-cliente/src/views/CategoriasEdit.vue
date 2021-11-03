<template>
    
    <div>
    <form @submit.prevent="guardar">
      <label v-if="error">Hubo un error al guardar.</label>
      <br><br>

      <label for="pass">Descripción:</label>
      <input v-model="categoria.name" name="name" value>

      <button type="submit" name="button">Guardar</button>
    </form>
  </div>
</template>

<script>
import srvCategoria from '../services/CategoriaProdService.js'

export default {
    name: 'Categorias',
    data() {
        return {
            categoria: {
                name:''
            },
            error: false,
            operacion: ''
        }
    },
    computed: {
      
    },
    methods: {
        guardar(){
          switch(this.operacion){
            case 'alta':
              this.agregar();
              break;
            case 'edit':
              this.modificar();
              break;
            default:
              break;
          }

        },
        agregar(){
          srvCategoria.postCategorias(this.categoria)
            .then(() => {              
              this.$router.push({ name: 'CategoriasLista' })
            })
            .catch(() => {
              error = true
            })

        },
        modificar(){
          srvCategoria.putCategoria(this.categoria)
            .then(() => {              
              this.$router.push({ name: 'CategoriasLista' })
            })
            .catch(() => {
              error = true
            })

        }
    }
}
</script>

<style>

</style>