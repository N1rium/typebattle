import React, { useState, useEffect, useRef } from 'react';
import { Button, ItemSelector } from '../../components';
import { getCategories } from '../../wordbank/index';
import { Game, Letter, NameContainer, Name, Version } from './style';

export default ({ onPlay }) => {
  const [category, setCategory] = useState('random');
  const categories = getCategories();
  const targetWord = 'Type Battle';
  const colors = ['var(--red)', 'var(--green)', 'var(--blue)', 'var(--yellow)'];
  const [title, setTitle] = useState([]);
  const titleRef = useRef(title);

  useEffect(() => {
    const titleBuilder = setInterval(() => {
      const newLetter = targetWord.charAt(titleRef.current.length);
      setTitle([...titleRef.current, newLetter]);
      titleRef.current = [...titleRef.current, newLetter];
      if (titleRef.current.length >= targetWord.length) {
        clearInterval(titleBuilder);
      }
    }, 100);

    return () => {
      clearInterval(titleBuilder);
    };
  }, []);

  return (
    <Game>
      <NameContainer>
        <Name>
          {title.map((letter, i) => (
            <Letter key={i} style={{ color: `${colors[i % colors.length]}` }}>
              {letter}
            </Letter>
          ))}
        </Name>
      </NameContainer>
      <ItemSelector title="category" items={categories} onChange={c => setCategory(c)}></ItemSelector>
      <Button onClick={() => onPlay(category)}>Play</Button>
      <Version>V 1.0</Version>
    </Game>
  );
};
