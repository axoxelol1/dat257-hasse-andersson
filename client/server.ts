import express, { Request, Response } from 'express';
import next from 'next';
import { NextServer, RequestHandler } from 'next/dist/server/next';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app : NextServer = next({ dev });
const handle : RequestHandler = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.all('*', (req : Request, res : Response ) => handle(req, res));

    server.listen(port, () => {
        console.log("Server started at http://localhost:" + port+"/");
    });

});
