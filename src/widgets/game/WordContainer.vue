<template>
  <div class="w-full flex space-x-2 mt-2">
    <div class="border rounded w-fit px-2 py-1 text-slate-400 cursor-pointer hover:text-black hover:border-black transition-colors" v-for="word in words" @click="() => wordClicked(word)">{{ word }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  words: string[]
}>();

const emit = defineEmits<{
  (event: 'wordClicked', word: string): void;
}>();

const wordClicked = (word: string) => {
  emit('wordClicked', word);
}

</script>

<style lang="scss" scoped>

</style>