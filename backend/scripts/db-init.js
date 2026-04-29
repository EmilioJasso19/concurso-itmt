import 'dotenv/config';
import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '../src/models/schema.sql');

const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD'];
const missing  = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

let connection;

try {
  connection = await createConnection({
    host:               process.env.DB_HOST,
    port:               Number(process.env.DB_PORT) || 3306,
    user:               process.env.DB_USER,
    password:           process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  console.log('Connected to MySQL.');

  const sql = readFileSync(schemaPath, 'utf8');
  await connection.query(sql);

  console.log('Database created successfully.');
} catch (err) {
  console.error('Initialization failed:', err.message);
  process.exit(1);
} finally {
  await connection?.end();
}
