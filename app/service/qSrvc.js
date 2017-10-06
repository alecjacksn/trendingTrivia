angular.module('triviaTrends').service('qSrvc', function($http){
    this.getQuestions = function(){
        return $http.get('https://practiceapi.devmountain.com//api/trivia/questions')        
    }
    this.getByDifficulty = function(diff){
        return $http.get('https://practiceapi.devmountain.com/api/trivia/questions/difficulty/' + diff)
    }
    this.addQuestion = function(question) {
        return $http.post('https://practiceapi.devmountain.com/api/trivia/questions', question)
    }

    this.updateQuestion = function(question) {
        return $http.put('https://practiceapi.devmountain.com/api/trivia/questions/' + question._id, question)
    }

    this.deleteQuestion = function(id) {
        return $http.delete('https://practiceapi.devmountain.com/api/trivia/questions/' + id)
    }
})