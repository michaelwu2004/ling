<template>
  <nav class="w-full hidden flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <h2 class="text-2xl tracking-tight w-fit text-nowrap">
          Ling
        </h2>
        <slot></slot>
        <div class="ml-auto flex items-center justify-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

</style>