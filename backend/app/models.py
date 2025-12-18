"""
Database models for the Job Application Tracker.
Defines the Application model with all required fields.
"""

from sqlalchemy import Column, Integer, String, Text, Date, DateTime, Enum
from sqlalchemy.sql import func
from datetime import datetime
import enum
from .database import Base


class ApplicationStatus(str, enum.Enum):
    """Enum for application status values."""
    APPLIED = "Applied"
    INTERVIEW = "Interview"
    OFFER = "Offer"
    REJECTED = "Rejected"


class Application(Base):
    """
    Application model representing a job application.
    
    Attributes:
        id: Primary key
        company_name: Name of the company
        job_role: Title of the job role
        location: Job location
        application_date: Date when application was submitted
        status: Current status (Applied, Interview, Offer, Rejected)
        notes: Optional notes about the application
        created_at: Timestamp when record was created
        updated_at: Timestamp when record was last updated
    """
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255), nullable=False, index=True)
    job_role = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    application_date = Column(Date, nullable=False, index=True)
    status = Column(Enum(ApplicationStatus), nullable=False, index=True, default=ApplicationStatus.APPLIED)
    notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    def __repr__(self):
        return f"<Application(id={self.id}, company='{self.company_name}', role='{self.job_role}', status='{self.status}')>"
