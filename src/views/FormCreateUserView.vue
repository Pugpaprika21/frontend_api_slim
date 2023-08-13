<script setup>
import { ref, onMounted, defineProps } from "vue";
import axios from "axios";

const props = defineProps({
  apiFetchUsers: Promise,
});

const host = "http://localhost:8080";
const token = "79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

const username = ref("");
const userEmail = ref("");
const rememberMe = ref(false);
const profileFileInput = ref(null);
const profileFile = ref(null);

const handleFileChange = () => {
  const selectedFile = profileFileInput.value.files[0];
  if (selectedFile) {
    profileFile.value = selectedFile;
    console.log(selectedFile);
  }
};

const submitFormCreateUser = async () => {
  const fd = new FormData();
  fd.append("username", username.value);
  fd.append("email", userEmail.value);
  fd.append("rememberMe", rememberMe.value);
  fd.append("profileFile", profileFile.value);
  fd.append("token", token);

  if (username.value == "") {
    username.value = "";
    return;
  }
  if (userEmail.value == "") {
    userEmail.value = "";
    return;
  }

  const url = `${host}/api/createUser`;
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const resp = await axios.post(url, fd, { headers });
  console.log(resp.data);
  if (resp.data.status) {
    username.value = "";
    userEmail.value = "";
    rememberMe.value = null;
    profileFile.value = null;
    await props.apiFetchUsers;
  }
};
</script>

<template>
  <form @submit.prevent="submitFormCreateUser" enctype="multipart/form-data">
    <div class="mb-3">
      <label for="user-name" class="form-label">ชื่อผู้ใช้</label>
      <input
        type="text"
        class="form-control"
        id="user-name"
        aria-describedby="emailHelp"
        v-model="username"
      />
    </div>
    <div class="mb-3">
      <label for="user-email" class="form-label">email</label>
      <input
        type="text"
        class="form-control"
        id="user-email"
        v-model="userEmail"
      />
    </div>

    <div class="mb-3">
      <label for="formFile" class="form-label">profile</label>
      <input
        class="form-control"
        type="file"
        id="formFile"
        ref="profileFileInput"
        accept="image/*"
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
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-sm btn-primary w-100 btn-create-user">
      บันทึก
    </button>
  </form>
</template>

<style scoped>
.btn-create-user {
  border-color: aqua;
  color: rgb(255, 255, 255);
  background-color: rgb(43, 162, 183);
}
</style>