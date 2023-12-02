const fs = require('fs').promises;
const { getConnection } = require('typeorm');
const Connection = require('./src/db/connect');
const path = require('path');

const pathStringBuildDb = 'migrations/build-db/migration.sql';
const pathStringCleanDb = 'migrations/clean-db/migration.sql';

// Function to read and process SQL file
const readSqlFile = async (filepath) => {
    try {
        const content = await fs.readFile(path.join(__dirname, filepath), 'utf8');
        return content.replace(/--.*(\r?\n|$)/g, '').split(';').filter(query => query.trim() !== '');
    } catch (error) {
        throw new Error(`Error reading SQL file: ${error.message}`);
    }
};

async function executeQueries(connection, queries, successMessage) {
    try {
        for (const query of queries) {
            await connection.query(query);
        }
        console.log(successMessage);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        process.exit();
    }
}

async function buildDatabaseInit() {
    try {
        const appDataSource = await Connection.getInstance();
        const queries = await readSqlFile(pathStringBuildDb);
        await executeQueries(appDataSource, queries, 'Build database init successfully.');
    } catch (error) {
        console.error(`Error build database: ${error.message}`);
    }
}

async function cleanDatabase() {
    try {
        const appDataSource = await Connection.getInstance();
        const queries = await readSqlFile(pathStringCleanDb);
        await executeQueries(appDataSource, queries, 'Clean database successfully.');
    } catch (error) {
        console.error(`Error clean database: ${error.message}`);
    }
}

switch (process.argv[2]) {
    case '-i':
        buildDatabaseInit();
        break;
    case '-d':
        cleanDatabase();
        break;
    default:
        console.error('Invalid option. Use -i to build database or -d to clean database.');
        process.exit(1);
}
