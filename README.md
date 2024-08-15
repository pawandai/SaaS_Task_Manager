# Software As A Service

This is a task manager application like [trello](https://trello.com/)

## Breakdown of the Application

### Authentication

Secure Authentication is implemented using `Clerk`. It provides easy to implement `user` and `organization` management along with roles and permission. With clerk it is easier to handle `middleware`, which otherwise is a little bit tricky in next.js

## UI Library

For UI components, my first choice is `shadcn-ui`. It contains may customizable UI components which also look good out of the box. Some of the components used are: Accorion, Sheet, Button and more.

## State management

For state management, I preferred `zustand` for this specific project. Other libraries like `redux` can also be used. The main reason I used `zustand` is that it has less boilerplate code and easy to setup which is perfect for small project like this.
