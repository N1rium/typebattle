import seedrandom from 'seedrandom';
import animals from './animals';
import dishes from './dishes';
import movies from './movies';
import names from './names';
import videogames from './videogames';

let rng = new seedrandom('Gordon Freeman');
const allWords = [...animals, ...dishes, ...movies, ...names, ...videogames];

const map = {
  random: allWords,
  animals,
  dishes,
  movies,
  names,
  videogames,
};

export const getCategories = () => Object.keys(map);

export const getWordSequence = (category = 'random', length = 50, random = null) => {
  if (random) {
    console.warn('rng', random);
    rng = new seedrandom(random);
  }
  return shuffle(category === 'random' ? [...allWords] : map[category])
    .slice(0, length)
    .map(w => w.toLowerCase());
};

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default map;
