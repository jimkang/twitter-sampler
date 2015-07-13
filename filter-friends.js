var _ = require('lodash');

function getIdsForUsernames(twit, usernames, getDone) {
  var lookupOpts = {
    screen_name: usernames.join(','),
    include_entities: false
  };
  twit.get('users/lookup', lookupOpts, getDone);
}

function filterFriends(opts, done) {
  var twit;
  var friendIds;
  var usernamesToExclude;

  if (opts) {
    twit = opts.twit;
    friendIds = opts.friendIds;
    usernamesToExclude = opts.usernamesToExclude;
  }
  
  getIdsForUsernames(twit, usernamesToExclude, filterIds);

  function filterIds(error, excludedUsers) {
    var excludedUserIds;
    if (error) {
      done(error);
    }
    else {
      excludedUserIds = _.pluck(excludedUsers, 'id');
      var includedUserIds = friendIds.filter(userIsNotExcluded);
      done(error, includedUserIds);
    }

    function userIsNotExcluded(id) {
      return excludedUserIds.indexOf(id) === -1;
    }
  }
}

module.exports = filterFriends;
