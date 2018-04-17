pipeline {
  agent any
  stages {
    // Verify NPM packages are installed properly
    stage('NPM Install') {
      steps {
        sh './bin/compose.sh run app npm install'
      }
    }
    // Verify the application will build successfully
    stage('Build') {
      steps {
        sh './bin/compose.sh run app npm run build'
      }
    }
    // Verify the application will pass all karma tests 
    stage('Test') {
      steps {
        sh './bin/compose.sh run app'
      }
    }
    // Verify the application will pass code coverage limits
    stage('Code Coverage') {
      steps {
        sh './bin/compose.sh run app npm run test:coverage'
      }
    }
  }
  post {
   success {
    slackSend color: "good", message:"Passed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
   failure {
     slackSend color: "danger", message:"Passed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
 }
}
