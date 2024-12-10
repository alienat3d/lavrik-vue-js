<!-- ? Когда мы начинаем привыкать к компонентному подходу, то становится ясно, что компонент при своём создании должен опираться на логику, а не оглядываться на родительский компонент. И такие компоненты как прогрессбар, слайдер, инпут и т.д. мы создаём не ради какого-то одного родительского компонента, а это будет комп. который будет использоваться в различных частях сайта с различными родительскими элементами. Например, прогрессбар нам нужен и как индикатор загрузки картинки, как прогресс формы, как индикатор загрузки страницы может быть или отправки формы и т.д. Поэтому пропс и др. части описания компоненты должны быть названы универсально, например у прогрессбара это "current" & "max" в пропс, а не "lengthInfo" & "lengthValid", т.к. это слишком конкретно привязано к конкретной задаче какого-то прогрессбара. -->
<!-- Go to [src\components\AppProgressbar.vue] -->
<script>
import AppInput from './components/AppInput.vue';
import AppProgressbar from './components/AppProgressbar.vue';

// 1.3 Не забудем импортировать новый компонент в components. ↓
export default {
  components: { AppInput, AppProgressbar },
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
    isFormDone: false,
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
    sendForm() {
      if (this.isFormReady) this.isFormDone = true;
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
  <div class="container">
    <form v-if="!isFormDone" @submit.prevent="sendForm">
      <!-- 1.4 И теперь можем заменить его на тег <app-progressbar /> и добавляем ему динамические директивны для полей "current" и "max". ↓ -->
      <app-progressbar :current="fieldsDone" :max="info.length" />
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
      <button class="btn btn-primary" :disabled="!isFormReady">
        Send Data
      </button>
    </form>
    <!-- 1.5 Ну и итоговая таблица будет выводится у нас циклом "v-for" -->
    <table v-else class="table table-bordered">
      <tbody>
        <tr v-for="(field, i) in info" :key="i">
          <td>{{ field.label }}</td>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
