pipeline {
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
  }
}
