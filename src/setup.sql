-- =========================================
-- VOLUNTEERS TABLE (W06 - REQUIRED)
-- =========================================

CREATE TABLE IF NOT EXISTS volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_volunteer
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_volunteer
        UNIQUE (user_id, project_id)
);