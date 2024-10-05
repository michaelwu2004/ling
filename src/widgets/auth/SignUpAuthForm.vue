<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="username">
            Username
          </Label>
          <Input
            id="username"
            placeholder="mu dong"
            type="text"
            auto-capitalize="none"
            auto-correct="off"
            v-model:model-value="username"
            :disabled="isLoading"
          />
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
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            v-model:model-value="password"
            :disabled="isLoading"
          />
          <Label class="sr-only" for="password-confirm">
            Password Again
          </Label>
          <Input
            id="password-confirm"
            placeholder="password123 (again)"
            type="password"
            auto-complete="password"
            auto-capitalize="none"
            auto-correct="off"
            v-model:model-value="passwordConfirm"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Sign Up
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@/shared/shadcn/lib/utils';

import { LoaderCircle } from 'lucide-vue-next';
import { signUpWithEmailAndPassword } from '@/shared/api/supabase/auth/auth';
import { useAuthStore } from '@/app/store/auth';
import router from '@/app/router';
import { createUserWithEmail } from '@/shared/api/supabase/auth/user';

const authStore = useAuthStore();

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const passwordConfirm = ref<string>("");

const isLoading = ref(false);

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  try {
    if (username.value.length <= 0 || email.value.length <= 0) throw Error("Missing form field");
    if (password.value.length < 6) throw new Error("Password needs to be at least 6 characters");
    if (password.value !== passwordConfirm.value) throw new Error("Passwords do not match");

    const { session, user } = await signUpWithEmailAndPassword(email.value, password.value);
    await createUserWithEmail(username.value, user!.email!, user);
    
    authStore.setSession(session);
    authStore.setUser(user);
    authStore.setAdditionalUserInfo({ email: email.value, username: username.value });
    
    router.push('/');
  } catch (e: any) {
    console.log(e);
    alert("Failed to create user!");
  }
  
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
</style>