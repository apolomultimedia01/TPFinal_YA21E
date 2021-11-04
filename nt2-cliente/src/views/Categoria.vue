<template>
  <div>
    <h2>Categorías</h2>
    <form @submit.prevent="guardar">
      <label v-if="error">Hubo un error al guardar.</label>
      <input v-model="categoria._id" name="id" hidden value>
      <label for="pass">Descripción:</label>
      <input v-model="categoria.name" name="name" value>
      <br><br>
      <button type="submit" name="button">Guardar</button>

      <br><br>
    </form>

    <br><br>

    <ul>
      <li v-for="item in lista" v-bind:key="item._id">
        {{ item.name }} <button v-on:click="cargarControles(item)">Editar</button> <button v-on:click="eliminar(item._id)">Eliminar</button>
      </li>
    </ul>

  </div>
</template>

<script>

import srvCategoria from "../services/CategoriaProdService.js";

export default {
  name: 'Categoria',
  data() {
    return {
      lista: [],
      categoria: { _id: null, name: '' },
      error: false
    }
  },
  created: async function() {
    try{
      console.log("creada");
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
      this.categoria = { _id: null, name: '' }
    },
    async guardar(){
      console.log(this.categoria);
      if(this.categoria._id==null){
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
        this.limpiarControles();
      }catch(err){
        console.log("No se pudo agregar " + err.message);
      }
    },
    async editar() {
      try{
        console.log('EDITAR');
        const rdo = await srvCategoria.putCategoria(this.categoria)
        console.log(rdo);
        const prods = await srvCategoria.getCategorias();  
        this.lista = prods.data;           
        this.limpiarControles();
      }catch(err){
        console.log("No se pudo editar "  + err.message);
      }
      
    },
    async eliminar(id) {
      try{
          console.log(id)
          const rdo = await srvCategoria.deleteCategoria(id)
          const prods = await srvCategoria.getCategorias();
          this.lista = prods.data;
          console.log(rdo);
      }catch(err){
        console.log("No se pudo eliminar "  + err.message);
      }
      
    }
  }
}
</script>

<style>

</style>