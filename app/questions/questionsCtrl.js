angular.module('triviaTrends').controller('questionsCtrl', function ($scope, qSrvc) {
    function addDifficulty(array) {
        array.map(function (el) {
            switch (el.difficulty) {
                case 1:
                    el.labelDifficulty = 'Easy';
                    break;
                case 2:
                    el.labelDifficulty = 'Medium';
                    break;
                case 3:
                    el.labelDifficulty = 'Hard';
                    break;
            }
        })
    }
$scope.getQuestions = function (){
    qSrvc.getQuestions().then((questions) => {
        console.log("THIS IS QUESTIONS", questions.data)
        $scope.questions = questions.data
        addDifficulty($scope.questions);
    })
}
 $scope.getQuestions()   
    $scope.getByDifficulty = function (diff) {
        console.log(diff)
        qSrvc.getByDifficulty(diff).then((questions) => {
            $scope.questions = questions.data
            addDifficulty($scope.questions);
        })
    }
    $scope.checkAnswer = function (questionId, chosenAnswer) {
        var question;
        for (var i = 0; i < $scope.questions.length; i++) {
            if ($scope.questions[i]._id == questionId) {
                question = $scope.questions[i];
                break;
            }
        }
        question.chosenAnswer = chosenAnswer;
    }
    $scope.addQuestion = function (question) {
        qSrvc.addQuestion(question).then(questions => {
            $scope.questions = questions.data
            $scope.closeModal()
        })
    }
    $scope.updateQuestion = function (question) {
        qSrvc.updateQuestion(question).then(question => {
            $scope.closeModal()
        })
    }

    $scope.deleteQuestion = function(id) {
        qSrvc.deleteQuestion(id).then(function (response) {
          $scope.getQuestions()
          $scope.closeModal()
        });
  
      }

    $scope.toggleSearch = function () {
        $scope.searchOpen = !$scope.searchOpen;
        $scope.search = {};
    }
    $scope.openModal = function (question) {
        $scope.currentQuestion = question;
        if (question) {
            $scope.editing = true;
        } else {
            $scope.addingNew = true;
        }
        $scope.modalOpen = true;
    }

    $scope.closeModal = function () {
        $scope.editing = false;
        $scope.addingNew = false;
        $scope.modalOpen = false;
    }
})