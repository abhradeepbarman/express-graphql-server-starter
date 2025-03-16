import express from "express";
import { config } from "./config/config";
import { initServer } from "./app";

const init = async () => {
    const app = await initServer();
    app.listen(config.PORT, () =>
        console.log(`Server running on port ${config.PORT}`)
    );
};

init();
