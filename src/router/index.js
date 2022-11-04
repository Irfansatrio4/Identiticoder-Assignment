import Vue from "vue";
import Router from "vue-router";
import Level1Page from "../components/Level1Page.vue";
import Level2Page from "../components/Level2Page.vue";
import DetailAlbumPage from "../components/DetailAlbumPage.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Level1Page",
    component: Level1Page,
  },
  {
    path: "/albums-posts/:userId",
    name: "Level2Page",
    component: Level2Page,
    props: true,
  },
  {
    path: "/albums-posts/:userId/albumPhotos/:albumId",
    name: "DetailAlbumPage",
    component: DetailAlbumPage,
  },
];

const router = new Router({
  mode: "history",
  routes,
});

export default router;
