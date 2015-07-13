var config = require('../config.js');
var Twit = require('twit');
var createProbable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var createMakeSampleList = require('../make-sample-list');

var sampleSize = 50;

var seed = new Date().toISOString();
console.log('seed:', seed);

var probable = createProbable({
  random: seedrandom(seed)
});

var makeSampleList = createMakeSampleList({
  twitterConfig: config.twitter,
  createTwit: function createTwit(opts) {
    return new Twit(opts);
  },
  sample: probable.sample
});

var makeSampleListOpts = {
  listOwner: config.testListOwner,
  listSlug: 'sample-du-jour',
  usernamesToExclude: config.excludeUsernames,
  sampleSize: sampleSize
};

makeSampleList(makeSampleListOpts, logUpdateResult);

function logUpdateResult(error, result) {
  if (error) {
    console.log(error);
    console.log(error.stack);
  }
  else {
    console.log('Update result:', JSON.stringify(result, null, '  '));
  }
}
