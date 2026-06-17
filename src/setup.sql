-- =========================================
-- ORGANIZATIONS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- =========================================
-- PROJECTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    organization_id INT,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE
);

-- =========================================
-- CATEGORIES TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- =========================================
-- PROJECT_CATEGORIES TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id INT,
    category_id INT,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_category
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

-- Since we are inserting into fresh tables, IDs 1, 2, and 3 will auto-generate seamlessly
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