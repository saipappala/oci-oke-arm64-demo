const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Connect using environment variables passed from Kubernetes
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres-service',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
  database: process.env.DB_NAME || 'myapp',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`<h1>Application Connected to Database!</h1><p>DB Time: ${result.rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send(`<h1>Database Connection Failed</h1><p>${err.message}</p>`);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
