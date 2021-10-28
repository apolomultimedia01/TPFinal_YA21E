<template>
  <div>
    <h2>Sistema</h2>
    <!--<p>{{ this.$store.getters.islogin }}</p>-->
    <!--{{ lista }}-->
    <ul>
      <li v-for="producto in lista" v-bind:key="producto.id">
        {{ producto.id }} {{ producto.desc }} ..... $ {{ producto.precio_usd }}
      </li>
    </ul>
    
    <p>Descripcion: <input type="text" v-model="producto.desc" /></p>
    <p>Precio: <input type="text" v-model="producto.precio_usd" /></p>
    <button v-on:click="agregar">Agregar</button>
  </div>
</template>

<script>

import productoService from "../services/ProductoService.js";

export default {
  name: 'Sistema',
  data() {
    return {
      lista: [],
      producto: {id: 0, desc: '', precio_usd: 0}
    }
  },
  created: async function() {
    try{
      const prods = await productoService.getProductos();
    this.lista = prods.data;
    }catch (error){
      console.log("no anduvo la api mockeada porque estaba resfriada");
    }
    
  },
  methods: {
    async agregar() {
      try{
        const obj = {
            desc: this.producto.desc,
            precio_usd: Number(this.producto.precio_usd)
        }
        const rta = await productoService.postProductos(obj);
        this.lista.push(rta.data);
      }catch(error){
        console.log("no anduvo la api mockeada porque estaba resfriada");
      }
      
    }
  }
}
</script>

<style>

</style>