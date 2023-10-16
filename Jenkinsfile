pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {        
        stage('Build Docker Image') {
            steps {
                dir('todo-app'){
                    sh 'docker build -t whatodo.azurecr.io/todo-app .'
                }
            }
        }
        stage('Push Image'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'ACR', passwordVariable: 'password', usernameVariable: 'username')]) {
                sh 'docker login -u ${username} -p ${password} whatodo.azurecr.io'
                sh 'docker push whatodo.azurecr.io/todo-app'
                }
            }
        }
        stage('Install Azure CLI'){
    steps{
        script {
            def password = "admin123@"  // Define your password here
            sh "echo ${password} | sudo -S apt-get update"
            sh "echo ${password} | sudo -S apt-get install -y curl gnupg lsb-release"
            sh "echo ${password} | sudo -S curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"
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
