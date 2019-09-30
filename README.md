# Patient Gateway

## Introduction

Application built on Django (including the Django REST Framework for API CRUD operations) and React.

## Requirements
* Python3
* Make sure you have pipenv installed. To install it, ```pip install pipenv```

## Getting started
1. Download the zip file provided and extract it.
2. Folder Structure ```app -> backend, frontend```

## Run the application

You will need two terminals pointed to the frontend and backend directories to start the servers for this application.

### Setting up Backend

* In the terminal, navigate to 'app'. Create a virtual environment ```pipenv shell```
* Install the dependencies ```pipenv install```
* Navigate into 'backend' ```cd backend```
* Run this command to start the backend server: ```python manage.py runserver``` (You have to run this command while you are sourced into the virtual environment)

Backend has been setup!

### Setting up Frontend

* In the terminal, navigate to 'frontend'. ```cd frontend```
* Install the dependencies ```npm install```
* Run this command to start the frontend development server: ```npm run start``` 

Frontend has been setup!

The application is now running at [localhost:3000](http://localhost:3000). 

#### Tested on Google Chrome.
