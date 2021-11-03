<template>
  <div>
    <h2>Categorías</h2>
    <ul>
      <li v-for="categoria in lista" v-bind:key="categoria.id">
        {{ categoria.id }} {{ categoria.name }} <a href="#" v-on:click="editar">Editar</a> <a href="#" v-on:click="eliminar">Eliminar</a>
      </li>
    </ul>
    
    <p>Descripcion: <input type="text" v-model="categoria.name" /></p>

    <button v-on:click="agregar">Agregar</button>
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
    }catch (error){
      console.log("no anduvo la api mockeada porque estaba resfriada");
    }
    
  },
  methods: {
    armarCat(){
      return {
            id: this.categoria.id,
            name: this.categoria.name
        }
    },
    async agregar() {
      try{
        const obj = armarCat()
        const rta = await srvCategoria.postCategorias(obj);
        this.lista = await srvCategoria.getCategorias();
      }catch(error){
        console.log("no anduvo la api mockeada porque estaba resfriada");
      }
      
    },
    async editar() {
      try{
        const obj = armarCat()
        const rta = await srvCategoria.putCategoria(obj);
        this.lista = await srvCategoria.getCategorias();
      }catch(error){
        console.log("no anduvo la api mockeada porque estaba resfriada");
      }
      
    },
    async eliminar() {
      try{
        const obj = armarCat()
        const rta = await srvCategoria.deleteCategoria(obj);
        const prods = await srvCategoria.getCategorias();
        this.lista = prods.data;
      }catch(error){
        console.log("no anduvo la api mockeada porque estaba resfriada");
      }
      
    }
  }
}
</script>

<style>

</style>