# BLS Spain Appointment Booking Daemon

Production-grade Python Playwright bot designed for headless operation, Cloudflare bypass, and sub-second appointment slot sniping on the BLS Spain Global portal (`usa.blsspainglobal.com`).

## Features
- **Headless Stealth Chromium**: Evasion scripts masking `navigator.webdriver`, TLS JA3/JA4 fingerprints, and browser runtime variables.
- **Cloudflare Turnstile Handler**: Automated detection and resolution of Cloudflare security challenges.
- **Sub-Second Polling**: Real-time checking of target consular jurisdictions (Los Angeles, Miami, New York, etc.).
- **Standalone Executable**: Readily packaged into a zero-dependency binary with PyInstaller.

## Quick Start

```bash
# 1. Install dependencies
pip install playwright
playwright install chromium

# 2. Run headless bot
python bls_bot.py
```

## Packaging as Standalone Executable

```bash
pip install pyinstaller
pyinstaller --onefile --noconsole bls_bot.py
```
