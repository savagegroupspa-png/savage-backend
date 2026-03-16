const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Savage API',
            version: '1.0.0',
            description: 'Documentación oficial de la API Savage Group',
        },
        servers: [
            { 
                url: 'https://savage-backend.onrender.com',
                description: 'Servidor de Producción (Render)' 
            },
            { 
                url: 'http://localhost:3000',
                description: 'Servidor Local (Desarrollo)' 
            }
        ],
        paths: {
            '/api/distribuidores': {
                get: {
                    summary: 'Obtiene todos los distribuidores',
                    tags: ['Distribuidores'],
                    responses: { '200': { description: 'OK' } }
                },
                post: {
                    summary: 'Registra un distribuidor',
                    tags: ['Distribuidores'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        nombre: { type: 'string' },
                                        empresa: { type: 'string' },
                                        ciudad: { type: 'string' },
                                        mensaje: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    responses: { '201': { description: 'Creado' } }
                }
            },
            '/api/fans': {
                get: {
                    summary: 'Obtiene la lista de fans registrados',
                    tags: ['Fans'],
                    responses: { '200': { description: 'OK' } }
                },
                post: {
                    summary: 'Registra un nuevo fan y envía correo',
                    tags: ['Fans'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        nombre: { type: 'string', example: 'Pedro Pascal' },
                                        email: { type: 'string', example: 'pedro@savage.cl' }
                                    }
                                }
                            }
                        }
                    },
                    responses: { '201': { description: 'Fan registrado y mail enviado' } }
                }
            }
        }
    },
    apis: [], 
};

const swaggerSpec = swaggerJSDoc(options);

// ESTA FUNCIÓN ES LA QUE BUSCA TU index.js
const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// EXPORTACIÓN CORRECTA PARA require
module.exports = { swaggerDocs };
