var _ = require('lodash');
var filterFriends = require('./filter-friends');
var prepareList = require('./prepare-list');
var async = require('async');
var callNextTick = require('call-next-tick');
var Twit = require('twit');
var probable = require('probable');

function createMakeSampleList(createOpts) {
  var twitterConfig;
  var createTwit;
  var sample;

  if (createOpts) {
    twitterConfig = createOpts.twitterConfig;
    createTwit = createOpts.createTwit;
    sample = createOpts.sample;
  }

  if (!createTwit) {
    createTwit = function createTwit(opts) {
      return new Twit(opts);
    };
  }

  if (!sample) {
    sample = probable.sample;
  }

  var twit = createTwit(twitterConfig);

  return makeSampleList;

  function makeSampleList(opts, makeSampleListDone) {
    var usernamesToExclude;
    var sampleSize;

    var friendIds;
    var listId;

    if (opts) {
      usernamesToExclude = opts.usernamesToExclude;
      sampleSize = opts.sampleSize;
    }

    async.waterfall(
      [
        prepareTargetList,
        saveListId,
        getFriends,
        getSampleOfFriends,
        addFriendIdsToList        
      ],
      makeSampleListDone
    );

    function prepareTargetList(done) {
      var prepareListOpts = _.pick(opts, 'listSlug', 'listOwner');
      prepareListOpts.twit = twit;
      prepareList(prepareListOpts, done);
    }

    function saveListId(listData, done) {
      listId = listData.id;
      callNextTick(done);
    }

    function getFriends(done) {
      twit.get('friends/ids', done);      
    }

    function getSampleOfFriends(friendsData, response, done) {
      filterFriends(
        {
          twit: twit,
          friendIds: sample(friendsData.ids, sampleSize),
          usernamesToExclude: usernamesToExclude
        },
        done
      );
    }

    function addFriendIdsToList(ids, done) {
      var updateParams = {
        list_id: listId,
        user_id: ids.join(',')
      };
      twit.post('lists/members/create_all', updateParams, done);
    }
  }
}

module.exports = createMakeSampleList;
