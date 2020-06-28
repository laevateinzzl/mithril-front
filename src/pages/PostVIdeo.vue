<template>
  <div class="column justify-center items-center ">
    <q-card class="register">
      <q-toolbar class="bg-cyan text-white">
        <q-toolbar-title class="column justify-center items-center ">
          视频投稿
        </q-toolbar-title>
      </q-toolbar>
      <q-form @submit="submit" class="q-gutter-md">
        <q-input filled v-model="form.title" label="标题" />
        <q-input filled v-model="form.info" label="详情" />
        <q-input filled v-model="form.url" label="地址" />
        <div class="box">
          <span>上传封面</span>
          <input type="file" @change="fnUploadRequest" ref="inputer" />
          <label for="id"></label>
        </div>
        <q-card-actions class="column justify-end items-end ">
          <q-btn label="投稿" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import * as API from "../api/video/";
import uploadAPI from "../api/upload/";

export default {
  data() {
    return {
      form: {
        title: "",
        info: "",
        url: "",
        avatar: ""
      }
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
      API.postVideo(this.form)
        .then(res => {
          if (res.code > 0) {
            this.$q.notify({
              title: "投稿失败",
              titleIcon: "error",
              message: res.msg
            });
          } else {
            this.$q.notify({
              title: "投稿成功",
              message: `您投稿的ID为${res.data.id}`,
              type: "success"
            });
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          this.$q.notify({
            title: "网路错误，或者服务器宕机",
            titleIcon: "error",
            message: error
          });
        });
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
