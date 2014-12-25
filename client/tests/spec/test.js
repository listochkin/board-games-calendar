define(function(require){

  var example = require('app-bootstrap');

  describe("Example", function() {
    it("should have a message equal to 'Hello!'", function() {
        expect('Hello!').toBe('Hello!');
    });
  });

});