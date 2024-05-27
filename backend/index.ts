import express from 'express';
import db from './db/dbConfig';
import errorHandlingMiddleware from './middlewares/errorHandling';
import corsMiddleware from './middlewares/corsMiddleware';
import fileUploadRoutes from './routes/fileUploadRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

// CORS middleware
app.use(corsMiddleware);

// Middleware to handle errors
app.use(errorHandlingMiddleware);

// Routes
app.use(fileUploadRoutes);
app.use(userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
