pipeline {
  agent { label 'sevis-demo' }
  environment {
     PROJ_HOME="${WORKSPACE}"
     CI_ID="${env.BUILD_ID}"
  }
  stages {
    // Verify the application will build successfully
    stage('Build') {
      steps {
        sh './bin/compose.sh -p=${CI_ID} build'
        //just need to run the install, then we can use docker compose normal.
        sh './bin/compose.sh -p=${CI_ID} run app bash -c "npm install && chmod -R o+rw /app/"'
        sh './bin/compose.sh -p=${CI_ID} up -d'
        sh './bin/compose.sh -p=${CI_ID} exec -T app bash -c "npm run build && chmod -R o+rw /app/"'
      }
    }
    // Verify the application will pass all karma tests
    stage('Test') {
      steps {
        sh './bin/compose.sh -p=${CI_ID} exec -T app bash -c "npm run test && chmod -R o+rw /app/"'
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
        sh './bin/compose.sh -p=${CI_ID} exec -T app bash -c "npm run build:prod && chmod -R o+rw /app/"'

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
   always {
     sh './bin/compose.sh -p=${CI_ID} down'
   }
   success {
    //slackSend color: "good", message:"Passed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    echo "job passed"
   }
   failure {
     //slackSend color: "danger", message:"Failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
      echo "job failed"
   }
 }
}
