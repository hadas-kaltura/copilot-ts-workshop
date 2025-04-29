# Copilot Instructions for This Project

## Tech Stack

- **Backend:** Node.js, TypeScript, Express
- **Frontend:** React (Create React App)
- **Testing:** Jest, Supertest, React Testing Library
- **Other:** ESM modules, JSON data files

## General Development Best Practices

- **Type Safety:** Use TypeScript types and interfaces for all data structures and function signatures.
- **Async/Await:** Prefer async/await for asynchronous code. Handle errors with try/catch.
- **Error Handling:** Always handle errors gracefully and return appropriate HTTP status codes.
- **Separation of Concerns:** Keep route handlers, business logic, and data access separate.
- **Environment Variables:** Use environment variables for configuration (e.g., ports, secrets).
- **Testing:** Write unit and integration tests for both backend and frontend. Use mocks/stubs where appropriate.
- **Code Formatting:** Use Prettier or ESLint for consistent code style.
- **Documentation:** Add JSDoc/TSDoc comments for functions, especially public APIs.
- **Version Control:** Commit early and often with clear, descriptive messages.
- **Security:** Never commit secrets or sensitive data. Validate and sanitize all user input.
- **Dependencies:** Keep dependencies up to date. Remove unused packages.
- **API Design:** Use RESTful conventions for endpoints. Return JSON for API responses.
- **Frontend:** Use functional components and React hooks. Keep components small and focused.
- **Accessibility:** Ensure UI components are accessible (ARIA roles, semantic HTML).
- **Performance:** Avoid unnecessary re-renders and optimize data fetching.
- **Proxy:** Use the frontend proxy setting for local API development.

## Copilot Usage

- Suggest code that matches the project's tech stack and conventions.
- Prefer using existing utility functions, types, and patterns from the codebase.
- When generating new files, follow the established folder structure.
- For backend, use ESM import/export syntax.
- For frontend, use modern React (hooks, functional components).
- For tests, use the same frameworks and match the style of existing tests, and generate comprehensive test coverage, including edge cases, exception handling and data validation
