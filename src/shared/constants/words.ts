import { Ref, ref } from "vue";

type WordDefinition = {
  word: string;
  definitions: string[];
};

export const words: Ref<WordDefinition[]> = ref([
  {
    word: "Serendipity",
    definitions: [
      "The occurrence of events by chance in a happy or beneficial way.",
      "The faculty of making fortunate discoveries by accident.",
    ],
  },
  {
    word: "Ephemeral",
    definitions: [
      "Lasting for a very short time.",
      "Transient, fleeting, like a momentary breath of wind.",
    ],
  },
  {
    word: "Petrichor",
    definitions: [
      "The pleasant, earthy smell after rain.",
      "The aroma produced when rain falls on dry soil, a poetic scent of nature.",
    ],
  },
  {
    word: "Euphoria",
    definitions: [
      "A feeling of intense happiness and excitement.",
      "An overwhelming sense of well-being.",
    ],
  },
  {
    word: "Ling",
    definitions: ["A platform to build up your vocabulary"],
  },
  {
    word: "Quintessence",
    definitions: [
      "The most perfect or typical example of a quality or class.",
      "The aspect of something regarded as the intrinsic and central constituent of its character.",
    ],
  },
  {
    word: "Limerence",
    definitions: [
      "The state of being infatuated or obsessed with another person.",
      "Intense romantic desire characterized by obsessive thoughts and compulsive behaviors.",
    ],
  },
  {
    word: "Luminescence",
    definitions: [
      "Light produced by chemical, electrical, or physiological means without combustion.",
      "The emission of light by a substance not resulting from heat.",
    ],
  },
  {
    word: "Ethereal",
    definitions: [
      "Extremely delicate and light in a way that seems not of this world.",
      "Heavenly or celestial in nature.",
    ],
  },
  {
    word: "Ineffable",
    definitions: [
      "Too great or extreme to be expressed or described in words.",
      "Indescribable or inexpressible.",
    ],
  },
  {
    word: "Languid",
    definitions: [
      "Displaying or having a disinclination for physical exertion or effort; slow and relaxed.",
      "Weak or faint from illness or fatigue.",
    ],
  },
  {
    word: "Sonorous",
    definitions: [
      "Imposingly deep and full.",
      "Capable of producing a deep or ringing sound.",
    ],
  },
  {
    word: "Solitude",
    definitions: [
      "The state or situation of being alone.",
      "A peaceful isolation from others.",
    ],
  },
  {
    word: "Resilience",
    definitions: [
      "The capacity to recover quickly from difficulties; toughness.",
      "The ability of a substance or object to spring back into shape; elasticity.",
    ],
  },
  {
    word: "Tranquility",
    definitions: [
      "The quality or state of being calm and peaceful.",
      "A quiet and calm condition without disturbance.",
    ],
  },
  {
    word: "Inevitability",
    definitions: [
      "The quality of being certain to happen; unavoidable.",
      "An outcome that cannot be prevented.",
    ],
  },
  {
    word: "Eloquent",
    definitions: [
      "Fluent or persuasive in speaking or writing.",
      "Expressive and articulate, especially in a moving or effective way.",
    ],
  },
  {
    word: "Mellifluous",
    definitions: [
      "Sweet or musical; pleasant to hear.",
      "Having a smooth, rich flow of sound.",
    ],
  },
  {
    word: "Nostalgia",
    definitions: [
      "A sentimental longing or wistful affection for the past.",
      "A feeling of yearning for a period or place with happy personal associations.",
    ],
  },
  {
    word: "Opulent",
    definitions: [
      "Ostentatiously rich and luxurious or lavish.",
      "Affluent; having abundant means.",
    ],
  },
  {
    word: "Paradox",
    definitions: [
      "A statement that contradicts itself but might be true.",
      "A situation, person, or thing that combines contradictory features or qualities.",
    ],
  },
  {
    word: "Sanguine",
    definitions: [
      "Optimistic or positive, especially in an apparently bad situation.",
      "Blood-red in color.",
    ],
  },
  {
    word: "Zenith",
    definitions: [
      "The time at which something is most powerful or successful.",
      "The highest point reached by a celestial or other object.",
    ],
  },
  {
    word: "Labyrinth",
    definitions: [
      "A complicated network of winding passages; a maze.",
      "A complex or intricate arrangement.",
    ],
  },
  {
    word: "Luminous",
    definitions: [
      "Full of or shedding light; bright or shining, especially in the dark.",
      "Emitting or reflecting light, especially in the dark.",
    ],
  },
  {
    word: "Epiphany",
    definitions: [
      "A moment of sudden and great revelation or realization.",
      "A manifestation of a divine or supernatural being.",
    ],
  },
  {
    word: "Halcyon",
    definitions: [
      "Denoting a period of time in the past that was idyllically happy and peaceful.",
      "A mythical bird said to breed in a nest floating at sea at the winter solstice.",
    ],
  },
  {
    word: "Juxtaposition",
    definitions: [
      "The fact of two things being seen or placed close together with contrasting effect.",
      "An act or instance of placing close together for contrasting effect.",
    ],
  },
  {
    word: "Kaleidoscope",
    definitions: [
      "A constantly changing pattern or sequence of elements.",
      "An optical instrument with two or more reflecting surfaces tilted to each other at an angle, so that objects on one end of the mirrors are seen as a regular symmetrical pattern when viewed from the other end.",
    ],
  },
  {
    word: "Nebulous",
    definitions: [
      "In the form of a cloud or haze; hazy.",
      "Unclear, vague, or ill-defined.",
    ],
  },
  {
    word: "Obfuscate",
    definitions: [
      "Render obscure, unclear, or unintelligible.",
      "Confuse or bewilder someone.",
    ],
  },
  {
    word: "Panacea",
    definitions: [
      "A solution or remedy for all difficulties or diseases.",
      "A universal cure or solution.",
    ],
  },
  {
    word: "Quixotic",
    definitions: [
      "Exceedingly idealistic; unrealistic and impractical.",
      "Impulsive and often rashly unpredictable.",
    ],
  },
  {
    word: "Rhapsody",
    definitions: [
      "An effusively enthusiastic or ecstatic expression of feeling.",
      "A piece of music that is episodic yet integrated, free-flowing in structure, featuring a range of highly contrasting moods, color, and tonality.",
    ],
  },
  {
    word: "Sagacity",
    definitions: [
      "The quality of being sagacious; wise.",
      "Keen mental discernment and good judgment.",
    ],
  },
  {
    word: "Tangential",
    definitions: [
      "Relating to or along a tangent; diverging from the main point.",
      "Having only a slight relevance to the matter at hand.",
    ],
  },
  {
    word: "Ubiquitous",
    definitions: [
      "Present, appearing, or found everywhere.",
      "Existing or being everywhere, especially at the same time.",
    ],
  },
  {
    word: "Veneration",
    definitions: [
      "Great respect; reverence.",
      "The act of venerating or showing great respect for something or someone.",
    ],
  },
  {
    word: "Wistful",
    definitions: [
      "Having or showing a feeling of vague or regretful longing.",
      "Full of melancholy yearning or nostalgia.",
    ],
  },
  {
    word: "Xenophile",
    definitions: [
      "A person who is attracted to foreign peoples, cultures, or customs.",
      "Someone who loves or prefers foreign things or people.",
    ],
  },
  {
    word: "Yonder",
    definitions: [
      "At some distance in the direction indicated; over there.",
      "In or to that place.",
    ],
  },
  {
    word: "Zephyr",
    definitions: ["A soft gentle breeze.", "A mild, west wind."],
  },
  {
    word: "Ambivalent",
    definitions: [
      "Having mixed feelings or contradictory ideas about something or someone.",
      "Indecisive or unable to choose between two (usually opposing) courses of action.",
    ],
  },
  {
    word: "Benevolent",
    definitions: [
      "Well meaning and kindly.",
      "Serving a charitable rather than a profit-making purpose.",
    ],
  },
  {
    word: "Cacophony",
    definitions: [
      "A harsh, discordant mixture of sounds.",
      "An unpleasantly noisy combination of sounds.",
    ],
  },
  {
    word: "Diligent",
    definitions: [
      "Having or showing care and conscientiousness in one's work or duties.",
      "Persistent in effort; hardworking.",
    ],
  },
]);
