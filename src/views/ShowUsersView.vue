<template>
  <div>
    <h2>Users List</h2>
    <ul>
      <li v-for="user in users" :key="user.user_id">{{ user.user_name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  users: Array,
});
</script>
