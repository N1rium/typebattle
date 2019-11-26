import styled from 'styled-components';
const Game = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;

const NameContainer = styled.div`
  font-size: 2.5em;
  @media screen and (min-width: 321px) {
    font-size: 3em;
  }
`;

const Name = styled.div`
  min-height: 58px;
`;

const Letter = styled.span``;
const Version = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`;
export { Game, Letter, NameContainer, Name, Version };
