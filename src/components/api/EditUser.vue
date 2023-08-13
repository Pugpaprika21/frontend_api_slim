<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const userId = route.params.id;
const host = "http://localhost:8080";
const token = "79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

const username = ref("");
const userEmail = ref("");
const userStatus = ref("");
const userProfile = ref("");

const editUser = async () => {
  const resp = await axios.get(`${host}/api/editUser/${userId}`, {
    params: {
      token: token,
    },
  });

  if (resp.data.status) {
    const user = resp.data.data[0];
    username.value = user.user_name;
    userEmail.value = user.user_email;
    userStatus.value = user.user_status;
    userProfile.value = user.user_profile;

    console.log(`user`, userProfile.value);
  }
  return [];
};

onMounted(() => {
  editUser();
});
</script>

<template>
  <p>{{ username }}</p>
  <p>{{ userEmail }}</p>
  <p>{{ userStatus }}</p>
  <p>{{ userProfile }}</p>
</template>