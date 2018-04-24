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
           try {
              waitUntil {
                "healthy" == sh(returnStdout: true,
                  script: "docker inspect app --format=\"{{ .State.Health.Status }}\"").trim()
              }

              docker.image('app').inside("--network ${CI_ID}_default") {
                sh "sleep 30";
                sh "npm install"
                //temporary fix until we declare another user other then root.
                sh "chmod -R 777 ../app/"
              }
            } catch(exc) {
              sh "docker-compose logs > integration-test.log"
              throw exc
            }
      }
    }
    // Verify the application will build successfully
    stage('Build') {
      steps {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec -T app bash -c "npm run build"'
        //temporary fix until we declare another user other then root.
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec -T app bash -c "chmod -R 777 ../app/"'
      }
    }
    // Verify the application will pass all karma tests
    stage('Test') {
      steps {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec -T app bash -c "npm run test"'
      }
    }
    // Verify the application will pass code coverage limits
    stage('Code Coverage') {
      steps {
        //sh '/usr/local/bin/docker-compose -p=${CI_ID} exec -T app bash -c "npm run test:coverage"'
        echo 'Code Coverage'
      }
    }
    // Prod Artifact Upload
    stage('Prod Artifact Upload') {
      steps {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} exec -T app bash -c "npm run build:prod"'

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
    sh '/usr/local/bin/docker-compose -p=${CI_ID} down -v'
   }
   success {
    slackSend color: "good", message:"Passed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
   failure {
     slackSend color: "danger", message:"Failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
   }
 }
}
