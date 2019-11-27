import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, ItemSelector, Input as StyledInput } from '../../components';
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

const Input = styled(StyledInput).attrs(props => ({
  type: 'text',
}))``;

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
