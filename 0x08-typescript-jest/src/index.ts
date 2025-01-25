import express from 'express';
import { Express, Request, Response, NextFunction } from 'express-serve-static-core';
import { createApp } from './CreateApp';

const app = createApp();

const PORT = 5000;


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:5000`)
});
