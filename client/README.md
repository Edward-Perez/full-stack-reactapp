# Full Stack App with React and a REST API
### Project 10 from the Treehouse Full Stack Javascript TechDegree program. 
**_Displays knowledge of React JSX, React Router, React Context API, and Create React App._**

This full stack application provides a way for users to administer a school database containing information about courses. Users can interact with the database by retrieving a list of courses, view details to a specific course, as well as creating, updating and deleting courses in the database with the condition of creating a user account. 

### Project Requirements
### React Project
  * React project folder is named "client"
  * Running `npm start` launches app
### REST API
  * REST API folder is named "api"
  * Supports for Cross-Origin Resource Sharing (CORS)
### Stateful Class Components
  * Courses - List all courses
  * CourseDetail - Renders details for a particular course
  * UserSignIn - Renders a sign in form 
  * UserSignUp - Renders a sign up form
  * CreateCourse - Renders a form to create a new course
  * UpdateCourse - Renders a form to allow a user to update an existing course
### Stateless Functional Components
  * Header - Renders top menu navigation bar
  * UserSignOut - Signs out a authenticated user
### Routes (path - component)
  * / - Courses
  * /courses/create - CreateCourse
  * /courses/:id/update - UpdateCourse
  * /courses/:id - CourseDetail
  * /signin - UserSignIn
  * /signup - UserSignUp
  * /signout - UserSignOut
### User Authentication
  * Global state is kept in the App component or managed with React Context API
  * signIn() method is globally available which authenticates a user using their email address and password then persists the authenticated user's information (including their password) to the global state
  * signOut() method is globally available that removes the authenticated user's information (including their password) from the global state
### Protected Routes
  * /courses/create
  * /courses/:id/update
### User Authorization
  * CourseDetail component only renders the "Update Course" and "Delete Course" buttons if:
    * There's an authenticated user
    * The authenticated user's ID matches that of the user who owns the course
### Validation Errors
  * "Sign Up", "Create Course", and "Update Course" display validation errors returned from the REST API

### Markdown Support
  * "Course Detail" renders the course description and materialsNeeded properties as markdown formatted text

### Exceeds Requirements
* CourseDetail component redirects users to the /notfound path if the requested course isn't returned from the REST API.

* UserSignIn component redirects users back to the previous screen after successfully signing in.

* UpdateCourse component:
  * Redirects users to /notfound path if the requested course isn't returned from the REST API
  * Redirects users to /forbidden path if the requested course isn't owned by the authenticated user
* Components redirect users to the /error path when requests to the REST API return a "500 Internal Server Error" HTTP status code.
* The app contains the following stateless functional components:
  * NotFound -The component renders a message letting the user know that the requested page can't be found.
  * Forbidden - The component renders a message letting the user know that they can't access the requested page.
  * UnhandledError - The component renders a message letting the user know that an unexpected error has occurred.
* Routes (path - component) have been configured 
  * /notfound - NotFound
  * /forbidden - Forbidden
  * /error - UnhandledError
  * If a route does not matched the NotFound component is rendered
* The app persists user credentials using an HTTP cookie or local storage so that the user's authenticated state is maintained even if the application is reloaded or loaded into a new browser tab

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
