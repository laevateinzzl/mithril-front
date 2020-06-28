<template>
  <div class="q-pa-md">
    <div class="row items-start">
      <div class="col-12 col-md-3 " v-for="video in videos" :key="video.id">
        <q-card @click="goVideo(video)" flex elevation-1>
          <q-img :src="video.avatar">
            <div class="absolute-bottom">
              <div class="text-h6">{{ video.title }}</div>
              <div class="text-subtitle2">{{ video.info }}</div>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "../api/video/";

export default {
  name: "PageIndex",
  data() {
    return {
      videos: [],
      start: 0,
      limit: 100,
      total: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1);
      this.load();
    },
    load() {
      API.getVideos(this.start, this.limit).then(res => {
        this.videos = res.data.items;
        this.total = res.data.total;
      });
    },
    goVideo(video) {
      this.$router.push({ name: "showvideo", params: { videoID: video.id } });
    },
    updatevideo(video) {
      this.$router.push({ name: "updatevideo", params: { videoID: video.id } });
    }
  },
  components: {},
  beforeMount() {
    this.load();
  }
};
</script>

<style lang="sass" scoped>

.q-card
  width: 100%
  max-width: 450px
  margin-top: 10px
</style>
