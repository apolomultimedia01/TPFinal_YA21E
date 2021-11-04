<template>
    <div >
        <div>Cantidad de productos seleccionados: {{ cantidad }}</div>
        Categorias:
        <select class="form-select" @change="cambiarCategoria" v-model="categoriaId">
            <option v-for="(categ) in categorias" 
                                v-bind:key="categ._id"
                                v-bind:value="categ._id"
                                >{{ categ.name }}</option>
        </select>

        <div >
        Productos
        </div>
        <ul >
            <li v-for="(prod, index) in productos" 
                                v-bind:producto="prod" 
                                v-bind:key="index">
                <div >
                    <div v-text="prod._id"></div>
                    <div v-text="prod.name"></div>

                    <div >
                        <button v-on:click='agregarAlCarrito(prod._id)' type="button" >Agregar al carrito</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import srvProducto from "../services/ProductoService.js";
import srvCategoria from "../services/CategoriaProdService.js";

export default {
    name: 'ProductosXCategoria',
    data() {
        return {
            cantidad: 0,
            productos: [],
            categoriaId: '',
            categorias: []
        }
    },
    created: async function() {
        try{
            const categ = await srvCategoria.getCategorias();
            this.categorias = categ.data;
        }catch (err){
            console.log("No se pudo cargar las categorias "  + err.message);
        }
    },
    computed: {
      ...mapGetters(['getCantidadProd'])
    },
    methods: {
        async cambiarCategoria(){
            try{
                console.log("Cambia la categoria " );
                console.log(this.categoriaId);
                const prods = await srvProducto.getProductosPorCategoria(this.categoriaId);
                this.productos = prods.data;
            }catch (err){
                console.log("No se pudo cambiar la categoría "  + err.message);
            }
        },
        agregarAlCarrito(id){
            this.$store
              .dispatch('agregarAlCarrito', id)
              .then(() => {
                this.cantidad = this.getCantidadProd
              })
        }
    }
}
</script>

<style>

</style>