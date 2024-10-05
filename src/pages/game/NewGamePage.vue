<template>
  <div class="w-full h-screen flex justify-center">
    <div class="w-8/12">
      <Tabs default-value="definition" class="relative top-1/4">
        <TabsList>
          <TabsTrigger value="definition">
            Definition
          </TabsTrigger>
          <TabsTrigger value="synonyms">
            Synonyms
          </TabsTrigger>
          <TabsTrigger value="antonyms">
            Antonyms
          </TabsTrigger>
        </TabsList>
        <TabsContent value="definition">
          <h1 class="text-3xl">{{ word }}</h1>
          <DefinitionText v-for="def in definitions" :definition="def" :special-words="specialWords" @word-clicked="onWordClicked" />
        </TabsContent>
        <TabsContent value="synonyms">
          <h1 class="text-3xl">{{ word }}</h1>
          <WordContainer :words="synonyms" @word-clicked="onWordClicked" />
        </TabsContent>
        <TabsContent value="antonyms">
          <h1 class="text-3xl">{{ word }}</h1>
          <WordContainer :words="antonyms" @word-clicked="onWordClicked" />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/shared/shadcn/components/ui/tabs/Tabs.vue';
import TabsContent from '@/shared/shadcn/components/ui/tabs/TabsContent.vue';
import TabsList from '@/shared/shadcn/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/shared/shadcn/components/ui/tabs/TabsTrigger.vue';
import { TDefinition } from '@/shared/types/word';
import DefinitionText from '@/widgets/game/DefinitionText.vue';
import WordContainer from '@/widgets/game/WordContainer.vue';
import { onMounted, ref } from 'vue';

const word = ref<string>("take");

const definitions = ref<TDefinition[]>([
  {
    type: 'n',
    content: 'a scene or sequence of sound or vision photographed or recorded continuously at one time.'
  },
  {
    type: 'v',
    content: "lay hold of (something) with one's hands; reach for and hold."
  },
  {
    type: 'v',
    content: 'remove (someone or something) from a particular place'
  }
]);

const synonyms = ref<string[]>(['catch', 'gate', 'booty']);

const antonyms = ref<string[]>(['debt', 'loss', 'payment']);

const specialWords = ref<string[]>([
  'sequence',
  'particular',
  'photographed'
]);

onMounted(() => {
  // initializing stuff
});

const onWordClicked = (word: string) => {
  // TODO: fetch new word and update all related data
  console.log(word);
}
</script>

<style lang="scss" scoped>

</style>