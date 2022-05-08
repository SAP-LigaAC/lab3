
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

### SAP BTP Security (Authentication and Authorization)

SAP BTP distinguishes between platform users (for global accounts and subaccounts) and business users (for the applications).

SAP ID service is the default identity provider for both, but custom ID providers can be configured as well.

SAP ID service provides:
  - A central user store
  - A Single Sign-On (SSO) service. It enables users to log on once and get access to all your applications.

<br><br>
<img width="451" alt="image" src="https://help.sap.com/doc/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/loiodb7239ae78bd4c51a37fb7fedc7d0e76_LowRes.png">
<br><br>

Account administrators ensure that users can only access their dedicated subaccount by making sure that there is a dedicated trust relationship between the identity providers and the respective subaccounts. Service provider (SP) agrees to trust the identity provider to authenticate users. Identity provider (IdP) authenticates users and provides to service providers an authentication assertion (SAML assertion)that indicates a user has been authenticated.
The Security Assertion Markup Language (SAML) protocol is an open-standard, XML-based framework for authentication and authorization between two entities without a password.

A role-based authorization concept ensures that only authorized users are able to access the app endpoints.
Developers configure and deploy application-based security artifacts containing authorizations, and administrators assign these authorizations using the SAP CF cockpit.

### OAuth2 authentication

The authentication for our application relies on the usage of the OAuth 2.0 protocol, the industry standard for providing secure access to web APIs, allowing applications to access users' data without compromising security.
Generally, OAuth provides clients a "temporary secured delegated access" to server resources on behalf of a resource owner. It specifies a process for resource owners to authorize third-party access to their server resources without providing credentials. Designed specifically to work with Hypertext Transfer Protocol (HTTP), OAuth essentially allows access tokens to be issued to third-party clients by an authorization server, with the approval of the resource owner. The third party then uses the access token to access the protected resources hosted by the resource server.
User Account and Authentication (UAA) server issue for the authenticated user's a so-called OAuth access token. The implementation uses as access token a JSON web token (JWT), which is a signed text-based token formatted according to the JSON syntax.

To secure the application endpoints we are using the SAP Node-security libraries together with two main components: the XSUAA service and the application router.
The XSUAA plays the role of an OAuth authorization service whereas the application router plays the role of an OAuth client.

### 3. App modules and resources
LAB3 application is an example of a cloud Multi Target Application.
The UI is built using SAP UI5 framework.
The BE is built using Express JS web server and provides secured REST APIs which can be consumed by the end users and also by the UI.
The persistence layer is provided by SAP HANA Cloud HANA DB.

App new modules introduced in LAB3:
- `Approuter` - single entry point to a cloud application. Its main capabilities include:
  - dispatching the requests to the configured destination (business services),
  - the app authentication using SAP XSUAA
  - authorizations checks
  - CSRF protection
  - CORS support
    - Cross-origin resource sharing (CORS) permits Web pages from other domains to make HTTP requests to your application domain, where normally such requests would automatically be refused by the Web browser’s security policy. Cross-origin resource sharing(CORS) is a mechanism that allows restricted resources on a webpage to be requested from another domain (/protocol/port) outside the domain (/protocol/port) from which the first resource was served. CORS configuration enables you to define details to control access to your application resource from other Web browsers

<br><br>
<img width="451" alt="image" src="https://blogs.sap.com/wp-content/uploads/2020/09/sec360.png">
<br><br>

<br><br>
<img width="451" alt="image" src="https://user-images.githubusercontent.com/102019852/166631020-0250a111-71d9-4723-b0c0-7b2f24d424c8.png">
<br><br>



### 4. App usage

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
- UI: Remove the Passenger First Name and Passenger Last Name columns from the Bookings table, and add the Passenger Email column instead.
- UI: Customize the title of the table so that it contains the total number of bookings. (EX: Bookings (10))
- UI: Format the booking date and flight date values from the booking detail page form.
- UI: Display the error message received from the backend application in case is created a booking with invalid values.
- Full Stack: Implement booking deletion feature.
#### Npm dependecies used by the app

- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/express-validator
- https://www.npmjs.com/package/body-parser
- https://www.npmjs.com/package/cf-nodejs-logging-support
- https://www.npmjs.com/package/cors
- https://www.npmjs.com/package/http-status-codes
- https://www.npmjs.com/package/passport
- https://www.npmjs.com/package/@sap/approuter
- https://www.npmjs.com/package/@sap/hana-client
- https://www.npmjs.com/package/@sap/xsenv
- https://www.npmjs.com/package/@sap/xssec

### Documentation

- [SAP BTP Security](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/e129aa20c78c4a9fb379b9803b02e5f6.html "SAP BTP Security")
- [OAUTH2](https://oauth.net/2/ "Oauth2")
  - https://en.wikipedia.org/wiki/OAuth
  - https://auth0.com/docs/authenticate/protocols/oauth
- [SAP Application Router](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/01c5f9ba7d6847aaaf069d153b981b51.html "SAP App router")
  - [What is SAP Application Router](https://blogs.sap.com/2020/04/03/sap-application-router/ "SAP App router")
- [SAP Authorization and Trust Management Service](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/6373bb7a96114d619bfdfdc6f505d1b9.html "XSUAA")
- [SAPUI5 Documentaion](https://ui5.sap.com)
  - [What is SAPUI5? ](https://blogs.sap.com/2021/08/23/what-is-sapui5)