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
        stage('deploy web app'){
            steps{
                withCredentials([azureServicePrincipal('azureServicePrincipal')]) {
                    sh 'az login --service-principal -u ${AZURE_CLIENT_ID} -u ${AZURE_CLIENT_SECRET} -t ${AZURE_TENANT_ID}'
                }
                withCredentials([usernamePassword(credentialsId: 'ACR', passwordVariable: 'password', usernameVariable: 'username')]) {
                    sh 'az webapp config container set --name whatodo --resource-group whatodo_group --docker-custom-image-name whatodo.azurecr.io/todo-app:latest --docker-registry-server-url https://whatodo.azurecr.io --docker-registry-server-user ${username} --docker-registry-server-password ${password}'
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
