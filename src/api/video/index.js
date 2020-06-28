import axios from "axios";

// 创建视频
const postVideo = (form) =>
  axios.post("/api/v1/videos", form).then((res) => res.data);

// 读视频详情
const getVideo = (id) =>
  axios.get(`/api/v1/video/${id}`).then((res) => res.data);

// 读取视频列表
const getVideos = (start, limit) =>
  axios
    .get("/api/v1/videos", {
      params: {
        start,
        limit,
      },
    })
    .then((res) => res.data);

//删除视频
const deleteVideo = (id) =>
  axios.delete(`/api/v1/video/${id}`).then((res) => res.date);

//更新视频信息
const updateVideo = (form) =>
  axios.put(`/api/v1/video/${form.id}`, form).then((res) => res.data);

const rank = axios.get("/api/v1/rank/daily").then((res) => res.data);

export { getVideos, getVideo, postVideo, deleteVideo, updateVideo, rank };
