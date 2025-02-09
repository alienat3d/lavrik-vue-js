<template>
  <div class="random">
    {{ num }}
  </div>
</template>

<script>
export default {
  props: {
    min: Number,
    max: Number,
  },
  data: () => ({}),
  computed: {
    num() {
      return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    },
  },
  created() {
    console.log('change');
  },
};
</script>

<style></style>
