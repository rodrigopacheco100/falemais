import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

import Box from '../../components/Box';
import ComboBox, { OptionProps } from '../../components/ComboBox';

import { Container, ComboBoxContainer, BoxContainer, Form } from './styles';

import api from '../../services/api';

interface TarifaProps {
   origem: string;
   destino: string;
}

interface PrecoProps {
   tarifaComPlano: string;
   tarifaSemPlano: string;
}

const Landing: React.FC = () => {
   const [tarifas, setTarifas] = useState<TarifaProps[] | null>([]);
   const [preco, setPreco] = useState<PrecoProps | null>(null);

   const [origemOptions, setOrigemOptions] = useState<OptionProps[]>([]);
   const [origem, setOrigem] = useState<OptionProps | null>(null);

   const [destinoOptions, setDestinoOptions] = useState<OptionProps[]>([]);
   const [destino, setDestino] = useState<OptionProps | null>(null);

   const [planoOptions] = useState<OptionProps[]>([
      { title: 'FaleMais 30', value: '30' },
      { title: 'FaleMais 60', value: '60' },
      { title: 'FaleMais 120', value: '120' },
   ]);
   const [plano, setPlano] = useState<OptionProps | null>(null);

   const [tempo, setTempo] = useState<string>('');

   // PEGAR AS TARIFAS NO BACKEND
   const loadTarifas = async () => {
      const data: TarifaProps[] = await (await api.get('tarifas')).data;
      if (data) {
         setTarifas(data);

         // SEPARANDO AS OPÇÕES DE ORIGEM
         const origens: OptionProps[] = data.map((tarifa) => {
            return {
               title: tarifa.origem,
               value: tarifa.origem,
            };
         });

         // ADICIONANDO OS VALORES ÚNICOS NAS OPÇÕES
         origens.forEach((element, index, arr) => {
            let unico = true;
            for (let i = 0; i < index; i += 1) {
               if (element.value === arr[i].value) unico = false;
            }

            if (unico)
               setOrigemOptions((arrayatual) => [...arrayatual, element]);
         });
      }
   };

   /* RECEBENDO OS EVENTOS DE CADA ELEMENTO E
      ATRIBUINDO OS VALORES CORRESPONDENTES    */
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

   async function calcularTarifa() {
      if (origem && destino && plano && tempo !== '') {
         const response = await (
            await api.get('/tarifa', {
               params: {
                  origem: origem.value,
                  destino: destino.value,
                  plano: plano.value,
                  tempo,
               },
            })
         ).data;

         setPreco(response);
      } else setPreco(null);
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
   }, [origem, tarifas]);

   useEffect(() => {
      calcularTarifa();
   }, [origem, destino, plano, tempo]);

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
                  title="Origem (DDD)"
                  width={285}
                  handleChange={changeBoxes}
               />
               <ComboBox
                  options={destinoOptions}
                  value={destino}
                  id="destino"
                  title="Destino (DDD)"
                  width={285}
                  handleChange={changeBoxes}
               />
            </ComboBoxContainer>

            <ComboBoxContainer>
               <ComboBox
                  options={planoOptions}
                  value={plano}
                  id="plano"
                  title="Plano"
                  width={285}
                  handleChange={changeBoxes}
               />
               <TextField
                  id="tempo"
                  value={tempo}
                  label="Tempo em minutos"
                  variant="outlined"
                  onChange={(e) => {
                     setTempo(e.target.value);
                  }}
                  style={{ width: 285 }}
               />
            </ComboBoxContainer>
         </Form>
         <BoxContainer>
            <Box
               title="Com FaleMais"
               value={preco ? preco.tarifaComPlano : ''}
            />
            <Box
               title="Sem FaleMais"
               value={preco ? preco.tarifaSemPlano : ''}
            />
         </BoxContainer>
      </Container>
   );
};

export default Landing;
