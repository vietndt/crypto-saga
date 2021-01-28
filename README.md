# crypto-saga

Is in general a crypto trading bot enabled from telegram

As can be seen from the robinhood story and wallstreetbets a common platform to strategically move across multiple accounts
is vital infrastructure to make sure we the people win and have fun doing it.

Phase 1 
Single user, exchange - short/sell leverage

Phase 2 
Multi user, exchange,  proposal creation and voting

Phase 3
Group history and rewards

# Telegram bot to perform group trades

# Installation
 1. cp token.sample.js token.js
 1. Paste in the correct bot keys
 1. zip -r telegram-bot.zip *.js node_modules/*
 1. aws lambda update-function-code --function-name telegram-bot --zip-file fileb://telegram-bot.zip --profile=tgbot
 
# General Design
In general the language should be simple, fun and allow room to evolve into something that is natural for group decision making

A newbie should be able to get the list of commands from help and then be able to start of participating

An element of proposal and voting will enable group think positions.

# Bot messaging options
Current simple format:

/exchange-short-form command ticker [options]

eg. 
/bin price BTCUSDT 
returns the price of BTC w.r.t USDT

/bin short <Asset> <Amount> <price> <leverage-ratio>
go short 

/bin long <Asset> <Amount> <price> <leverage-ratio>
go long

# Future

1. Proposals
_>/prp <participant> <long/short> <Amount> <asset> <leverage-ratio>
_> This creates a proposal to do the trade with X number of participants. 
_> Once it hits, the proposal will be created for all the those users 

# Bot development
Fork, run and submit PR!

# Acknowledgements
1. Lester Chan repo for tg bot - 