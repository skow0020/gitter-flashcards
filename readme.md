# Gitter Flashcards

Gitter Flashcards is a mobile application designed to help users practice basic arithmetic operations such as addition, subtraction, multiplication, and division through interactive flashcards.

Built with the help of https://www.youtube.com/watch?v=iCwxkm2PkQE

## Table of Contents

- [Gitter Flashcards](#gitter-flashcards)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)

## Features

- Interactive flashcards for practicing addition, subtraction, multiplication, and division.
- Real-time feedback on answers.
- Responsive design for both mobile and web platforms.
- Simple and intuitive user interface.

## Installation

1. Install dependencies:

    ```sh
    npm install
    ```

2. Start the development server:

    ```sh
    npm run dev
    ```

## Usage

1. Open the application on your device or in a web browser.
2. Choose an arithmetic operation to practice.
3. Answer the questions presented on the flashcards.
4. Receive feedback on your answers and continue practicing.

## Deployment

To deploy the web app using EAS (Expo Application Services), follow these steps:

1. Install the EAS CLI:

    ```sh
    npm install -g eas-cli
    ```

2. Log in to your Expo account:

    ```sh
    eas login
    ```

3. Configure your project for EAS:

    ```sh
    eas build:configure
    ```

4. Build the web app:

    ```sh
    eas build --platform web
    ```