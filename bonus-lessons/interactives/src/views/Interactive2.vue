<template>
  <div class="container">
    <h1>Second Example</h1>
    <hr />
    <ul>
      <li v-for="item in items" :key="item">
        <span>{{ item }}</span>
        <!-- todo Vue не обновляет временное содержимое инпутов, если они ни к чему не привязаны, т.е. нет ключа. -->
        <input type="text" />
      </li>
    </ul>
    <hr />
    <button class="btn btn-danger" @click="onShuffle">Shuffle</button>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: ['First', 'Second', 'Third'],
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
