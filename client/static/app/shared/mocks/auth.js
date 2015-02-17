define(function(require) {
  'use strict';

  var data = {
    _id: "54e257937039dbb8088eef39",
    email: "test@test.com",
    isEmailConfirmed: false,
    role: "user",
    username: "UserName"
  };

  return Mock;

  function Mock($httpBackend, regexpUrl) {
    $httpBackend.when('GET', regexpUrl('\/auth\/me')).respond(data);
  }

});