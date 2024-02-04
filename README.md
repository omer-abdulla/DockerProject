ARCHITECTURE DIGRAM 

                  ┌──────────────────────┐
                  │                      │
                  │     GitHub Repo      │ 
                  │                      │
                  └─────────────┬────────┘
                               │
               ┌───────────────┴──────────────   ┐
               │                                 │
               │     GitHub Actions Workflow     │
               │                                 │
               └─────────────────┬───────────────┘
                                 │
                                 │
               ┌─────────────────┴────────┐
               │                          │ 
               │      Docker Hub          │
               │                          │    
               └────────────┬───────────  ┘
                           │
                           │
               ┌───────────┴────────┐
               │                    │
               │     AWS EC2        │
               │     Instance       │
               │                    │
               └─────────┬────────  ┘
                         │
                         │
               ┌─────────┴────────┐ 
               │                  │
               │  Node App in     │
               │   Docker         │
               │   Container      │
               │                  │
               └───────────────  ─┘

Basic directory structure

 |---. github/workflow 
 |----Dockerfile
 |---- app.js
 |----Pacakge.json
 |----package lovk.json


Make the flask application run locally using python app.js Tested the root  from the browser and got the expected response



![Screenshot (14)](https://github.com/omer-abdulla/DockerProject/assets/98330268/abfebea0-df24-4123-84c0-ba3b3d05c83d)



# DevOps Project Readme

This project is a simple Node.js application that uses Docker, GitHub, Docker Hub, and AWS EC2. The goal of this project is to create a fully automated 
DevOps pipeline that builds, tests, and deploys the application to AWS EC2.

1. Create a simple Node.js application.

// app.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World I Omer Abdullah From Dubai SOON INSHA ALLLAH !\n');
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


2. Create a Dockerfile for the Node.js application.

# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 5000

# Define the command to run your application
CMD ["node", "app.js"]


3. Create a package.json and lock.json file.

package.json 

{
  "name": "project-1",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
package lock.json 

{
  "name": "project-1",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "project-1",
      "version": "1.0.0",
      "license": "ISC"
    }
  }
}

4. Create a new repository in your GitHub account.

   I am creating a new reposirotoy called named as DockerProject

5. Push your code to the GitHub repository.

  After that i am pushing mt code into github repository these are the following  commands to push my code in github repsitory

  git init 
  git add . 
  git commit -m "first commit"
  git add origin main "repository code"
  git push origin main  

  it will automatically push to the particular repository 
  
6. Build the Docker image from the Dockerfile.
   after that i am buiding a docker image
   dockek build -t image name .

7. Run the Docker container to ensure it is working correctly.

  after build i am will run my docker it will creating on docker container 
  docker run -p 5000:5000 image name:latest
  
8. Create a new repository in Docker Hub.
   
     i am creating a new dcoker hub repository called dockerhub
    
9 . Push the Docker image to Docker Hub

    docker tag image name:latest dockerhub username/repository:1

    docker push dockerhub user name/repositoryname:1
    After it will automatically push my code into docker hub repository
     
10. Create a YAML file for GitHub Actions that builds and deploys the application.

  on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: [ubuntu-latest]
    steps:
      - name: Checkout source
        uses: actions/checkout@v3
      - name: Login to docker hub
        run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }} 
      - name: Build docker image
        run: docker build -t omer07/myhub .
      - name: Publish image to docker hub
        run: docker push omer07/myhub:latest
        
  deploy:
    needs: build
    runs-on: [aws-ec2]
    steps:
      - name: Pull image from docker hub
        run: docker pull omer07/myhub:latest
      - name: Delete old container
        run: docker rm -f myhubhub-container
      - name: Run docker container
        run: docker run -d -p 5000:5000 --name myhub-container omer07/myhub
    
11. Create an EC2 instance on AWS.
    Login to aws console and creating an ec2 instace and named as Omer instance profile and  connect the instance through ec2 instance connect
12. Install Docker on the EC2 instance.

      sudo yum install docker it will aytomatically install docker on ec2

13. Configure the EC2 instance security settings and port number.
    After the configure the ec2 security setting credencials add the port will number 5000 with custom
    
14. Connect the GitHub Actions runner to the EC2 instance.
    # Create a folder
    $ mkdir actions-runner && cd actions-runner
    # Download the latest runner package
    $ curl -o actions-runner-linux-x64-2.312.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.312.0/actions-runner-linux-x64-2.312.0.tar.gz
    # Extract the installer
    $ tar xzf ./actions-runner-linux-x64-2.312.0.tar.gz
    # Create the runner and start the configuration experience
    $ ./config.sh --url https://github.com/omer-abdulla/DockerProject --token AXOGNHEUJI7HU3TBJ5TZ3J3FXZ3RO
    # Last step, run it!
    $ ./run.sh
    
15. Run the application on the EC2 instance using the IP address and port number

     Finally you will execute the ec2 instance ip address:port number will be shown the output

    
