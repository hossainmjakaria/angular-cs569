[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Ni2bP0L2)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12795946)
# CS569 Homework
Create an Angular application that uses the [REST Countries API](https://restcountries.com/) to search for countries by name, and the ability to customize the response fields by (`name, capital, region, subregion, languages, population, timezones, flags, maps`). All these fields are selected by default.  
  
**Validators**: The country name must not be empty, and has at least 3 characters, the country name must be checked against a service that contains banned search strings and maintained in the application state. Display an error message for each of these validation rules.  
  
**Request example**: `GET https://restcountries.com/v3.1/name/{name}?fields={field},{field},{field}`
<p align="center">
  <img src="./screenshot.png" />
</p>
