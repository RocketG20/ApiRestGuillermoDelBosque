const express = require('express');
const path = require('path');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const redoc = require('redoc-express'); // Importa ReDoc

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
    showExtensions: true, // Esto es crucial para mostrar codeSamples
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
  specUrl: '/api-docs-json', // Punto que sirve la especificación en formato JSON
  theme: {
    colors: {
      primary: {
        main: '#5A69A6', // Color principal personalizado
      },
    },
    typography: {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
    },
  },
}));

// Rutas
app.use('/empleado', require('./router/usuarioRouter.js'));

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
  console.log(`Documentación ReDoc en http://localhost:${PORT}/redoc`);
});