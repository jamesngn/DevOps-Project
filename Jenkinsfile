pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {        
        stage('build docker image') {
            steps {
                dir('todo-app'){
                    sh 'docker build -t whatodo.azurecr.io/todo-app .'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}
