-- ============================================================
-- Wedding Invitation — Database Schema
-- Database: wedding
-- ============================================================

CREATE DATABASE IF NOT EXISTS wedding CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wedding;

-- ------------------------------------------------------------
-- Tabel: admin_users
-- Menyimpan akun admin panel (gantikan ADMIN_EMAIL/.env)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id           VARCHAR(36)  NOT NULL PRIMARY KEY,
  email        VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name         VARCHAR(255) NOT NULL DEFAULT 'Admin',
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabel: rsvp
-- Menyimpan konfirmasi kehadiran dari tamu undangan
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rsvp (
  id           VARCHAR(36)  NOT NULL PRIMARY KEY,
  nama         VARCHAR(255) NOT NULL,
  jumlah_tamu  INT          NOT NULL DEFAULT 1,
  kehadiran    ENUM('hadir','tidak_hadir','belum_pasti') NOT NULL,
  pesan        TEXT,
  ip_address   VARCHAR(100),
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabel: ucapan
-- Menyimpan ucapan & doa dari tamu undangan
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ucapan (
  id         VARCHAR(36)  NOT NULL PRIMARY KEY,
  nama       VARCHAR(255) NOT NULL,
  pesan      TEXT         NOT NULL,
  status     ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabel: social_media
-- Menyimpan akun media sosial mempelai
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS social_media (
  id         VARCHAR(36)  NOT NULL PRIMARY KEY,
  person     ENUM('groom','bride') NOT NULL,
  platform   VARCHAR(50)  NOT NULL,
  handle     VARCHAR(255) NOT NULL,
  url        VARCHAR(500),
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_person_platform (person, platform)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
