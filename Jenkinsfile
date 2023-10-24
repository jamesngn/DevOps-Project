pipeline {
    agent any
    environment {
        registryCredential = 'ecr:ap-southeast-2:awscreds'
        appRegistry = '548137894424.dkr.ecr.ap-southeast-2.amazonaws.com/whatodo'
        whatodoRegistry = 'https://548137894424.dkr.ecr.ap-southeast-2.amazonaws.com'
        cluster = 'whatodoCluster'
        service = 'whatodoappsvc'
    }
    stages {        
        stage('Test') {
            steps {
                sh 'echo "Testing"'
            }
        }
        stage('Build App Image') {
            steps {
                scripts {
                    sh 'docker compose build'
                }
            }
        }
         stage('Upload App Image to ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin 548137894424.dkr.ecr.${AWS_REGION}.amazonaws.com"
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
