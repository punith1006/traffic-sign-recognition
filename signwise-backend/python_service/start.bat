@echo off
echo Starting SignWise AI - Python YOLO Service
echo ============================================

cd /d %~dp0

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install requirements
call venv\Scripts\activate

echo Installing dependencies...
pip install -q -r requirements.txt

echo Starting YOLO service on http://localhost:8000
python main.py
