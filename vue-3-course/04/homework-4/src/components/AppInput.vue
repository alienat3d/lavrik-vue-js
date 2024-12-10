<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    valid: { type: Boolean, required: true },
  },
  data() {
    return {
      activated: this.value !== '',
    };
  },
  methods: {
    onInput(evt) {
      this.activated = true;
      this.$emit('updated', evt.target.value);
    },
  },
};
</script>
<template>
  <div class="form-group">
    <label>
      {{ label }}
      <font-awesome-icon
        v-if="activated"
        :class="valid ? 'text-success' : 'text-danger'"
        :icon="valid ? 'circle-check' : 'circle-exclamation'"
      />
    </label>
    <input type="text" class="form-control" :value="value" @input="onInput" />
  </div>
</template>

<style></style>
