pipeline {
  options {
    timestamps ()
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }

  agent none

  stages {
    stage('Abort previous builds'){
      steps {
        milestone(Integer.parseInt(env.BUILD_ID)-1)
        milestone(Integer.parseInt(env.BUILD_ID))
      }
    }

    stage('Test & Build') {
      parallel {
        stage('Test') {
          agent {
            kubernetes {
              label 'substra-ui-test'
              defaultContainer 'node'
              yamlFile '.cicd/agent.yaml'
            }
          }

          steps {
            sh "yarn install"
            sh "yarn eslint"
            sh "yarn test"
          }
        }

        stage('Build') {
          agent {
            kubernetes {
              label 'substra-ui-build'
              defaultContainer 'node'
              yamlFile '.cicd/agent.yaml'
            }
          }

          steps {
            sh 'yarn build'
          }
        }
      }
    }
  }
}
