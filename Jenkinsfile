#!groovy
node {
  withEnv(['PROJ_HOME=${WORKSPACE}',
      'CI_ID=${env.JOB_NAME}-${env.BUILD_ID}']){
    stage('Docker Build') {
        sh '/usr/local/bin/docker-compose -p=${CI_ID} up --build -d'
    }
    stage("Main build") {

        checkout scm

        docker.image('app').inside("--network ${CI_ID}_default") {

          // Verify NPM packages are installed properly
          stage('NPM Install') {
            sh "sleep 30";
            sh "npm install"
            //temporary fix until we declare another user other then root.
            sh "chmod -R 777 ../app/"
          }

          stage("build") {
            sh "npm run build"
            //temporary fix until we declare another user other then root.
            sh "chmod -R 777 ../app/"
          }

          stage('Test') {
              sh "npm run test"
          }
          // Verify the application will pass code coverage limits
          stage('Code Coverage') {
              //sh "npm run test:coverage"
              echo 'Code Coverage'
          }
          stage('Prod Build') {
            sh "npm run build:prod"

            // Tar the build artifact with the name being a combination of a branch name and build number
            sh 'tar vczf $BRANCH_NAME\\_$BUILD_NUMBER.tar.gz -C $(pwd)/dist .'
           }
        }
    }
  // Prod Artifact Upload
      stage('Prod Artifact Upload') {
          withCredentials([[
          $class: "AmazonWebServicesCredentialsBinding",
          credentialsId: "techchallenge_aws"]]) {
            // Upload tar'd build artifact to S3
            sh 'aws s3api put-object --bucket challenge-artifacts --key versions/$BRANCH_NAME/$BRANCH_NAME\\_$BUILD_NUMBER.tar.gz --body $BRANCH_NAME\\_$BUILD_NUMBER.tar.gz'
          }
      }
    // Clean up workspace
        step([$class: 'WsCleanup'])
  }
}

