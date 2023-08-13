<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import ShowUsersView from "../../views/ShowUsersView.vue";
import FormCreateUserView from "../../views/FormCreateUserView.vue";

const route = useRoute();

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

// const username = ref("");
// const userEmail = ref("");
// const rememberMe = ref(false);
// const profileFile = ref(null);

// const handleFileChange = (event) => {
//   profileFile.value = event.target.files[0];
// };

// const submitFormCreateUser = async () => {
//   const fd = new FormData();
//   fd.append("username", username.value);
//   fd.append("email", userEmail.value);
//   fd.append("rememberMe", rememberMe.value);
//   fd.append("profileFile", profileFile.value);
//   fd.append("token", token);

//   if (username.value == "") {
//     username.value = "";
//     return;
//   }
//   if (userEmail.value == "") {
//     userEmail.value = "";
//     return;
//   }

//   const url = `${host}/api/createUser`;
//   const headers = {
//     "Content-Type": "multipart/form-data",
//   };

//   const resp = await axios.post(url, fd, { headers });
//   if (resp.data.status) {
//     fetchUsers();
//     username.value = "";
//     userEmail.value = "";
//     profileFile.value = null;
//   }
// };

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

