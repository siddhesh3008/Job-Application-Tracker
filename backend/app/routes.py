"""
API routes for job application management.
Implements CRUD operations and analytics endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .database import get_db
from .models import Application
from .schemas import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    AnalyticsResponse,
    StatusStats,
    MonthlyStats,
    CompanyStats
)
from .utils import calculate_status_stats, calculate_monthly_stats, calculate_company_stats

router = APIRouter(prefix="/applications", tags=["applications"])


@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new job application.
    
    Args:
        application: Application data
        db: Database session
        
    Returns:
        Created application with ID and timestamps
    """
    db_application = Application(**application.model_dump())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application


@router.get("", response_model=List[ApplicationResponse])
def get_applications(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Retrieve all job applications with pagination.
    
    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session
        
    Returns:
        List of applications
    """
    applications = db.query(Application).order_by(
        Application.application_date.desc()
    ).offset(skip).limit(limit).all()
    return applications


@router.get("/stats", response_model=AnalyticsResponse, tags=["analytics"])
def get_analytics(db: Session = Depends(get_db)):
    """
    Get analytics data for all applications.
    
    Args:
        db: Database session
        
    Returns:
        Analytics including total count, status breakdown, monthly trend, and top companies
    """
    total = db.query(Application).count()
    status_stats = calculate_status_stats(db)
    monthly_stats = calculate_monthly_stats(db)
    company_stats = calculate_company_stats(db)
    
    return {
        "total_applications": total,
        "status_breakdown": status_stats,
        "monthly_trend": monthly_stats,
        "top_companies": company_stats
    }


@router.get("/{application_id}", response_model=ApplicationResponse)
def get_application(
    application_id: int,
    db: Session = Depends(get_db)
):
    """
    Retrieve a single job application by ID.
    
    Args:
        application_id: Application ID
        db: Database session
        
    Returns:
        Application details
        
    Raises:
        HTTPException: If application not found
    """
    application = db.query(Application).filter(Application.id == application_id).first()
    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with id {application_id} not found"
        )
    return application


@router.put("/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: int,
    application_update: ApplicationUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing job application.
    
    Args:
        application_id: Application ID
        application_update: Fields to update
        db: Database session
        
    Returns:
        Updated application
        
    Raises:
        HTTPException: If application not found
    """
    db_application = db.query(Application).filter(Application.id == application_id).first()
    if db_application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with id {application_id} not found"
        )
    
    # Update only provided fields
    update_data = application_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_application, field, value)
    
    db.commit()
    db.refresh(db_application)
    return db_application


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a job application.
    
    Args:
        application_id: Application ID
        db: Database session
        
    Raises:
        HTTPException: If application not found
    """
    db_application = db.query(Application).filter(Application.id == application_id).first()
    if db_application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with id {application_id} not found"
        )
    
    db.delete(db_application)
    db.commit()

