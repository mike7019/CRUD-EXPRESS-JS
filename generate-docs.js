import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

const currentFilePath = fileURLToPath(import.meta.url);

// Change the output path to your desired directory
const outputPath = path.resolve(path.dirname(currentFilePath), './src/api-docs/swagger.json');

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`OpenAPI documentation generated at ${outputPath}`);
