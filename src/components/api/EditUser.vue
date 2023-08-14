<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { setValueFileInput } from "@/utils/helpers";

const route = useRoute();
const router = useRouter();

const userId = route.params.id;
const host = "http://localhost:8080";
const token =
  "79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

const username = ref("");
const userEmail = ref("");
const userStatus = ref("");
const userProfile = ref("");
const userfullProfile = ref("");
const userInputFile = ref(null);
const rememberMe = ref(false);

const editUser = async () => {
  try {
    const resp = await axios.get(`${host}/api/editUser/${userId}`, {
      params: {
        token: token,
      },
    });

    if (resp.data.status) {
      const user = resp.data.data;
      username.value = user.user_name;
      userEmail.value = user.user_email;
      userStatus.value = user.user_status;
      userProfile.value = user.user_profile;
      userfullProfile.value = user.user_image_path;
      userInputFile.value.files = setValueFileInput(userProfile.value);
    }
  } catch (error) {
    console.log(error);
  }
};

const submitUpdateUser = async () => {
  const fd = new FormData();
  fd.append("userId", userId);
  fd.append("username", username.value);
  fd.append("userEmail", userEmail.value);
  fd.append("userProfile", userInputFile.value.files[0]);
  fd.append("token", token);

  const url = `${host}/api/updateUser`;
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  try {
    const resp = await axios.post(url, fd, { headers });
    if (resp.data.status) {
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  editUser();
});
</script>

<template>
  <div class="editUser mt-4">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="submitUpdateUser" enctype="multipart/form-data">
          <img :src="userfullProfile" class="profile-image" alt="" srcset="" />
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
              accept="image/*"
              ref="userInputFile"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              ref="rememberMe"
            />
            <label class="form-check-label" for="exampleCheck1">สถานะ</label>
          </div>
          <button
            type="submit"
            class="btn btn-sm btn-primary w-100 btn-create-user"
          >
            บันทึก
          </button>
        </form>
      </div>
      <div class="col-md-8"></div>
    </div>
  </div>
</template>

<style scoped>
.profile-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
</style>