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
   const tarifas = data.filter(
      (tarifa) =>
         tarifa.origem === Number(origem) && tarifa.destino === Number(destino)
   );

   return response.json(tarifas);
});

export default routes;
