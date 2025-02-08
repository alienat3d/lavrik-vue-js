<template>
  <div>
    <h1>Cart</h1>
    <hr />
    <!-- * 2.0 Зачем же нам именованные рауты? Может так случиться, что ссылки будут где-то дублироваться Представим, что в корзине у нас есть кнопка-ссылка для перехода на страницу заказа. И тут могут возникнуть затруднения, например, если попросят поменять ссылку с "checkout" на "order". И тогда придётся идти во всём приложении искать все пути "/checkout" менять на "/order". Хотя такое случается не так часто, но в действительно крупных проектах этом может быть не очень приятным занятием. В добавок есть риск где-то забыть исправить и битую ссылку получить. -->
    <!-- Go to [vue-3-course\07\src\router.js] -->
    <!-- <router-link class="btn btn-success" to="/checkout">
			Order now
    </router-link> -->
    <!-- 2.2 И теперь мы в to будем прописывать не путь, а динамический параметр с объектом. -->
    <!-- Go to [vue-3-course\07\src\App.js] -->
    <!-- 11.4 Приступим к вёрстке таблицы корзины. -->
    <!-- Go to [vue-3-course\07\src\store\cart.js] -->
    <!-- 11.8 А теперь добавляем этот экшен на события click на обе кнопки. Валидировать у нас значения будет экшен, а потом уже кнопки можно заблокировать. -->
    <!-- Go to [vue-3-course\07\src\store\cart.js] -->
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Count</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- ? Улучшить код можно созданием и добавление доп. компонента TableRow, а также добавление логики кнопок в computed-поля. -->
        <tr v-for="pr in products" :key="pr.id">
          <td>{{ pr.title }}</td>
          <td>{{ pr.price }}</td>
          <td>{{ pr.cnt }}</td>
          <td>{{ pr.price * pr.cnt }}</td>
          <td>
            <button
              class="btn btn-warning me-1"
              @click="setCnt({ id: pr.id, cnt: pr.cnt - 1 })"
              :disabled="pr.cnt <= 1"
            >
              -1
            </button>
            <button
              class="btn btn-success"
              @click="setCnt({ id: pr.id, cnt: pr.cnt + 1 })"
              :disabled="pr.cnt >= pr.rest"
            >
              +1
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link class="btn btn-success" :to="{ name: 'checkout' }">
      Order now
    </router-link>
  </div>
</template>

<!-- 11.7 А теперь привяжем наш экшен собственно к компоненту корзины. Добавим mapActions и в раздел methods мы подключим "setCnt" (переименовывать нет особого смысла) с помощью mapActions из модуля корзины. ↑ -->
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', { products: 'itemsDetailed' }),
  },
  methods: {
    ...mapActions('cart', ['setCnt']),
  },
};
</script>
