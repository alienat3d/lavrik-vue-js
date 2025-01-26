<template>
  <div>
    <h1>Title</h1>
    Back to products
    <hr />
    <!-- 5.1 Через $route.params мы обращаемся к айдишнику и теперь сюда будет выводиться значение введённое в адрес на месте id. Таким образом можно получить доступ к нужной информации о товаре по id, получаемом из адресной строки из раутера. -->
    <!-- Go to [vue-3-course\07\src\store\index.js] -->
    <div class="alert alert-success">
      price
      {{ $route.params.id }}
    </div>
  </div>
</template>

<script>
export default {};
</script>
