# Task Tracker CLI

A simple Command-Line Interface (CLI) application to manage tasks efficiently. This application lets you add, list, update, delete, and track the status of tasks using Node.js.

https://roadmap.sh/projects/task-tracker

## Features

- **Add tasks** with a description.
- **List tasks** by status: `to-do`, `in-progress`, or `done`.
- **Update tasks** to modify their descriptions.
- **Delete tasks** by their ID.
- **Mark tasks** as `in-progress` or `done`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sattarrasouli/task-tracker-cli.git
   cd task-tracker-cli
   npm install

# Usage
1-Add a New Task: 
 ```bash
    node index.js add "Your task description"
```
2- List All Tasks: 
 ```bash
    node index.js list
```

3- List Tasks by Status:
 ```bash
    Done : node index.js list done
    Todo: node index.js list to-do
    In-Progress: node index.js list in-progress
```

4- Update a Task:
 ```bash
    node index.js update <task-id> "New description"
```

5- Delete a task:
 ```bash
    node index.js delete <task-id>
```

6- Mark a Task as In-Progress
 ```bash
    node index.js mark-in-progress <task-id>
```

7- Mark a Task as Done
 ```bash
    node index.js mark-done <task-id>
