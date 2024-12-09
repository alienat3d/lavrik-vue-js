<script>
export default {
  props: {
    title: { type: String, required: true },
    value: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  computed: {
    rel() {
      return this.value / this.max;
    },
    progressStyles() {
      return { width: this.rel * 100 + '%' };
    },
    alertClasses() {
      return {
        'alert-danger': this.rel < 0.25,
        'alert-warning': this.rel >= 0.25 && this.rel < 0.75,
        'alert-success': this.rel >= 0.75,
      };
    },
  },
  methods: {
    step() {
      this.$emit('step');
    },
  },
};
</script>

<template>
  <div class="action">
    <div class="alert" :class="alertClasses">
      <h2>{{ title }}</h2>
      <div class="progress">
        <div class="progress-bar" :style="progressStyles"></div>
      </div>
      <hr />
      <h3 v-if="value == max">All done!</h3>
      <button v-else @click="step" type="button" class="btn btn-primary">
        I make step!
      </button>
    </div>
  </div>
</template>
