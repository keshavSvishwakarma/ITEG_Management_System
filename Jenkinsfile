pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    // Get changed files in the last commit
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim().split("\n")
                    
                    // Flags for build
                    env.BUILD_FRONTEND = changes.any { it.startsWith("frontend/") } ? "true" : "false"
                    env.BUILD_BACKEND = changes.any { it.startsWith("backend/") } ? "true" : "false"

                    echo "BUILD_FRONTEND = ${env.BUILD_FRONTEND}"
                    echo "BUILD_BACKEND = ${env.BUILD_BACKEND}"
                }
            }
        }

        stage('Build & Deploy Frontend') {
            when { expression { env.BUILD_FRONTEND == "true" } }
            steps {
                dir('frontend') {
                    sh 'docker build -t iteg-frontend .'
                    sh 'docker stop iteg-frontend-container || true'
                    sh 'docker rm iteg-frontend-container || true'
                    sh 'docker run -d -p 5002:5002 --name iteg-frontend-container iteg-frontend'
                }
            }
        }

        stage('Build & Deploy Backend') {
            when { expression { env.BUILD_BACKEND == "true" } }
            steps {
                dir('backend') {
                    sh 'docker build -t iteg-backend .'
                    sh 'docker stop iteg-backend-container || true'
                    sh 'docker rm iteg-backend-container || true'
                    sh 'docker run -d -p 5001:5001 --name iteg-backend-container iteg-backend'
                }
            }
        }
    }
}
