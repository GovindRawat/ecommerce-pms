# Week 5 Retrospective

## What I built

* Express server with health check, GET/POST/PUT/DELETE for products
* Request logger middleware
* CORS configured for the React origin
* React frontend now fetches from the API
* Custom useProducts hook with loading/error states
* ProductsContext for global access
* API client wrapper (apiFetch) with consistent error handling
* AddProductForm that exercises the full POST cycle

## What clicked

This week, the connection between the frontend and backend finally made sense to me. Before this, React felt like it owned all the data, but now I understand that the server is the source of truth and the frontend is just requesting and displaying data.
The biggest "aha" moment was seeing the full request cycle work: submitting a form in React, sending a POST request to Express, validating data on the server, returning a response, and then updating the UI by refetching products. For the first time, I felt like I was building a real full-stack application instead of separate frontend and backend projects.
I also understood why custom hooks and Context are useful. The useProducts hook kept all fetching logic in one place, and ProductsContext allowed multiple components to access product data without prop drilling.
Another thing that clicked was error handling. I learned that fetch does not throw errors for 404 or 500 responses, so I need to check res.ok myself. Building the apiFetch wrapper showed me how centralizing error handling makes the rest of the application cleaner.

## What's still fuzzy

* When to choose Context versus passing props. I understand the basic idea, but I still need more experience making architectural decisions.
* useCallback and useMemo. I know what problem they solve, but I am not yet fully confident about when they are actually necessary.
* The difference between PUT and PATCH in real-world APIs.
* How larger applications organize folders, services, and contexts as they grow.
* How data persistence will work once we move from an in-memory array to a real database.
* Authentication and authorization. Right now anyone can call the API, and I am curious how real applications protect routes.

## Challenges I faced

* Debugging import path errors and blank screens in React.
* Fixing Context-related issues after moving product state out of App.
* Understanding why old cart data could break when products no longer existed.
* Setting up environment variables correctly.
* Learning how to test APIs using Thunder Client and interpret server responses.

## What I would do differently

If I started this project again, I would spend more time planning the data flow before coding. Several bugs happened because I changed where state lived without updating all components that depended on it. I would also test each small change immediately instead of making multiple changes at once.

## Biggest lesson from Week 5

The frontend and backend are separate systems with different responsibilities. The frontend focuses on user interaction and presentation, while the backend owns the data and business rules. Building reliable applications requires both sides to communicate clearly through APIs and handle errors gracefully.
