<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ShowUsersView from "../../views/ShowUsersView.vue";
import FormCreateUserView from "../../views/FormCreateUserView.vue";

const host = "http://localhost:8080";
const token = "79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

const perPage = 8;
const currentPage = ref(1);
const users = ref([]);
const totalPages = ref(1);

const getUsers = async () => {
  try {
    const resp = await axios.get(`${host}/api/users/${token}`);
    //console.log(resp.data);
    if (resp.data.rows > 0) {
      return resp.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchUsers = async () => {
  users.value = await getUsers();
  totalPages.value = Math.ceil(users.value.length / perPage);
};


onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="showUsersTable">
    <div class="row">
      <div class="col-md-8">
        <ShowUsersView
          :users="users"
          :current-page="currentPage"
          :total-pages="totalPages"
          :per-page="perPage"
          :fetch-users="fetchUsers()"
        />
      </div>
      <div class="col-md-4">
        <FormCreateUserView
          :api-fetch-users="fetchUsers()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.showUsersTable {
  margin-top: 20px;
}
</style>

