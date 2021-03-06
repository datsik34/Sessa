const db = require('./backtestdb.js').BacktestDB;

const dma = require('./doublema.js');
const don = require('./donchian.js');
const donm = require('./donchianmid.js');
const dodon = require('./doubledonchian.js');
const dema = require('./doubleema.js');
const demaf = require('./doubleemafingertap.js');
const dmaf = require('./doublemafingertap.js');
const mp = require('./movingaverageprice.js');
const bb = require('./bband.js');
const bbem = require('./bbandema.js');
const bbt = require('./bbandtrail.js');
const tr = require('./truerange.js');
const dmal = require('./doublemalong.js');
const dmas = require('./doublemashort.js');

/*
To run: node backtest.js [arguments]
*/

function helpfile() {
  console.log(`
  To run: node backtest.js [arguments]
  Arguments:

  Strategies:
  --movingavgprice | -mp      (Moving average price crossover)
  --doublema | -dma           (Double moving average)
  --doublemafinger | -dmaf    (Double moving average fingertap)
  --doubleema | -dema         (Double exponential moving average)
  --doubleemafinger | -demaf  (Double EMA fingertap)
  --donchian | -don           (Donchian channels)
  --donchianmid | -donm       (Donchian channel mid line crossover)
  --doubledonchian | -dodon   (Double donchian channels)
  --bband | -bb               (Bollinger Bands - Mean Reversion)
  --bbandema | -bbem          (Bollinger Bands w/ EMA - Mean reversion towards trend)
  --bbandtrail | -bbt         (Bollinger Bands w/ trailing stop, reversion towards trend)
  --truerange | -tr           (Trend trade with True Range)
  --doublema-long | -dmal     (Double moving average - long only)
  --doublema-short | -dmas    (Double moving average - short only)

  --all | -a
  Calculate results for all strategies avaialable.
  Warning: Will take a long time complete.

  General:
  --help | -h
  Get information on program command line arguments and options.

  --version | -v
  Display version information.

  `);
}

function callall(response, balance) {
  mp.main(response, balance);
  dma.main(response, balance);
  dmaf.main(response, balance);
  dema.main(response, balance);
  demaf.main(response, balance);
  don.main(response, balance);
  donm.main(response, balance);
  dodon.main(response, balance);
  bb.main(response, balance);
  bbem.main(response, balance);
  bbt.main(response, balance);
  tr.main(response, balance);
  dmal.main(response, balance);
  dmas.main(response, balance);
}

db
  .getRange15Min()
  .then((response) => {
    const balance = 100;

    for (let i = 2; i < process.argv.length; i += 1) {
      switch (process.argv[i]) {
        case '--help':
          helpfile();
          break;
        case '--movingavgprice':
          mp.main(response, balance);
          break;
        case '-mp':
          mp.main(response, balance);
          break;
        case '--doublema':
          dma.main(response, balance);
          break;
        case '-dma':
          dma.main(response, balance);
          break;
        case '--doublemafinger':
          dmaf.main(response, balance);
          break;
        case '-dmaf':
          dmaf.main(response, balance);
          break;
        case '--doubleema':
          dema.main(response, balance);
          break;
        case '-dema':
          dema.main(response, balance);
          break;
        case '--doubleemafinger':
          demaf.main(response, balance);
          break;
        case '-demaf':
          demaf.main(response, balance);
          break;
        case '--donchian':
          don.main(response, balance);
          break;
        case '-don':
          don.main(response, balance);
          break;
        case '--donchianmid':
          donm.main(response, balance);
          break;
        case '-donm':
          donm.main(response, balance);
          break;
        case '--doubledonchian':
          dodon.main(response, balance);
          break;
        case '-dodon':
          dodon.main(response, balance);
          break;
        case '--bband':
          bb.main(response, balance);
          break;
        case '-bb':
          bb.main(response, balance);
          break;
        case '--bbema':
          bbem.main(response, balance);
          break;
        case '-bbem':
          bbem.main(response, balance);
          break;
        case '--bbandtrail':
          bbt.main(response, balance);
          break;
        case '-bbt':
          bbt.main(response, balance);
          break;
        case '--truerange':
          tr.main(response, balance);
          break;
        case '-tr':
          tr.main(response, balance);
          break;
        case '--doublema-long':
          dmal.main(response, balance);
          break;
        case '-dmal':
          dmal.main(response, balance);
          break;
        case '--doublema-short':
          dmas.main(response, balance);
          break;
        case '-dmas':
          dmas.main(response, balance);
          break;
        case '-h':
          helpfile();
          break;
        case '-a':
          callall(response, balance);
          break;
        case '--all':
          callall(response, balance);
          break;
        default:
          console.log('Pass --help or -h as an argument to display help information.');
          break;
      }
    }

    if (process.argv.length < 3) {
      helpfile();
    }

    console.log('============================================================');

    console.log('\n');
    console.log('Done. Ctrl-C to stop program.');
    console.log('\n');
  })
  .catch(error => console.error(error));
