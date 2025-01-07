
# QA Assessment

## Summary of this framework
* This is API Automation Testing using Playwright framework and Typescript one of the powerful testing framework

## Summary of this project
* In `document` folder we will have the testcase file
* In `tests` folder we will have high level test case about API upload image and upload zip file
  `https://assessement.onrender.com/api/image`
  
  `https://assessement.onrender.com/api/zip`

## Getting started

### Prerequisites
Before you begin, ensure you have met the following requirements:

- **Node.js**: Your system should have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

  ```sh
  # To check if Node.js is installed, run this command:
   node -v

  # Example output: v16.3.0
  ```

- **TypeScript**: This project is written in TypeScript, so you need to have TypeScript installed globally.

    ```sh
    # Install TypeScript globally using npm
      npm install -g typescript
   
   # Check TypeScript version
      tsc -v
   
   # Example output: Version 4.5.2
    ``` 
- **Visual Studio Code**: We recommend using Visual Studio Code as the development environment for this project. You can download it from code.visualstudio.com.

- **Visual Studio Code TypeScript Extension**: Playwright Test for VSCode

## How to set up

- Clone project
- install environment: `npm install`


## Run Test
* Go to the Project root directory and run command: `npm test`

## Run Single Spec and show the report
* Go to the Project root directory and run command: e.g:  `npx playwright test tests/api-image.spec.ts && npx playwright show-report`

## Reporter

- After run local any tests, show report by run cmd:

  `npx playwright show-report`

