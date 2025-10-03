pipeline {
    // जेनकिंस के किसी भी एजेंट पर यह पाइपलाइन चल सकती है
    agent any

    stages {
        // पहला स्टेज: GitHub से कोड डाउनलोड करना
        stage('Checkout Code') {
            steps {
                // यहाँ अपने क्रेडेंशियल की सही ID और ब्रांच का नाम डालें
                git branch: 'main', credentialsId: '76607b4a-6259-40b4-a339-1311ead2f759', url: 'https://github.com/keshavSvishwakarma/ITEG_Management_System.git'
            }
        }

        // दूसरा स्टेज: सिर्फ बैकएंड को बिल्ड और डिप्लॉय करना
        stage('Build and Deploy Backend') {
            steps {
                // जेनकिंस को निर्देश दें कि वह 'backend' फोल्डर के अंदर जाए
                // अगर आपके फोल्डर का नाम कुछ और है, तो उसे यहाँ बदलें
                dir('backend') { 
                    script {
                        // कुछ वेरिएबल बना रहे हैं ताकि कोड साफ रहे
                        def containerName = "iteg-backend-container"
                        def imageName = "iteg-backend:latest"

                        echo "पुराना कंटेनर रोका और हटाया जा रहा है..."
                        sh "docker stop ${containerName} || true"
                        sh "docker rm ${containerName} || true"

                        echo "नई डॉकर इमेज बनाई जा रही है..."
                        // '.' का मतलब है 'करंट फोल्डर' (जो कि अब 'backend' है)
                        sh "docker build -t ${imageName} ."

                        echo "नया कंटेनर शुरू किया जा रहा है..."
                        sh "docker run -d --restart unless-stopped -p 5001:5001 --name ${containerName} ${imageName}"
                    }
                }
            }
        }
    }
}
