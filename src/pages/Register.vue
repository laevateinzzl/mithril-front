<template>
  <div class="column justify-center items-center ">
    <q-card class="register">
      <q-toolbar class="bg-cyan text-white">
        <q-toolbar-title class="column justify-center items-center ">
          欢迎来到Mithril
        </q-toolbar-title>
      </q-toolbar>
      <q-form @submit="submit" class="q-gutter-md">
        <q-input filled v-model="account" label="账号" />
        <q-input filled v-model="username" label="昵称" />
        <q-input filled type="password" v-model="password" label="密码" />
        <q-input
          filled
          type="password"
          v-model="password_confirm"
          label="确认密码"
        />
        <div class="box">
          <span>头像</span>
          <input type="file" @change="fnUploadRequest" ref="inputer" />
          <label for="id"></label>
        </div>
        <q-card-actions class="column justify-end items-end ">
          <q-btn label="注册" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import * as userAPI from "../api/user/";
import uploadAPI from "../api/upload/";

export default {
  data() {
    return {
      imageurl: "",
      avatar: "",
      account: "",
      username: "",
      password: "",
      password_confirm: ""
    };
  },

  methods: {
    fnUploadRequest(e) {
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0];
      uploadAPI(this.file.name)
        .then(res => {
          const oReq = new XMLHttpRequest();
          oReq.open("PUT", res.data.put, true);
          oReq.send(this.file);
          oReq.onload = () => {
            this.url = res.data.get;
            this.form.avatar = res.data.key;
          };
        })
        .catch(error => {
          this.$q.notify({
            title: "网路错误，或者服务器宕机",
            message: error
          });
        });
    },
    submit() {
      let form = {
        account: this.account,
        username: this.username,
        password: this.password,
        password_confirm: this.password_confirm,
        avatar: this.avatar
      };
      userAPI
        .userRegister(form)
        .then(res => {
          if (res.code > 0) {
            this.$q.notify({
              title: "注册失败",
              message: res.msg
            });
          } else {
            this.$router.push("/login");
          }
        })
        .catch(error => {
          this.$q.notify({
            title: "网路错误，或者服务器宕机",
            message: error
          });
        });
    },
    checkFileType(files) {
      return files.filter(file => file.type === "image/png");
    }
  }
};
</script>

<style lang="sass" scoped>
.register
  width: 500px
  max-width: 800px
  margin-top: 50px

.upload
    margin-left: 115px
</style>
