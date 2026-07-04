import 'dotenv/config'
import pg from 'pg'

async function validateDatabaseConnection() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await pool.query('SELECT 1')
    console.log('Conexão com o banco validada com sucesso.')
    process.exitCode = 0
  } catch (error) {
    console.error('Falha ao conectar ao banco de dados.')
    console.error(error)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

void validateDatabaseConnection()
