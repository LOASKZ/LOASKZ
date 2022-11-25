const chalk = require('chalk');
const axios = require('axios');
const crypto = require('crypto');
const spin = require('spinnies');
const { sizeFormatter } = require('human-readable');
const fs = require('fs');
const util = require('util');
const { fromBuffer } = require('file-type');
const moment = require("moment-timezone");

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const spinner = { 
  "interval": 120,
  "frames": [
    "=           [NeKosmic ✓] 🕛",
    "===         [NeKosmic ✓] 🕐",
    "=====       [NeKosmic ✓] 🕑",
    "=======     [NeKosmic ✓] 🕒",
    "=====       [NeKosmic ✓] 🕓",
    "===         [NeKosmic ✓] 🕔",
    "=           [NeKosmic ✓] 🕕",
    "===         [NeKosmic ✓] 🕖",
    "=====       [NeKosmic ✓] 🕗",
    "=======     [NeKosmic ✓] 🕙",
    "=====       [NeKosmic ✓] 🕚",
    "===         [NeKosmic ✓] 🕛"
  ]}

        let globalSpinner;


        const getGlobalSpinner = (disableSpins = false) => {
        if(!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
        return globalSpinner;
        }

        spins = getGlobalSpinner(false)

        const start = (id, text) => {
	       spins.add(id, {text: text})
	       }
	
        const success = (id, text) => {
	       spins.succeed(id, {text: text})
	       }
	
	    const close = (id, text) => {
	       spins.fail(id, {text: text})
           }

function format(...args) {
	return util.format(...args)
}

const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " Dia " : " Dias ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " Hora " : " Horas ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " Minuto " : " Minutos ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " Segundo " : " Segundos ") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

const formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		return e
	}
}

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

const createSerial = (size) => {
            return crypto.randomBytes(size).toString('hex').slice(0, size);
        };

const pickRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)]
}

const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const mytime = moment(Date.now()).tz('America/Lima').locale('pe').format('DD/MM/YY HH:mm:ss')//Zona horaria 

module.exports = { color, start, success, close, format, runtime, formatp, sleep, fetchJson, getBuffer, getRandom, createSerial, pickRandom, isUrl, getRandomIntInclusive, mytime }

//============Auto Actualización :v=======================//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.cyan(`\n\n${__filename} :\n[!] Fue actualizado con exito ✓\n\n`))
	delete require.cache[file]
	require(file)
})
