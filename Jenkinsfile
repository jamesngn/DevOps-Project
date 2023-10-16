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

        stage('Build Artifact') {
            steps {
                script {
                    dir('todo-app') {
                        sh 'npm run build'
                    }
                   
                }
            }
        }
        stage('Deploy to Azure VM') {
            steps {
                script {
                    // Define your Azure VM connection details
                    azureCredentials = credentials('51eaae5d-2fa7-43d4-939a-855bf51d5d5bd')
                    azureVmIpAddress = '20.211.41.42'
                    vmUsername = 'azureuser'
                    vmPassword = 'your-vm-password'
                    warFile = '**/build/**'
                    
                    // Copy built artifacts to Azure VM
                    sh "scp -o StrictHostKeyChecking=no -r $warFile $vmUsername@$azureVmIpAddress:~/"
                }
            }
        }
    }
    
}
