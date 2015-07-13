twitter-sampler
===============

A module that creates (or updates) a Twitter list comprised of a sample from all of the users a Twitter user follows.

Installation
------------

    npm install twitter-sampler

Usage
-----

**As a module**

First, instantiate a makeSampleList function:

    var createMakeSampleList = require('make-sample-list');
    var makeSampleList = createMakeSampleList({
      twitterConfig: {
        consumer_key: 'asdfkljqwerjasdfalpsdfjas',
        consumer_secret: 'asdfasdjfbkjqwhbefubvskjhfbgasdjfhgaksjdhfgaksdxvc',
        access_token: '9999999999-zxcvkljhpoiuqwerkjhmnb,mnzxcvasdklfhwer',
        access_token_secret: 'opoijkljsadfbzxcnvkmokwertlknfgmoskdfgossodrh'
      }
    });

For added control and/or testing, you can optionally specify `createTwit` and `sample` in the `createMakeSampleList` opts.

`createTwit` should be a function that produces an object that behaves like [Twit](https://github.com/ttezel/twit).

`sample` should be a function that [takes an array and a sample size](https://github.com/jimkang/probable/blob/master/probable.js#L251) and returns a random sampling from the array of that size.

(If you don't provide these, twitter-sampler will fill them in for you.)

Then, you can use `makeSampleList`.

  var makeSampleListOpts = {
    listOwner: 'smidgeo',
    listSlug: 'importants-ppls',
    usernamesToExclude: ['deathmtn'],
    sampleSize: 50
  };

  makeSampleList(makeSampleListOpts, logResult);

  function logUpdateResult(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      console.log('makeSampleList result:', JSON.stringify(result, null, '  '));
    }
  }

The logged output will be the result of the final Twitter call to add members to the 'importants-ppls' list. If there was no error, there should be a list with the name you specified for the user corresponding to the Twitter credentials you provided.

All of the opts are required except for `usernamesToExclude`.

**As a tool**

There's a tool included that you can use like so:

    cd node_modules/twitter-sampler
    make run-scratch

This should create a `sample-of-the-week` list for your Twitter account containing 50 users sampled at random, if you have set up a `config.js` file, as described below in the Tests section.

I personally have it run daily at 5 AM EDT using the following cron entry:

0 9 * * * cd ~/where-it-is-installed/twitter-sampler && make run-scratch

Tests
-----

Create a `config.js` file in the project root that contains your [Twitter API keys](https://apps.twitter.com/). Example:

    module.exports = {
      twitter: {
        consumer_key: 'asdfkljqwerjasdfalpsdfjas',
        consumer_secret: 'asdfasdjfbkjqwhbefubvskjhfbgasdjfhgaksjdhfgaksdxvc',
        access_token: '9999999999-zxcvkljhpoiuqwerkjhmnb,mnzxcvasdklfhwer',
        access_token_secret: 'opoijkljsadfbzxcnvkmokwertlknfgmoskdfgossodrh'
      },
      testListOwner: 'you',
      excludeUsernames: [
        'deathmtn'
      ]
    };

The test can then read this for Twitter API credentials and settings. You can run it with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
