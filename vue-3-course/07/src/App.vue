<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="col col-sm-9">
            <h1>Site</h1>
          </div>
          <!-- 8.13.1 Выводи кол-во товаров в вёрстку. -->
          <div class="col col-sm-3">
            <div class="alert alert-default">
              <div>In Cart: {{ $store.getters['cart/length'] }}</div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </header>
    <section>
      <div class="container">
        <div class="row">
          <div class="col col-sm-3 menu">
            <ul class="list-group">
              <!-- 2.4 Ну и тут явно можно сильно сократить код шаблона с помощью директивы цикла "v-for" и для этого создадим также в data массив объектов "menu", в которых пропишем свойства для путей и текстовое содержание ссылок. -->
              <li
                class="list-group-item"
                v-for="item in menu"
                :key="item.route"
              >
                <!-- 1.7 Для создания ссылок, использующихся раутером нужно в вёрстку писать, не <a>, а спец. комп. "router-link". Слотом туда передаётся содержимое ссылки. Также важно передать в атрибут "to" ссылку на адрес, куда должен пользователь по клику перейти. -->
                <!-- Go to [vue-3-course\07\src\components\Cart.vue] -->
                <!-- 2.3 Также и здесь мы заменим прямое указание пути на объект. И теперь, когда нам скажут, что, например, компонент Order должен рендериться не по адресу "/checkout", а "/order" нам больше не требуется исправлять пути по всему приложению, а достаточно зайти только в файл "router.js" и поменять там путь у компонента "Order". И в целом все стараются использовать только именованные рауты. ↑ -->
                <!-- <router-link :to="{ name: 'catalog' }"> Products </router-link>
                <router-link :to="{ name: 'cart' }"> Cart </router-link>
                <router-link :to="{ name: 'checkout' }"> Order </router-link> -->
                <!-- * 3.0 Что ещё будет полезно сделать, так это индикацию активной ссылки. У активной ссылки может быть 1 или два класса "router-link-active" (пользователь находится по адресу этой ссылки или в её подразделе) & "router-link-exact-active" (только когда пользователь находится на текущем адресе). Для использования "router-link-active" требуется ссылке указать директиву :exact="false" (на практике нужно достаточно редко). В основном мы используем именно "router-link-exact-active". -->
                <!-- 3.1 Мы можем либо стилизовать как-то сам класс "exact-active-class", либо добавить атрибутом в router-link и присвоить ему какой-то класс со стилями. -->
                <!-- ? 3.2 Также после добавления Vue-router в систему добавляются два новых полезных поля "$route" (описание текущего пути) & "$router" (системное поле с ссылкой на Vue-router, которое позволяет проводить программную навигацию - перейти на какую-то страницу и др. параметры). -->
                <!-- ? 3.3 И к примеру мы также можем сравнивать item.route с router-active-route-name, например и если они совпали, то мы понимаем, что это активная ссылка. -->
                <!-- Go to [vue-3-course\07\src\router.js] -->
                <router-link
                  :to="{ name: item.route }"
                  exact-active-class="text-danger"
                >
                  {{ item.text }}
                </router-link>
              </li>
            </ul>
          </div>
          <!-- * 1.0 Представим, что у нас есть задача выводить в контентную часть один из компонентов, в зависимости от того, куда кликнул пользователь и отображать здесь либо содержимое корзины, либо страницу заказа, либо страницу 404, если по ссылке или введённому адресу страницы нет, либо каталог всех товаров, либо инфо об одном товаре. И здесь нам нужен Vue Router. -->
          <!-- Go to [vue-3-course\07\src\main.js] -->
          <!-- 1.5 Но пока раутер не знает где ему отображаться, для этого нам нужно вставить комп. "router-view", сообщим, что именно туда Vue должен будет рендерить компоненты с контентом страниц. -->
          <!-- Go to [vue-3-course\07\vue.config.js] -->
          <div class="col col-sm-9">
            <router-view />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    menu: [
      { route: 'catalog', text: 'Products' },
      { route: 'cart', text: 'Cart' },
      { route: 'checkout', text: 'Order' },
    ],
  }),
};
</script>

<style>
.menu {
  border-right: 1px solid #ddd;
}

.list-group-item {
  transition: background 0.3s, color 0.3s;
}

.list-group-item a {
  text-decoration: none;
}

.list-group-item.active a {
  color: inherit;
}
</style>
