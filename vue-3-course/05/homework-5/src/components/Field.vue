<template>
  <div class="form-group">
    <label>
      {{ label }}
      <!-- 1.0 Чтобы Vue мог отличить один элемент от другого для анимации смены иконок используем атрибут "key", в который подставляем значение "valid". И теперь, когда поле становится валидным, у него значение ключа с false меняется на true и тогда Vue один элемент заменит на другой и иконка сменится. -->
      <!-- ? 2.0 Итак, мы пришли к применению "appear" для анимации, чтобы первая анимация отличалась от последующих. Но тут есть определённые нюансы, которые важно понимать: если мы пропишем transition какой-нибудь "appear-class", если пропишем атрибут "appear", например, то на данном этапе оно работать не будет как мы хотим, т.е. будет показывать ту же анимацию, что и до того. Так происходит от того, что "appear" — это атрибут, который означает, что transition при первом появлении должен проиграть анимацию и при помощи "appear-active-class" можно поставить уникальную анимацию. Но сейчас transition появляется сразу, а уже потом появляется fa-icon внутри него. А нужно, чтобы transition появлялся тогда, когда мы в первый раз хотим отобразить иконку. И с этой точки зрения здесь кое что нужно переделать — v-if="activated" нужно перенести в transition. -->
      <!-- 2.1 Не забываем про mode="out-in", чтобы Vue ждал окончания одной анимации, прежде чем запускать вторую. -->
      <!-- 2.2 Дальше пропишем атрибут "appear", а также "appear-active-class" и добавим ему первую анимацию "icon-appear". -->
      <!-- Go to [vue-3-course\05\homework-5\src\App.vue] -->
      <transition
        name="icon"
        mode="out-in"
        appear
        appear-active-class="icon-appear"
        v-if="activated"
      >
        <fa-icon
          class="mx-1"
          :key="valid"
          :class="valid ? 'text-success' : 'text-danger'"
          :icon="valid ? 'check-circle' : 'exclamation-circle'"
        />
      </transition>
    </label>
    <input type="text" class="form-control" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    valid: { type: Boolean, required: true },
  },
  data() {
    return {
      activated: this.value != '',
    };
  },
  methods: {
    onInput(e) {
      this.activated = true;
      this.$emit('updated', e.target.value);
    },
  },
};
</script>
<style>
.icon-enter-active {
  animation: iconIn 0.5s;
}

.icon-leave-active {
  animation: iconOut 0.5s;
}

.icon-appear {
  animation: fadeIn 0.5s;
}

@keyframes iconIn {
  from {
    transform: rotateY(-90deg);
  }
  to {
    transform: rotateY(0);
  }
}

@keyframes iconOut {
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(90deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
