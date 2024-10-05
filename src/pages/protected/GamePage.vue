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

// Game state variables
const currentWord = ref("");
const targetWord = ref("");
const movesRemaining = ref(5); // Limit moves to 5
const gameWon = ref(false);
const currentSynonyms = ref<string[]>([]);
const currentAntonyms = ref<string[]>([]);

interface Node {
  word: string;
  synonyms: string[];
  antonyms: string[];
}

interface Graph {
  [key: string]: Node;
}

// Graphical representation of the words
const graph: Graph = {};
const leafNodes: string[] = [];

/**
 * Fetch a random word from the Random Word API
 * @returns String object from Random Word API response
 */
async function fetchRandomWord() {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    if (!response.ok) {
      throw new Error(`Error fetching random word: ${response.status}`);
    }

    const data = await response.json();
    console.log("Checking " + data[0]);
    return data[0];
  } catch (error) {
    console.error("Error fetching random word:", error);
    return "";
  }
}

/**
 * Fetches synonyms and antonyms for a given word.
 * @param word The word to find synonyms and antonyms for.
 * @returns Object with synonyms and antonyms arrays.
 */
async function fetchWordDetails(word: string) {
  try {
    const synonymParams = new URLSearchParams({ rel_syn: word, max: "5" });
    const antonymParams = new URLSearchParams({ rel_ant: word, max: "5" });

    const [synonymResponse, antonymResponse] = await Promise.all([
      fetch(`https://api.datamuse.com/words?${synonymParams.toString()}`),
      fetch(`https://api.datamuse.com/words?${antonymParams.toString()}`),
    ]);

    const synonymsData = await synonymResponse.json();
    const antonymsData = await antonymResponse.json();

    return {
      synonyms: synonymsData.map((item: any) => item.word),
      antonyms: antonymsData.map((item: any) => item.word),
    };
  } catch (error) {
    console.error("Error fetching word details:", error);
    return { synonyms: [], antonyms: [] };
  }
}

async function constructGraph(word: string, depth: number) {
  try {
    // Return if max depth is reached or word already in the graph
    if (graph[word]) return;
    if (depth === 0) {
      graph[word] = { word: word, antonyms: [], synonyms: [] };
      return;
    }
    // Fetch synonyms and antonyms
    const { synonyms, antonyms } = await fetchWordDetails(word);

    // Add the word to the graph
    graph[word] = {
      word: word,
      antonyms: antonyms || [],
      synonyms: synonyms || [],
    };

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
 * Finds a random word that has at least 2 synonyms and 2 antonyms.
 * @returns A word that satisfies the condition.
 */
async function findValidStartingWord(): Promise<string> {
  let validWordFound = false;
  let randomWord = "";

  while (!validWordFound) {
    randomWord = await fetchRandomWord();
    const { synonyms, antonyms } = await fetchWordDetails(randomWord);

    // Check if the word has at least 2 synonyms and 2 antonyms
    if (synonyms.length + antonyms.length >= 2) {
      validWordFound = true;
    }
  }

  return randomWord;
}

/**
 * Fills up the leafNodes array with all the leaf nodes generated
 * from the start word
 * @param word The start word to find the leaf nodes of
 * @param visited A set tracking the words we have seen already
 */
function retrieveLeafNodes(word: string, visited: Set<string>) {
  // Mark the current word as visited
  if (visited.has(word)) {
    return;
  }

  const currNode = graph[word];
  visited.add(word); // Mark the word as visited before further recursion

  // console.log(word);

  if (!currNode) {
    console.error(`Node for word "${word}" does not exist in the graph`);
    return;
  }

  if (currNode.synonyms.length === 0 && currNode.antonyms.length === 0) {
    leafNodes.push(word);
    return;
  }

  for (const antonym of currNode.antonyms) {
    if (!visited.has(antonym)) {
      retrieveLeafNodes(antonym, visited);
    }
  }

  for (const synonym of currNode.synonyms) {
    if (!visited.has(synonym)) {
      retrieveLeafNodes(synonym, visited);
    }
  }
}

// Initialize the game with source word and target leaf node word
async function initializeGame() {
  currentWord.value = await findValidStartingWord(); // Find a valid starting word with at least 2 synonyms and 2 antonyms
  await constructGraph(currentWord.value, 5);
  const visited = new Set<string>();
  retrieveLeafNodes(currentWord.value, visited);
  const randomIndex = Math.floor(Math.random() * leafNodes.length);
  targetWord.value = leafNodes[randomIndex];
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
