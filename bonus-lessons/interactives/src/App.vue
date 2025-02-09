<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="col">
            <ul class="py-5 d-flex gap-5 list-unstyled">
              <li
                class="btn btn-primary"
                v-for="item in menu"
                :key="item.route"
              >
                <router-link
                  class="text-white text-reset"
                  :to="{ name: item.route }"
                  exact-active-class="text-warning"
                >
                  {{ item.text }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
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
      { route: '1', text: 'Example 1' },
      { route: '2', text: 'Example 2' },
      { route: '3', text: 'Example 3' },
    ],
  }),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
