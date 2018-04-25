podTemplate(label: 'sevis-front', containers: [
  containerTemplate(name: 'node-test', image: 'slapers/alpine-node-chromium', command: 'cat', ttyEnabled: true)
  // containerTemplate(name: 'docker', image: 'docker:dind', command: 'cat', ttyEnabled: true, privileged: true),
  // containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:latest', command: 'cat', ttyEnabled: true),
  // containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true),
  // containerTemplate(name: 'aws', image: 'mesosphere/aws-cli', command: 'cat', ttyEnabled: true,
  // envVars: [
  // secretEnvVar(key: "AWS_ACCESS_KEY_ID", secretName: 'awscreds', secretKey: 'access_key'),
  // secretEnvVar(key: "AWS_SECRET_ACCESS_KEY", secretName: 'awscreds', secretKey: 'secret_key')
  // ])
])
// volumes: [
//   hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
// ])
{
  node('sevis-front') {
    stage('Test') {
      container('node-test') {
        checkout scm
        sh """
        npm install
        npm run build
        npm test

        """
      }
    }
    // stage('Build') {
    //   def ecr_login = ""
    //   container('aws') {
    //     sh "aws ecr get-login --no-include-email --region us-east-1 > login.txt"
    //     ecr_login = readFile('login.txt')
    //   }
    //   container('docker') {
    //     checkout scm
    //     withEnv(["ecr_login=${ecr_login}"])  {
    //       sh '''
    //     ${ecr_login}
    //     docker build -t open-cabinet .
    //     docker tag open-cabinet 788232951588.dkr.ecr.us-east-1.amazonaws.com/open-cabinet:${BUILD_NUMBER}
    //     docker push 788232951588.dkr.ecr.us-east-1.amazonaws.com/open-cabinet:${BUILD_NUMBER}
    //     '''
    //     }
    //   }
    // }
    // stage('Deploy') {
    //   container('kubectl') {
    //     checkout scm
    //     sh '''
    //     cat kube/deployments/rails.yaml | sed s/latest/${BUILD_NUMBER}/g | kubectl replace --namespace=oc-test -f -
    //     '''
    //   }
    // }
  }
}



// pipeline {
//   agent any
//   stages {
//     // Verify NPM packages are installed properly
//     stage('NPM Install') {
//       steps {
//         sh './bin/compose.sh run app npm install'
//       }
//     }
//     // Verify the application will build successfully
//     stage('Build') {
//       steps {
//         sh './bin/compose.sh run app npm run build'
//       }
//     }
//     // Verify the application will pass all karma tests
//     stage('Test') {
//       steps {
//         sh './bin/compose.sh run app'
//       }
//     }
//     // Verify the application will pass code coverage limits
//     stage('Code Coverage') {
//       steps {
//         //sh './bin/compose.sh run app npm run test:coverage'
//         echo 'Code Coverage'
//       }
//     }
//     // Prod Artifact Upload
//     stage('Prod Artifact Upload') {
//       steps {
//         sh './bin/compose.sh run app npm run build:prod'
//
//         // Tar the build artifact with the name being a combination of a branch name and build number
//         sh 'tar vczf $BRANCH_NAME\\_$BUILD_NUMBER.tar.gz -C $(pwd)/dist .'
//
//         withCredentials([[
//         $class: "AmazonWebServicesCredentialsBinding",
//         credentialsId: "techchallenge_aws"]]) {
//           // Upload tar'd build artifact to S3
//           sh 'aws s3api put-object --bucket challenge-artifacts --key versions/$BRANCH_NAME/$BRANCH_NAME\\_$BUILD_NUMBER.tar.gz --body $BRANCH_NAME\\_$BUILD_NUMBER.tar.gz'
//         }
//       }
//     }
//   }
//   post {
//    success {
//     slackSend color: "good", message:"Passed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
//    }
//    failure {
//      slackSend color: "danger", message:"Failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
//    }
//  }
// }
