pipeline {
  agent any
  environment {
      PROJ_HOME="${WORKSPACE}"
  }
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
        //sh './bin/compose.sh run app npm run test:coverage'
        echo 'Code Coverage'
      }
    }
    // Prod Artifact Upload
    stage('Prod Artifact Upload') {
      steps {
        sh './bin/compose.sh run app npm run build:prod'

        // Tar the build artifact with the name being a combination of a branch name and build number
        sh 'tar vczf $BRANCH_NAME\\_$BUILD_NUMBER.tar.gz -C $(pwd)/dist .'

        withCredentials([[
        $class: "AmazonWebServicesCredentialsBinding",
        credentialsId: "techchallenge_aws"]]) {
          // Upload tar'd build artifact to S3
          sh 'aws s3api put-object --bucket challenge-artifacts --key versions/$BRANCH_NAME/$BRANCH_NAME\\_$BUILD_NUMBER.tar.gz --body $BRANCH_NAME\\_$BUILD_NUMBER.tar.gz'
        }
      }
    }
  }
  post {
   success {
    slackSend color: "good", message:"Passed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
   failure {
     slackSend color: "danger", message:"Failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
 }
}
