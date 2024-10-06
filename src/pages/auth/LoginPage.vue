<template>
  <div
    class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <a
      href="/sign-up"
      :class="
        cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )
      ">
      Sign Up
    </a>
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
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
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Log into your account
          </h1>
        </div>
        <LoginAuthForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buttonVariants } from "@/shared/shadcn/components/ui/button";
import { cn } from "@/shared/shadcn/lib/utils";
import LoginAuthForm from "@/widgets/auth/LoginAuthForm.vue";
import { Ref, ref } from "vue";
import { words } from "@/shared/constants/words";

type WordDefinition = {
  word: string;
  definitions: string[];
};

type Quote = {
  text: string;
  author: string;
};

// Learning quotes
const quotes: Ref<Quote[]> = ref([
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
]);
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 180px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-item {
  opacity: 0;
  position: absolute;
  font-size: 1.5rem;
  animation: scrollAnimation 5s ease-in-out forwards;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Apply a delay to each scroll item based on its order */
.scroll-item:nth-child(1) {
  animation-delay: 0s;
}

.scroll-item:nth-child(2) {
  animation-delay: 5s; /* Adjust the timing for smooth transitions */
}

.scroll-item:nth-child(3) {
  animation-delay: 10s;
}

.scroll-item:nth-child(4) {
  animation-delay: 15s;
}

.scroll-item:nth-child(5) {
  animation-delay: 20s;
}

/* Scroll-up and fade-out keyframes */
@keyframes scrollAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px); /* Start slightly below */
  }
  10% {
    opacity: 1;
    transform: translateY(0); /* Fade in and move to original position */
  }
  70% {
    opacity: 1;
    transform: translateY(0); /* Stay fully visible */
  }
  90% {
    opacity: 0;
    transform: translateY(-20px); /* Fade out and move up */
  }
  100% {
    opacity: 0;
    transform: translateY(-20px); /* Ensure it stays moved up */
  }
}
</style>
