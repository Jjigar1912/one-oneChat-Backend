import express from 'express'; 
import allRoutes from './src/modules/index.js';

const app = express();

app.use(express.json());
app.use('/',allRoutes);

export default app ; 