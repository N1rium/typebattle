import React, { useState, useEffect } from 'react';
import Gloot from 'gloot-xr-sdk';
import ThemeWrapper from './theme-wrapper';
import Home from './containers/home';
import Menu from './containers/menu';

import 'babel-polyfill';

export default () => {
  const [gameState, setGameState] = useState('menu');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    console.log(Gloot);
    Gloot.onPlayMatch = () => play('dishes');
  }, []);

  const play = category => {
    setCategory(category);
    setGameState('game');
  };

  return (
    <ThemeWrapper>
      {gameState === 'menu' && <Menu onPlay={category => play(category)} />}
      {gameState === 'game' && <Home onGoBack={() => setGameState('menu')} category={category} />}
    </ThemeWrapper>
  );
};
