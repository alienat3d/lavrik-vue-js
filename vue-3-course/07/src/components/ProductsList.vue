<template>
  <div>
    <h1 class="text-center">Products</h1>
    <div class="row">
      <!-- 7.1 Ну и рендерим мы циклом "v-for", забирая информацию из productList, которая опрашивает данные из модуля хранилища "products.js" соответственно. -->
      <!-- ? По хорошему тут надо отрефакторить, чтобы циклом размножалась не вёрстка, а отдельный компонент productCard. -->
      <div
        class="col col-sm-4 mb-3 mt-3"
        v-for="pr in productList"
        :key="pr.id"
      >
        <div class="card" style="min-height: 525px">
          <div
            class="card-body d-flex flex-column align-items-center text-center py-4 px-3"
          >
            <img class="mb-4" :src="'./img/products/' + pr.pic" />
            <h3 class="mb-4 mb-auto">{{ pr.title }}</h3>
            <div class="card__price mb-4">$ {{ pr.price }}</div>
            <!-- 7.2.0 Теперь как мы делаем кнопку добавления в корзину и ссылку на информацию о товаре. Начнём с ссылки на инфо о товаре. Сперва приходит в голову сделать что-то вроде такого: -->
            <!-- <router-link :to="`/product/${pr.id}`">Read more</router-link> -->
            <!-- 7.2.1 Но вместо этого удобнее будет использовать именованный раут, почему мы только что узнали, когда создавали такие рауты. И выглядеть он будет здесь следующим образом: в :to указываем "name" раута, на который ссылаемся, а также передать туда объект params с содержимым id, т.е. сколько дырок в адресе — столько нужно объектов в params передать. -->
            <!-- Go to [vue-3-course\07\src\store\cart.js] -->
            <router-link
              class="mb-4"
              :to="{ name: 'product', params: { id: pr.id } }"
              >Read more</router-link
            >
            <!-- 8.6 Ну, а теперь можно начать реализовывать собственно кнопки корзины, где у нас видно практическое применение геттера "inCart". Если попавший в функцию геттера id (т.е. соответствующий тому артикулу по кнопке которого пользователь кликнул) соответствует имеющемуся в стейте, то он удаляется из стейта, иначе наоборот добавляется. -->
            <!-- Go to [vue-3-course\07\src\store\cart.js] -->
            <!-- 8.10.2 Ну и в итоге мы можем подписаться на событие клик и добавить наши экшены в них, передавая в них id товара. -->
            <!-- Go to [vue-3-course\07\src\store\cart.js] -->
            <button
              v-if="inCart(pr.id)"
              @click="remove(pr.id)"
              type="button"
              class="btn btn-danger"
            >
              Remove
            </button>
            <button
              v-else
              @click="add(pr.id)"
              type="button"
              class="btn btn-success"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- * 7.0.0 Переходим к рендерингу наших данных из хранилища. И для удобства импортируем mapGetters. И в computed разделе развёртываем mapGetters. Но как это сделать? Сначала на ум приходит "...mapGetters('products/all')", но когда у нас включен модульный режим во Vuex есть такая приятная форма записи, когда mapGetters первым параметром принимает имя модуля, а вторым — массив полей, которые нужно из этого модуля забрать. Т.о. mapGetters берёт на себя задачу по подстановке префиксов (автоматически приклеит название модуля хранилища перед каждым элементов этого массива). Но ещё чаще встречается запись, когда второй параметр записывается в виде объекта, когда поле переименовывается на "all". Т.е. если был бы массив, то у нас было бы computed-поле "all". Но мы можем переименовать это поле например в productList, тогда запишем "{ productList: 'all' }", где ключом объекта будет "productList", а "all" по какому ключу мы вытаскиваем данные из модуля. ↓ -->
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('products', { productList: 'all' }),
    // 8.3 Также с помощью mapGetters мы можем вытянуть из модуля "cart" вытянуть геттер "inCart". Но незадача в том, что хотя мы можем его применить в списке товаров, но он не может применять доп. параметры. И в него не получится передать id товара.
    // Go to [vue-3-course\07\src\store\cart.js]
    ...mapGetters('cart', ['inCart']),
  },
  // 8.10.1 Теперь с помощью mapActions мы приконнектим их сюда. ↑
  methods: {
    ...mapActions('cart', ['add', 'remove']),
  },
};

// 7.0.1 И если бы мы писали это поле вручную, то вы глядело бы это как-то так ↑
/* 
	...mapGetters('products', { productList: 'all' })

	Вручную выглядела бы так:
	productList(){
		return $this.store.getters['products/all']
	}

	<router-link :to="'/product/' + pr.id">Read more</router-link>
*/
</script>
<style scoped>
.card__price {
  font-size: 22px;
  font-weight: 600;
}
</style>
