<template>
  <div>
    Hello World!
  </div>
  <button @click="logout()">Log Out</button>
</template>

<script setup lang="ts">
import router from '@/app/router';
import { useAuthStore } from '@/app/store/auth';
import { signOut } from '@/shared/api/supabase/auth/auth';

const authStore = useAuthStore();

const logout = async () => {
  authStore.clearUser();
  await signOut();
  router.push('/login');
}
</script>

<style lang="scss" scoped>

</style>