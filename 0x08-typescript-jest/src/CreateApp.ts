import express from 'express';
import userRoute from './routes/user.route';

export function createApp() {
    const app = express();
    app.use('/api/v1/users', userRoute);
    return app;
}

