[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/w0rbjaU4)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12864959)
# CS569-CRUD-Workshop
Before you start make sure you have [MongoDB community server](https://www.mongodb.com/try/download/community) installed on your computer.
* Find the backend code in the `backend` folder.
* Go to the folder `cd backend` and install the dependencies with `npm i`, then run your backend server with `npm run start`, you should see two messages:
`backend server is listening on 3000` and `connected to DB - TodoAppDB`.
* *Diagnostic: If you did not see both messages or have issues connecting to the Atlas cloud DB, switch lines 9 and 10 in the `app.js` files, and try again. If you still have an issue call me on Teams.*
  
The backend server supports the following API endpoints:
```typescript
type Todo = {_id: string, title: string, description: string, completed: boolean}
const SERVER_URL = `http://localhost:3000` 

GET SERVER_URL + `/api/todos?page=${n}`
response body: {success: boolean, data: Todo[], next: boolean}

POST SERVER_URL + `/api/todos`
request body: {title: string, description: string}
response body: {success: boolean, data: Todo}

GET SERVER_URL + `/api/todos/${todo_id}`
response body: {success: boolean, data: Todo | null}

DELETE SERVER_URL + `/api/todos/${todo_id}`
response body: {success: boolean, data: { deletedCount: number } }

PUT SERVER_URL + `/api/todos/${todo_id}`
request body: Todo
response body: {success: boolean, data: { modifiedCount: number } }
```
  
Create an Angular CRUD project to list all todos (with pagination in mind), add, update, and delete Todo.
* All students must submit their completed or incomplete code before 12:30 PM.

### Evaluation & Advantage
The advantage of completing the requirements and submitting a correct solution before the deadline is to receive **3 immunity points in the final exam.** I will check your code submissions and send you an email confirmation. 

### Code Honor Submission Policy
*Remember to respect the code honor submission policy. All written code must be original. Presenting any code as one’s own work when it came from another source is plagiarism, which includes any matching patterns and code snippets, and will affect your grade. The use of AI is not permitted in this assignment. For more details, check the full course policies in the syllabus.*
