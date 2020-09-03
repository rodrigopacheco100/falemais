import styled from 'styled-components';

export const Container = styled.div`
   background-color: #000555;
   width: 280px;
   height: 180px;
   display: flex;
   flex-direction: column;
   border-radius: 12px;
   margin-left: 8px;
   margin-right: 8px;
   overflow: hidden;
   box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
`;

export const Title = styled.div`
   background-color: #000540;
   font-family: 'Roboto', sans-serif;
   font-size: 32px;
   color: #f6f6f6;
   flex: 1;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 12px;
   box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
`;

export const Value = styled.div`
   flex: 2;
   color: #f6f6f6;
   font-size: 24px;
   font-family: 'Roboto';
   font-weight: 500;
   display: flex;
   align-items: center;
   justify-content: center;
`;
