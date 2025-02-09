<template>
  <div class="random">
    {{ num }}
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    num() {
      return Math.random() * 10;
    },
  },
};
</script>

<style></style>
