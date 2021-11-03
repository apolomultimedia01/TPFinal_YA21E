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
        {{ categoria.id }} {{ categoria.name }} <a href="#" v-on:click="cargarControles(categoria)">Editar</a> <a href="#" v-on:click='eliminar(categoria.id)'>Eliminar</a>
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
    cargarControles(categoria){
      this.categoria = categoria
    },
    limpiarControles(){
      this.categoria = {id: 0, name: ''}
    },
    async guardar(){
      console.log(this.categoria);
      if(this.categoria.id==0){
        this.agregar()
      }else{
        this.editar()
      }
    },
    async agregar() {
      try{        
        const rdo = await srvCategoria.postCategorias(this.categoria)
        console.log(rdo);
        const prods = await srvCategoria.getCategorias();  
        this.lista = prods.data;  

      }catch(err){
        console.log("no anduvo la api mockeada porque estaba resfriada" + err.message);
      }
      
    },
    async editar() {
      try{
        const rdo = await srvCategoria.putCategoria(this.categoria)
        console.log(rdo);
        const prods = await srvCategoria.getCategorias();  
        this.lista = prods.data;           
      }catch(err){
        console.log("no anduvo la api mockeada porque estaba resfriada"  + err.message);
      }
      
    },
    async eliminar(id) {
      try{
          const rdo = await srvCategoria.deleteCategoria(id)
          console.log(rdo);
          const prods = await srvCategoria.getCategorias();
          this.lista = prods.data;
      }catch(err){
        console.log("no anduvo la api mockeada porque estaba resfriada"  + err.message);
      }
      
    }
  }
}
</script>

<style>

</style>