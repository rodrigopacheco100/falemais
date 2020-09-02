import { Router, Request, Response } from "express";
import logRequests from "./middlewares/logRequests";
import data from "./database/data";

const routes = Router();

routes.use(logRequests);

routes.get("/destino/:origem", (request: Request, response: Response) => {
   const { origem } = request.params;
   const tarifas = data.filter((tarifa) => tarifa.origem === Number(origem));
   const destinos = tarifas.map((tarifa) => tarifa.destino);

   return response.json(destinos);
});

routes.get("/tarifa", (request: Request, response: Response) => {
   const { origem, destino, tempo, plano } = request.body;
   const tarifa = data.find(
      (tarifaItem) =>
         tarifaItem.origem === Number(origem) &&
         tarifaItem.destino === Number(destino)
   );

   if (tarifa) {
      const tarifaComPlano =
         (tarifa.preco + tarifa.preco / 10) * (tempo - plano);

      const tarifaSemPlano = tarifa.preco * tempo;

      return response
         .json({
            tarifaComPlano:
               tarifaComPlano <= 0
                  ? "R$ 0,00"
                  : `R$ ${tarifaComPlano.toFixed(2)}`,
            tarifaSemPlano: `R$ ${tarifaSemPlano.toFixed(2)}`,
         })
         .status(200);
   }
   return response.status(400).json({ error: "Tarifa não encontrada" });
});

export default routes;
