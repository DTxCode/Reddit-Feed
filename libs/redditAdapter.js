const https = require('https');
const async = require('async');

function adapter() {
  const self = this;

  self.getTops = function(subredditName, callback) {
    const url = "https://www.reddit.com/r/" + subredditName + "/top.json";

    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });

      res.on("end", () => {
        if (res.statusCode !== 200) {
          // invaid subreddit/unable to get top articles
          const errorMessage = 'Failed to get top articles for the given subreddit.';
          const errorJson = {
            'errorMessage': errorMessage,
            'statusCode': res.statusCode
          }
          callback(new Error(), errorJson);

        } else {
          // status code good, sanitize object
          body = JSON.parse(body);
          const sanitizedObject = {
            'statusCode': res.statusCode,
            'data': []
          };

          // for each article in array of top articles of subreddit
          async.each(body.data.children, function(obj, cb) {
            // put together top article
            const article = {
              'subreddit': obj.data.subreddit,
              'article_title': obj.data.title,
              'url': obj.data.url
            };

            // add to return object
            sanitizedObject.data.push(article);
            cb();
          }, function(err) {
            // called after going through entire array
            callback(err, sanitizedObject);
          });
        }
      });
      
    }).on('error', (e) => {
      callback(e, null)
    });
  }

}


module.exports = adapter;
