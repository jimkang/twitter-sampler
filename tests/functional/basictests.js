// WARNING: This is a functional test that actually creates or modifies a 
// Twitter list.

// It requires a config.js with Twitter credentials to be in the root project 
// directory. See README for details.

var config = require('../../config.js');
var probable = require('probable');
var createMakeSampleList = require('../../make-sample-list');
var test = require('tape');

test('Functional test', function functionalTest(t) {
  t.plan(3);

  var sampleSize = probable.rollDie(50);

  var makeSampleList = createMakeSampleList({
    twitterConfig: config.twitter
  });

  var makeSampleListOpts = {
    listOwner: config.testListOwner,
    listSlug: 'functional-test',
    usernamesToExclude: config.excludeUsernames,
    sampleSize: sampleSize
  };

  makeSampleList(makeSampleListOpts, checkResult);

  function checkResult(error, result) {
    t.ok(!error, 'No error while making sample list.');
    t.equal(result.slug, 'functional-test', 'List\'s slug is correct.');
    t.equal(
      result.member_count,
      sampleSize,
      'List has ' + sampleSize + ' members, matching sample size.'
    );
  }
});
