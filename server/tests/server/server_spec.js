
require(TEST_HELPER) // <--- This must be at the top of every test file.

var request = require('supertest')
var routes = require(__server + '/server.js')

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it_("serves an example endpoint", function * () {

    //
    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
    yield request(app)
      .get('/api/tags-example')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.include('node')
      })
  })
})

describe('GET /issues', function (){
  it('respond with json', function(done) {
    request(app)
      .get('/issues')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });
});