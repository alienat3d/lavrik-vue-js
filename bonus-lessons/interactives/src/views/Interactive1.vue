<!-- Здесь происходит интересная ситуация -->
<template>
  <div class="container">
    <h1>First Example</h1>
    <hr />
    <div v-if="alertFirst">I am danger alert!</div>
    <div>
      <app-random></app-random>
    </div>
    <button
      class="btn btn-danger"
      v-if="!alertFirst"
      @click="alertFirst = true"
    >
      Open first alert
    </button>
    <div v-if="alertSecond">I am success alert!</div>
    <button
      class="btn btn-success"
      v-if="!alertSecond"
      @click="alertSecond = true"
    >
      Open second alert
    </button>
  </div>
</template>
<script>
import AppRandom from '../components/Random.vue';

export default {
  components: { AppRandom },
  data: () => ({
    alertFirst: false,
    alertSecond: false,
  }),
  computed: {},
  methods: {},
};
</script>
