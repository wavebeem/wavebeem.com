const titles = {
  "2019-09-28-king-slime-big.webp": "King Slime",
  "2020-01-23-human-and-cat.webp": "Human & Cat",
  "2020-02-02-slimeagotchi.webp": "Slime-a-Gotchi",
  "2020-04-07-self-portrait-cat-mouth.webp": "Self Portrait",
  "2020-04-10-hiyoko.webp": "Hiyoko",
  "2020-06-07-tangy.webp": "Tangy",
  "2020-06-13-creacher.webp": "Creacher",
  "2020-06-13-slime-love.webp": "Slime Love",
  "2020-06-14-teeny-sanguini.webp": "Teeny Sanguini",
  "2020-06-16-cruelcumber.webp": "Cruelcumber",
  "2020-09-11-self-portrait-shirt.webp": "Self Portrait",
  "2020-09-21-hifumi-new-game.webp": "Hifumi (New Game)",
  "2021-01-29-flamingo-2bit.webp": "Flamingo (2-bit)",
  "2021-01-31-robin-2bit.webp": "Robin (2-bit)",
  "2021-02-09-mad-jigglypuff.webp": "Jigglypuff",
  "2021-02-10-self-portrait-small.webp": "Self Portrait",
  "2021-02-15-black-oystercatcher-2bit.webp": "Black Oystercatcher (2-bit)",
  "2021-02-26-raichu.webp": "Raichu",
  "2021-03-11-happy-tooth.webp": "Happy Tooth",
  "2021-03-29-american-goldfinch-2bit.webp": "American Goldfinch (2-bit)",
  "2021-04-08-hunter-smile.webp": "Hunter Smile",
  "2021-04-26-self-portrait-refined.webp": "Self Portrait",
  "2021-09-04-ghost.webp": "Ghost",
  "2021-12-26-self-portrait.webp": "Self Portrait",
  "2022-05-18-purple-sharks.webp": "Purple Sharks",
  "2022-09-26-self-portrait.webp": "Self Portrait",
  "2023-02-15-sneki-snek.webp": "Sneki Snek",
  "2023-02-15-tower-slime.webp": "Tower Slime",
  "2023-05-08-cacodemon.webp": "Cacodemon",
  "2023-07-12-quac.webp": "Quac",
  "2024-04-02-orc-awooga.webp": "Orc Awooga",
  "2024-05-20-bassman.webp": "Bassman",
  "2024-06-28-elephant.webp": "Elephant",
  "2025-01-01-le-chat-noir.webp": "Le Chat Noir",
  "2025-03-29-raichu-sitting.webp": "Raichu Sitting",
  "2025-04-13-dedenne.webp": "Dedenne",
};

export const images = Object.entries(titles).map(([filename, title]) => {
  const date = filename.slice(0, "yyyy-mm-dd".length);
  const path = `img/${filename}`;
  return { path, filename, title, date };
});
