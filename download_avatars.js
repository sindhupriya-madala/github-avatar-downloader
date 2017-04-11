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

  // preparing request header with url and header
  var options = {
    url : requestURL,
    headers : {
      'User-Agent' : "GitHub Avatar Downloader - Student Project"
    }
  };

  // request method
  request.get(options)
        .on('error', function (err) {
          throw err;
        })
        .on('response', function (response) {
          let responseData = '';
          console.log('Response message is : ', response.statusMessage);
          //collecting all chunks of data into response object.
          response.on('data',(chunk) => {
            responseData += chunk;
          });

          response.on('end', () => {
            //creating JSON object from responceData.
            var jsonObj = JSON.parse(responseData);
            cb(jsonObj);
          })

        });
}

//method to download image from given url and save in the specified path.
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', () => {
          throw error;
         })
         .on('response', (response) => {

         })
         .pipe(fs.createWriteStream(filePath));
}
//collecting owner and repo names from argument list.
const owner = process.argv[2];
const repo = process.argv[3];

getRepoContributors(owner, repo, function(result) {
  // FOR IN
  // for(var res in result) {
  //     const contributor = result[res];
  //     console.log(contributor.avatar_url);
  // }

  // FOR OF
  // for(var contributor of result) {
  //   console.log("avatar_url is : ", contributor.avatar_url);
  // }
  //collecting avatar_url and login from each object from json array.
  result.forEach(function({ avatar_url, login }) {
    console.log(avatar_url);
    downloadImageByURL(avatar_url, "./avatar/"+login+".jpg");

  })
});

