import React, { useState } from "react";
import Box from "../../components/Box";
import Picker from "react-native-dropdown-picker";
import { Text, View, ScrollView } from "react-native";

import { Container, Input } from "./styles";

interface OptionProps {
  label: string;
  value: string;
}

const Landing: React.FC = () => {
  const [origem, setOrigem] = useState<OptionProps | null>(null);
  const [destino, setDestino] = useState<OptionProps | null>(null);
  const [plano, setPlano] = useState<OptionProps | null>(null);

  return (
    <ScrollView>
      <Container>
        <Picker
          onChangeItem={(item) => {
            setOrigem(item);
          }}
          placeholder="Origem"
          containerStyle={{ height: 60 }}
          items={[
            { label: "11", value: "11" },
            { label: "16", value: "16" },
            { label: "17", value: "17" },
            { label: "18", value: "18" },
          ]}
        />
        <Picker
          onChangeItem={(item) => {
            setDestino(item);
          }}
          placeholder="Destino"
          containerStyle={{ height: 60 }}
          items={[
            { label: "11", value: "11" },
            { label: "16", value: "16" },
            { label: "17", value: "17" },
            { label: "18", value: "18" },
          ]}
        />
        <Picker
          onChangeItem={(item) => {
            setDestino(item);
          }}
          placeholder="Plano"
          containerStyle={{ height: 60 }}
          items={[
            { label: "11", value: "11" },
            { label: "16", value: "16" },
            { label: "17", value: "17" },
            { label: "18", value: "18" },
          ]}
        />
        <Input
          keyboardType="numeric"
          maxLength={10}
          placeholder="Tempo em minutos"
        />
        <Box title="Com FaleMais" value="R$10.00" />
        <Box title="Sem FaleMais" value="R$40.00" />
      </Container>
    </ScrollView>
  );
};

export default Landing;
