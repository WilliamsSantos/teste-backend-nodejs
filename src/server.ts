import { app } from "./app";

const PORT = process.env.DEFAULT_PORT,

    server =
        app.listen(PORT, () => {
            console.log(`>> Listening on ${PORT}.`)
            console.log('======================')
        });

process.on('SIGINT', () => {
    server.close();
    console.log('>> App closed');
    console.log('======================')
});