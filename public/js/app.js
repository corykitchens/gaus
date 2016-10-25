'use strict';
/**
* TODO
* Query backend to return test object based on test type
* Send flash messages based on success/failures
* Refactor controllers/routers/ in seperate files
*/
const gausApp = angular.module('gausApp', ['ngRoute']);

/**
* @name Route Handling
*/
gausApp.config(($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/student_list.html'
  })
  .when('/student', {
    templateUrl: 'partials/student_profile.html'
  })
  .when('/student/eval', {
    templateUrl: 'partials/student_eval.html'
  })
  .when('/student/test', {
    templateUrl: 'partials/student_test.html'
  })
  .when('/student/new', {
    templateUrl: 'partials/student_new.html'
  })
});

/**
* @name Student List Controller
*/
gausApp.controller('studentListController', ($scope, $rootScope, $http, $location) => {
  $scope.title = "Student Listing";

  //TODO test for 500/404 statuses
  $http.get('/api/students').then((res) => {
    $scope.students = res.data.students;
  });

});

/**
* @name New Student Controller
*/
gausApp.controller('newStudentController', ($scope, $http, $rootScope, $location) => {
  $scope.title = "Create New Student";

  //Submit Event Handler
  $scope.submit = function() {
    if (!parseStudent($scope.student)) {
      // Send this as a flash message instead
      alert('Incorrect Input');
    }
    postStudent($scope.student);
  }

  function parseStudent(student) {
    // Iterates through student properties
    // Tests for undefined or null values
    for (let prop in student) {
      if (student[prop] === undefined) {
        return false;
      }
      else if (student[prop] === null) {
        return false;
      }
    }
    //Verifies whether a valid ID is passed
    if (Number(student.csub_id) === NaN) {
      return false;
    }
    return true;
  }

  //Sends POST request to API with
  //student obj as payload
  function postStudent(student) {
    $http.post('/api/students/new', $scope.student).then((res) => {
      if (res.status === 200) {
        $rootScope.flash = "Student created successful";
      } else {
        $rootScope.flash = "Error creating Student";
      }
      $location.path('/');
    });
  }
});
/**
* @name Student Profile Controller
*/
gausApp.controller('studentProfileController', ($scope, $rootScope, $http, $location) => {
  $scope.message = 'Student Profile';
  let urlParams = $location.search();
  $http.get('/api/students/' + urlParams.id).then((res) => {
    $scope.student = res.data.student;
  });
});
/**
* @name Student Test Controller
*/
gausApp.controller('studentTestController', ($scope, $rootScope, $location, $http) => {
  let urlParams = $location.search();
  if (urlParams.testtype !== null) {
    $scope.testType = urlParams.testtype.toUpperCase();
  }
  let student_id = urlParams.student;
  if (!student_id) {
    $scope.flashMessage = "Error No Student";
  } else {
    $http.get('/api/students/' + student_id).then((res) => {
      $scope.student = res.data.student;
      $scope.testForms = $scope.student.evaluations[$scope.testType.toLowerCase()];
    });
  }
});
/**
* @name Student Evaluation Controller
*/
gausApp.controller('studentEvalController', ($scope, $rootScope, $location, $http) => {
  $scope.message = "Student Evaluation Results";
  let urlParams = $location.search();
  let student_id = urlParams.id;
  if (!student_id) {
    $scope.flashMessage = "Error No Student";
  } else {
    $http.get('/api/students/' + student_id).then((res) => {
      $scope.student = res.data.student;
    });
  }
});
