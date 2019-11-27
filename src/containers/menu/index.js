import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, ItemSelector } from '../../components';
import { getCategories } from '../../wordbank/index';
import { Game, Letter, NameContainer, Name, Version } from './style';

const SeedSelector = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 1em;
  color: var(--yellow);
`;

const Input = styled.input.attrs(props => ({
  type: 'text',
}))`
  text-align: center;
  background: transparent;
  border: 0;
  border-radius: 0;
  outline: 0;
  color: #fff;
  font-family: 'Bungee', cursive;
  border-bottom: 1px solid #fff;
  padding: 5px 10px;
  font-size: 1.25em;
  opacity: 1;
`;

export default ({ onPlay }) => {
  const [category, setCategory] = useState('random');
  const [seed, setSeed] = useState(Date.now());
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
      <div>
        <ItemSelector title="category" items={categories} onChange={c => setCategory(c)}></ItemSelector>
        <SeedSelector>
          <Title>Seed</Title>
          <Input value={seed} onChange={e => setSeed(e.target.value)} />
        </SeedSelector>
      </div>
      <Button onClick={() => onPlay(category, seed)}>Play</Button>
      <Version>V 1.0</Version>
    </Game>
  );
};
