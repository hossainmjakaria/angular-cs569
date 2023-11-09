[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/U9bFQi6h)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12775287)
# CS569 Homework 
Create an Angular application that uses the [Dog API](https://dog.ceo/dog-api/)
* Display a list of all breeds.
* When a breed is selected, display a list of all sub-breeds along with 3 random pictures of the selected breed.
* When a sub-breed is selected, display 3 random pictures of the selected sub-breed (consider using nested routes).
* Considering we have a list of banned breeds, maintained in a service, and persisted to the localStorage, add a button to each breed page to be added/removed to/from the banned list.
* Create a guard that checks if the selected breed is added to the banned list, so it displays a [confirm alert](https://www.w3schools.com/jsref/met_win_confirm.asp) before it navigates to the breed page.
