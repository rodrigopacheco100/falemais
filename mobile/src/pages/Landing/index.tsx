import React, { useEffect, useState } from "react";
import Box from "../../components/Box";
import Picker from "react-native-dropdown-picker";
import { Text, View, ScrollView } from "react-native";

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

  useEffect(() => {
    loadTarifas();
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Simule seu desconto com nossos planos</Title>
        <Picker
          onChangeItem={(item) => {
            setOrigem(item);
          }}
          placeholder="Origem"
          containerStyle={{ height: 60, marginTop: 5 }}
          items={origemOptions}
        />
        <Picker
          onChangeItem={(item) => {
            setDestino(item);
          }}
          placeholder="Destino"
          containerStyle={{ height: 60, marginTop: 5 }}
          items={[
            { label: "11", value: "11" },
            { label: "16", value: "16" },
            { label: "17", value: "17" },
            { label: "18", value: "18" },
          ]}
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
        <Box title="Com FaleMais" value="R$10.00" />
        <Box title="Sem FaleMais" value="R$40.00" />
      </ScrollView>
    </Container>
  );
};

export default Landing;
