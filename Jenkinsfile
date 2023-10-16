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
                    azureWebAppPublish azureCredentialsId: 'azureServicePrincipal',
                                    resourceGroup: 'whatodo_group',
                                    appName: 'whatodo',
                                    filePath: '**/build/**',
                                    sourceDirectory: 'target', 
                                    targetDirectory: 'webapps'
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
