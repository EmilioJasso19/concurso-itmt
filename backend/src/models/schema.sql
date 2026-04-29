-- ============================================================
-- Academic Space Management System
-- Database: MySQL 8+
-- ============================================================

CREATE DATABASE IF NOT EXISTS academic_spaces
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE academic_spaces;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE users (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    username    VARCHAR(50)     NOT NULL UNIQUE,
    password    VARCHAR(255)    NOT NULL,  -- bcrypt hash
    role        ENUM('admin','academic','prefect') NOT NULL,
    is_active   TINYINT(1)      NOT NULL DEFAULT 1,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: spaces
-- ============================================================
CREATE TABLE spaces (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    type        ENUM('classroom','laboratory','computer_lab','multipurpose') NOT NULL,
    location    VARCHAR(150)    NOT NULL,
    capacity    SMALLINT        NOT NULL CHECK (capacity > 0),
    status      ENUM('available','occupied','maintenance') NOT NULL DEFAULT 'available',
    is_active   TINYINT(1)      NOT NULL DEFAULT 1,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: schedules
-- ============================================================
CREATE TABLE schedules (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    program     VARCHAR(100)    NOT NULL,
    subject     VARCHAR(100)    NOT NULL,
    teacher_id  INT UNSIGNED    NOT NULL,  -- FK to users
    group_name  VARCHAR(20)     NOT NULL,
    day         ENUM('monday','tuesday','wednesday','thursday','friday','saturday') NOT NULL,
    start_time  TIME            NOT NULL,
    end_time    TIME            NOT NULL,
    space_id    INT UNSIGNED    NOT NULL,
    is_active   TINYINT(1)      NOT NULL DEFAULT 1,
    created_by  INT UNSIGNED    NOT NULL,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_times        CHECK (end_time > start_time),
    CONSTRAINT fk_sch_space     FOREIGN KEY (space_id)   REFERENCES spaces(id),
    CONSTRAINT fk_sch_teacher   FOREIGN KEY (teacher_id) REFERENCES users(id),
    CONSTRAINT fk_sch_created   FOREIGN KEY (created_by) REFERENCES users(id),

    INDEX idx_conflict (space_id, day, start_time, end_time)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: incidents
-- ============================================================
CREATE TABLE incidents (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type        ENUM('teacher_absence','equipment_failure','infrastructure_failure','other') NOT NULL,
    space_id    INT UNSIGNED    NOT NULL,
    date        DATE            NOT NULL,
    description TEXT            NOT NULL,
    status      ENUM('open','in_progress','closed','cancelled') NOT NULL DEFAULT 'open',
    created_by  INT UNSIGNED    NOT NULL,
    updated_by  INT UNSIGNED    NULL,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_inc_space      FOREIGN KEY (space_id)   REFERENCES spaces(id),
    CONSTRAINT fk_inc_created    FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_inc_updated    FOREIGN KEY (updated_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- ============================================================
-- TABLE: maintenance
-- ============================================================
CREATE TABLE maintenance (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    space_id        INT UNSIGNED    NOT NULL,
    failure_type    VARCHAR(100)    NOT NULL,
    priority        ENUM('low','medium','high','urgent') NOT NULL,
    description     TEXT            NOT NULL,
    progress        TEXT            NULL,
    notes           TEXT            NULL,
    start_date      DATE            NOT NULL DEFAULT (CURRENT_DATE),
    end_date        DATE            NULL,
    assigned_to     INT UNSIGNED    NULL,  -- FK to users (any role)
    status          ENUM('open','in_progress','closed','cancelled') NOT NULL DEFAULT 'open',
    created_by      INT UNSIGNED    NOT NULL,
    updated_by      INT UNSIGNED    NULL,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_maint_space      FOREIGN KEY (space_id)    REFERENCES spaces(id),
    CONSTRAINT fk_maint_assigned   FOREIGN KEY (assigned_to) REFERENCES users(id),
    CONSTRAINT fk_maint_created    FOREIGN KEY (created_by)  REFERENCES users(id),
    CONSTRAINT fk_maint_updated    FOREIGN KEY (updated_by)  REFERENCES users(id)
) ENGINE=InnoDB;

-- ============================================================
-- SEED: test users  (password: Admin123!)
-- ============================================================
INSERT INTO users (name, username, password, role) VALUES
('Administrator', 'admin',    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Academic Area', 'academic', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'academic'),
('Prefect',       'prefect',  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'prefect');
