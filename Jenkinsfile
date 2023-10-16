pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {        
        stage('Build') {
            steps {
                // Change directory to the todo-app folder
                dir('todo-app') {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }
    
        
        
        stage('Test') {
            steps {
                dir('todo-app') {
                    // Add steps to run tests here (if applicable)
                    // For React, you might use a testing framework like Jest
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('todo-app') {
                    sh 'npm run build'
                }
            }
        }
    }
    
}
