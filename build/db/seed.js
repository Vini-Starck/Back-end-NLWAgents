"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_seed_1 = require("drizzle-seed");
const connection_1 = require("./connection");
const index_1 = require("./schema/index");
(0, drizzle_seed_1.reset)(connection_1.db, index_1.schema);
(0, drizzle_seed_1.seed)(connection_1.db, index_1.schema).refine((f) => {
    return {
        rooms: {
            count: 5,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum(),
            },
        },
        questions: {
            count: 20,
        },
    };
});
connection_1.sql.end();
// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('Database seeded');
