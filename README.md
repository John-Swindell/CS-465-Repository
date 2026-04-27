# Travlr Full Stack Application

This repository contains the completed Travlr full stack web application. The project serves both the customer-facing travel site and the administrative side of the application. The final iteration added secure admin authentication with Passport, JSON Web Tokens, password hashing, and protected API routes for creating and updating trip records.

## Architecture

### Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

The customer-facing side of the project uses Express with Handlebars-rendered HTML. In this part of the application, Express routes receive a browser request, controller logic prepares the data, and the server renders a full HTML page before sending it back to the browser. This approach is straightforward and works well for public pages where the user is mostly browsing content.

The admin side is an Angular single-page application located in `app_admin/src/app`. The Angular project is organized around components, services, models, routes, and assets. Components such as `trip-listing`, `trip-card`, `add-trip`, `edit-trip`, `login`, and `navbar` define what the admin user interacts with. Models such as `Trip`, `User`, and `AuthResponse` define the structure of data used by the frontend. Services such as `TripDataService` and `AuthenticationService` handle API communication, authentication state, token storage, and login/logout behavior. Angular routing controls which views appear without requiring a full page reload.

The main difference is that the Express HTML side is server-rendered, while the Angular admin side is client-rendered after the initial application load. With server-rendered pages, clicking a link or submitting a form usually causes the browser to request a new page from the server. With the SPA, Angular loads once and then updates the page dynamically in the browser. This gives the admin interface a smoother interaction model because users can view trips, add trips, edit trips, log in, log out, and see authenticated actions appear or disappear without reloading the entire page.

JavaScript connects both sides of the project. Express uses JavaScript on the backend to configure middleware, initialize Passport, connect routes, enable CORS, and handle API requests. Angular uses TypeScript/JavaScript on the frontend to organize components, call the API asynchronously, process responses, and update the UI.

The Express backend follows an MVC-style structure. `app.js` wires the application together, configures middleware, connects the route files, enables CORS for the Angular client, initializes Passport, and starts the server-side application flow. The `app_api` folder contains API routes, controllers, authentication configuration, and Mongoose models. The routes define the endpoints, the controllers handle request logic, and the models define how trip and user data are stored in MongoDB. The `app_server` folder contains the server-rendered customer pages using Handlebars.

### Why did the backend use a NoSQL MongoDB database?

MongoDB was a good fit because the application data is document-oriented. A trip record naturally maps to a JSON-like document with fields such as code, name, length, start date, resort, price, image, and description. MongoDB works well for this type of data because the application can store and retrieve complete trip documents without needing complex joins across many relational tables.

MongoDB also fits the full stack JavaScript workflow. The API sends and receives JSON, Mongoose models describe the document structure, and the Angular frontend consumes the same type of data shape. This makes the data flow easier to reason about across the frontend, API, and database layers. It also supports fast reads, straightforward updates, and a flexible schema that is useful for a catalog-style travel application.

## Functionality

### How is JSON different from JavaScript and how does JSON tie together the frontend and backend development pieces?

JavaScript is a programming language. It can define variables, functions, classes, control flow, event handlers, services, components, and backend logic. JSON, or JavaScript Object Notation, is a data format. It looks similar to JavaScript object syntax, but it is stricter and is used to represent data rather than execute behavior.

JSON ties the frontend and backend together because it is the format used by the API. The Angular admin client sends JSON request bodies when logging in, registering, adding trips, or editing trips. The Express API receives that JSON, uses controller logic and Mongoose models to read or update MongoDB, and then returns JSON responses to the frontend. For example, `GET /api/trips` returns trip documents as JSON, while `POST /api/login` returns a JWT in a JSON response. This shared data format lets the Angular SPA and Express backend communicate cleanly without either side needing to render the other's UI.

### Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

One important refactor was separating backend API responsibilities into routes, controllers, and models. The route files define the available endpoints, the controller files contain the request and response logic, and the Mongoose models define the shape of stored data. This improves maintainability because each file has a clearer responsibility.

On the Angular side, trip data access was moved into `TripDataService` instead of making HTTP calls directly inside every component. This allows the application to reuse the same API methods for retrieving trips, retrieving a single trip, adding a trip, updating a trip, logging in, and registering. Authentication behavior was also separated into `AuthenticationService`, which centralizes token storage, logout behavior, current user retrieval, and login-state checks.

Another example is the reusable `trip-card` component. Instead of repeating the same trip display markup in multiple places, the application can pass trip data into a component and let that component handle the display and edit behavior. Reusable UI components reduce duplicate code, make the interface more consistent, and make future changes easier. If the trip card layout or behavior needs to change, it can be changed in one place instead of updating the same markup across several views.

The JWT interceptor is another efficiency improvement. Instead of manually attaching the token to every protected HTTP request, the interceptor automatically adds the `Authorization: Bearer` header when the user is logged in. This keeps the service methods cleaner and reduces the chance of forgetting authentication headers on protected requests.

## Testing

### Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

In a full stack application, HTTP methods describe the type of operation being requested. A `GET` request retrieves data, a `POST` request creates or submits data, and a `PUT` request updates an existing resource. Endpoints are the specific API URLs that expose those operations. In this project, examples include `GET /api/trips` to retrieve all trips, `GET /api/trips/:tripCode` to retrieve one trip, `POST /api/trips` to add a trip, `PUT /api/trips/:tripCode` to update a trip, `POST /api/login` to authenticate an admin user, and `POST /api/register` to create an account.

Testing these endpoints requires checking both successful and unsuccessful cases. For a `GET` test, loading the trip listing page or checking the browser developer tools can confirm that the frontend is calling the API and receiving trip data from MongoDB. For a `PUT` test, the admin should first log in through the Angular login page so the application receives and stores a JWT. Then the admin can edit a trip and save it. A successful update should return a success status and persist the changed data in MongoDB.

The added security layer makes testing more realistic but also more complex. Protected endpoints require a valid JWT in the `Authorization` header. The Angular JWT interceptor handles this during normal application use, but direct API testing with a tool like Postman requires manually logging in, copying the token, and including it as a bearer token on protected requests. A useful negative test is trying to add or edit a trip without logging in or without sending a valid token. The API should reject that request with an unauthorized response such as `401`.

Security in this application includes several layers. Passwords are not stored directly; they are salted and hashed before being saved. Passport handles local login validation. The backend generates a JWT after successful login, and the token expires after a set amount of time. The Angular application stores the token and checks whether it is still valid before treating the user as logged in. Protected API routes use JWT authentication so public users can view trips, but admin-only actions such as adding and editing trips require authentication.

## Reflection

### How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course helped me build a stronger understanding of how a full stack application is organized from the database all the way to the browser. My professional goals are focused on platform engineering, SRE, data engineering, and AI engineering, so learning more about MongoDB and scalable data flow was especially useful. Working with MongoDB, Mongoose models, JSON APIs, and authentication helped me understand how application data moves through a system and how each layer depends on the others.

I also developed a better understanding of JavaScript, asynchronous API calls, promises/observables, frontend routing, and the tradeoffs between server-rendered pages and client-rendered SPAs. The project showed how server-rendered HTML can be simpler for customer-facing content, while a SPA can provide a better experience for an interactive admin interface.

The course also helped me practice reading and organizing existing code, connecting frontend services to backend endpoints, protecting routes with authentication, and thinking about testing beyond only whether the page loads. Even when some implementation work followed course examples closely, the process still helped me build analytical skills around architecture, data modeling, API design, security, and maintainability. Those are marketable skills because they apply across many real engineering roles, especially roles involving data systems, distributed services, automation, and production reliability.
