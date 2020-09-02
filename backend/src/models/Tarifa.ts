export default class Tarifa {
   constructor(origem: number, destino: number, preco: number) {
      this.origem = origem;
      this.destino = destino;
      this.preco = preco;
   }

   origem: number;

   destino: number;

   preco: number;
}
