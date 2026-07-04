import 'dotenv/config'
import pg from 'pg'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL não definida.')
  process.exit(1)
}

const pool = new pg.Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
})

try {
  await pool.query('SELECT 1')
  console.log('Conexão OK:', new URL(url).host)
  process.exit(0)
} catch (error) {
  console.error('Conexão falhou:', new URL(url).host, '—', error.message)
  process.exit(1)
} finally {
  await pool.end()
}
