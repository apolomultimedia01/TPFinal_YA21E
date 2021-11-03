<template>
  <div>
    <h2>Categorías</h2>
    <form @submit.prevent="guardar">
      <label v-if="error">Hubo un error al guardar.</label>
      <input v-model="categoria.id" name="id" hidden value>
      <label for="pass">Descripción:</label>
      <input v-model="categoria.name" name="name" value>
      <br><br>
      <button type="submit" name="button">Guardar</button>

      <br><br>
    </form>

    <br><br>

    <ul>
      <li v-for="categoria in lista" v-bind:key="categoria.id">
        {{ categoria.id }} {{ categoria.name }} <a href="#" v-on:click="editar">Editar</a> <a href="#" v-on:click='eliminar(categoria.id)'>Eliminar</a>
      </li>
    </ul>

  </div>
</template>

<script>

import srvCategoria from "../services/CategoriaProdService.js";

export default {
  name: 'CategoriasLista',
  data() {
    return {
      lista: [],
      categoria: {id: 0, name: ''}
    }
  },
  created: async function() {
    try{
      const prods = await srvCategoria.getCategorias();
      this.lista = prods.data;
    }catch (err){
      console.log("no anduvo la api mockeada porque estaba resfriada"  + err.message);
    }
    
  },
  methods: {
    async agregar() {
      try{        
        srvCategoria.postCategorias(this.categoria)
        .then(() => {
          //const prods = await srvCategoria.getCategorias();  
          //this.lista = prods.data;  
        })
        const prods = await srvCategoria.getCategorias();
        this.lista = prods.data;
      }catch(err){
        console.log("no anduvo la api mockeada porque estaba resfriada" + err.message);
      }
      
    },
    async editar() {
      try{
        srvCategoria.putCategoria(this.categoria)
        .then(() => {
          //const prods = await srvCategoria.getCategorias();  
          //this.lista = prods.data;  
        })
         
      }catch(err){
        console.log("no anduvo la api mockeada porque estaba resfriada"  + err.message);
      }
      
    },
    async eliminar(id) {
      try{
        srvCategoria.deleteCategoria(id)
        .then(() => {
          //const prods = await srvCategoria.getCategorias();
          //this.lista = prods.data;
        })
      }catch(err){
        console.log("no anduvo la api mockeada porque estaba resfriada"  + err.message);
      }
      
    }
  }
}
</script>

<style>

</style>