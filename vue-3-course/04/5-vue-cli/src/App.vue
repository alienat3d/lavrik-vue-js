<script>
import AppTodoAction from './components/ToDoAction.vue';

export default {
  components: {
    AppTodoAction,
  },
  data: () => ({
    todoList: [
      { title: 'First action', current: 0, max: 5 },
      { title: 'Other work', current: 0, max: 10 },
      { title: 'Some fun', current: 0, max: 7 },
    ],
  }),
  methods: {
    makeStep(i) {
      let action = this.todoList[i];

      if (action.current < action.max) {
        action.current++;
      }
    },
  },
};
</script>

<template>
  <div class="sample">
    <div class="Todo">
      <h1>Your actions</h1>
      <app-todo-action
        v-for="(action, i) in todoList"
        :key="i"
        :title="action.title"
        :value="action.current"
        :max="action.max"
        @step="makeStep(i)"
      ></app-todo-action>
    </div>
    <!-- * 2.0 Теперь добавим кнопку "Finish" для завершения дня. -->
    <hr />
    <!-- <button class="btn btn-success btn-shadow" type="button">Finish</button> -->
    <!-- 2.2.1 Создаётся системное поле "$style". И теперь мы можем сделать динамическую директиву v-bind:class и записать в неё $style.btn-shadow, например. И хотя, на первый взгляд, может показаться, что мы тут усложняем работу, но зато, в отличии от "scoped" мы упрощаем работу браузера, которые больше не ищет также по data-атрибутам, т.к. мы тем самым уже засылаем уникальное название класса. -->
    <button
      :class="$style.btnShadow"
      class="btn btn-success btn-shadow"
      type="button"
    >
      Finish
    </button>
  </div>
</template>

<!-- 2.1 Для стилизации компонента у нас есть секция "style" (может быть с указанным атрибутом "scoped" для локального применения) -->
<!-- <style scoped>
.btn-shadow {
  box-shadow: 3px 3px 10px #222;
  transition: box-shadow 0.15s ease-in-out;
}

.btn-shadow:active {
  box-shadow: 0 0 0 transparent;
}
</style> -->

<!-- 2.2.0 Но есть и второй способ стилизовать локально это дописать слово "module". ↑ -->
<style module>
.btnShadow {
  box-shadow: 3px 3px 10px #222;
  transition: box-shadow 0.15s ease-in-out;
}

.btnShadow:active {
  box-shadow: 0 0 0 transparent;
}
</style>
