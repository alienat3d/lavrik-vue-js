<template>
  <div class="container mt-3">
    <form @submit.prevent="sendForm" v-if="!formDone">
      <app-progress :current="fieldDone" :max="info.length" />
      <div class="mt-3">
        <app-field
          class="mt-2"
          v-for="(field, i) in info"
          :key="i"
          :label="field.label"
          :value="field.value"
          :valid="field.valid"
          @updated="onUpdate(i, $event)"
        ></app-field>
      </div>
      <div class="text-center">
        <button class="btn btn-primary mt-4" :disabled="!formReady">
          Send Data
        </button>
      </div>
    </form>
    <div v-else>
      <h2>All done!</h2>
    </div>
    <!-- * 3.0 Подключим стороннюю библиотеку с модальным окном и перенесём в него таблицу, как нам нужно из Т3. А на месте таблицы будет фраза "All done!" -->
    <vue-final-modal v-model="showModal">
      <div class="container p-2 mt-4 modal-inner">
        <table class="table table-bordered">
          <tbody>
            <tr v-for="(field, i) in info" :key="i">
              <td>{{ field.label }}</td>
              <td>{{ field.value }}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div class="text-center">
          <button class="btn btn-success me-3" @click="onConfirm">Ok</button>
          <button class="btn btn-danger" @click="showModal = false">
            Cancel
          </button>
        </div>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
// ? Важно помнить, что хотя мы можем называть файлы компонентов одним словом, но их константа, в которую мы их импортируем должна состоять хотя бы из 2-ух слов, например "AppField" или "AppProgress", чтобы случайно не попасть в HTML-теги или другие Vue-сущности.
/* Точнее даже речь именно про само имя используемого компонента, например: 
import b from './components/A.vue'
...
components: { AppField: b }
*/
import AppField from './components/Field';
import AppProgress from './components/Progress';

export default {
  components: { AppField, AppProgress, VueFinalModal },
  data: () => ({
    info: [
      {
        label: 'Name',
        value: '',
        pattern: /^[a-zA-Z ]{2,30}$/,
      },
      {
        label: 'Phone',
        value: '',
        pattern: /^[0-9]{7,14}$/,
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
    showModal: false,
    formDone: false,
  }),
  computed: {
    fieldDone() {
      // return this.info.reduce((total, field) => total + (field.valid ? 1 : 0), 0)
      return this.info.filter((field) => field.valid).length;
    },
    formReady() {
      return this.fieldDone >= this.info.length;
    },
    progressStyles() {
      let rel = (this.fieldDone / this.info.length) * 100;
      return { width: rel + '%' };
    },
  },
  methods: {
    onUpdate(i, val) {
      let field = this.info[i];
      field.value = val.trim();
      field.valid = field.pattern.test(field.value);
    },
    sendForm() {
      if (this.formReady) {
        this.showModal = true;
      }
    },
    onConfirm() {
      this.showModal = false;
      this.formDone = true;
    },
  },
  created() {
    this.info.forEach((field) => {
      field.valid = false;
    });
  },
};
</script>

<style scoped>
.modal-box {
  display: flex;
  height: 100vh;
  align-items: center;
}
</style>
