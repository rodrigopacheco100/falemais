import React from 'react';
import { Container, Title, Value, TitleContainer, ValueContainer } from './styles';
import { Text } from "react-native";

interface BoxProps {
   title: string;
   value: string;
}

const Box: React.FC<BoxProps> = ({ title, value }) => {
   return (
      <Container>
         <TitleContainer><Title>{title}</Title></TitleContainer>
         <ValueContainer><Value>{value}</Value></ValueContainer>
      </Container>
   );
};

export default Box;
