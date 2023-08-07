import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShowUsersView from "../views/ShowUsersView.vue";
import ShowUsers from "../components/api/ShowUsers.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/show",
            name: "show",
            component: ShowUsers,
        },
    ],
});

export default router;