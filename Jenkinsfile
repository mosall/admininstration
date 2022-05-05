pipeline{
	agent any
	stages{
		stage('build'){
		    steps{
		        sh 'npm install --legacy-peer-deps'
		        sh 'ng build'
		    }
		}
		stage('deploy'){
		    steps{
		        sh 'bash deploy.sh ./dist/administration /var/www/html/administration'
			}
		}
	}
}