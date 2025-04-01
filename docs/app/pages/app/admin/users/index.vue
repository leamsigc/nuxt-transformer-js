<script setup lang="ts">
import type { User } from '~~/db/schema';

import { generateColumns } from '~/components/table/columns'
import type { UiSkeleton } from '#build/components';

const userColumns = [

  { key: 'image', header: 'Image', sortable: false, filterable: false },
  { key: 'id', header: 'User ID', sortable: false, filterable: false },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'banned', header: 'Banned', sortable: false, filterable: false },
]


const columns = generateColumns(userColumns, {
  selectable: true,
  actions: {
    menuItems: [
      {
        label: 'Impersonate User',
        action: (user) => HandleImpersonateUser(user),
        isVisible: () => true
      },
      {
        label: 'Edit User',
        action: (user) => HandleOpenEditUser(user),
        isVisible: (user) => true
      },
      {
        label: 'Delete User',
        action: (user) => HandleDeleteUser(user),
        isVisible: () => true
      }
    ]
  }
})

const {
  users,
  isLoading,
  fetchUsers,
  deleteUser,
  impersonateUser
} = useUserManagement()


const activeUser = ref<User | null>(null)
const { openEditUser, openDeleteUser, openAddUser } = useUser();

const HandleDeleteUser = (user: User) => {
  activeUser.value = user;
  openDeleteUser();
}
const HandleDeleteUserConfirm = async () => {
  if (activeUser.value) {
    await deleteUser(activeUser.value.id);
    activeUser.value = null;
    await fetchUsers();
  }
}
const HandleOpenEditUser = (user: User) => {
  openEditUser(user);
}

const HandleImpersonateUser = (user: User) => {
  impersonateUser(user.id);
}
fetchUsers()
</script>

<template>
  <div class="w-full mx-auto p-4">
    <UiCard v-if="!isLoading">
      <UiCardHeader>
        <UiCardTitle>Users</UiCardTitle>
        <UiCardDescription class="flex justify-between">
          <div>
            Manage users and their roles
          </div>
          <UiButton variant="outline" @click="openAddUser">Add User</UiButton>
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <DataTable :data="users" :columns />
      </UiCardContent>
    </UiCard>
    <TableLoading v-else />

    <DeleteUser v-if="activeUser" :userId="activeUser.id" :username="activeUser.name"
      @delete-user="HandleDeleteUserConfirm" />
    <UpdateUser @refresh="fetchUsers" />
    <CreateUser @refresh="fetchUsers" />
  </div>
</template>