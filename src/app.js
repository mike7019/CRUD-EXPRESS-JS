import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from 'path'

import turboAPI from "./routes/turbo.api.routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//CORS setup
const whiteList = [process.env.ORIGIN, process.env.ORIGIN2];
app.use(
  cors(/*{
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            return callback(null, origin)
        }
        return callback("Error de CORS origin: " + origin + " No autorizado")
    }
}*/)
);

app.use(morgan("dev"));
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "TurboAPI Documentation",
      version: "1.0.0",
      description: "Documentation for TurboAPI",
    }, 
    servers: [
      {
        url: 'http://localhost:4001/api', // Specify the base URL of your API
        description: 'Development server' // Provide a description for the server
      }
    ]
  },
  apis: ["./routes/turbo.api.routes.js"],
};

// this is mounting the documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the swagger.json file
app.get('/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, './api-docs/swagger.json'));
});

// serve the API paths
app.use("/api", turboAPI);

export default app;
