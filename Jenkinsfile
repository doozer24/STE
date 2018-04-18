pipeline {
  agent {
      docker { image 'node:7-alpine' }
  }
  stages {
    stage('Node Validation') {
      steps {
        sh 'node --version'
      }
    }
    stage('Build') {
      steps {
        sh 'docker info'
        sh 'docker build -t sevis-challenge-front/test:${BUILD_NUMBER} .'
        sh 'docker tag sevis-challenge-front/test:${BUILD_NUMBER} sevis-challenge-front/test:latest'
        sh 'docker images'
      }
    }
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
        //sh './bin/compose.sh run app npm run test:coverage'
        echo 'Code Coverage'
      }
    }
  }
}
