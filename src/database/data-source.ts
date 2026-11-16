// STEP 0: this file is used only by the TypeORM CLI (migrations).
// Export a default DataSource built from dbConfig.
// entities: ['src/**/*.entity.ts']
// migrations: ['src/database/migrations/*.ts']

import { DataSource } from "typeorm";
import { dbConfig } from "./db.config";

export default new DataSource({ ...dbConfig, entities: ['src/**/*.entity.ts'], migrations: ['src/database/migrations/*.ts'] })