import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SVG = styled.svg``;
const Circle = styled.circle.attrs(props => ({
  stroke: props.stroke || '#fff',
  strokeWidth: '10',
  fill: 'transparent',
  r: '90',
  cx: '100',
  cy: '100',
  strokeDasharray: `${props.circumference} ${props.circumference}`,
  strokeDashoffset: `${props.progress}`,
}))`
  transition: ${props => `all ${Math.floor(props.timing / 1000)}s linear`};
`;

export default ({ stroke, progress, timeout = 1000 }) => {
  const circumference = 90 * 2 * Math.PI;
  const [dashOffset, setDashOffset] = useState(circumference);
  const [timing, setTiming] = useState(timeout);

  useEffect(() => {
    const offset = circumference - (progress / 100) * circumference;
    setDashOffset(offset);
    setTiming(timeout);
  }, [progress]);
  return (
    <SVG>
      <Circle timing={timing} progress={dashOffset} circumference={circumference} stroke={stroke} />
    </SVG>
  );
};
