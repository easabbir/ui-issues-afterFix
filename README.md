#  Remote App

This is the remote application for the wall project. It is designed to be used as a microfrontend and can be consumed by a host application using Webpack Module Federation.

## Prerequisites

-   Node.js (>= 20.x)
-   pnpm (>= 9.x)

## Environment Setup

**Create environment files for development and production:**

`.env.development`

```
NODE_ENV=development
PORT=5000
REMOTE_BASE_URL=http://localhost
```

`.env.production`

```
NODE_ENV=production
PORT=4000
REMOTE_BASE_URL=http://localhost
```

## Running the Application

**Development Mode**

To run the application in development mode:

`pnpm start`

This will start the Webpack development server on the port specified in `.env.development`.

**Production Mode**

To build and serve the application in production mode:

**Build the application:**

`pnpm build`

**Serve the build files:**

`pnpm build:start`

This will serve the build files on the port specified in .env.production.

## Consuming the Remote App

To consume this remote app in a host application, ensure that the host application's Webpack configuration points to the correct URL for the remote application's `remoteEntry.js`.

Example configuration in the host application's Webpack config:

```
new ModuleFederationPlugin({
    name: 'hostApp',
    remotes: {
        offerwall: 'offerwall@http://localhost:5000/remoteEntry.js',
    },
    shared: {
        react: {
            singleton: true,
            requiredVersion: deps.react,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
        },
    },
}),
```
## Running the Application
docker-compose up -d --build


# ui-issues-beforeFix

This is a demo project to show common UI issues which we will be checking in real projects.
Feedback on Campaign

Feedback on Campaign after fix

1. Crash on country field when all the selectable is empty. [Fixed]

2. Add asterisk (*) -> red marked on the mandatory fields. [Fixed]

3. Placeholder text needs to be more professional. [Fixed]

4. Country name should be in ascending order.  [Fixed]

5. Amount fields needs to have frontend validation. [Fixed]

6. Text field needs to have frontend validation as well. [Fixed]

7. Negative amount should not be accepted in number field eg "Bid" and "Lifetime Budget". [Fixed]

8. Need to change the error message on violating mandatory fields. [Fixed]

9. Need Confirmation message on "save changes" [Fixed]

10. Alignment issue on the form (expected to be left aligned) [Fixed]

11. Using keyboard arrow, currently not possible to select "country" field. [Fixed]

12. Field validation Error is causing the whole form to shift down. [Fixed]

13. "No results found" window in "country" field blocking "Headline" input field. use tab to go from country to headline. [Fixed]

14. "save changes" button should clear the form after submission. [Fixed]
    
15. After form clears on "save changes" button, focus/cursor should be on Account to allow continuous fillup. [Known Issue and will not be addressed in this release.]


check responsiveness

and check navigation

and check with accessibility point of view

and finally security 

and performance point of view.

Overall looks clean and we need to further check after integrating with the whole project. 

