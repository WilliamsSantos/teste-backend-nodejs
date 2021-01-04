import { app } from "./App";


const PORT = process.env.DEFAULT_PORT || 3000,

    server =
        app.listen(PORT, () => {
            console.log(`>> Listening on PORT: ${PORT}.`);
        });

process.on("SIGINT", () => {
    server.close();
    console.log(">> App closed.");
});
