twitter-sampler
===============

A module that creates (or updates) a Twitter list comprised of a sample from all of the users a Twitter user follows.

Installation
------------

    npm install twitter-sampler

Usage
-----

**As a module**

TODO

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
