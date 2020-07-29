<template>
  <div class="column justify-center items-center">
    <q-card class="register">
      <q-toolbar class="bg-cyan text-white">
        <q-toolbar-title class="column justify-center items-center">修改视频</q-toolbar-title>
      </q-toolbar>
      <q-form @submit="submit" class="q-gutter-md">
        <q-input filled v-model="form.title" label="标题" />
        <q-input filled v-model="form.info" label="详情" />
        <q-btn flat label="删除视频" @click="deleteVideo"></q-btn>
        <q-card-actions class="column justify-end items-end">
          <q-btn label="提交" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import * as API from "../api/video/";

export default {
  data() {
    return {
      form: {
        title: "",
        info: "",
      },
    };
  },

  methods: {
    submit() {
      API.updateVideo(this.form)
        .then((res) => {
          if (res.code > 0) {
            this.$q.notify({
              title: "投稿失败",
              titleIcon: "error",
              message: res.msg,
            });
          } else {
            this.$q.notify({
              title: "投稿成功",
              message: `您投稿的ID为${res.data.id}`,
              type: "success",
            });
            this.$router.push({ path: "/" });
          }
        })
        .catch((error) => {
          this.$q.notify({
            title: "网路错误，或者服务器宕机",
            titleIcon: "error",
            message: error,
          });
        });
    },
    deleteVideo() {
      API.deleteVideo(this.$route.params.videoID)
        .then((res) => {
          if (res.code > 0) {
            this.$q.notify({
              title: "删除失败",
              titleIcon: "error",
              message: res.msg,
            });
          } else {
            this.$q.notify({
              title: "删除成功",
              titleIcon: "success",
              message: "该视频已成功删除",
            });
          }
        })
        .catch((error) => {
          this.$q.notify({
            title: "网路错误，或者服务器宕机",
            titleIcon: "error",
            message: res.msg,
          });
        });
    },
  },
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
