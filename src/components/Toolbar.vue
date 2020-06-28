<template>
  <q-layout view="hHh lpR fFf">
    <q-header height-hint="98">
      <div class="header">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
            </q-avatar>
            <span>
              MITHRIL
            </span>
          </q-toolbar-title>
          <q-space />
          <div v-if="CheckLogin">
            <q-btn flat square dense to="/login">
              <span>登录</span>
              <q-icon name="login"></q-icon>
            </q-btn>
          </div>
          <div v-else>
            <q-btn flat square dense @click="Logout">
              <span>登出</span>
              <q-icon name="logout"></q-icon>
            </q-btn>
          </div>
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab name="home" label="首页" to="/" />
          <q-route-tab name="about" label="排行" to="/rank" />
          <q-route-tab name="user" label="用户" to="/userinfo" />
          <q-route-tab name="about" label="关于" to="/about" />
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  },
  computed: {
    /**
     * @return {boolean}
     */
    CheckLogin() {
      return !this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    Logout() {
      this.$store.dispatch("LogOut");
      this.$router.push({ path: "/login" });
      localStorage.setItem("isRemember", "");
    }
  }
};
</script>

<style lang="sass" scoped>
.header
    background-color: $nord7;

.q-layout
    background-color: $nord6
</style>
