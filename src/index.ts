import dotenv from 'dotenv';
import app from './server';

dotenv.config();

app.listen(process.env.SERVER_PORT);
