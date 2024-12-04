const fs = require("fs");
const path = require("path");
const {Command} = require("commander")

const program = new Command();

const tasksFilePath = path.join(__dirname, "tasks.json");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function readTasks() {
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  }
  return [];
}

function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
}

function getNextId(tasks) {
  const ids = tasks.map((task) => task.id);
  ids.sort((a, b) => a - b);
  let nextId = 1;
  for (const id of ids) {
    if (id !== nextId) break;
    nextId += 1;
  }
  return nextId;
}

function listTasks(status) {
  const tasks = readTasks();
  let filteredTasks = tasks;

  if (status) {
    if (status.toLowerCase() === "done") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (status.toLowerCase() === "to-do") {
      filteredTasks = tasks.filter(
        (task) => !task.completed && !task.inProgress
      );
    } else if (status.toLowerCase() === "in-progress") {
      filteredTasks = tasks.filter((task) => task.inProgress);
    } else {
      console.log(
        `${colors.red}Invalid status. Use 'done', 'to-do', or 'in-progress'.${colors.reset}`
      );
      return;
    }
  }

  if (filteredTasks.length === 0) {
    console.log(`${colors.yellow}No tasks found.${colors.reset}`);
  } else {
    console.log(
      `${colors.cyan}Listing ${status ? status : "all"} tasks:${colors.reset}`
    );
    filteredTasks.forEach((task) => {
      console.log(
        `${task.id}. ${task.description} [${
          task.completed
            ? colors.green + "Done"
            : task.inProgress
            ? colors.yellow + "In-progress"
            : colors.red + "To-do"
        }${colors.reset}]`
      );
    });
  }
}

function addTask(description) {
  const tasks = readTasks();
  const newTask = {
    id: getNextId(tasks),
    description: description,
    completed: false,
    inProgress: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  console.log(
    `${colors.green}Task added successfully! (ID: ${newTask.id})${colors.reset}`
  );
}

function updateTask(id, newDescription) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.description = newDescription;
    writeTasks(tasks);
    console.log(
      `${colors.green}Task ID ${id} updated successfully!${colors.reset}`
    );
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

function deleteTask(id) {
  const tasks = readTasks();
  const newTasks = tasks.filter((task) => task.id !== parseInt(id));

  if (newTasks.length < tasks.length) {
    writeTasks(newTasks);
    console.log(
      `${colors.green}Task ID ${id} deleted successfully!${colors.reset}`
    );
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

function markInProgress(id) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.inProgress = true;
    task.completed = false;
    writeTasks(tasks);
    console.log(
      `${colors.yellow}Task ID ${id} marked as in-progress.${colors.reset}`
    );
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

function markDone(id) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.completed = true;
    task.inProgress = false;
    writeTasks(tasks);
    console.log(`${colors.green}Task ID ${id} marked as done.${colors.reset}`);
  } else {
    console.log(`${colors.red}Task with ID ${id} not found.${colors.reset}`);
  }
}

program
  .command("add <description>")
  .description("Add a new task")
  .action(addTask);

program
  .command("list [status]")
  .description("List tasks (status: done, to-do, in-progress)")
  .action(listTasks);

program
  .command("update <id> <description>")
  .description("Update a task's description")
  .action(updateTask);

program
  .command("delete <id>")
  .description("Delete a task")
  .action(deleteTask);

program
  .command("mark-in-progress <id>")
  .description("Mark a task as in-progress")
  .action(markInProgress);

program
  .command("mark-done <id>")
  .description("Mark a task as done")
  .action(markDone);

program.parse(process.argv);