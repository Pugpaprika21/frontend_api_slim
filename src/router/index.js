import { createRouter, createWebHistory } from "vue-router";
import ShowUsers from "../components/api/ShowUsers.vue";
import EditUser from "../components/api/EditUser.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "show",
            component: ShowUsers,
        },
        {
            path: "/edit/:id",
            name: "edit",
            component: EditUser,
        },
    ],
});

export default router;