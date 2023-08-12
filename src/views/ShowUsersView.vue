<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  users: Array,
  currentPage: Number,
  totalPages: Number,
  perPage: Number,
});

const currentPage = ref(props.currentPage);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * props.perPage;
  const end = start + props.perPage;
  return props.users.slice(start, end);
});

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
  }
};
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
        <tr v-for="(user, index) in paginatedUsers" :key="user.user_id">
          <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.user_pass }}</td>
          <td>{{ user.user_phone }}</td>
          <td>{{ user.user_status }}</td>
          <td>{{ user.user_email }}</td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="changePage(currentPage - 1)">Previous</a>
        </li>
        <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item" :class="{ active: pageNumber === currentPage }">
          <a class="page-link" @click="changePage(pageNumber)">{{ pageNumber }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="changePage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>