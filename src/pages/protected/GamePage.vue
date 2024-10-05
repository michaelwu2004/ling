<template>
  <div
    class="flex flex-col space-y-4 h-screen w-screen justify-center items-center bg-gray-900">
    <div class="w-full max-w-md p-4">
      <!-- Home Button -->
      <Button class="mb-4">Home</Button>

      <!-- Source and Target Words -->
      <Card class="bg-black text-white p-6 mb-4">
        <CardHeader class="font-bold text-2xl mb-2">
          <CardTitle>Word Navigation Game</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <!-- Display the current word -->
            <h3 class="text-xl font-semibold">
              Current Word: {{ currentWord }}
            </h3>

            <div>Definition: {{ currentDefinition[0] }}</div>

            <div>
              <p v-for="(word, index) in currentGoodWords" :key="index">
                Good Word {{ index + 1 }}: {{ word }}
              </p>
            </div>

            <!-- Display the target word -->
            <p class="mt-2">Target Word: {{ targetWord }}</p>

            <!-- Display move count -->
            <p class="mt-2">Moves Remaining: {{ movesRemaining }}</p>

            <!-- Check if the game is won -->
            <p v-if="gameWon" class="mt-2 text-green-500">
              You've reached the target word!
            </p>
            <p
              v-if="movesRemaining === 0 && !gameWon"
              class="mt-2 text-red-500">
              Out of moves! Game Over!
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Synonyms and Antonyms to Navigate -->
      <div class="flex flex-row space-x-4">
        <!-- Synonyms Card -->
        <Card class="bg-black text-white flex-1 p-4">
          <CardHeader class="font-bold text-xl mb-4">
            <CardTitle>Synonyms</CardTitle>
          </CardHeader>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="(synonym, index) in currentSynonyms"
              :key="index"
              class="inline-block bg-blue-500 text-white px-3 py-2 rounded-full"
              @click="makeMove(synonym)">
              {{ synonym }}
            </Button>
          </div>
        </Card>

        <!-- Antonyms Card -->
        <Card class="bg-black text-white flex-1 p-4">
          <CardHeader class="font-bold text-xl mb-4">
            <CardTitle>Antonyms</CardTitle>
          </CardHeader>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="(antonym, index) in currentAntonyms"
              :key="index"
              class="inline-block bg-red-500 text-white px-3 py-2 rounded-full"
              @click="makeMove(antonym)">
              {{ antonym }}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Button } from "@/shared/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import CardContent from "@/shared/shadcn/components/ui/card/CardContent.vue";
import { syllable } from "syllable";
import { fetchWordDetails, findValidStartingWord } from "@/shared/api/words";

// Game state variables
const currentWord = ref("");
const targetWord = ref("");
const movesRemaining = ref(5); // Limit moves to 5
const gameWon = ref(false);
const currentDefinition = ref<string[]>([]);
const currentSynonyms = ref<string[]>([]);
const currentAntonyms = ref<string[]>([]);
const currentGoodWords = ref<string[]>([]);

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

// Graphical representation of the words
const graph: Graph = {};
const leafNodes: string[] = [];

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
function retrieveLeafNodes(word: string, visited: Set<string>, type: string) {
  // Mark the current word as visited
  if (visited.has(word)) {
    return;
  }

  const currNode = graph[word];
  visited.add(word); // Mark the word as visited before further recursion

  // console.log(word);

  if (!currNode) {
    console.error(
      `Node for word "${word}" "${type}" does not exist in the graph`
    );
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
  currentWord.value = await findValidStartingWord(); // Find a valid starting word with at least 2 synonyms and 2 antonyms
  await constructGraph(currentWord.value, 4);
  currentDefinition.value = graph[currentWord.value].definitions;
  console.log(currentDefinition.value);
  const visited = new Set<string>();
  retrieveLeafNodes(currentWord.value, visited, "curr");
  const randomIndex = Math.floor(Math.random() * leafNodes.length);
  targetWord.value = leafNodes[randomIndex];
  currentGoodWords.value = graph[currentWord.value].goodWords;
  currentAntonyms.value = graph[currentWord.value].antonyms;
  currentSynonyms.value = graph[currentWord.value].synonyms;
  console.log(currentAntonyms, currentSynonyms);
}

// Handle user moves
async function makeMove(newWord: string) {
  if (movesRemaining.value > 0 && !gameWon.value) {
    currentWord.value = newWord;
    movesRemaining.value--;

    // If the user has reached the target word
    if (currentWord.value === targetWord.value) {
      gameWon.value = true;
    } else {
      // Update synonyms and antonyms for the new word
      const { synonyms, antonyms } = await fetchWordDetails(currentWord.value);
      currentDefinition.value = graph[currentWord.value].definitions;
      currentGoodWords.value = graph[currentWord.value].goodWords;
      currentSynonyms.value = synonyms;
      currentAntonyms.value = antonyms;
    }
  }
}

// Initialize the game when the component mounts
onMounted(() => {
  initializeGame();
});
</script>

<style lang="scss" scoped></style>
