import mockData from './db';
import { createServer } from "miragejs";

export function makeServer() {
    let server = createServer({
        routes() {
            this.get("/api/events", () => ({
                events: mockData
            }))
        },
    });

    return server;
}