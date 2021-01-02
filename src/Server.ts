import { app } from "./App";

const PORT = process.env.DEFAULT_PORT || 3000,

    server =
        app.listen(PORT, () => {
            // console.log('===========================')
            console.log(`>> Listening on PORT: ${PORT}.`)
        });

process.on('SIGINT', () => {
    server.close();
    // console.log('===========================')
    console.log('>> App closed.');
});
