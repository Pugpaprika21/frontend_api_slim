<script setup>
import { defineProps } from "vue";

const props = defineProps({
  users: Array,
});
</script>

<template>
  <div class="showUsers">
    <table class="table table-bordered" id="showUsers">
      <thead>
        <tr>
          <td>#</td>
          <td>user_name</td>
          <td>user_pass</td>
          <td>user_phone</td>
          <td>user_status</td>
          <td>user_email</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.user_id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.user_pass }}</td>
          <td>{{ user.user_phone }}</td>
          <td>{{ user.user_status }}</td>
          <td>{{ user.user_email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#showUsers {
  text-align: center;
  margin-top: 20px;
}
</style>

