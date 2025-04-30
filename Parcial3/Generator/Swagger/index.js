const express = require('express');
const path = require('path');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const redoc = require('redoc-express');
const { exec } = require('child_process'); // Para ejecutar OpenAPI Generator

const app = express();
const PORT = 3000;

app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Empleados',
      version: '1.0.0',
      description: fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8'),
      contact: {
        email: 'equipo@empresa.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Servidor local' }],
    tags: [{ name: 'empleado', description: 'Operaciones con empleados' }],
  },
  apis: [path.join(__dirname, './router/*.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuración optimizada para Swagger UI
const swaggerUIOptions = {
  explorer: true,
  swaggerOptions: {
    displayOperationId: true,
    defaultModelExpandDepth: 0,
    docExpansion: 'none',
    showExtensions: true,
    showCommonExtensions: true,
    operationsSorter: (a, b) => {
      const methodOrder = { get: 1, post: 2, put: 3, delete: 4 };
      return methodOrder[a.get('method')] - methodOrder[b.get('method')];
    },
    plugins: [
      {
        statePlugins: {
          spec: {
            wrapSelectors: {
              allowTryItOutFor: () => () => true,
            },
          },
        },
      },
    ],
  },
  customSiteTitle: "API Documentation",
  customCss: `
    .opblock .opblock-summary {
      padding: 8px 0;
    }
    .responses-wrapper {
      padding-top: 10px;
    }
    .download-contents {
      display: none !important;
    }
  `,
  customJs: `
    window.onload = function() {
      setTimeout(function() {
        const ops = document.querySelectorAll('.opblock');
        ops.forEach(op => {
          const tryOutBtn = op.querySelector('.try-out__btn');
          if (tryOutBtn) tryOutBtn.click();
        });
      }, 500);
    }
  `,
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerUIOptions));
app.get('/api-docs-json', (req, res) => res.json(swaggerDocs));

// Configuración de ReDoc
app.get('/redoc', redoc({
  title: 'ReDoc API Documentation',
  specUrl: '/api-docs-json',
  theme: {
    colors: {
      primary: {
        main: '#5A69A6',
      },
    },
    typography: {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
    },
  },
}));

// Ruta para generar clientes SDK con OpenAPI Generator
app.get('/generate-client', (req, res) => {
  const outputDir = path.join(__dirname, 'generated-client'); // Ruta relativa para evitar errores
  const specUrl = `http://localhost:${PORT}/api-docs-json`;

  // Comando ajustado con comillas y escapado de separadores de directorios
  const command = `npx openapi-generator-cli generate -i ${specUrl} -g typescript-axios -o "${outputDir.replace(/\\/g, '\\\\')}" --skip-validate-spec`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(`Error generating client: ${error.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);
    res.send('Client generated successfully!');
  });
});

// Nueva ruta para guardar la especificación OpenAPI como JSON
app.get('/save-openapi-json', (req, res) => {
  const outputPath = path.join(__dirname, 'sdk', 'openapi.json');

  fs.writeFile(outputPath, JSON.stringify(swaggerDocs, null, 2), (err) => {
    if (err) {
      console.error('Error guardando JSON:', err);
      return res.status(500).send('Error guardando el archivo JSON');
    }
    res.send(`Archivo JSON guardado en: ${outputPath}`);
  });
});

// Ruta para generar cliente Java
app.get('/generate-java-client', (req, res) => {
  const outputDir = path.join(__dirname, 'sdk', 'generated-client');
  const specUrl = `http://localhost:${PORT}/api-docs-json`;

  const command = `npx openapi-generator-cli generate \
      -i ${specUrl} \
      -g java \
      -o "${outputDir.replace(/\\/g, '\\\\')}" \
      --skip-validate-spec \
      --additional-properties=apiPackage=com.empresa.api,modelPackage=com.empresa.model,invokerPackage=com.empresa.invoker`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(`Error generando cliente Java: ${error.message}`);
    }
    if (stderr) console.error(`Stderr: ${stderr}`);
    console.log(`Stdout: ${stdout}`);
    res.send('Cliente Java generado exitosamente!');
  });
});

// Rutas
app.use('/empleado', require('./router/usuarioRouter.js'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
  console.log(`Documentación ReDoc en http://localhost:${PORT}/redoc`);
  console.log(`Generar cliente SDK: http://localhost:${PORT}/generate-client`);
});