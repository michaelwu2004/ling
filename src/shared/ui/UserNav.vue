<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="relative h-8 w-8 rounded-full border">
          <AvatarRoot class="h-8 w-8 flex justify-center items-center">
            <AvatarImage src="@/shared/assets/vue.svg" />
            <AvatarFallback>{{ getInitials }}</AvatarFallback>
          </AvatarRoot>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel class="font-normal flex">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ getUsername }}
            </p>
            <p class="text-xs leading-none text-muted-foreground">
              {{ getEmail }}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="cursor-pointer" @click="logout">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from "radix-vue";
import Button from "../shadcn/components/ui/button/Button.vue";
import DropdownMenu from "../shadcn/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuContent from "../shadcn/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuTrigger from "../shadcn/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuLabel from "../shadcn/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "../shadcn/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuItem from "../shadcn/components/ui/dropdown-menu/DropdownMenuItem.vue";
import { useAuthStore } from "@/app/store/auth";
import { computed } from "vue";
import { signOut } from "../api/supabase/auth/auth";
import router from "@/app/router";

const authStore = useAuthStore();

const getUsername = computed(() => {
  return `${authStore.getAdditionalUserInfo?.username}`;
});

const getEmail = computed(() => {
  return `${authStore.getAdditionalUserInfo?.email}`;
});

const getInitials = computed(() => {
  const username = authStore.getAdditionalUserInfo?.username;
  if (!username) return "M";
  return username?.length > 0 ? `${username[0]}` : "M";
});

const logout = async () => {
  authStore.clearUser();
  await signOut();
  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
