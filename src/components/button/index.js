import styled from 'styled-components';

export default styled.button`
  position: relative;
  padding: 5px 10px;
  background: none;
  border: 0;
  border-radius: 3px;
  outline: 0;
  color: #fff;
  font-size: 2em;
  font-family: 'Bungee', cursive;
  transition: all 0.25s ease-in-out;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;
