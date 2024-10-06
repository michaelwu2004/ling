<template>
  <div
    class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <a
      href="/login"
      :class="
        cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )
      ">
      Log In
    </a>
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        Ling
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;Question everything. Learn something. Answer nothing&rdquo;
          </p>
          <footer class="text-sm">Euripedes</footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Create New Account
          </h1>
        </div>
        <SignUpAuthForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buttonVariants } from "@/shared/shadcn/components/ui/button";
import { cn } from "@/shared/shadcn/lib/utils";
import SignUpAuthForm from "@/widgets/auth/SignUpAuthForm.vue";
</script>

<style lang="scss" scoped></style>
