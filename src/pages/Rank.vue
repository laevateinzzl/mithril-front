<template>
  <div class="column">
    <div class="col" v-for="(r, index) in rank" :key="index">
      <q-card style="height: 150px">
        <div class="row">
          <div class="col-1">
            <h3>{{ index + 1 }}</h3>
          </div>
          <div class="col-2">
            <q-img :src="r.avatar" @click="jumpTovideo(r.id)"></q-img>
          </div>
          <div class="col">
            <h4>{{ r.title }}</h4>
          </div>
          <div class="col-2">
            <h6>{{ r.view + "观看" }}</h6>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rank: []
    };
  },

  methods: {
    getRank() {
      this.$axios.get("/api/v1/rank/daily").then(res => {
        this.rank = res.data.data;
      });
    },
    jumpTovideo(id) {
      this.$router.push({ name: "showvideo", params: { videoID: id } });
    }
  },
  components: {},
  beforeMount() {
    this.getRank();
  }
};
</script>

<style lang="sass" scoped></style>
