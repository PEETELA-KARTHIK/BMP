# PowerShell script to start MongoDB
# Sacred Connect Project - MongoDB Startup Script

Write-Host "Starting MongoDB for Sacred Connect..." -ForegroundColor Green

# Check if MongoDB is already running
$mongoProcess = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "MongoDB is already running (PID: $($mongoProcess.Id))" -ForegroundColor Yellow
    return
}

# Create data directory if it doesn't exist
$dataDir = "C:\data\db"
if (!(Test-Path $dataDir)) {
    Write-Host "Creating MongoDB data directory: $dataDir" -ForegroundColor Blue
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
}

# Start MongoDB
$mongoPath = "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"
if (Test-Path $mongoPath) {
    Write-Host "Starting MongoDB server..." -ForegroundColor Blue
    $process = Start-Process -FilePath $mongoPath -ArgumentList "--dbpath", $dataDir -PassThru -WindowStyle Hidden
    
    # Wait a moment for MongoDB to start
    Start-Sleep -Seconds 3
    
    # Test connection
    $connection = Test-NetConnection -ComputerName localhost -Port 27017 -WarningAction SilentlyContinue
    if ($connection.TcpTestSucceeded) {
        Write-Host "MongoDB started successfully! (PID: $($process.Id))" -ForegroundColor Green
        Write-Host "MongoDB is running on: mongodb://localhost:27017" -ForegroundColor Cyan
        Write-Host "Database: sacred-connect" -ForegroundColor Cyan
    } else {
        Write-Host "Failed to start MongoDB!" -ForegroundColor Red
    }
} else {
    Write-Host "MongoDB not found at: $mongoPath" -ForegroundColor Red
    Write-Host "Please ensure MongoDB is installed correctly." -ForegroundColor Red
}

Write-Host "`nTo stop MongoDB, use: Stop-Process -Name 'mongod'" -ForegroundColor Gray
Write-Host "To start your Sacred Connect server: cd C:\BMP\server && npm start" -ForegroundColor Gray
