import React, { useState, useEffect } from 'react';
import Gloot from 'gloot-xr-sdk';
import { getWordSequence } from '../../wordbank/index';
import { Button, Radial } from '../../components';
import { Container, ButtonContainer, WordContainer, Word, Remainder, Input, Score } from './style';

export default ({ category, seed, onGoBack }) => {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);
  const [typedWord, setTypedWord] = useState('');
  const [progress, setProgress] = useState('');
  const [remainder, setRemainder] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [radialOptions, setRadialOptions] = useState({ progress: 100, timing: 0 });

  const timeout = 1000 * 30;

  const setup = () => {
    setGameOver(false);
    setScore(0);
    setRadialOptions({ progress: 100, timing: 0 });
    setStartTime(null);
    const wordSequence = getWordSequence(category, 50, seed);
    setWords(wordSequence);
    setWord(wordSequence[0]);
    setTypedWord('');
    setTimeout(() => document.getElementById('input').focus(), 1);
  };

  useEffect(() => {
    setup();
  }, []);

  const tryAgain = () => {
    setup();
  };

  const reportResult = () => {
    Gloot.reportScore(score, score.toString());
  };

  useEffect(() => {
    if (!word) {
      return;
    }

    let p = '';
    for (let i = 0; i < typedWord.length; i++) {
      const char = typedWord.charAt(i);
      if (word.charAt(i) === char) {
        p += char;
      } else break;
    }

    let r = word.replace(p, '');
    setProgress(p);
    setRemainder(r);

    if (word === typedWord) {
      setScore(score + 1);
      setTypedWord('');
      setWord(words[(score + 1) % words.length]);
      return;
    }
  }, [typedWord, word]);

  const onInputChange = e => {
    const { target } = e;
    const { value } = target;
    if (!startTime) {
      setRadialOptions({ progress: 0, timing: timeout });
      setStartTime(Date.now());
      setTimeout(() => {
        setGameOver(true);
      }, timeout);
    }
    setTypedWord(value);
  };

  const { progress: radialProgress, timing } = radialOptions;
  return (
    <Container>
      <WordContainer gameOver={gameOver}>
        <Word>{progress}</Word>
        <Remainder>{remainder}</Remainder>
      </WordContainer>
      <Score gameOver={gameOver}>
        <Radial progress={radialProgress} timeout={timing} stroke={'var(--green)'} />
        {score}
      </Score>
      <Input gameOver={gameOver} value={typedWord} disabled={gameOver} onChange={onInputChange} />
      {gameOver && (
        <ButtonContainer>
          {!Gloot.origin && (
            <>
              <Button onClick={onGoBack}>Main menu</Button>

              <Button onClick={tryAgain}>Try again</Button>
            </>
          )}
          {Gloot.origin && <Button onClick={reportResult}>Continue</Button>}
        </ButtonContainer>
      )}
    </Container>
  );
};
