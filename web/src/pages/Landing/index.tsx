import React, { useState } from 'react';
import Select from 'react-select';
import Box from '../../components/Box';

import { Container, BoxContainer, Form } from './styles';

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' },
];

const Landing: React.FC = () => {
   const [selectedOption, setSelectedOption] = useState(null);

   return (
      <Container>
         <Form>
            <Select options={options} />
         </Form>
         <BoxContainer>
            <Box title="Com Fale Mais" value="R$ 40.00" />
            <Box title="Sem Fale Mais" value="R$ 80.00" />
         </BoxContainer>
      </Container>
   );
};

export default Landing;
