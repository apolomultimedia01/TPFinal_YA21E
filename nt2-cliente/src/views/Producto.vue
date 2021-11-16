<template>
  <div class="container">
    <h2>Productos</h2>
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
          <input v-model="producto._id" name="id" hidden value />
          <label for="pass">Nombre</label>
          <input
            v-model="producto.name"
            name="name"
            class="form-control"
            placeholder="Ingrese nombre del producto"
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="pass">Precio</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">$</span>
            </div>
            <input
              v-model="producto.precio"
              type="number"
              name="precio"
              class="form-control"
              required
              placeholder="Ingrese precio del producto"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="pass">Categoria</label>
          <select
            name="categoryId"
            class="form-control"
            v-model="producto.categoryId"
            required
          >
            <option value="">Elegí una categoría</option>
            <option
              v-for="categ in categorias"
              v-bind:key="categ._id"
              v-bind:value="categ._id"
            >
              {{ categ.name }}
            </option>
          </select>
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
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lista" v-bind:key="item._id">
            <td>{{ item.name }}</td>
            <td>$ {{ item.precio }}</td>
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
import srvProducto from "../services/ProductoService.js";
import srvCategoria from "../services/CategoriaProdService.js";

export default {
  name: "Producto",
  data() {
    return {
      lista: [],
      producto: { _id: null, name: "", precio: 0, categoryId: "" },
      error: false,
      categoryId: "",
      categorias: [],
      viewForm: false,
    };
  },
  created: async function () {
    try {
      const prods = await srvProducto.getProductos();
      this.lista = prods.data;
      const categ = await srvCategoria.getCategorias();
      this.categorias = categ.data;
    } catch (err) {
      console.log(
        "no anduvo la api" + err.message
      );
    }
  },
  methods: {
    cargarControles(producto) {
      this.viewForm = true;
      this.producto = producto;
    },
    limpiarControles() {
      this.viewForm = false;
      this.producto = { _id: null, name: "", categoryId: "" };
    },
    async guardar() {
      if (this.producto._id == null) {
        this.agregar();
      } else {
        this.editar();
      }
      this.viewForm = false;
    },
    async agregar() {
      try {
        const rdo = await srvProducto.postProductos(this.producto);
        console.log(rdo);
        const prods = await srvProducto.getProductos();
        this.lista = prods.data;
        this.limpiarControles();
      } catch (err) {
        console.log("No se pudo agregar " + err.message);
      }
    },
    async editar() {
      try {
        const rdo = await srvProducto.putProducto(this.producto);
        console.log(rdo);
        const prods = await srvProducto.getProductos();
        this.lista = prods.data;
        this.limpiarControles();
      } catch (err) {
        console.log("No se pudo editar " + err.message);
      }
    },
    async eliminar(id) {
      try {
        console.log(id);
        const rdo = await srvProducto.deleteProducto(id);
        const prods = await srvProducto.getProductos();
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