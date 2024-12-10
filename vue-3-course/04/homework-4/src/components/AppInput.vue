<script>
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { fasCircleExclamation } from '@awesome.me/kit-KIT_CODE/icons/classic/solid';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faHouse } from '@awesome.me/kit-KIT_CODE/icons/classic/solid';

export default {
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    valid: { type: Boolean, required: true },
  },
  components: {
    FontAwesomeIcon,
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
    <FontAwesomeIcon :icon="faHouse" />
    <!-- <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> -->
    <label>
      {{ label }}
      <!-- <FontAwesomeIcon
        v-if="activated"
        :icon="valid ? 'fas circle-check' : 'fas, circle-exclamation'"
      /> -->
    </label>
    <input type="text" class="form-control" :value="value" @input="onInput" />
  </div>
</template>

<style></style>
