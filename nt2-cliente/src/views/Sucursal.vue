<template>
  <div>
    <h2>Sucursales</h2>
    <form @submit.prevent="guardar">
      <label v-if="error">Hubo un error al guardar.</label>
      <input v-model="sucursal._id" name="id" hidden value>
      <label for="pass">Descripción:</label>
      <input v-model="sucursal.name" name="name" value><br>
      <label for="pass">Dirección:</label>
      <input v-model="sucursal.address" name="address" value>
      <br><br>
      <button type="submit" name="button">Guardar</button>

      <br><br>
    </form>

    <br><br>

    <ul>
      <li v-for="item in lista" v-bind:key="item._id">
        {{ item.name }} - {{ item.address }} <button v-on:click="cargarControles(item)">Editar</button> <button v-on:click="eliminar(item._id)">Eliminar</button>
      </li>
    </ul>

  </div>
</template>

<script>

import srvSucursal from "../services/SucursalService.js";

export default {
  name: 'Sucursal',
  data() {
    return {
      lista: [],
      sucursal: { _id: null, name: '', address: '' },
      error: false
    }
  },
  created: async function() {
    try{
      console.log("creada");
      const prods = await srvSucursal.getSucursales();
      this.lista = prods.data;
    }catch (err){
      console.log("no anduvo la api mockeada porque estaba resfriada"  + err.message);
    }
  },
  methods: {
    cargarControles(sucursal){
      this.sucursal = sucursal
    },
    limpiarControles(){
      this.sucursal = { _id: null, name: '', address: '' }
    },
    async guardar(){
      console.log(this.sucursal);
      if(this.sucursal._id==null){
        this.agregar()
      }else{
        this.editar()
      }
    },
    async agregar() {
      try{        
        const rdo = await srvSucursal.postSucursales(this.sucursal)
        console.log(rdo);
        const prods = await srvSucursal.getSucursales();  
        this.lista = prods.data;  
        this.limpiarControles();
      }catch(err){
        console.log("No se pudo agregar " + err.message);
      }
    },
    async editar() {
      try{
        console.log('EDITAR');
        const rdo = await srvSucursal.putSucursal(this.sucursal)
        console.log(rdo);
        const prods = await srvSucursal.getSucursales();  
        this.lista = prods.data;           
        this.limpiarControles();
      }catch(err){
        console.log("No se pudo editar "  + err.message);
      }
      
    },
    async eliminar(id) {
      try{
          console.log(id)
          const rdo = await srvSucursal.deleteSucursal(id)
          const prods = await srvSucursal.getSucursales();
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