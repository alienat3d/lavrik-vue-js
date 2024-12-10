<script>
import AppInput from './AppInput.vue';

export default {
  components: {
    AppInput,
  },
  data: () => ({
    info: [
      {
        label: 'Name',
        value: '',
        pattern: /^[a-zA-Z ]{2,30}$/,
      },
      {
        label: 'Phone',
        value: '+',
        pattern: /^\+{1}[0-9]{11}$/,
      },
      {
        label: 'Email',
        value: '',
        pattern: /.+/,
      },
      {
        label: 'Some Field 1',
        value: '',
        pattern: /.+/,
      },
      {
        label: 'Some Field 2',
        value: '',
        pattern: /.+/,
      },
    ],
  }),
  computed: {
    fieldsDone() {
      return this.info.filter((field) => field.valid).length;
    },
    progressStyles() {
      return { width: (this.fieldsDone / this.info.length) * 100 + '%' };
    },
    isFormReady() {
      return this.fieldsDone >= this.info.length;
    },
  },
  methods: {
    onUpdate(i, val) {
      const field = this.info[i];
      field.value = val.trim();
      field.valid = field.pattern.test(field.value);
    },
  },
  created() {
    this.info.forEach((field) => {
      field.valid = false;
      field.activated = false;
    });
  },
};
</script>

<template>
  <form>
    <div
      class="progress"
      role="progressbar"
      aria-label="Fields filled progress"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-bar" :style="progressStyles"></div>
    </div>
    <div class="my-3">
      <AppInput
        v-for="(input, i) in info"
        :key="i"
        :label="input.label"
        :value="input.value"
        :valid="input.valid"
        @updated="onUpdate(i, $event)"
      />
    </div>
    <button class="btn btn-primary" :disabled="!isFormReady">Send Data</button>
  </form>
</template>

<style></style>
