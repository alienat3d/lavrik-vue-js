<template>
  <div>
    <button class="btn btn-primary" v-on:click="showRes = !showRes">
      {{ btnText }}
    </button>
    <hr />
    <app-progress v-bind:val="sum" v-bind:max="maxNumbers * 5" />
    <hr />
    <transition name="slide">
      <h2 v-show="showRes" class="alert alert-success">
        Your profit: {{ sum }}
      </h2>
    </transition>
    <hr />
    <app-progress v-bind:val="numbers.length" v-bind:max="maxNumbers" />
    <hr />
    <button
      class="btn btn-success"
      v-on:click="addNumber"
      v-bind:disabled="done"
    >
      Add number
    </button>
    <hr />
    <ul class="list-group">
      <li class="list-group-item" v-for="number in numbers" v-bind:key="number">
        {{ number }}
      </li>
    </ul>
  </div>
</template>

<script>
import Progress from './components/ProgressBar';

export default {
  data() {
    return {
      showRes: true,
      numbers: [],
      maxNumbers: 10,
    };
  },
  methods: {
    addNumber() {
      // 2.6.1 И здесь уже проверим, если done возвращает false, то генерируем число и добавляем в массив numbers.
      // Go to [vue-2-intro\04\index.html]
      if (!this.done) {
        let rnd = Math.floor(Math.random() * 11) - 5;
        this.numbers.push(rnd);
      }
    },
  },
  computed: {
    sum() {
      let sum = 0;

      for (let i = 0; i < this.numbers.length; i++) {
        sum += this.numbers[i];
      }

      return sum;
    },
    btnText() {
      return this.showH2 ? 'Hide result' : 'Show result';
    },
    done() {
      return this.numbers.length >= this.maxNumbers;
    },
  },
  components: {
    AppProgress: Progress,
  },
};
</script>

<style scope>
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  transition: opacity 0.5s;
}

.slide-leave-active {
  transition: opacity 0.5s;
}

.slide-leave-to {
  opacity: 0;
}
</style>
