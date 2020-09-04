import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';

import Box from '../../components/Box';
import ComboBox, { OptionProps } from '../../components/ComboBox';

import { Container, ComboBoxContainer, BoxContainer, Form } from './styles';

import api from '../../services/api';

interface TarifaProps {
   origem: string;
   destino: string;
}

const Landing: React.FC = () => {
   const [tarifas, setTarifas] = useState<TarifaProps[] | null>([]);

   const [origemOptions, setOrigemOptions] = useState<OptionProps[]>([]);
   const [origem, setOrigem] = useState<OptionProps | null>(null);

   const [destinoOptions, setDestinoOptions] = useState<OptionProps[]>([]);
   const [destino, setDestino] = useState<OptionProps | null>(null);

   const [planoOptions] = useState<OptionProps[]>([
      { title: 'Plano 30', value: '30' },
      { title: 'Plano 60', value: '60' },
      { title: 'Plano 120', value: '120' },
   ]);
   const [plano, setPlano] = useState<OptionProps | null>(null);

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

         const array: OptionProps[] = [];
         origens.forEach((element, index, arr) => {
            let unico = true;
            for (let i = 0; i < index; i += 1) {
               if (element.value === arr[i].value) unico = false;
            }

            if (unico) array.push(element);
         });

         setOrigemOptions([...array]);
      }
   }

   function changeBoxes(e: React.ChangeEvent, value: OptionProps) {
      const campoArray = e.target.id.split('-');
      const campo = campoArray[0];
      if (campo === 'origem') {
         if (value) setOrigem(value);
         else setOrigem(null);
      }
      if (campo === 'destino') {
         if (value) setDestino(value);
         else setDestino(null);
      }
      if (campo === 'plano') {
         if (value) setPlano(value);
         else setPlano(null);
      }
   }

   useEffect(() => {
      if (tarifas) {
         setDestino(null);
         const destinos: OptionProps[] = tarifas
            .filter((destinoItem) => destinoItem.origem === origem?.value)
            .map((destinoItem) => {
               return {
                  title: destinoItem.destino,
                  value: destinoItem.destino,
               };
            });
         setDestinoOptions([...destinos]);
      }
   }, [origem]);

   useEffect(() => {
      console.log({ origem, destino, plano });
      api.get('tarifa', {});
   }, [origem, destino, plano]);

   useEffect(() => {
      loadTarifas();
   }, []);

   return (
      <Container>
         <Form>
            <ComboBoxContainer>
               <ComboBox
                  options={origemOptions}
                  value={origem}
                  id="origem"
                  title="Origem"
                  width={130}
                  handleChange={changeBoxes}
               />
               <ComboBox
                  options={destinoOptions}
                  value={destino}
                  id="destino"
                  title="Destino"
                  width={130}
                  handleChange={changeBoxes}
               />

               <ComboBox
                  options={planoOptions}
                  value={plano}
                  id="plano"
                  title="Plano"
                  width={130}
                  handleChange={changeBoxes}
               />
               <Input placeholder="Tempo em minutos" />
            </ComboBoxContainer>
         </Form>
         <BoxContainer>
            <Box title="Com Fale Mais" value="R$ 40.00" />
            <Box title="Sem Fale Mais" value="R$ 80.00" />
         </BoxContainer>
      </Container>
   );
};

export default Landing;
