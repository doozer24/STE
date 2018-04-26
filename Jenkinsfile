podTemplate(label: 'sevis-front', containers: [
  containerTemplate(name: 'node-test', image: 'slapers/alpine-node-chromium', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'docker', image: 'docker:dind', command: 'cat', ttyEnabled: true, privileged: true),
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:latest', command: 'cat', ttyEnabled: true),
  // containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'aws', image: 'mesosphere/aws-cli', command: 'cat', ttyEnabled: true,
  envVars: [
  secretEnvVar(key: "AWS_ACCESS_KEY_ID", secretName: 'awscreds', secretKey: 'key'),
  secretEnvVar(key: "AWS_SECRET_ACCESS_KEY", secretName: 'awscreds', secretKey: 'secret')
  ])
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
])
{
  node('sevis-front') {
    try{
      stage('Test') {
        container('node-test') {
          checkout scm
          sh "npm install"
          sh "npm run build"
          sh "npm test"
        }
      }
    }
    finally {
        junit 'reports/*.xml'
    }

    stage('Static Analysis') {
      timeout(time: 5, unit: 'MINUTES') {
        retry(3) {
          def scannerHome = tool 'SonarQube Scanner 2.8';
          withSonarQubeEnv('sonarqube') {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }

    stage('Build Container') {
      def ecr_login = ""
      container('aws') {
        sh "aws ecr get-login --no-include-email --region us-east-1 > login.txt"
        ecr_login = readFile('login.txt')
      }
      container('docker') {
        withEnv(["ecr_login=${ecr_login}"])  {
          sh '''
        ${ecr_login}
        docker build -t sevis-challenge-front .
        docker tag sevis-challenge-front 036167247202.dkr.ecr.us-east-1.amazonaws.com/sevis-challenge-front:${BUILD_NUMBER}
        docker push 036167247202.dkr.ecr.us-east-1.amazonaws.com/sevis-challenge-front:${BUILD_NUMBER}
        '''
        }
      }
    }
    stage('Deploy to staging') {
      container('kubectl') {
        sh '''
        cat kube/deployments/sevis-challenge-front.yaml | sed s/latest/${BUILD_NUMBER}/g | kubectl replace --namespace=staging -f -
        '''
      }
    }
  }
}
