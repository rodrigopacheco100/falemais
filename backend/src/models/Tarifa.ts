export default class Tarifa {
   constructor(origem = 0, destino = 0, preco = 0) {
      this.origem = origem;
      this.destino = destino;
      this.preco = preco;
   }

   origem!: number;

   destino!: number;

   preco!: number;
}
