import React from 'react';
import { Container, Title, Value } from './styles';

interface BoxProps {
   title: string;
   value: string;
}

const Box: React.FC<BoxProps> = ({ title, value }) => {
   return (
      <Container>
         <Title>{title}</Title>
         <Value>{value}</Value>
      </Container>
   );
};

export default Box;
