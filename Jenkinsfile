pipeline {
    agent any

    stages {
        stage('Test Build Trigger With Push Event') {
            sh 'echo "Received a push event in GitHub."'
        }
        stage('Build and Test') {
            steps {
                sh 'echo "Build and Test completed."'
            }
        }
    }
}