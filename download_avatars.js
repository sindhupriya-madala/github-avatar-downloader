const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');
var GITHUB_USER = "sindhupriya-madala";
var GITHUB_TOKEN = "7438b7051d4f103c14d43181ecfc53a7a48a03eb";
function getRepoContributors(repoOwner, repoName, cb) {
 const requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
 console.log(requestURL);
}

getRepoContributors("jQuery", "jQuery", function(err, result) {
  console.log("error is , ", error );
  console.log("result is ,", result);
});

