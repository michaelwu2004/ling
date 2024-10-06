<template>
  <div class="w-full h-screen flex justify-center">
    <div class="w-8/12">
      
      <!-- Card for Target Word -->
      <!-- <div class="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Target Word Info</h2>
        <p class="text-gray-600 font-bold">
          Target Word: <span class="text-blue-600">{{ targetWord }}</span>
        </p>
      </div> -->

      <Button variant="destructive" class="absolute bottom-8 left-8" @click="goHome">
        End Game
      </Button>
      <div class="flex items-center justify-between mt-10">
        <Goal class="size-6 align-middle" />
        <h2 class="text-3xl font-bold tracking-tight text-center">
          {{ getTargetWord }}
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" @click="goBack" :disabled="wordStack.length <= 0">
                <Undo class="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go back to last word</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <!-- Tabs Section for Source Word -->
      <Tabs default-value="definition" class="relative mt-2">
        <TabsList>
          <TabsTrigger value="definition"> Definition </TabsTrigger>
          <TabsTrigger value="synonyms"> Synonyms </TabsTrigger>
          <TabsTrigger value="antonyms"> Antonyms </TabsTrigger>
        </TabsList>
        <TabsContent value="definition">
          <h1 class="text-3xl">{{ getCurrentWord }}</h1>
          <DefinitionText
            v-for="def in definitions"
            :key="def.content"
            :definition="def"
            :special-words="specialWords"
            @word-clicked="onWordClicked" />
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
import Tabs from "@/shared/shadcn/components/ui/tabs/Tabs.vue";
import TabsContent from "@/shared/shadcn/components/ui/tabs/TabsContent.vue";
import TabsList from "@/shared/shadcn/components/ui/tabs/TabsList.vue";
import TabsTrigger from "@/shared/shadcn/components/ui/tabs/TabsTrigger.vue";
import { TDefinition } from "@/shared/types/word";
import DefinitionText from "@/widgets/game/DefinitionText.vue";
import WordContainer from "@/widgets/game/WordContainer.vue";
import { computed, onMounted, ref } from "vue";
import { syllable } from "syllable";
import Button from "@/shared/shadcn/components/ui/button/Button.vue";
import { fetchWordDetails, findValidStartingWord } from "@/shared/api/words";
import router from "@/app/router";
import { Undo, Goal } from 'lucide-vue-next';
import TooltipProvider from "@/shared/shadcn/components/ui/tooltip/TooltipProvider.vue";
import Tooltip from "@/shared/shadcn/components/ui/tooltip/Tooltip.vue";

interface Node {
  word: string;
  definitions: string[];
  goodWords: string[];
  synonyms: string[];
  antonyms: string[];
}

interface Graph {
  [key: string]: Node;
}

const wordStack: string[] = [];

const graph: Graph = {};
const leafNodes: string[] = [];

const word = ref<string>("");
const targetWord = ref("");
const gameWon = ref(false);

const definitions = ref<TDefinition[]>([]);
const synonyms = ref<string[]>([]);
const antonyms = ref<string[]>([]);

const specialWords = ref<string[]>([]);

const goBack = () => {
  if (wordStack.length > 0) {
    word.value = wordStack.pop()!;
    console.log(word.value);
    definitions.value = stringArrToTDefinition(graph[word.value].definitions);
    specialWords.value = graph[word.value].goodWords;
    synonyms.value = graph[word.value].synonyms;
    antonyms.value = graph[word.value].antonyms;
  }
}

function filterAZCharacters(input: string): string {
  return input.split('').filter(char => 
        (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
    ).join('');
}

const getCurrentWord = computed(() => {
  return filterAZCharacters(word.value);
});

const getTargetWord = computed(() => {
  return filterAZCharacters(targetWord.value);
});

function stringArrToTDefinition(arr: string[]): TDefinition[] {
  const res: TDefinition[] = [];
  for (const word of arr) {
    const type = word.split("\t")[0];
    const resType =
      type === "n" ? "n" : type === "v" ? "v" : type === "a" ? "a" : "adv";
    const tdefWord: TDefinition = {
      type: resType,
      content: word.split("\t")[1],
    };
    res.push(tdefWord);
  }
  return res;
}

async function constructGraph(word: string, depth: number) {
  try {
    // Return if max depth is reached or word already in the graph
    if (graph[word]) return;
    // Fetch synonyms and antonyms
    const { synonyms, antonyms, definitions } = await fetchWordDetails(word);
    const goodWords = [];

    // Find "good" words to sample from definition
    const syllableCounts: [number, string][] = [];

    // Process each definition
    for (const definition of definitions) {
      // Slice everything after the first occurrence of '\t' only
      const cleanedDefinition = definition.split("\t")[1] || definition;

      // Split cleaned definition into individual words by spaces
      const words = cleanedDefinition.split(/\s+/);

      for (const word of words) {
        if (word.length > 1) {
          // Exclude single-character words if needed
          const syllables = syllable(word.toLowerCase()); // Convert word to lowercase
          syllableCounts.push([syllables, word]);
        }
      }
    }

    // Sort by syllable count (ascending)
    syllableCounts.sort((a, b) => b[0] - a[0]);

    // Push the first 3 "good" words based on sorted syllables
    for (let i = 0; i < Math.min(3, syllableCounts.length); i++) {
      goodWords.push(syllableCounts[i][1]); // Push the word (second element of tuple)
      // console.log(goodWords);
    }

    // Add the word to the graph
    graph[word] = {
      word: word,
      goodWords: goodWords,
      definitions: definitions || [],
      antonyms: antonyms || [],
      synonyms: synonyms || [],
    };

    if (depth === 0) {
      graph[word] = {
        word: word,
        definitions: definitions,
        goodWords: [],
        antonyms: [],
        synonyms: [],
      };
      return;
    }

    for (const goodWord of goodWords) {
      if (!(goodWord in graph)) {
        await constructGraph(goodWord, depth - 1);
      }
    }

    // Recursively add antonyms and synonyms to the graph
    for (const antonym of antonyms) {
      if (!(antonym in graph)) {
        await constructGraph(antonym, depth - 1);
      }
    }

    for (const synonym of synonyms) {
      if (!(synonym in graph)) {
        await constructGraph(synonym, depth - 1);
      }
    }
  } catch (error) {}
}

/**
 * Fills up the leafNodes array with all the leaf nodes generated
 * from the start word
 * @param word The start word to find the leaf nodes of
 * @param visited A set tracking the words we have seen already
 */
function retrieveLeafNodes(word: string, visited: Set<string>, _type: string) {
  // Mark the current word as visited
  if (visited.has(word)) {
    return;
  }

  const currNode = graph[word];
  visited.add(word); // Mark the word as visited before further recursion

  // console.log(word);

  if (!currNode) {
    // console.error(
    //   `Node for word "${word}" "${type}" does not exist in the graph`
    // );
    return;
  }

  if (currNode.synonyms.length === 0 && currNode.antonyms.length === 0) {
    leafNodes.push(word);
    return;
  }

  for (const antonym of currNode.antonyms) {
    if (!visited.has(antonym)) {
      retrieveLeafNodes(antonym, visited, "antonym");
    }
  }

  for (const synonym of currNode.synonyms) {
    if (!visited.has(synonym)) {
      retrieveLeafNodes(synonym, visited, "synonym");
    }
  }

  for (const goodWord of currNode.goodWords) {
    if (!visited.has(goodWord)) {
      retrieveLeafNodes(goodWord, visited, "goodWord");
    }
  }
}

// Initialize the game with source word and target leaf node word
async function initializeGame() {
  word.value = await findValidStartingWord(); // Find a valid starting word with at least 2 synonyms and 2 antonyms
  await constructGraph(word.value, 4);
  definitions.value = stringArrToTDefinition(graph[word.value].definitions);
  // console.log(graph[word.value].definitions, definitions.value);
  const visited = new Set<string>();
  retrieveLeafNodes(word.value, visited, "curr");
  const randomIndex = Math.floor(Math.random() * leafNodes.length);
  targetWord.value = leafNodes[randomIndex];
  specialWords.value = graph[word.value].goodWords;
  antonyms.value = graph[word.value].antonyms;
  synonyms.value = graph[word.value].synonyms;
  // console.log(antonyms.value, synonyms.value);
}

// Handle user moves
async function onWordClicked(newWord: string) {
  wordStack.push(word.value);
  word.value = newWord;
  // console.log(graph[word.value].goodWords);
  // If the user has reached the target word
  if (word.value === targetWord.value) {
    gameWon.value = true;
  } else {
    // Update synonyms and antonyms for the new word
    // const { synonyms, antonyms } = await fetchWordDetails(word.value);
    definitions.value = stringArrToTDefinition(graph[word.value].definitions);
    // console.log(graph[word.value].goodWords);
    specialWords.value = graph[word.value].goodWords;
    synonyms.value = graph[word.value].synonyms;
    antonyms.value = graph[word.value].antonyms;
  }
}

function goHome() {
  router.push("/");
}

onMounted(async () => {
  // initializing stuff
  await initializeGame();
  const { synonyms, antonyms } = await fetchWordDetails(word.value);
  definitions.value = stringArrToTDefinition(graph[word.value].definitions);

  // console.log(graph[word.value].goodWords);

  specialWords.value = graph[word.value].goodWords;
  synonyms.value = synonyms;
  antonyms.value = antonyms;
});
</script>

<style lang="scss" scoped></style>
