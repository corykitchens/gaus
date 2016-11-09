'use strict';
/**
* TODO
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
    templateUrl: 'partials/student_assess.html'
  })
  .when('/student/new', {
    templateUrl: 'partials/student_new.html'
  })
  .otherwise({redirectTo: '/'});
});


gausApp.controller('RootCtrl', ($scope, flash) => {
  $scope.flash = flash;
});
/**
* @name Student List Controller
*/
gausApp.controller('studentListController', ($scope, $rootScope, $http, $location, flash) => {
  $scope.title = "Student Listing";
  //TODO test for 500/404 statuses
  $http.get('/api/students').then((res) => {
    $scope.students = res.data.students;
  });

});

/**
* @name New Student Controller
*/
gausApp.controller('newStudentController', ($scope, $http, $rootScope, $location, flash) => {
  $scope.flash = flash;
  $scope.title = "Create New Student";
  //Submit Event Handler
  $scope.submit = function() {
    if (!parseStudent($scope.student)) {
      // Send this as a flash message instead
      flash.setMessage("Error invalid values submitted");
    } else {
      postStudent($scope.student);
    }
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
    if (isNaN(student.csub_id)) {
      return false;
    }
    return true;
  }

  //Sends POST request to API with
  //student obj as payload
  function postStudent(student) {
    $http.post('/api/students/new', $scope.student).then((res) => {
      if (res.status === 200) {
        flash.setMessage('Created Student Successful');
      } else {
        flash.setMessage('Error creating student');
      }
      $location.path('/');
    });
  }
});
/**
* @name Student Profile Controller
*/
gausApp.controller('studentProfileController', ($scope, $rootScope, $http, $location, flash) => {
  $scope.flash = flash;
  $scope.message = 'Student Profile';
  let urlParams = $location.search();
  $http.get('/api/students/' + urlParams.id).then((res) => {
    $scope.student = res.data.student;
  });

  $scope.deleteStudent = function() {
    // TODO
    // Confirm with Modal
    sendDeleteRequest($scope.student);
  };


  $scope.updateStudent = function() {
    sendPutRequest($scope.student);
  }

  function sendDeleteRequest(student) {
    $http.delete('/api/students/' + student._id).then((res) => {
      flash.setMessage(res.data.msg);
      $location.path('/');
    });
  }

  function sendPutRequest(student) {
    $http.put('/api/students/' + student._id, student).then((res) => {
      flash.setMessage(res.data.msg);
      $location.path('/student?id='+student._id);
    });
  }
});
/**
* @name Student Test Controller
*/
gausApp.controller('studentAssessController', ($scope, $rootScope, $location, $http, flash) => {
  $scope.flash = flash;

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


  $scope.submitTest = function() {
    // Parse input
    if (parseTestInput($scope.testForms)) {
      let url = '/api/students/' + $scope.student._id + '/' + $scope.testType.toLowerCase();
      $http.put(url, $scope.testForms).then((res) => {
        if (res.status === 200) {
          // $rootScope.flash = {type: "alert-success", msg: "Test saved succcesfully" };
          flash.setMessage('Test Saved Successfully');
          alert('Evaluation Scores Saved');
        }
      });
    }
  };

  function parseTestInput(testForms) {
    for (let prop in testForms) {
      // if (isNaN(testForms[prop])) {
      //   if(prop !== '_id') {
      //     // $rootScope.flash = {type: 'alert-danger', msg: 'Incorrect Input' };
      //     flash.setMessage('Incorrect input');
      //     return false;
      //   }
      // }
    }
    return true;
  }

});
/**
* @name Student Evaluation Controller
*/
gausApp.controller('studentEvalController', ($scope, $rootScope, $location, $http, flash) => {
  // TODO
  // Research other ways of calling startGraphInit without
  // polluting global namespace
  $scope.flash = flash;
  $scope.message = "Student Evaluation Results";
  let urlParams = $location.search();
  let student_id = urlParams.id;
  if (!student_id) {
    $scope.flashMessage = "Error No Student";
  } else {
    $http.get('/api/students/' + student_id).then((res) => {
      $scope.student = res.data.student;
      let studentFullName = "" +($scope.student.fname[0]+$scope.student.lname).toLowerCase();
      window.startGraphInit($scope.student.evaluations, studentFullName);
    });
  }



});

/**
* @name Flash factory
*/
gausApp.factory('flash', ($rootScope) => {
  // TODO
  // Change queue datastructure so that there will be a success or failure
  // for customizing css class declaration
  let queue = [];
  let currentMessage = '';

  $rootScope.$on('$routeChangeSuccess', () => {
    currentMessage = queue.shift() || "";
  });

  return {
    getMessage: () => {
      return currentMessage;
    },
    setMessage: (message) => {
      queue.push(message);
    },
  };
});
