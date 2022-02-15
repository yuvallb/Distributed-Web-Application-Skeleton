# Web Application skeleton

This is a minimalist application skeleton, for demonstrating a distributed web application. This example uses nodejs, mongodb and redis. To run the application locally, open each component in a separate terminal window, as explained below.

## Prerequisites

* git
* node
* docker

## Database

We will use MongoDB for a database service. To run MongoDB locally, open a new terminal window and run: 
```bash
docker run -p 27017:27017 mongo 
```
To exit, hit Ctrl-C

## Cache and Queue

We will use Redis for both a caching service and a queuing service. To run Redis locally, open a new terminal window and run: 
```bash
docker run -p 6379:6379 redis 
```
To exit, hit Ctrl-C

## Backend API

We will use a nodeJS application listening on port 8080.
To run ther backend api server locally, open a new terminal window and run: 
```bash
cd api
node run start 
```
To exit, hit Ctrl-C

## Backend Email Sender

We will use a nodeJS application, listening to a redis queue.
To run ther backend email sender locally, open a new terminal window and run: 
```bash
cd email-sender
node run start 
```
To exit, hit Ctrl-C


## Frontend

We will use a simple html page, served by nodeJS (using react-scripts) listening on port 8000.
To run ther frontend web server locally, open a new terminal window and run: 
```bash
cd frontend
npm install
npm run start 
```
To browse the webapp, open a browser at http://localhost:8000

To exit, hit Ctrl-C

Frontend Code is based on https://github.com/bezkoder/react-crud-web-api .

