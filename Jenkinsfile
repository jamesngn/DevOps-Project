pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {        
        stage('Set Up Environment') {
            steps {
                // Change directory to the todo-app folder
                dir('todo-app') {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }
        
        stage('Build') {
            steps {
                dir('todo-app') {
                    // Build the React app
                    sh 'npm run build'
                }
            }
        }
        
        
        stage('Run Tests') {
            steps {
                dir('todo-app') {
                    // Add steps to run tests here (if applicable)
                    // For React, you might use a testing framework like Jest
                    sh 'echo "Running tests"'
                }
            }
        }
    }
    
}
