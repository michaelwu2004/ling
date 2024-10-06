<template>
  <Navbar> </Navbar>

  <div class="w-full h-full space-y-4 px-5 mt-5">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Play Ling</CardTitle>
        </CardHeader>
        <CardContent class="flex justify-between">
          <Button
            class="bg-emerald-600 hover:bg-emerald-700"
            @click="() => playGame()"
            >Play Game</Button
          >
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/app/router";
import { Button } from "@/shared/shadcn/components/ui/button";
import Card from "@/shared/shadcn/components/ui/card/Card.vue";
import CardContent from "@/shared/shadcn/components/ui/card/CardContent.vue";
import CardDescription from "@/shared/shadcn/components/ui/card/CardDescription.vue";
import CardHeader from "@/shared/shadcn/components/ui/card/CardHeader.vue";
import CardTitle from "@/shared/shadcn/components/ui/card/CardTitle.vue";
import Navbar from "@/shared/ui/Navbar.vue";

const playGame = () => {
  // Placeholder for game logic
  // message.value = "Game Started! Have fun!";
  // You can replace this with actual game initiation code

  router.push("/new-game");
};
</script>

<style lang="scss" scoped>
/* Container spans the entire viewport with padding for spacing at edges */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Full viewport height */
  padding: 2rem; /* Space at the edges */
  background-color: #f0f4f8; /* Light background color */
}

/* Card with rounded edges, shadow, and padding */
.card {
  background-color: #ffffff; /* White background */
  padding: 2rem;
  border-radius: 1rem; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  max-width: 400px; /* Maximum width */
  width: 100%; /* Full width within max-width */
  text-align: center; /* Centered text */
}

/* Title styling */
.title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333333; /* Darker text color */
}

/* Logout button styling */
.logout-button {
  background-color: #4f46e5; /* Indigo background */
  color: #ffffff; /* White text */
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem; /* Rounded corners */
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Logout button hover effect */
.logout-button:hover {
  background-color: #4338ca; /* Darker indigo on hover */
}

/* Error message styling */
.error-message {
  color: #dc2626; /* Red color for errors */
  margin-top: 1rem;
  font-size: 0.875rem;
}
</style>
