<template>
  <div class="container">
    <div class="py-5 text-center">
      <h2>Realizar Compra</h2>
      <p class="lead">
        Por favor agregá tus productos al carrito y realizá la compra
      </p>
    </div>

    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text">Productos seleccionados:</span>
          <span class="badge bg-dark rounded-pill text-white">{{
            cantidad
          }}</span>
        </h4>
        <ul class="list-group mb-3">
          <div v-if="productosAgregados.length == 0">
            No hay productos agregados
          </div>
          <li
            class="list-group-item d-flex justify-content-between lh-sm"
            v-for="item in productosAgregados"
            v-bind:key="item._id"
          >
            <div>
              <h6 class="my-0">{{ item.name }}</h6>
              <small class="text-muted">${{ item.precio }}</small>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>${{ total }}</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Agregar productos</h4>
        <div class="row g-3">
          <div class="col-sm-12">
            <label class="form-label">Buscar categoria</label>
            <select
              class="form-control"
              @change="cambiarCategoria"
              v-model="categoriaId"
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

          <div class="col-12">
            <div class="form-group">
              <br />
              <label class="form-label" v-if="productos.length > 0"
                >Elegí un producto</label
              >
              <ul class="list-group mb-3">
                <li
                  class="list-group-item d-flex justify-content-between lh-sm"
                  v-for="(prod, index) in productos"
                  v-bind:producto="prod"
                  v-bind:key="index"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <h6 class="my-0">{{ prod.name }}</h6>
                      <small class="text-muted">${{ prod.precio }}</small>
                    </div>
                    <div class="col-md-6">
                      <button
                        v-on:click="agregarAlCarrito(prod)"
                        type="button"
                        class="btn btn-primary"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <label class="form-label">Elegir sucursal</label>
              <select class="form-control">
                <option value="">Elegí una sucursal</option>
                <option
                  v-for="sucursal in sucursales"
                  v-bind:key="sucursal._id"
                  v-bind:value="sucursal._id"
                >
                  {{ sucursal.name }} - {{ sucursal.address }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <button class="w-100 btn btn-success btn-lg" type="submit">
          Imprimir ticket
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import srvProducto from "../services/ProductoService.js";
import srvCategoria from "../services/CategoriaProdService.js";
import srvSucursal from "../services/SucursalService.js";

export default {
  name: "ProductosXCategoria",
  data() {
    return {
      cantidad: 0,
      productos: [],
      categoriaId: "",
      categorias: [],
      productosAgregados: [],
      sucursales: [],
      total: 0,
    };
  },
  created: async function () {
    try {
      const categ = await srvCategoria.getCategorias();
      this.categorias = categ.data;
      const suc = await srvSucursal.getSucursales();
      this.sucursales = suc.data;
      this.cantidad = this.getCarritos.length;
      this.productosAgregados = this.getCarritos;
      this.total = this.getCarritos.reduce((acc, item) => acc + item.precio, 0);
    } catch (err) {
      console.log("No se pudo cargar las categorias " + err.message);
    }
  },
  computed: {
    ...mapGetters(["getCarritos"]),
  },
  methods: {
    async cambiarCategoria() {
      try {
        const prods = await srvProducto.getProductosPorCategoria(
          this.categoriaId
        );
        this.productos = prods.data;
      } catch (err) {
        this.productos = [];
        console.log("No se pudo cambiar la categoría " + err.message);
      }
    },
    agregarAlCarrito(producto) {
      this.$store.dispatch("agregarAlCarrito", producto).then(() => {
        this.cantidad++;
        this.total += producto.precio;
      });
    },
  },
};
</script>

<style>
body {
  background-color: #edeff1 !important;
}
</style>