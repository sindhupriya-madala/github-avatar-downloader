const request = require('request');
const fs = require('fs');

const gitDetails = require('./config.js');
console.log('Welcome to the GitHub Avatar Downloader!');
var GITHUB_USER = gitDetails.git_user;
var GITHUB_TOKEN = gitDetails.githubToken;

function getRepoContributors(repoOwner, repoName, cb) {
  if(!repoOwner || !repoName) {
    console.log("please give repo owner and repo name as arguments");
    return -1;
  }
  const requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  var options = {
    url : requestURL,
    headers : {
      'User-Agent' : "GitHub Avatar Downloader - Student Project"
    }
  };

  request.get(options)
        .on('error', function (err) {
          throw err;
        })
        .on('response', function (response) {
          let responseData = '';
          console.log('Response message is : ', response.statusMessage);

          response.on('data',(chunk) => {
            responseData += chunk;
          });

          response.on('end', () => {
            var jsonObj = JSON.parse(responseData);
            cb("err",jsonObj);
          })

        });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', () => {
          throw error;
         })
         .on('response', (response) => {

         })
         .pipe(fs.createWriteStream(filePath));
}
const owner = process.argv[2];
const repo = process.argv[3];

getRepoContributors(owner, repo, function(err, result) {
  // FOR IN
  // for(var res in result) {
  //     const contributor = result[res];
  //     console.log(contributor.avatar_url);
  // }

  // FOR OF
  // for(var contributor of result) {
  //   console.log("avatar_url is : ", contributor.avatar_url);
  // }
  result.forEach(function({ avatar_url, login }) {
    console.log(avatar_url);
    downloadImageByURL(avatar_url, "./avatar/"+login+".jpg");

  })
});

