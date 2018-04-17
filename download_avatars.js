var request = require('request');
var GITHUB_TOKEN = require('./secrets.js');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');


function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}


function getRepoContributors(repoOwner, repoName, cb) {
  repoOwner = process.argv[2];
  repoName = process.argv[3];
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var parsed = JSON.parse(body);

    var url = parsed.forEach(function(profile) {
      downloadImageByURL(profile.avatar_url, ("avatars/" + profile.login + ".jpg"));
    });
    cb(err, url);

  });
}






// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

