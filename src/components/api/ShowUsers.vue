<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ShowUsersView from "../../views/ShowUsersView.vue";

const host = "http://localhost:8080";
const token ="79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

const getUsers = async () => {
  try {
    const response = await axios.get(`${host}/api/users/${token}`);
    if (response.data.rows > 0) {
      return response.data.data;
    }
    return 0;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createUser = async () => {};
const users = ref([]);

onMounted(async () => {
  users.value = await getUsers();
});
</script>

<template>
  <div>
    <h1>Show Users</h1>
    <ShowUsersView :users="users" />
  </div>
</template>
