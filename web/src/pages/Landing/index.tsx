import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import Box from '../../components/Box';

import { Container, BoxContainer, Form } from './styles';

const Landing: React.FC = () => {
   // const origemRef = useRef(null);
   const [origem, setOrigem] = useState(0);
   const [tarifas, setTarifas] = useState();

   // useEffect(() => {}, [origemRef]);

   const handleOrigemSelect = () => {};

   return (
      <Container>
         <Form>
            <Select
               className="basic-single"
               classNamePrefix="select"
               isClearable
               isSearchable
               placeholder="Origem"
               onChange={handleOrigemSelect}
            />
         </Form>
         <BoxContainer>
            <Box title="Com Fale Mais" value="R$ 40.00" />
            <Box title="Sem Fale Mais" value="R$ 80.00" />
         </BoxContainer>
      </Container>
   );
};

export default Landing;
