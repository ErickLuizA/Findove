const Pool = require('pg').Pool

const isProduction = process.env.NODE_ENV === 'production'

let pool

isProduction ?
 new Pool({ connectionString: process.env.DATABASE_URL, ssl: isProduction}) : 
 pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
})

module.exports = pool