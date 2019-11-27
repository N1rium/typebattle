import React, { useState, useEffect } from 'react';
import Gloot from 'gloot-xr-sdk';
import ThemeWrapper from './theme-wrapper';
import Home from './containers/home';
import Menu from './containers/menu';

import 'babel-polyfill';

export default () => {
  const [gameState, setGameState] = useState('menu');
  const [category, setCategory] = useState('all');
  const [seed, setSeed] = useState('');

  useEffect(() => {
    Gloot.onPlayMatch = () => play('dishes');
  }, []);

  const play = (category, seed) => {
    setCategory(category);
    setSeed(seed.toString().toLowerCase());
    setGameState('game');
  };

  return (
    <ThemeWrapper>
      {gameState === 'menu' && <Menu onPlay={(category, seed) => play(category, seed)} />}
      {gameState === 'game' && <Home onGoBack={() => setGameState('menu')} category={category} seed={seed} />}
    </ThemeWrapper>
  );
};
