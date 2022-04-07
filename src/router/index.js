import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Collection from "../views/Collection.vue";
import Artist from "../views/Artist.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Rijks Online Museum",
        metaTags: [
          {
            name: "description",
            content: "Digital museum...",
          },
        ],
      },
    },
    {
      path: "/collection/:id",
      name: "Collection",
      component: Collection,
      meta: {
        title: "Collection - Rijks Online Museum",
        metaTags: [
          {
            name: "description",
            content: "Digital museum...",
          },
        ],
      },
    },
    {
      path: "/artist/:id",
      name: "Artist",
      component: Artist,
      meta: {
        title: "Artist - Rijks Online Museum",
        metaTags: [
          {
            name: "description",
            content: "Digital museum...",
          },
        ],
      },
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
      meta: {
        title: "Search - Rijks Online Museum",
        metaTags: [
          {
            name: "description",
            content: "Digital museum...",
          },
        ],
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  //Metadata//
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
