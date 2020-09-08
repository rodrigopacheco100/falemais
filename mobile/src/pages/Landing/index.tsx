import React, { useEffect, useState } from "react";
import Box from "../../components/Box";
import Picker from "react-native-dropdown-picker";
import { ScrollView } from "react-native";

import { Container, Input, Title } from "./styles";
import api from "../../services/api";

interface OptionProps {
  label: string;
  value: string;
}

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

  const [origem, setOrigem] = useState<OptionProps | null>(null);
  const [origemOptions, setOrigemOptions] = useState<OptionProps[]>([]);

  const [destino, setDestino] = useState<OptionProps | null>(null);
  const [destinoOptions, setDestinoOptions] = useState<OptionProps[]>([]);

  const [planoOptions] = useState<OptionProps[]>([
    { label: "FaleMais 30", value: "30" },
    { label: "FaleMais 60", value: "60" },
    { label: "FaleMais 120", value: "120" },
  ]);
  const [plano, setPlano] = useState<OptionProps | null>(null);
  const [tempo, setTempo] = useState<string>("");

  // PEGAR AS TARIFAS NO BACKEND
  const loadTarifas = () => {
    api.get("tarifas").then((response) => {
      setTarifas(response.data);

      // SEPARANDO AS OPÇÕES DE ORIGEM
      const origens: OptionProps[] = response.data.map(
        (tarifa: TarifaProps) => {
          return {
            label: tarifa.origem,
            value: tarifa.origem,
          };
        }
      );

      // ADICIONANDO OS VALORES ÚNICOS NAS OPÇÕES
      origens.forEach((element, index, arr) => {
        let unico = true;
        for (let i = 0; i < index; i += 1) {
          if (element.value === arr[i].value) unico = false;
        }

        if (unico) setOrigemOptions((arrayatual) => [...arrayatual, element]);
      });
    });
  };

  const calcularTarifa = async () => {
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
  };

  useEffect(() => {
    if (tarifas) {
      setDestino(null);
      const destinos: OptionProps[] = tarifas
        .filter((tarifa) => tarifa.origem === origem?.value)
        .map((tarifa) => {
          return {
            label: tarifa.destino,
            value: tarifa.destino,
          };
        });
      setDestinoOptions([...destinos]);
    }
  }, [origem, tarifas]);

  useEffect(() => {
    loadTarifas();
  }, []);

  useEffect(() => {
    calcularTarifa();
  }, [origem, destino, plano, tempo]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Simule seu desconto com nossos planos</Title>
        <Picker
          onChangeItem={(item) => {
            setOrigem(item);
            setDestino(null);
          }}
          placeholder="Origem"
          containerStyle={{ height: 60, marginTop: 5 }}
          items={origemOptions}
        />
        <Picker
          defaultValue={destino ? destino.value : null}
          onChangeItem={(item) => {
            setDestino(item);
          }}
          placeholder="Destino"
          containerStyle={{ height: 60, marginTop: 5 }}
          items={destinoOptions}
        />
        <Picker
          onChangeItem={(item) => {
            setPlano(item);
          }}
          placeholder="Plano"
          containerStyle={{ height: 60, marginTop: 5 }}
          items={planoOptions}
        />
        <Input
          onChangeText={(text) => setTempo(text)}
          keyboardType="numeric"
          maxLength={10}
          placeholder="Tempo em minutos"
        />
        <Box title="Com FaleMais" value={preco ? preco.tarifaComPlano : ''} />
        <Box title="Sem FaleMais" value={preco ? preco.tarifaSemPlano : ''} />
      </ScrollView>
    </Container>
  );
};

export default Landing;
