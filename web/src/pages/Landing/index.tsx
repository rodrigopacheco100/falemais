import React, { useEffect, useState } from 'react';

import Box from '../../components/Box';
import ComboBox, { OptionProps } from '../../components/ComboBox';

import { Container, BoxContainer, Form } from './styles';

import api from '../../services/api';

interface TarifaProps {
   origem: string;
   destino: string;
}

const Landing: React.FC = () => {
   const [tarifas, setTarifas] = useState<TarifaProps[] | null>([]);
   const [origemOptions, setOrigemOptions] = useState<OptionProps[]>([]);
   const [destinoOptions, setDestinoOptions] = useState<OptionProps[]>([]);

   const [origem, setOrigem] = useState<OptionProps>({});
   const [destino, setDestino] = useState<OptionProps>({});
   const [plano, setPlano] = useState<string>('');

   async function loadTarifas() {
      const data: TarifaProps[] = await (await api.get('tarifas')).data;
      if (data) {
         setTarifas(data);
         const origens: OptionProps[] = data.map((origemItem) => {
            return {
               title: origemItem.origem,
               value: origemItem.origem,
            };
         });
         setOrigemOptions([...origens]);
      }
   }

   function changeOrigemDestino(e: React.ChangeEvent, value: OptionProps) {
      const campoArray = e.target.id.split('-');
      const campo = campoArray[0];
      console.log(campoArray[0]);
      if (campo === 'origem') {
         if (value) {
            setOrigem(value);
         } else setOrigem({});
      }
      if (campo === 'destino') {
         if (value) setDestino(value);
         else setDestino({});
      }
   }

   useEffect(() => {
      if (tarifas) {
         const destinos: OptionProps[] = tarifas
            .filter((destinoItem) => destinoItem.origem === origem?.value)
            .map((destinoItem) => {
               return {
                  title: destinoItem.destino,
                  value: destinoItem.destino,
               };
            });
         setDestinoOptions(destinos);
      }
   }, [origem]);

   useEffect(() => {
      console.log({ origem, destino, plano });
   }, [origem, destino, plano]);

   useEffect(() => {
      loadTarifas();
   }, []);

   return (
      <Container>
         <Form>
            <ComboBox
               options={origemOptions}
               value={origem}
               id="origem"
               title="Origem"
               width={284}
               handleChange={changeOrigemDestino}
            />
            <ComboBox
               value={origem}
               options={destinoOptions}
               id="destino"
               title="Destino"
               width={284}
               handleChange={changeOrigemDestino}
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
