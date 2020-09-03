import React from 'react';
import Box from '../../components/Box';

import { Container, BoxContainer } from './styles';

const Landing: React.FC = () => {
   return (
      <Container>
         <BoxContainer>
            <Box title="Com Fale Mais" value="R$ 40.00" />
            <Box title="Sem Fale Mais" value="R$ 80.00" />
         </BoxContainer>
      </Container>
   );
};

export default Landing;
