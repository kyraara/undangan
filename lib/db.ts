import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getDb(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'wedding',
      port: Number(process.env.MYSQL_PORT || 3306),
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
  }
  return pool
}

/**
 * Execute a query with arguments.
 */
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const db = getDb()
  const [results] = await db.execute(sql, params)
  return results as T
}
