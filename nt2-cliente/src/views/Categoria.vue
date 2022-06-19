<template>
  <div class="container">
    <h2>Categorías</h2>
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
          <input v-model="categoria._id" name="id" hidden value />
          <label for="pass">Nombre</label>
          <input
            v-model="categoria.name"
            name="name"
            class="form-control"
            placeholder="Ingrese nombre de la categoria"
            autofocus
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

        <br /><br />
      </form>
    </div>

    <div v-if="!viewForm">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lista" v-bind:key="item._id">
            <td>{{ item.name }}</td>
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
import srvCategoria from "../services/CategoriaProdService.js";

export default {
  name: "Categoria",
  data() {
    return {
      lista: [],
      categoria: { _id: null, name: "" },
      error: false,
      viewForm: false,
    };
  },
  created: async function () {
    try {
      const prods = await srvCategoria.getCategorias();
      this.lista = prods.data;
    } catch (err) {
      console.log(
        "no anduvo la api mockeada porque estaba resfriada" + err.message
      );
    }
  },
  methods: {
    cargarControles(categoria) {
      this.viewForm = true;
      this.categoria = categoria;
    },
    limpiarControles() {
      this.viewForm = false;
      this.categoria = { _id: null, name: "" };
    },
    async guardar() {
      if (this.categoria._id == null) {
        this.agregar();
      } else {
        this.editar();
      }
      this.viewForm = false;
    },
    async agregar() {
      try {
        const rdo = await srvCategoria.postCategorias(this.categoria);
        console.log(rdo);
        const prods = await srvCategoria.getCategorias();
        this.lista = prods.data;
        this.limpiarControles();
      } catch (err) {
        console.log("No se pudo agregar " + err.message);
      }
    },
    async editar() {
      try {
        console.log("EDITAR");
        const rdo = await srvCategoria.putCategoria(this.categoria);
        console.log(rdo);
        const prods = await srvCategoria.getCategorias();
        this.lista = prods.data;
        this.limpiarControles();
      } catch (err) {
        console.log("No se pudo editar " + err.message);
      }
    },
    async eliminar(id) {
      try {
        console.log(id);
        const rdo = await srvCategoria.deleteCategoria(id);
        const prods = await srvCategoria.getCategorias();
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