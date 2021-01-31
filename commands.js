'use strict';

/**
* Requires
*/
const rp = require('request-promise');
const moment = require('moment');
const Binance = require('node-binance-api');

const config = require('./config');
const helper = require('./helper');
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
});


/**
* Internal Functions
*/

let buyall = (ticker, quantity, price) => {
  return new Promise((resolve, reject) => {
      binance.buy(ticker, quantity, price, { type: 'LIMIT' }, (error, response) => {
      if(error) reject(error);
      
      console.info('Limit Buy response', response);
      console.info('order id: ' + response.orderId);
      resolve(response);
    })
  })
};

let spotbuysaskprices = (ticker) => {
  return new Promise((resolve, reject) => {
    
    binance.bookTickers(ticker, (error, response) => {
      if(error) reject(error);
      resolve(response);
    })
  })
};
  /**
  * Commands
  */
  module.exports = {
    /**
    * Fake a error promise
    *
    * @param {string} error Error Message
    *
    * @return {object} Rejected Request Promise
    */
    error(error) {
      return Promise.reject(new Error(error));
    },
    
    
    /**
    * Binance related api 
    * 
    * Get BTC USD rate example
    * 
    * @param {object} commandArguments 
    * 
    * @returns {object} Request Promise
    */
    bin(commandArguments) {
      const command = commandArguments[0];
      const ticker = commandArguments[1];
      const quantity = commandArguments[2];
      const price = commandArguments[3];
      
      let msg = 'Whatchu said?';
      
      switch (command) {
        //futures trading
        case "fprice":
        return  binance.futuresPrices(ticker).then((data) => {
          msg = helper.getMessage(data[ticker]);      
          console.log(msg)
          return msg;
        });  
        break;
        
        //spot trading
        case "price":
        return  binance.prices(ticker).then((data) => {
          msg = helper.getMessage(data[ticker]);      
          console.log(msg)
          return msg;
        });  
        break;
        
        case "baprice":
        return  spotbuysaskprices(ticker).then((data) => {
          msg = helper.getMessage(data["bidPrice"]);
          return msg;
        });  
        break;
        
        case "buy":      
        return buyall(ticker, quantity, price)      
        .then((data) => {
          msg = helper.formatMessage('Buy Order Created','Spot Buy Order',data);          
          return msg;
        });  
        break;
        
        case "sell":
        return  binance.sell(ticker, quantity, price).then((data) => {
          msg = helper.getMessage(data["status"]);      
          console.log(msg)
          return msg;
        });  
        break;
        
        default:
        return  new Promise((resolve, reject) => {
          resolve(msg);
        });;
        break;
      }
      
    },
  };
  