$git = "e:\git\cmd\git.exe"
Set-Location "e:\glowerive-shopify-theme"

Write-Host "Initializing git repository..."
& $git init

Write-Host "Configuring git user..."
& $git config user.name "noorkhanbaloch011-cyber1"
& $git config user.email "noorkhanbaloch011@gmail.com"

Write-Host "Adding files..."
& $git add .

Write-Host "Committing..."
& $git commit -m "Initial commit: Glowérive Natural Skincare Shopify 2.0 Theme"

Write-Host "Setting main branch..."
& $git branch -M main

Write-Host "Setting remote origin..."
& $git remote remove origin 2>$null
& $git remote add origin "https://github.com/noorkhanbaloch011-cyber1/Noor-Khan.git"

Write-Host "Git status & remotes:"
& $git status
& $git remote -v
