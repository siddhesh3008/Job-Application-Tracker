"""
Pydantic schemas for request/response validation.
Defines data transfer objects for API endpoints.
"""

from pydantic import BaseModel, Field, ConfigDict
from datetime import date, datetime
from typing import Optional
from enum import Enum


class ApplicationStatus(str, Enum):
    """Status options for job applications."""
    APPLIED = "Applied"
    INTERVIEW = "Interview"
    OFFER = "Offer"
    REJECTED = "Rejected"


class ApplicationBase(BaseModel):
    """Base schema for application data."""
    company_name: str = Field(..., min_length=1, max_length=255, description="Company name")
    job_role: str = Field(..., min_length=1, max_length=255, description="Job role/title")
    location: str = Field(..., min_length=1, max_length=255, description="Job location")
    application_date: date = Field(..., description="Date of application")
    status: ApplicationStatus = Field(default=ApplicationStatus.APPLIED, description="Application status")
    notes: Optional[str] = Field(None, description="Additional notes")


class ApplicationCreate(ApplicationBase):
    """Schema for creating a new application."""
    pass


class ApplicationUpdate(BaseModel):
    """Schema for updating an existing application. All fields optional."""
    company_name: Optional[str] = Field(None, min_length=1, max_length=255)
    job_role: Optional[str] = Field(None, min_length=1, max_length=255)
    location: Optional[str] = Field(None, min_length=1, max_length=255)
    application_date: Optional[date] = None
    status: Optional[ApplicationStatus] = None
    notes: Optional[str] = None


class ApplicationResponse(ApplicationBase):
    """Schema for application response with ID and timestamps."""
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Analytics Schemas

class StatusStats(BaseModel):
    """Statistics grouped by status."""
    status: str
    count: int


class MonthlyStats(BaseModel):
    """Applications count per month."""
    month: str
    count: int


class CompanyStats(BaseModel):
    """Applications count per company."""
    company_name: str
    count: int


class AnalyticsResponse(BaseModel):
    """Complete analytics response."""
    total_applications: int
    status_breakdown: list[StatusStats]
    monthly_trend: list[MonthlyStats]
    top_companies: list[CompanyStats]
