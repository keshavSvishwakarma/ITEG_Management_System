pipeline {
    agent any

    stages {
        // स्टेज 1: कोड डाउनलोड करना
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: '76607b4a-6259-40b4-a339-1311ead2f759', url: 'https://github.com/keshavSvishwakarma/ITEG_Management_System.git'
            }
        }

        // स्टेज 2: बैकएंड को बिल्ड और डिप्लॉय करना
        stage('Build and Deploy Backend') {
            steps {
                // 'backend' फोल्डर के अंदर जाओ
                dir('backend') {
                    script {
                        def containerName = "iteg-backend-container"
                        def imageName = "iteg-backend:latest"

                        echo "--- पुराना कंटेनर रोका और हटाया जा रहा है ---"
                        sh "docker stop ${containerName} || true"
                        sh "docker rm ${containerName} || true"
                        
                        echo "--- नई डॉकर इमेज बनाई जा रही है ---"
                        sh "docker build -t ${imageName} ."
                        
                        echo "--- नया कंटेनर शुरू किया जा रहा है ---"
                        sh "docker run -d --restart unless-stopped -p 5001:5001 --name ${containerName} ${imageName}"
                        
                        echo "--- डिप्लॉयमेंट पूरा हुआ ---"
                    }
                }
            }
        }
    }
}
