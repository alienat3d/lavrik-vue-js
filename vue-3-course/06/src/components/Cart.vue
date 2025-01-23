<!-- 3.6.0 В корзине выведем информацию о количестве добавленного товара, его цене -->
<!-- Go to [vue-3-course\06\src\store.js] -->
<template>
  <div>
    <!-- 3.7.0 Так в шаблоне писать конечно можно, но во первых выражение "cnt * price" может пригодится в разных местах и потому сразу появляется мысль сделать computed-поле. Но если сделать его внутри комп. Cart, то это будет значить, что только в нём будет доступен этот расчёт, но у нас есть зависимые данные на уровне хранилища, поэтому напишем его там. -->
    <!-- Go to [vue-3-course\06\src\store.js] -->
    <!--     <div>In Cart: {{ $store.state.cnt }}</div>
    <div>Total: {{ $store.state.cnt * $store.state.price }}</div> -->
    <div>In Cart: {{ cnt }}</div>
    <div>Total: {{ total }}</div>
    <div>$: {{ some }}</div>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cnt', 'total']),
    some() {
      return this.total / 120;
    },
  },
};
</script>
