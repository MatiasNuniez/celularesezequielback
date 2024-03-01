import { Database } from "./db";
import express, { Response, Request, NextFunction } from 'express'
import cookiesParser from 'cookie-parser'
import { GeneralRouter } from "./routes/general.route";
import { RotosRouter } from "./routes/rotos.route";
import { PORT } from "./config/config";
import { PrestadosRouter } from "./routes/prestados.route";
import { LoginRouter } from "./routes/login.route";
import cors from 'cors'

class Server extends Database {

  public app: express.Application = express()
  public port: number = parseInt(PORT || '3000')

  constructor() {

    super()

    this.app.use(cors({
      origin: 'direccion de la pagina principal del front si estan alojadas en distintos servers',
      credentials: true
    }));

    this.app.use(express.json())

    this.app.use(cookiesParser())

    this.app.use('/api', this.routers())

    this.listen()

    this.connect()

  }

  routers(): Array<express.Router> {
    return [new GeneralRouter().router, new PrestadosRouter().router, new RotosRouter().router, new LoginRouter().router]
  }

  public listen() {
    this.app.listen(this.port, () => console.log(`Servidor corriendo en puerto ${this.port}`))
  }

}

new Server()

