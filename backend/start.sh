#!/bin/bash
# Quick Start Script for macOS/Linux
# Starts the FastAPI backend server

echo "Starting Job Application Tracker Backend..."

# Activate virtual environment
source venv/bin/activate

# Start Uvicorn server
echo "Starting Uvicorn server on http://localhost:8000"
echo "API Documentation at http://localhost:8000/docs"

uvicorn app.main:app --reload
