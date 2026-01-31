# clickup Client

This is the frontend client for the WolfTasks application, a task management system inspired by ClickUp. It is built with [Angular](https://angular.io/).

## Features

- **Authentication**: User registration and login.
- **Teams & Projects**: Create and manage teams and projects.
- **Task Management**: Create, edit, and manage tasks within projects.
- **Comments**: Add comments to tasks.
- **Interactive UI**: Modals for creating resources (Tasks, Projects, Teams).

## Prerequisites

- Node.js installed on your machine.
- Angular CLI installed globally (`npm install -g @angular/cli`).
- The **WolfTasksServer** running locally (usually on port 3000) for API requests.

## Getting Started

1.  **Install Dependencies:**
    Navigate to the client folder and install the necessary packages.
    ```bash
    cd client
    npm install
    ```

2.  **Run Development Server:**
    Start the application in development mode.
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests via [Vitest](https://vitest.dev/):

```bash
ng test
```

