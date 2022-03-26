
## SAP-LigaAC Lab3

Welcome to SAP-LigaAC Lab3
### Goals
- Get more expertise with SAP BTP in Cloud Foundry environment
- Short introduction to SAP UI5 for implementing the presentation layer of our web app
- Short introduction to other cloud web application concepts: security, application router

### Hands-on
- Usage of SAP BTP Cockipt and CF CLI commands in order to deploy and test a more complex cloud web MTA app
- Test the app using the provided POSTMAN collection and the UI
- Enhance the provided app by adding new functionalities


#### Clone Lab3 GitHub repository

```
git clone git@github.com:SAP-LigaAC/lab3.git
```
or

```
git clone https://github.com/SAP-LigaAC/lab3.git
```

If the `git clone` command fails, then you will have to:
  - manually download the zip file from repository home page
  - decompress the zip File


### 3. App usage
LAB3 application is an end-to-end example of a cloud multi target application.
The UI is built using SAP UI5 framework.
The BE is built using Express JS web server and provides secured REST APIs which can be consumed by the end users and also by the UI.
The persistence layer is provided by SAP HANA Cloud HANA DB.

A multi-target application (MTA) is comprised of multiple software pieces (“modules”) which all share a common lifecycle for development and deployment. These modules can be written in different technologies and deployed to different targets respectively, but they all serve (different aspects of) a particular purpose for the application’s users.

#### Create tables for the data model entitites -if they don't exist
Connect to Cockpit and use HANA DB Explorer to create the 'Passenger' and 'Booking" tables, by opening an SQL Console and running the `CREATE TABLE` commands from `sql-scripts\createTable.sql`.

#### Deploy the application in the BTP account
[Cloud MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/configuration/ "Cloud MTA Build Tool") has been used for building the application archive.

```
npm run deploy-cloud

```

After deploying the app, go to Cockpit and check the app services bindings.
Assign a role to your user.

#### Test the app
- UI tests:
  - Open the app, by accessing the deployed URL in the Cockpit and test the app functionalities

- POSTMAN tests:
  - Use POSTMAN to import the lab's provided POSTMAN collection and environmnet variables.
    - The app URL is configured in the POSTMAN environment variables, tehrefore whenever you test:
      - the remote app, the `{{rest_app_url}}` env variable should be configured with your remote app url obtained either from `cf apps` command or directly in the Cockpit.
      - the locally started app, the `{{rest_app_url}}` env variable should be configured with localhost:4001.

#### Exercises

- Change your user role and check the impact
- Create a new endpoint and a new role
  - i.e for deleting a specific booking a 'Manger' role is required
#### Npm dependecies used by the app

- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/express-validator
- https://www.npmjs.com/package/body-parser
- https://www.npmjs.com/package/cf-nodejs-logging-support
- https://www.npmjs.com/package/http-status-codes
- https://www.npmjs.com/package/@sap/hana-client
- https://www.npmjs.com/package/@sap/xsenv
- https://www.npmjs.com/package/@sap/xssec

### Documentation



