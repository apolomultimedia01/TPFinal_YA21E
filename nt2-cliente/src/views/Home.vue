<template>
  <div>
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/121/879/themes/new_linkedman/slide-1635702069494-3849339223-492d02ebde270f39ca9d889a317f36171635702077-1920-1920.png?341176745"
            width="500"
            height="600"
          />
        </div>
      </div>
    </div>

     <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Comprar ahora es mucho más simple</h2>
        <p><router-link class="btn btn-secondary" v-show="!islogged" to="/comprar">Realizar compra &#128722;</router-link></p>
        </div>
      <div class="col-md-5">
        <img
            src="https://i.pinimg.com/564x/71/33/8e/71338e2bf11127a71cd5d2f693548fb7.jpg"
            width="500"
            height="600"
          />

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  computed: {
    ...mapGetters(["islogged"])
  },
  components: {},
};
</script>

<style>

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}

.carousel {
  margin-bottom: 4rem;
  margin-top: -30px;
}

.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

.carousel-item {
  height: 32rem;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}

.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}

.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}
</style>