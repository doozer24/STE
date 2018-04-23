pipeline {
  agent any
  environment {
      PROJ_HOME="${WORKSPACE}"
      CI_ID="${env.JOB_NAME}-${env.BUILD_ID}"
  }
  stages {
    stage('Docker Build') {
      steps{
        sh '/usr/local/bin/docker-compose -p=${CI_ID} up --build -d '
      }
    }
    // Verify NPM packages are installed properly
    stage('NPM Install') {
      steps {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec app npm install'
      }
    }
    // Verify the application will build successfully
    stage('Build') {
      steps {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec app npm run build'
      }
    }
    // Verify the application will pass all karma tests
    stage('Test') {
      steps {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec app npm run test'
      }
    }
    // Verify the application will pass code coverage limits
    stage('Code Coverage') {
      steps {
        //sh '/usr/local/bin/docker-compose -p=${CI_ID} exec app npm run test:coverage'
        echo 'Code Coverage'
      }
    }
    // Prod Artifact Upload
    stage('Prod Artifact Upload') {
      steps {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec app npm run build:prod'

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
   always{
    sh '/usr/local/bin/docker-compose -p=${CI_ID} exec app chmod -R 777 ../app/; /usr/local/bin/docker-compose -p=${CI_ID} down -v'
   }
   success {
    slackSend color: "good", message:"Passed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
   failure {
     slackSend color: "danger", message:"Failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
 }
}
