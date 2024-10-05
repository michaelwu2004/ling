<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            v-model:model-value="email"
            :disabled="isLoading"
          />
          <Label class="sr-only" for="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="password123"
            type="password"
            auto-complete="password"
            auto-capitalize="none"
            auto-correct="off"
            v-model:model-value="password"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Login In
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@/shared/shadcn/lib/utils';

import { LoaderCircle } from 'lucide-vue-next';
import { useAuthStore } from '@/app/store/auth';
import { signInWithEmailAndPasword } from '@/shared/api/supabase/auth/auth';
import router from '@/app/router';
import { getUserWithId } from '@/shared/api/supabase/auth/user';

const authStore = useAuthStore();

const isLoading = ref(false);

const email = ref<string>("");
const password = ref<string>("");

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  try {
    const { session, user } = await signInWithEmailAndPasword(email.value, password.value);

    if (session) {
      authStore.setSession(session);
      authStore.setUser(user);
      authStore.setAdditionalUserInfo(await getUserWithId(user.id));

      router.push('/');
    }
  } catch (e) {
    alert("Invalid credentials!");
  }

  isLoading.value = false;
}
</script>

<style lang="scss" scoped>

</style>