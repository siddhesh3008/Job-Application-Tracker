"""
Utility functions for analytics and data processing.
"""

from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from .models import Application, ApplicationStatus
from datetime import datetime


def calculate_status_stats(db: Session) -> list[dict]:
    """
    Calculate count of applications by status.
    
    Args:
        db: Database session
        
    Returns:
        List of dicts with status and count
    """
    stats = db.query(
        Application.status,
        func.count(Application.id).label('count')
    ).group_by(Application.status).all()
    
    return [{"status": stat.status.value, "count": stat.count} for stat in stats]


def calculate_monthly_stats(db: Session, limit: int = 12) -> list[dict]:
    """
    Calculate applications per month for the last N months.
    
    Args:
        db: Database session
        limit: Number of months to include
        
    Returns:
        List of dicts with month and count
    """
    stats = db.query(
        func.strftime('%Y-%m', Application.application_date).label('month'),
        func.count(Application.id).label('count')
    ).group_by('month').order_by('month').limit(limit).all()
    
    return [{"month": stat.month, "count": stat.count} for stat in stats]


def calculate_company_stats(db: Session, limit: int = 10) -> list[dict]:
    """
    Calculate top companies by application count.
    
    Args:
        db: Database session
        limit: Number of top companies to return
        
    Returns:
        List of dicts with company_name and count
    """
    stats = db.query(
        Application.company_name,
        func.count(Application.id).label('count')
    ).group_by(Application.company_name).order_by(func.count(Application.id).desc()).limit(limit).all()
    
    return [{"company_name": stat.company_name, "count": stat.count} for stat in stats]
