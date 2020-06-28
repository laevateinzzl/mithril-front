<template>
  <div>
    <q-btn to="/postvideo">
      <q-icon name="post_add"></q-icon>
      <div>视频投稿</div></q-btn
    >
    <div>
      <q-avatar square size="100px">
        <img :src="Avatar">
      </q-avatar>
    </div>
    <dvi>
      {{ userInfo.Account}}
    </dvi>
  </div>
</template>

<script>
  import * as API from "../api/user/";

  export default {
  data(){
    return {
      Avatar: "",
      CreateDate: "",
      userInfo: {
        UID: "",
        Account: "",
        Username: "",
        Status: "",
        Gender: "",
        Birthday: "",
        Phone: "",
        Adders: ""
      }
    };
  },
  filters: {
    formatDate: function(value) {
      //10位时间戳转换
      let date = new Date(parseInt(value) * 1000);
      let m = date.getMonth() + 1;
      let y = date.getFullYear();
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "年" + m + "月" + d + "日 ";
    }
  },
  methods: {
    Getuserinfo() {
      API.userInfo.then(res => {
        this.userInfo.Account = res.data.account;
        this.userInfo.Username = res.data.username;
        this.userInfo.UID = res.data.id;
        this.userInfo.Status = res.data.status;
        this.CreateDate = res.data.created_at;
        this.userInfo.Phone = res.data.phone;
        this.userInfo.Birthday = res.data.birthday;
        this.userInfo.Adders = res.data.adders;
        this.Avatar = res.data.avatar;
      });
    },
  },
beforeMount() {
    this.Getuserinfo()
  }
};
</script>

<style lang="sass" scoped></style>
