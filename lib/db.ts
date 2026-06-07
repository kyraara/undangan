/* eslint-disable @typescript-eslint/no-require-imports */
import type { Pool } from 'mysql2/promise'

let pool: Pool | null = null

function getDb(): Pool {
  if (!pool) {
    // require() is the only reliable way to load a CJS module (mysql2) when
    // serverExternalPackages externalises it — dynamic import wraps module.exports
    // as { default: ... } and named exports are not synthesised by Node.js.
    const mysql = require('mysql2/promise')
    pool = mysql.createPool({
      host:     process.env.MYSQL_HOST     || 'localhost',
      user:     process.env.MYSQL_USER     || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'wedding',
      port:     Number(process.env.MYSQL_PORT || 3306),
      waitForConnections: true,
      connectionLimit:    10,
      maxIdle:            10,
      idleTimeout:        60000,
      queueLimit:         0,
      enableKeepAlive:    true,
      keepAliveInitialDelay: 0,
    }) as Pool
  }
  return pool!
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  try {
    const db = getDb()
    const [results] = await db.execute(sql, params)
    return results as T
  } catch (err: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[db] Query skipped (no DB in dev):', err?.code ?? err?.message)
      return [] as unknown as T
    }
    throw err
  }
}
