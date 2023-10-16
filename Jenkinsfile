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
                    sh 'npm run build'
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

        stage('Deploy to Azure App Service') {
            steps {
                script {
                    // Copy built artifacts to Azure VM
                    azureWebAppPublish azureCredentialsId: '51eaae5d-2fa7-43d4-939a-855bf51d5d5b',
                                    resourceGroup: 'whatodo_group',
                                    appName: 'whatodo',
                                    filePath: '**/build/**'
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
