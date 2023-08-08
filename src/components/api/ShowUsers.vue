<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ShowUsersView from "../../views/ShowUsersView.vue";

const host = "http://localhost:8080";
const token = "79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

const perPage = 10;
const currentPage = 1;

const getUsers = async () => {
  try {
    const resp = await axios.get(`${host}/api/users/${token}`);
    if (resp.data.rows > 0) {
      console.log(resp.data.data);
      return resp.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const totalPages = async () => {
  const usersData = await getUsers();
  return Math.ceil(usersData.length / perPage);
};

const paginatedUsers = () => {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  //return users.slice(start, end);
};

const users = ref([]);

onMounted(async () => {
  console.log(totalPages);
  users.value = await getUsers();
});
</script>

<template>
  <div class="row">
    <div class="col-6 col-md-8">
      <ShowUsersView :users="users" />
    </div>
  </div>
</template>


