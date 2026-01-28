# WorkShopClaude1
Repo for Claude-Code Worshop

```bash
/init
```


## Context7 MCP setup
```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

Tip: If you are in claude, type `!` to enter bash mode.

## Example Prompt
```text
Let's plan a basic web application using Mantine, the react components library, for the front end and Flask for the back end. I want a very basic set up with no JWT or authentication yet. For the front end, I want to basically have a navbar using the header component, with "Home", "Upload", and "Status".
Home just takes you to the landing page. Upload takes you to a different page that uses a "dropzone" component for file upload. This endpoint will literally just perform a hasher. People can select from md5, sha256, or other popular options. I want the hashing to be done by python only.  The "Status" page just checks if the flask app is up and running. When you design this, please use Docker and docker-compose.yml. Use context7.

I am not familiar with React, help me undertand how to create the React structure.
```

```
Go ahead and run with docker
```

```
Actually, I want the file size limit to be 200MB
```


```
Add a local mongo instance to the docker-compose.yml, and implement a way to keep track of all the files hashed. Then display this hashed files in the endpoint "Tables". When you hash a file, also check if the file has been hashed before. 

When you set up the mongo instance up, I want basic login information, I am not worried about security right now.
```


```
Can you create a new branch, commit the changes and come up with a valid commit message, and create a pull request into main?
```


```
Swap out the table element to instead use AG-Grid
```