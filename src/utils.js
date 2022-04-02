import allowedGuesses from "./allowedGuesses";

export const isAValidGuess = (guess) => {
  console.log(guess);
  console.log(allowedGuesses.includes(guess));
  return allowedGuesses.includes(guess);
};

export const guessEqualsWordle = (guess, wordle) => {
  return guess === wordle;
};
