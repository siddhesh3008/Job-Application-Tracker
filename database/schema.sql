-- Job Application Tracker Database Schema
-- SQLite database schema for the mini ATS application

-- Drop table if exists (for recreating)
DROP TABLE IF EXISTS applications;

-- Applications Table
-- Stores all job application records with tracking information
CREATE TABLE applications (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Required Fields
    company_name VARCHAR(255) NOT NULL,
    job_role VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    application_date DATE NOT NULL,
    
    -- Status enum: Applied, Interview, Offer, Rejected
    status VARCHAR(50) NOT NULL DEFAULT 'Applied',
    CHECK (status IN ('Applied', 'Interview', 'Offer', 'Rejected')),
    
    -- Optional Fields
    notes TEXT,
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
-- Index on status for filtering by application status
CREATE INDEX idx_applications_status ON applications(status);

-- Index on application_date for sorting and date-based queries
CREATE INDEX idx_applications_date ON applications(application_date DESC);

-- Index on company_name for company-based analytics
CREATE INDEX idx_applications_company ON applications(company_name);

-- Composite index for status + date queries (common in analytics)
CREATE INDEX idx_applications_status_date ON applications(status, application_date DESC);

-- Sample Data (Optional - for testing)
-- Uncomment to insert test data

/*
INSERT INTO applications (company_name, job_role, location, application_date, status, notes) VALUES
('Google', 'Software Engineer', 'Mountain View, CA', '2024-01-15', 'Interview', 'Technical round scheduled'),
('Microsoft', 'Backend Developer', 'Redmond, WA', '2024-01-20', 'Applied', 'Resume submitted'),
('Amazon', 'Full Stack Developer', 'Seattle, WA', '2024-02-01', 'Interview', 'Second round completed'),
('Meta', 'Frontend Engineer', 'Menlo Park, CA', '2024-02-10', 'Offer', 'Offer received - reviewing'),
('Apple', 'Software Engineer', 'Cupertino, CA', '2024-01-25', 'Rejected', 'Did not pass technical round'),
('Netflix', 'Senior Developer', 'Los Gatos, CA', '2024-02-15', 'Applied', 'Application in review'),
('Tesla', 'Software Developer', 'Palo Alto, CA', '2024-02-05', 'Interview', 'Behavioral interview done');
*/
