-- Tambahkan tabel settings untuk menyimpan konfigurasi wedding secara dinamis
-- Jalankan sekali di database: mysql -u root -p wedding < sql/add-settings-table.sql

CREATE TABLE IF NOT EXISTS settings (
  id          INT          NOT NULL DEFAULT 1,
  config_json LONGTEXT     NOT NULL,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT single_row CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
