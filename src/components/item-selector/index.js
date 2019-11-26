import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ItemSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  font-size: 2em;
`;

const Item = styled.div`
  margin: 0px 10px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1em;
  color: var(--yellow);
`;

const Arrow = styled.div`
  border: solid #fff;
  border-width: 0 6px 6px 0;
  display: inline-block;
  padding: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const LeftArrow = styled(Arrow)`
  transform: rotate(135deg);
`;

const RightArrow = styled(Arrow)`
  transform: rotate(-45deg);
`;

export default ({ items = [], onChange, title = null }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onChange && onChange(items[index]);
  }, [index]);

  const onScrollLeft = () => {
    setIndex(index == 0 ? items.length - 1 : index - 1);
  };

  const onScrollRight = () => {
    setIndex(index >= items.length - 1 ? 0 : index + 1);
  };

  return (
    <ItemSelector>
      {title && <Title>{title}</Title>}
      <Inner>
        <LeftArrow onClick={onScrollLeft} />
        <Item onClick={onScrollRight}>{items[index]}</Item>
        <RightArrow onClick={onScrollRight} />
      </Inner>
    </ItemSelector>
  );
};
