# crypto-saga

# Telegram bot to perform group trades

# Installation
 1. cp token.sample.js token.js
 1. Paste in the correct bot keys
 1. zip -r telegram-bot.zip *.js node_modules/*
 1. aws lambda update-function-code --function-name telegram-bot --zip-file fileb://telegram-bot.zip --profile=tgbot
 
# General Design

# Bot messaging options