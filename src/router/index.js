import { createRouter, createWebHistory } from "vue-router";
import ShowUsers from "../components/api/ShowUsers.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "show",
            component: ShowUsers,
        },
        /*   {
              path: "/show",
              name: "show",
              component: ShowUsers,
          }, */
    ],
});

export default router;