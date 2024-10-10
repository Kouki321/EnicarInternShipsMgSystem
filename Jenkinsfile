pipeline {
    agent any

    environment {
        BACKEND_DIR = 'InternShpisManagement_SERVER-master'
        FRONTEND_DIR = 'InternShpisManagement_FRONT-Oussama'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the whole repository
                git 'https://github.com/Kouki321/EnicarInternShipsMgSystem.git'
            }
        }
        
        stage('Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    // Assuming you use Maven for backend, adjust if necessary
                    sh './mvnw clean install'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    // Assuming you use npm for frontend, adjust if necessary
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh './mvnw test' // Adjust if you have other test commands
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    // Assuming you use npm test for frontend, adjust if necessary
                    sh 'npm test'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    echo 'Deploying Backend...'
                    // Add your deployment steps here
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo 'Deploying Frontend...'
                    // Add your deployment steps here
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
