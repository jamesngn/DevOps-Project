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
            sh 'echo "Testing"'
        }
        stage('Build App Image') {
            steps {
                scripts {
                    dockerImage = docker.build(appRegistry + ':$BUILD_NUMBER', "./todo-app/Dockerfile")
                    sh 'docker build -t whatodo.azurecr.io/todo-app .'
                }
            }
        }
        stage('Upload App Image'){
            steps{
                scripts {
                    docker.withRegistry(whatodoRegistry, registryCredential) {
                        dockerImage.push('$BUILD_NUMBER')
                        dockerImage.push('latest');
                    }
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
