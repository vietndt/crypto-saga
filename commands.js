'use strict';

/**
 * Requires
 */
const rp = require('request-promise');
const moment = require('moment');
const Binance = require('node-binance-api');


const binance = new Binance();
const config = require('./config');
const helper = require('./helper');

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

  let msg = 'Whatchu said?';
switch (command) {
  case "price":
    return  binance.prices(ticker).then((data) => {
     msg = helper.getMessage(data[ticker]);      
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
