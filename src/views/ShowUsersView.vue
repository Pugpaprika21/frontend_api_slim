<script setup>
import { ref, computed, defineProps } from "vue";
import DeleteUser from "../components/api/DeleteUser.vue";

const props = defineProps({
  users: Array,
  currentPage: Number,
  totalPages: Number,
  perPage: Number,
  fetchUsers: Promise,
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
  <div class="showUsers text-center">
    <div class="table-responsive">
      <table class="table table-bordered" id="showUsers">
        <thead>
          <tr>
            <td>#</td>
            <td>ชื่อผู้ใช้</td>
            <td>email</td>
            <td>สถานะ</td>
            <td>profile</td>
            <td>จัดการ</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="user.user_id">
            <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td>{{ user.user_name }}</td>
            <td>{{ user.user_email }}</td>
            <td>{{ user.user_status ? "ใช้งาน" : "ไม่ใช้งาน" }}</td>
            <td>
              <img
                v-if="user.user_profile"
                :src="user.user_profile"
                class="profile-image"
                alt="User Profile"
              />
            </td>
            <td>
              <button class="button btn-edit">เเก้ไข</button>
              &nbsp;
              <DeleteUser
                :user-id="user.user_id"
                :fetch-users="props.fetchUsers"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="changePage(currentPage - 1)">ก่อนหน้า</a>
        </li>
        <li
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page-item"
          :class="{ active: pageNumber === currentPage }"
        >
          <a class="page-link" @click="changePage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="changePage(currentPage + 1)">ต่อไป</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.btn-edit {
  background-color: #a8ac1b; /* Green */
  border: none;
  color: white;
  padding: 5px 10px 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.btn-delete {
  background-color: #9c0734; /* Green */
  border: none;
  color: white;
  padding: 5px 10px 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.btn-edit:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

thead td {
  color: rgb(255, 255, 255);
  background-color: rgb(43, 162, 183);
}

.profile-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%; /* กำหนดให้รูปเป็นวงกลม */
}
</style>