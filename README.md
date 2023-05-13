# Tut

Tut is a web application that helps users find and read tutorials on various technological fiealds.<br> 
This repository contains the code for the frontend of the application,<br>
the backend application can be found <a href="https://github.com/yehonatan604/TutAppAPI">here</a>.

## Table of Contents

[Installation](#installation) <br>
[usage](#usage) <br>
[Features](#features) <br>
[Code Features](#code-features) <br>
[Troubleshooting](#troubleshooting)

## Installation

- To run without installation, please continue to the [Usage section](#usage).
- To run the application, you will need to have the following software installed on your computer:

  - Node.js (v12.13.0 or higher)
  - Visual Studio Code
  - Web Browser

- Once you have these dependencies installed, follow these steps:

  - Clone this repository to your local machine.
  - Open a terminal in the project directory.
  - Run npm install to install the project's dependencies:
  
  <br>
  
  ```
  npm i --lagacy-peer-deps
  
  ```

## Usage

- to run without installation, the app is hosted on a private server, please click [here](https://yehonatan.moravia.co.il/tut/).
- Ensure that the API is running. The API documentation can be found [here](https://tutappapi-yehonatan.azurewebsites.net/swagger/index.html).
- To use the application, you will need to have a web browser on desktop or an Android or iOS device or an emulator. 

## Features

- User Registration: - User must register himself by filling some personal details.
- User Login: After registration user will enter Email and password for logging in order to get access to the system, access token saved untill user logs out.
- Logout: if logged in, a click on logout will remove the token from storage & log out the user.
- Home Page: in this page articles are divided into most viewed, most popular, recent articles.
- Users can rate articles.
- Search in Articles: User can search/sort articles.
- Library Page: in this page articles are divided into various categories.
- Create articles: Creators can create new articles with a Reach Text Editor.
- Massages: User can get & send messages to the admin.
- Personal: User can edit personal details, Creator can edit/delete his articles aswell.

## Code Features:

- The app folder is divided into 3 main folders:

  - Core: modules, services, guards, interceptors.
  - Data: models, DTO's, enums.
  - Front: components, pipes, styles.
  
- JWT Authentication.
- Loading interceptor: while loading a spinner will pop up.
- Generic reusable components.
- Reactive forms with custom regex validators.
- Authorization based route guards: 3 user roles - ["User", "Creator", "Admin"].
- Counts number of views for each articles.
- uploaded content is being senitized before upload.

## Troubleshooting
If you encounter any issues when using or installing Tut application, please refer to the project's GitHub Issues page to see if a solution has already been proposed. If not, you can open a new issue to report the problem.
