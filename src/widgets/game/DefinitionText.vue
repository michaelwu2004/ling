<template>
  <div class="flex items-center justify-start">
    <div class="italic">{{ type }}</div>
    <div class="ml-2">
      <span v-for="(word, index) in content" :key="index">
        <template v-if="specialWords.includes(word)">
          <span
            class="text-red-500 hover:underline hover:underline-offset-4 cursor-pointer"
            @click="onWordClick(word)"
          >
            {{ word }}
          </span>
        </template>
        <template v-else>
          {{ word }}
        </template>
        <span v-if="index !== content.length - 1">{{ ' ' }}</span> <!-- Adds a space between words -->
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TDefinition } from '@/shared/types/word';
import { computed } from 'vue';

const props = defineProps<{
  definition: TDefinition,
  specialWords: string[]
}>();

const emit = defineEmits<{
  (event: 'wordClicked', word: string): void;
}>();

const type = computed(() => {
  switch (props.definition.type) {
    case 'n':
      return 'n.';
    case 'v':
      return 'v.';
    case 'a':
      return 'a.';
    case 'adv':
      return 'adv.';
    default:
      return 'Unknown';
  }
});

const content = computed(() => {
  return props.definition.content.split(' ');
});


const onWordClick = (word: string) => {
  emit('wordClicked', word);
};
</script>

<style lang="scss" scoped>

</style>