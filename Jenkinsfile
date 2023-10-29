pipeline {
    agent any
    environment {
        registryCredential = 'ecr:ap-southeast-2:awscreds'
        appRegistry = '548137894424.dkr.ecr.ap-southeast-2.amazonaws.com/whatodo'
        whatodoRegistry = 'https://548137894424.dkr.ecr.ap-southeast-2.amazonaws.com'
        cluster = 'whatodoCluster'
        service = 'whatodoapp-svc'
    }
    stages {        
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build App Image') {
            steps {
                script {
                    sh 'docker compose build'
                }
            }
        }
         stage('Upload App Image to ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 548137894424.dkr.ecr.ap-southeast-2.amazonaws.com"
                    sh 'docker compose push'
                }
            }
        }
        stage('Deploy to ECS'){
            steps{
                withAWS(credentials: 'awscreds', region:'ap-southeast-2') {
                    sh 'aws ecs update-service --cluster ${cluster} --service ${service} --force-new-deployment'
                }
            }
        }
    }
}
