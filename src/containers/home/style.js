import styled, { keyframes } from 'styled-components';

const SlideFadeInFromBelow = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  },
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  animation: ${SlideFadeInFromBelow} 0.25s ease-in-out;
  font-size: 0.5em;
`;

const WordContainer = styled.div.attrs(props => ({ className: `${props.gameOver && 'highlighted'}` }))`
  font-size: 2em;
  text-align: center;
  opacity: 1;
  transition: all 0.25s ease-in-out;
  &.highlighted {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const Word = styled.span`
  color: var(--green);
`;

const Remainder = styled.span``;

const Input = styled.input.attrs(props => ({
  id: 'input',
  type: 'text',
  className: `${props.gameOver && 'highlighted'}`,
  autoComplete: 'off',
}))`
  text-align: center;
  background: transparent;
  border: 0;
  outline: 0;
  color: #fff;
  font-family: 'Bungee', cursive;
  border-bottom: 1px solid #fff;
  padding: 5px 10px;
  font-size: 1.25em;
  opacity: 1;
  transition: all 0.25s ease-in-out;
  &.highlighted {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const Score = styled.div.attrs(props => ({ className: `${props.gameOver && 'highlighted'}` }))`
  position: relative;
  font-size: 5em;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: all 0.25s ease-in-out;
  &.highlighted {
    color: var(--yellow);
    transform: scale(1.5);
  }
  svg {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transform: rotate(-90deg);
  }
`;

export { Container, ButtonContainer, WordContainer, Word, Remainder, Input, Score };
