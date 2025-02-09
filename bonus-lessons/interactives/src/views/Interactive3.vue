<template>
  <div class="container">
    <h1>Third Example</h1>
    <hr />
    <ul>
      <li v-for="(item, id) in items" :key="item.from + ':' + item.to">
        <!-- todo Vue не обновляет состояние дочерних компонентов перебора без ключа. -->
        <!-- ? Поэтому необходимо ставить ключи, если мы знаем, что внутри элементов, которые генерируются с помощью цикла, есть либо дочерние компоненты, либо компоненты, хранящие временное состояние. При этом ключ должен быть уникальным (index массива тут редко подходит и считается обычно плохим стилем). -->
        <app-random-range :min="item.from" :max="item.to" />
      </li>
    </ul>
    <hr />
    <button class="btn btn-danger" @click="onShuffle">Shuffle</button>
  </div>
</template>
<script>
import AppRandomRange from '../components/RandomRange.vue';

export default {
  components: { AppRandomRange },
  data: () => ({
    items: [
      { from: 1, to: 4 },
      { from: 5, to: 8 },
      { from: -4, to: -1 },
    ],
  }),
  computed: {},
  methods: {
    onShuffle() {
      this.items = this.items.sort(() => (Math.random() > 0.5 ? 1 : -1));

      console.log('-------');

      this.items.forEach((item) => console.log(item));
    },
  },
};
</script>
