-- =========================================
-- RESET DATABASE
-- =========================================
DROP DATABASE IF EXISTS service_project_db;
CREATE DATABASE service_project_db;
USE service_project_db;

-- =========================================
-- ORGANIZATIONS TABLE
-- =========================================
CREATE TABLE organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- =========================================
-- PROJECTS TABLE
-- =========================================
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    organization_id INT,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE
);

-- =========================================
-- CATEGORIES TABLE
-- =========================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- =========================================
-- PROJECT_CATEGORIES TABLE
-- =========================================
CREATE TABLE project_categories (
    project_id INT,
    category_id INT,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE
);

-- =========================================
-- SAMPLE DATA
-- =========================================

INSERT INTO organizations (name, description) VALUES
('Red Cross', 'Humanitarian organization'),
('UNICEF', 'Child welfare organization'),
('Local Community Group', 'Community development group');

INSERT INTO projects (name, description, organization_id) VALUES
('Food Drive', 'Distribute food to families', 1),
('Clean Water Project', 'Provide clean water access', 2),
('Community Cleanup', 'Clean public spaces', 3);

INSERT INTO categories (name) VALUES
('Health'),
('Environment'),
('Education');

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1),
(2, 2),
(3, 2),
(3, 3);