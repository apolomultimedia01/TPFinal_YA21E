<template>
  <div class="container">
    <h2>Sucursales</h2>

    <div class="form-group">
      <button
        type="button"
        class="btn btn-success btn-block"
        v-if="!viewForm"
        v-on:click="viewForm = true"
      >
        Crear
      </button>
    </div>

    <div v-if="viewForm">
      <form @submit.prevent="guardar">
        <label v-if="error">Hubo un error al guardar.</label>
        <div class="form-group">
          <input v-model="sucursal._id" name="id" hidden value />
          <label for="pass">Nombre</label>
          <input
            v-model="sucursal.name"
            name="name"
            class="form-control"
            placeholder="Ingrese descripción"
            autofocus
          /><br />
        </div>
        <div class="form-group">
          <label for="pass">Dirección</label>
          <input
            v-model="sucursal.address"
            name="address"
            class="form-control"
            placeholder="Ingrese dirección"
          />
        </div>
        <div class="form-group">
          <button type="submit" name="button" class="btn btn-success btn-block">
            Guardar
          </button>
        </div>
        <div class="form-group">
          <a v-on:click="limpiarControles()" class="nav-link red">Cancelar</a>
        </div>
      </form>
    </div>

    <div v-if="!viewForm">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lista" v-bind:key="item._id">
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>
              <button v-on:click="cargarControles(item)" class="btn btn-info">
                Editar
              </button>
              <button v-on:click="eliminar(item._id)" class="btn btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import srvSucursal from "../services/SucursalService.js";

export default {
  name: "Sucursal",
  data() {
    return {
      lista: [],
      sucursal: { _id: null, name: "", address: "" },
      error: false,
      viewForm: false,
    };
  },
  created: async function () {
    try {
      console.log("creada");
      const prods = await srvSucursal.getSucursales();
      this.lista = prods.data;
    } catch (err) {
      console.log(
        "no anduvo la api mockeada porque estaba resfriada" + err.message
      );
    }
  },
  methods: {
    cargarControles(sucursal) {
      this.viewForm = true;
      this.sucursal = sucursal;
    },
    limpiarControles() {
      this.viewForm = false;
      this.sucursal = { _id: null, name: "", address: "" };
    },
    async guardar() {
      console.log(this.sucursal);
      if (this.sucursal._id == null) {
        this.agregar();
      } else {
        this.editar();
      }
      this.viewForm = false;
    },
    async agregar() {
      try {
        const rdo = await srvSucursal.postSucursales(this.sucursal);
        console.log(rdo);
        const prods = await srvSucursal.getSucursales();
        this.lista = prods.data;
        this.limpiarControles();
      } catch (err) {
        console.log("No se pudo agregar " + err.message);
      }
    },
    async editar() {
      try {
        console.log("EDITAR");
        const rdo = await srvSucursal.putSucursal(this.sucursal);
        console.log(rdo);
        const prods = await srvSucursal.getSucursales();
        this.lista = prods.data;
        this.limpiarControles();
      } catch (err) {
        console.log("No se pudo editar " + err.message);
      }
    },
    async eliminar(id) {
      try {
        console.log(id);
        const rdo = await srvSucursal.deleteSucursal(id);
        const prods = await srvSucursal.getSucursales();
        this.lista = prods.data;
        console.log(rdo);
      } catch (err) {
        console.log("No se pudo eliminar " + err.message);
      }
    },
  },
};
</script>

<style>
.red {
  color: red;
}
</style>