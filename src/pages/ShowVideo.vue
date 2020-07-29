<template>
  <div>
    <h5>{{ video.label }}</h5>
    <div>
      <h8>创建于{{ video.date | formatDate }}</h8>
      · {{ video.views }}观赏
      <q-btn flat @click="updatevideo(video)">
        <q-icon name="post_add"></q-icon>
        <div>编辑视频</div>
      </q-btn>
    </div>
    <q-spacer></q-spacer>
    <q-media-player
      type="video"
      background-color="black"
      :muted="muted"
      radius="1rem"
      :autoplay="false"
      :show-big-play-button="true"
      :sources="video.sources"
      :poster="video.poster"
      @ended="onEnded"
    >
      <template v-if="overlay" v-slot:overlay>
        <div>
          <img src style="width: 30vw; max-width: 50px; opacity: 0.25;" />
        </div>
      </template>
    </q-media-player>
  </div>
</template>

<script>
import * as API from "../api/video/";

export default {
  data() {
    return {
      video: {
        label: "",
        poster: "",
        date: "",
        views: "",
        sources: [
          {
            src: "",
          },
        ],
      },
    };
  },
  filters: {
    formatDate: function (value) {
      //10位时间戳转换
      let date = new Date(parseInt(value) * 1000);
      let m = date.getMonth() + 1;
      let y = date.getFullYear();
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "年" + m + "月" + d + "日 ";
    },
  },
  methods: {
    load() {
      API.getVideo(this.$route.params.videoID).then((res) => {
        this.video.label = res.data.title;
        this.video.poster = res.data.avatar;
        this.video.views = res.data.view;
        this.video.date = res.data.created_at;
        this.video.sources[0].src = res.data.url;
      });
    },
    updatevideo() {
      this.$router.push({
        name: "updatevideo",
        params: { videoID: this.$route.params.videoID },
      });
    },
  },

  beforeMount() {
    this.load();
  },
};
</script>
