'use strict';
/**
* TODO
* Create Service to pass student obj between routes
*/
const gausApp = angular.module('gausApp', ['ngRoute']);

gausApp.config(($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/main.html'
  })
  .when('/student', {
    templateUrl: 'partials/student_profile.html'
  })
  .when('/student/eval', {
    templateUrl: 'partials/student_eval.html'
  })
  .when('/student/wiat', {
    templateUrl: 'partials/student_test.html'
  })
  .when('/student/microcog', {
    templateUrl: 'partials/student_test.html'
  })
  .when('/student/wais', {
    templateUrl: 'partials/student_test.html'
  })
  .when('/student/new', {
    templateUrl: 'partials/student_new.html'
  })

});


gausApp.controller('studentListController', ($scope, $rootScope, $http, $location) => {
  $scope.message = "Student Lists";
  $http.get('/api/students').then((res) => {
    $scope.students = res.data.students;
  });

  $scope.getStudentProfile = function(student) {
    if (!student) {
      alert('Error No Student');
    }
    $rootScope.student = student;
    $location.url('/student');
  };
});

gausApp.controller('newStudentController', ($scope, $http) => {
  $scope.title = "Create New Student";

  //Submit Event Handler
  $scope.submit = function() {

    if (!parseStudent($scope.student)) {
      alert('Incorrect Input');
    }
    postStudent($scope.student);
  }

  //Tests for null or bad input
  // TODO
  //
  function parseStudent(student) {
    for (let prop in student) {
      if (student[prop] === null) {
        return false;
      }
    }
    return true;
  }

  //Sends POST request to API with
  //student obj as payload
  function postStudent(student) {
    $http.post('/api/students/new', $scope.student).then((res) => {

    });
  }
});


gausApp.controller('studentProfileController', ($scope, $rootScope, $http) => {
  $scope.message = 'Student Profile';
  $scope.student = $rootScope.student;
  $rootScope.student = null;
  $http.get('/api/students/' + $scope.student._id).then((res) => {
    $scope.student = res.data.student;
  });
});
