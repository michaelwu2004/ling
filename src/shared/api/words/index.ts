/**
 * Fetch a random word from the Random Word API
 * @returns String object from Random Word API response
 */
export async function fetchRandomWord() {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    if (!response.ok) {
      throw new Error(`Error fetching random word: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Checking " + data[0]);
    return data[0];
  } catch (error) {
    // console.error("Error fetching random word:", error);
    return "";
  }
}

/**
 * Fetches synonyms and antonyms for a given word.
 * @param word The word to find synonyms and antonyms for.
 * @returns Object with synonyms and antonyms arrays.
 */
export async function fetchWordDetails(word: string) {
  try {
    const synonymParams = new URLSearchParams({ rel_syn: word, max: "5" });
    const antonymParams = new URLSearchParams({ rel_ant: word, max: "5" });
    const definitionsParams = new URLSearchParams({ sp: word, md: "d" });

    const [synonymResponse, antonymResponse, definitionsResponse] =
      await Promise.all([
        fetch(`https://api.datamuse.com/words?${synonymParams.toString()}`),
        fetch(`https://api.datamuse.com/words?${antonymParams.toString()}`),
        fetch(`https://api.datamuse.com/words?${definitionsParams.toString()}`),
      ]);

    const synonymsData = await synonymResponse.json();
    const antonymsData = await antonymResponse.json();
    const definitionsData = await definitionsResponse.json();

    // console.log(definitionsData, word);

    return {
      synonyms: synonymsData.map((item: any) => item.word),
      antonyms: antonymsData.map((item: any) => item.word),
      definitions:
        definitionsData.length != 0 ? definitionsData[0]["defs"] : [],
    };
  } catch (error) {
    // console.error("Error fetching word details:", error);
    return { synonyms: [], antonyms: [], definitions: [] };
  }
}

/**
 * Finds a random word that has at least 2 synonyms and 2 antonyms.
 * @returns A word that satisfies the condition.
 */
export async function findValidStartingWord(): Promise<string> {
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
