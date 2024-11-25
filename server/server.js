import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './config/api.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig.js';
import favicon from 'serve-favicon';

dotenv.config({ path: '.env' })

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware setup
app.use(express.json());

// Serve favicon conditionally if required
if (process.env.NODE_ENV === 'development') {
    app.use(cors(
        {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    ));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(favicon(path.resolve('../', 'client', 'public', 'favicon.png')))
} else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'favicon.png')))
    app.use(express.static('public'))
}

// API routing
app.use('/api', router);

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('public', 'index.html'))
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
