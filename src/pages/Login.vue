<template>
  <div class="column justify-center items-center ">
    <q-card class="login">
      <q-toolbar class="bg-cyan text-white">
        <q-toolbar-title class="column justify-center items-center ">
          欢迎来到Mithril
        </q-toolbar-title>
        <q-btn flat square dense to="/register">
          <span>注册</span>
          <q-icon name="person_add"></q-icon>
        </q-btn>
      </q-toolbar>
      <q-form @submit="submit" class="q-gutter-md">
        <q-input filled v-model="account" label="账号" />
        <q-input filled type="password" v-model="password" label="密码" />
        <q-card-actions class="column justify-end items-end ">
          <q-btn label="登录" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    submit() {
      let params = {
        account: this.account,
        password: this.password
      };
      this.$store
        .dispatch("Login", params)
        .then(res => {
          if (res.code > 0) {
            this.$q.notify({
              title: "登录失败",
              message: res.msg
            });
          } else {
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          this.$q.notify({
            title: "网路错误，或者服务器宕机",
            message: error
          });
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.login
  width: 500px
  max-width: 800px
  margin-top: 50px
</style>
