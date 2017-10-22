const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const redditAdapter = new(require(__dirname + '/libs/redditAdapter.js'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const router = express.Router();

router.get('/:article_name', function(req, res) {
  redditAdapter.getTops(req.params.article_name, function(err, data) {
    res.json(data);
  });
});

app.use('/api', router);

app.listen(port);

console.log('Listening on port ' + port);
