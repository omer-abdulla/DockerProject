1. ARCHITECTURE DIGRAM 

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

2. Basic directory structure

       
 |---. github/workflow 
 |----Dockerfile
 |---- app.js
 |----Pacakge.json
 |----package lock.json


3. Make the flask application run locally using python app.js Tested the root  from the browser and got the expected response

![package-lock json - PROJECT 1 - Visual Studio Code  Administrator  04-02-2024 15_51_45](https://github.com/omer-abdulla/DockerProject/assets/98330268/0c119e97-92e8-47e2-8cfb-742242e057a9)


4. Dockerization: Dockerize the Python application

Dockerfile is used to create a docker container and consists of 



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

This Dockerfile starts by specifying that the base image is node:14, which pulls the official Node.js version 14 image from Docker Hub. It sets the working directory to /usr/src/app inside the container. Then it copies over just the package.json and package-lock.json files first. This allows npm to install the dependencies defined in package.json without needing the actual application code yet. Next it runs npm install which will download and install the dependencies. After the dependencies are installed, the Dockerfile copies over the application source code into the container's working directory. This separation of dependency installation and source code copy optimizes the build process by allowing caching of the dependencies. The Dockerfile exposes port 5000 which is the port the Node.js application will listen on. Finally, the Dockerfile defines the command to run when a container is launched from the built image. It will run node app.js to launch the Node.js application. This Dockerfile contains best practices like only copying essential files for each stage of the build process to optimize caching and performance. Let me know if this helps explain what each step of the Dockerfile is doing to containerize the Node.js application!

5 .CI/CD Implementation: Implement a Continuous Integration/Continuous Deployment (CI/CD) pipeline using Gitlab CI/CD.


CI/CD configuration automates the building and deployment of a Docker image. The image is built, tagged, and pushed to AWS ECR in the 'build' stage. In the 'deploy' stage, it connects to an EC2 instance, pulls the latest image, and runs a Docker container.


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

    6. Make sure to add the variables In Settings -> CICD -> Variables.
    


      ![Actions secrets · omer-abdulla_DockerProject - Google Chrome 04-02-2024 16_01_06](https://github.com/omer-abdulla/DockerProject/assets/98330268/388c5004-901e-423d-bb8e-83cc497083aa)


    7. Final Output
    

