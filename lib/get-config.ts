import { query } from '@/lib/db'
import { weddingConfig } from '@/lib/config'

export type WeddingConfig = typeof weddingConfig

export async function getConfig(): Promise<WeddingConfig> {
  try {
    const rows = await query<any[]>(
      'SELECT config_json FROM settings WHERE id = 1 LIMIT 1'
    )
    if (rows && rows.length > 0 && rows[0].config_json) {
      return JSON.parse(rows[0].config_json) as WeddingConfig
    }
  } catch {
    // DB belum ada tabel settings atau kosong — pakai default
  }
  return weddingConfig as unknown as WeddingConfig
}

export async function saveConfig(config: WeddingConfig): Promise<void> {
  const json = JSON.stringify(config)
  await query(
    'INSERT INTO settings (id, config_json) VALUES (1, ?) ON DUPLICATE KEY UPDATE config_json = VALUES(config_json)',
    [json]
  )
}
