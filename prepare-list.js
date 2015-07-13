var queue = require('queue-async');

// Makes sure the list is there and is clear of users.
function prepareList(opts, done) {
  var listSlug;
  var listOwner;
  var twit;

  if (opts) {
    listSlug = opts.listSlug;
    listOwner = opts.listOwner;
    twit = opts.twit;
  }

  var showListsParams = {
    slug: listSlug,
    owner_screen_name: listOwner,
  };

  opts.twit.get('lists/show', showListsParams, clearList);

  function clearList(error, listData) {
    if (error) {
      if (error.statusCode === 404) {
        createList(listSlug, passBackListDataFromCreate);
      }
      else {
        done(error);
      }
    }
    else {
      var q = queue(1);
      q.defer(destroyList, listSlug);
      q.defer(createList, listSlug);
      q.await(passBackListData);
    }
  }

  function destroyList(listSlug, destroyListDone) {
    var destroyParams = {
      slug: listSlug,
      owner_screen_name: listOwner
    };

    twit.post('lists/destroy', destroyParams, destroyListDone);
  }

  function createList(listSlug, createListDone) {
    var listCreateBody = {
      name: listSlug,
      mode: 'public',
      description: 'A sampling of friends'
    };

    twit.post('lists/create', listCreateBody, createListDone);
  }

  function passBackListData(error, destroyResult, listData) {
    done(error, listData);
  }

  function passBackListDataFromCreate(error, listData, response) {
    done(error, listData);
  }
}

module.exports = prepareList;
