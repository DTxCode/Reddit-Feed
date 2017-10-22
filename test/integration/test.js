var expect = require('chai').expect;

describe('The reddit adapter', function() {
  var adapter = new(require(__dirname + '/../../libs/redditAdapter.js'));

  it('can get the top articles from a subreddit', function(done) {
    adapter.getTops('cars', function(err, res) {
      expect(err).to.not.exist;
      expect(res).to.exist;
      expect(res.statusCode).to.equal(200);
      expect(res.data[0]).to.exist;

      done();
    });
  });

  it('errors gracefully on invalid subreddit name', function(done) {
    adapter.getTops('ianoiangrig', function(err, res) {
      expect(err).to.exist;
      expect(res.statusCode).to.not.equal(200);
      expect(res.errorMessage).to.exist;
      done();
    })
  })
});
