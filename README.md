# Technical task

## How long did you spend on your solution?
I spent the week with long pauses because it was a busy weekend but I want to finish the task as soon as possible to not waste your time.

## How do you build and run your solution?
I updated the backend solution to dotnet 5.0 to avoid incompatilibities with the version installed on my machine. Because dotnet is very backward compatible, the code should be pretty similar to a code develop for dotnet 3.0.

To execute the code execute the following commands

```bash
cd Backend/PerfectChannel.WebApi
dotnet restore
dotnet run
```

On another terminal

```bash
cd Frontend
npm install
npm start
```

Open a browser, then navigate to http://localhost:3000. Also, you can visit http://localhost:5000/swagger/index.html to check the API documentation made with Swagger.

Respect to the installed packages I try to keep at a minimun. The only packages that I installed are Swashbuckle.AspNetCore for Swagger generation and Bootstrap as a CDN to style the frontend part (only CSS). Other packages was instaled like Jest and Enzyme for testing purposes.

## What technical and functional assumptions did you make when implementing your solution?

I keep in mind that the data are shared between all connections. I force a refresh when user add a TODO or toggle one to keep the list updated.

## Explain briefly your technical design and why do you think is the best approach to this problem.

On the frontend part, I try to keep the things as simple as possible. The file structure is similar to a big project with

- *components*: The components are host here. If they were more, then more sub folders could be necessary.

- *models*: A file per model. On this case only one model is necessary.

- *network*: To store the network requests functions to comunicate with backend(s).

- *store*: One subfolder per module. Here is where the logic for store managment such as Context API, Redux, Vuex, Pinia or whatver you use, rest. I use the built-in solucion Context API. It is easy to use and combine with *useReducer* hook to emulate a Redux behaviour.

I design the UI with usability on mind. It is responsive. The tab navigation system to don't overhead the user with too many info but, he/she can switch easy between tabs. I add a toast system to give user feedback to ensure that he/she knows what is happening.

I try to avoid hardcoded elements that are similar to ensure that if you want to add more elements, this could be done on a easy way. That is why I use list, maps function and reusable components.

I like to use TypeScript for development because avoid you lot of errors. You can save lot of time, money and test when you typed your data structures on the correct way. I like specially with JSX, because tell you as a developer that something is wrong even without leave your code editor.

The code could look a bit boilerplated, but on that way is more complicated make a mistake when you are coding.

## If you were unable to complete any user stories, outline why and how would you have liked to implement them.

I would like to add a database (even SQLite could be good) to have a more real beaviour. I personally like the MediatR pattern to separate the layers and isolate the tasks.