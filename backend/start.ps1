# Quick Start Script for Windows
# Starts the FastAPI backend server

Write-Host "Starting Job Application Tracker Backend..." -ForegroundColor Green

# Activate virtual environment
& .\venv\Scripts\Activate.ps1

# Start Uvicorn server
Write-Host "Starting Uvicorn server on http://localhost:8000" -ForegroundColor Cyan
Write-Host "API Documentation at http://localhost:8000/docs" -ForegroundColor Cyan

uvicorn app.main:app --reload
