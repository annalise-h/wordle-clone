import allowedGuesses from "./allowedGuesses";

export const isAValidGuess = (guess) => {
  return allowedGuesses.includes(guess.toLowerCase());
};

export const guessEqualsWordle = (guess, wordle) => {
  return guess.toLowerCase() === wordle;
};

export const assignTileProximities = (tiles, wordle) => {
  const tilesWithProximities = [...tiles];

  const guessCharArray = tilesWithProximities.reduce(
    (acc, tileObj) => acc.concat(tileObj.character),
    []
  );
  const wordleCharArray = wordle.split("");

  wordleCharArray.forEach((char, index) => {
    // for each character in the wordle, check it against our guess characters array
    if (guessCharArray.includes(char)) {
      // if a character in the wordle is in our guess
      // we first want to assign proximity where there is an index match
      if (guessCharArray[index] === char) {
        tilesWithProximities[index].guessProximity = "good";
      }
      // if there is no index match, that guess character is close
      // we also check to make sure the proximity has not been assigned as "good"
      else {
        const matchedTile = tilesWithProximities.find((tile) => {
          return tile.character === char && !tile.guessProximity;
        });
        if (matchedTile && !matchedTile.guessProximity)
          matchedTile.guessProximity = "close";
      }
    }
  });

  // at this point all our "close" and "good" guesses should have proximities
  // now we just assign "bad" to the remaining guesses
  tilesWithProximities.map((tile) => {
    if (!tile.guessProximity) tile.guessProximity = "bad";
    return tile;
  });

  return tilesWithProximities;
};
