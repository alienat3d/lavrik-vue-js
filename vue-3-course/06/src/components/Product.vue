<template>
  <div>
    <h2>Product title</h2>
    <!-- 3.5 Ну или здесь можно было бы в шаблоне также вывести через {{ $store.price }} -->
    <!-- Go to [vue-3-course\06\src\components\Cart.vue] -->
    <!-- * 4.0.0 Далее у нас есть способ чуточку подсократить код в шаблоне. Нам бы хотелось тут просто видеть слово price. ↓ -->
    <!-- <div class="price">{{ $store.getters.price }}</div> -->
    <div class="price">{{ price }}</div>
    <hr />
    <!-- 3.6.2 И вот, когда мы по событию вызываем какой-то метод, который обращается к хранилищу через "commit", ... -->
    <!-- Go to [vue-3-course\06\src\store.js] -->
    <!-- 4.1.0 Также вместо... ↓ -->
    <!-- <button class="btn btn-warning" @click="$store.commit('decrease')">-1</button> -->
    <!-- Аналогично с другими методами, просто их не стал писать для экономии места. -->
    <!-- 5.11.0 Теперь мы запустим этот экшен в компоненте для кнопки Send. ↓ -->
    <button class="btn btn-warning" @click="decrease">-1</button>
    <!-- 7.8 И вроде бы уже всё работает, кроме setCnt, который запускается с параметром evt, т.к. оно указано напрямую в событии "change", а нам нужно запустить его с параметром строковым, где будет текущее кол-во (т.е. по сути передать туда evt.target.value). ↓ -->
    <input type="text" :value="cnt" @change="setCnt" />
    <button class="btn btn-success" @click="increase">+1</button>
    <hr />
    <button class="btn btn-primary" @click="send">Send</button>
    <!-- 5.11.2 Также мы бы хотели как-то уведомить пользователей о том, что их заказ выполняется или уже успешно выполнен. Добавим несколько контейнеров для этого. ↓ -->
    <div class="alert alert-warning" v-if="orderIsPending">Pending...</div>
    <div class="alert alert-success" v-else-if="orderIsDone">Done!</div>
  </div>
</template>

<!-- 3.4 И вот теперь, когда у нас есть глобальное хранилище, мы обратимся к нему по "this.$store" -->
<!-- 3.5 Здесь также есть один важный нюанс, т.к. из документации нам предлагают использовать метод хранилища "commit", в который помещаем название нужной мутации, например "increase" или "decrease" и др.. -->
<!-- Go to [vue-3-course\06\src\store.js] -->
<!-- 3.6.4 При этом мы может также передавать какие-то доп. параметры в мутацию (как, например, в случае с методом "setCnt"). -->
<!-- Go to [vue-3-course\06\src\store.js] -->
<script>
// 5.1 Сперва мы импортируем карты из Vuex. ↓
import { mapGetters, mapActions } from 'vuex';

export default {
  // 4.0.1 Для этого мы создадим computed-поле и пропишем ему метод price.
  /* computed: {
    price() {
      return this.$store.getters.price;
    },
  }, */
  // * 5.0 Но под каждый геттер и стейт в хранилище делать computed-поле как-то не с руки, благо во Vuex есть "карты" (maps). ↑
  // 5.2 А теперь мы можем прописать карты следующим образом. В них перечисляем в массиве название полей, которые нужно вытащить из хранилища. И по сути это генератор этого большого куска кода, который нам не хочется писать вручную. ↓
  // 5.11.3 Также нам понадобятся геттеры со статусами отправки.
  computed: mapGetters(['price', 'cnt', 'orderIsPending', 'orderIsDone']),
  // 4.1.1 ... мы пропишем это в методы, тем самым сильно сократив шаблон.
  // 5.11.1 Также мы создадим специальный метод "sendOrder", где мы уже будем использовать не "commit" метод, а "dispatch" и поместим в него название экшена "send". "dispatch" — это запуск какого-то экшена. ↑
  // 7.7 Теперь, чтобы наши экшены заработали нам нужно поменять коммиты на диспатчи, но ещё красивее будет также как и с mapGetters добавить mapActions. А дальше мы просто перечислим все инструменты из хранилища, которые нам нужны. ↑
  // 7.9 Создадим функцию setCnt, которая будет принимать значения и запускать мутацию "setCnt".
  // * 8.0 У нас также есть ещё одна проблемка с тем, если кроме числа написать ещё какие-то буквы. И решение будет связано с forceUpdate. Т.е. мы понимаем, что Vue не уследило с реактивностью данных и нам нужно компонент заново перерендерить (желательно это делать не каждый раз, а по какому-то условию). Этим мы говорим компоненту, что когда запущена в store установка нового cnt, то запусти пожалуйста перерендеринг компонента. Такая задача, справедливости ради, встречается не так уж и часто.
  // 8.1 Ну и поставим проверку, для этого старое значение cnt мы сохраняем до его установки в хранилище в константе lastCnt. Ну и в проверке сравниваем, что если предыдущее значение cnt равно текущему значению, то только тогда запускаем "$forceUpdate".
  methods: {
    ...mapActions(['increase', 'decrease', 'send']),
    setCnt(e) {
      const lastCnt = this.cnt;

      this.$store.dispatch('setCnt', parseInt(e.target.value));

      if (lastCnt == this.cnt) this.$forceUpdate();
    },
    /*     increase() {
      this.$store.commit('increase');
    },
    decrease() {
      this.$store.commit('decrease');
    }, */
    /* setCnt(e) {
      this.$store.commit('setCnt', parseInt(e.target.value));
    }, */
    /* sendOrder() {
      this.$store.dispatch('send');
    }, */
  },
};
</script>

<!-- 5.3 Вот что вернут карты, если в них вписать поля "cnt" & "total":
mapGetters(['cnt', 'total'])
	{
		cnt(){
			return this.$store.getters.cnt;
		},
		total(){
			return this.$store.getters.total;
		}
	} 
-->
<!-- 5.4.0 ? Также ещё можно делать переименование поля, а также совмещать Vuex геттеры с собственными геттерами. Для этого надо знать как работает spread-оператор (это в общем-то база обычного JS). Т.е. если нам нужно здесь ещё какое-то дополнительное computed-поле, то можем сделать так:
5.4.1 Т.о. этот самый полученный объект (как на примере выше встраивается внутрь объекта computed spread-оператором "..."), а далее мы можем записывать доп. поля.
export default {
	computed: {
		...mapGetters(['cnt', 'total']),
		totalTax() {
			return this.total / 20
		}
	}
}
-->

<!-- ? 5.5 Мы сейчас не будем рассматривать mapMutations(), потому, что мутации в компонентах обычно не используются, а вместо них используют actions. И если мы откроем документацию Vuex, то мы увидим на графическом изображении, что схеме цикла Vuex между компонентом и Mutations у нас есть Actions. Во-первых Mutations это крайне ограниченный в возможностях инструмент (они не имеют доступа к геттерам или к другим мутациям, а только к стейт) и смысл его быстрое и лёгкое изменение стейта. Но ведь бывают также и задачи, когда нам требуется, например, геттер получить (посмотреть total и дать человеку, в зависимости от его значения какую-то скидку). И тогда мутаций нам уже недостаточно. А ещё мутации совершенно не приспособлены для асинхронных операций. И вот поэтому есть во Vuex actions — это более универсальные функции, которая может делать асинхронные действия и у них есть доступ ко всему (к стейту, геттерам, мутациям и другим экшенам). -->
<!-- Go to [vue-3-course\06\src\store.js] -->
