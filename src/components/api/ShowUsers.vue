<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import ShowUsersView from "../../views/ShowUsersView.vue";

const route = useRoute();

const host = "http://localhost:8080";
const token =
  "79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

const perPage = 10;
const currentPage = ref(1);
const users = ref([]);
const totalPages = ref(1);

const url = `${host}/api/users/${token}`;

const getUsers = async () => {
  try {
    const resp = await axios.get(url);
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

const username = ref("");
const userEmail = ref("");
const rememberMe = ref(false);
const profileFile = ref(null);

const handleFileChange = (event) => {
  profileFile.value = event.target.files[0];
};

const submitForm = async () => {
  const fd = new FormData();
  fd.append("username", username.value);
  fd.append("email", userEmail.value);
  fd.append("rememberMe", rememberMe.value);
  fd.append("profileFile", profileFile.value);
  fd.append("token", token);

  const url = `${host}/api/createUser`;
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const resp = await axios.post(url, fd, { headers });
  console.log(resp);
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
        />
      </div>
      <div class="col-md-4">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="user-name" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="user-name"
              aria-describedby="emailHelp"
              v-model="username"
            />
          </div>
          <div class="mb-3">
            <label for="user-email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="user-email"
              v-model="userEmail"
            />
          </div>

          <div class="mb-3">
            <label for="formFile" class="form-label">Profile</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              ref="profileFile"
              @change="handleFileChange"
            />
          </div>

          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="rememberMe"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.showUsersTable {
  margin-top: 20px;
}
</style>

