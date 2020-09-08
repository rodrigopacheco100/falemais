import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #000555;
  height: 180px;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 10px;
`;

export const TitleContainer = styled.View`
  background-color: #000540;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
`;

export const ValueContainer = styled.View`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #f6f6f6;
`;

export const Value = styled.Text`
  color: #f6f6f6;
  font-size: 24px;
  font-weight: 500;
`;
