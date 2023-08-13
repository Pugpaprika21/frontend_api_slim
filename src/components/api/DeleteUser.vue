<script setup>
import axios from "axios";
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  userId: Number,
  fetchUsers: Promise,
});

const host = "http://localhost:8080";
const token = "79f5b6d5e8c3280e5db1d5bda60c46232b2c858bf3dd060b0cc065a83f394b27";

async function deleteUser(id) {
  const resp = await axios.delete(`${host}/api/deleteUser/${id}`, {
    params: {
      token: token
    }
  });

  if (resp.data.status) {
    props.fetchUsers;
  }
}

</script>

<template>
  <button class="button btn-delete" @click="deleteUser(props.userId)">
    ลบ
  </button>
</template>

<style scoped>
.btn-delete {
  background-color: #9c0734;
  border: none;
  color: white;
  padding: 5px 10px 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.btn-delete:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>