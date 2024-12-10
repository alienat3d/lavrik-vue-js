<script>
export default {
  props: {
    current: { type: Number, required: true },
    max: { type: Number, default: 100 },
  },
  // * 1.0 Если захотим потом прогрессбар в разные цвета красить, то пригодится и computed поле "value", чтобы высчитать зависимость текущей заполненности прогрессбара к максимальной.
  // 1.1 Ну, а в styles уже находим в % и добавляем знак процента.
  computed: {
    value() {
      return this.current / this.max;
    },
    styles() {
      return { width: this.value * 100 + '%' };
    },
  },
};
</script>
<template>
  <div
    class="progress"
    role="progressbar"
    aria-label="Fields filled progress"
    aria-valuenow="25"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!-- 1.2 Также добавим это computed динамически выводиться в стили. -->
    <!-- Go to [src\App.vue] -->
    <div class="progress-bar" :style="styles"></div>
  </div>
</template>
