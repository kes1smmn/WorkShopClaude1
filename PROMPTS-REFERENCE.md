# Claude Code Prompts Reference

A collection of effective prompts for common development tasks. Use these as templates and adapt to your needs.

---





## Project Initialization

### Start a New Project
```text
Let's plan a basic web application using [FRAMEWORK] for the front end and
[BACKEND] for the back end. I want a very basic set up with no authentication yet.

For the front end, I want [DESCRIBE PAGES/COMPONENTS].

For the back end, I want [DESCRIBE ENDPOINTS].

When you design this, please use Docker and docker-compose.yml.
```

### Initialize Claude Context
```text
/init
```
Tip: You can use `/init` with existing codebase or after file have been generated.

Creates a CLAUDE.md file with project context.

### Add MCP Server
```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

---

## Feature Development

### Add a New Page
```text
Add a new page called "[PAGE_NAME]" that [DESCRIPTION].
Add a link to it in the navigation header.
```

### Add a New API Endpoint
```text
Create a new endpoint POST /api/[ENDPOINT] that [DESCRIPTION].
Return JSON with [FIELDS]. Handle errors appropriately.
```

### Add Database Integration
```text
Add a [DATABASE] instance to the docker-compose.yml and implement
[FUNCTIONALITY]. Use basic credentials for now, I'm not worried about
security for local development.
```

### Add a UI Component
```text
Add a [COMPONENT TYPE] to the [PAGE] page that [FUNCTIONALITY].
Use [LIBRARY] components. Include loading and error states.
```

---

## Iterative Refinement

### Change a Configuration
```text
Actually, I want [SETTING] to be [VALUE]
```

### Request an Explanation
```text
Explain how [COMPONENT/FUNCTION] works. I'm not familiar with [CONCEPT].
```

### Fix an Issue
```text
The [FEATURE] isn't working. When I [ACTION], I expect [EXPECTED] but
I'm getting [ACTUAL]. Can you fix this?
```

### Improve UX
```text
The [PAGE/COMPONENT] feels [PROBLEM]. Add [IMPROVEMENT] to make it
better. Show feedback when [ACTION].
```

---

## Git Workflow

### Create a Feature Branch
```text
Create a new branch called feature/[NAME]
```

### Commit Changes
```text
Stage all changes and commit with an appropriate message
```

### Create a Pull Request
```text
Create a new branch, commit the changes with a valid commit message,
and create a pull request into main
```

### Full Workflow
```text
Can you create a new branch called [BRANCH_NAME], commit the changes
and come up with a valid commit message, and create a pull request
into main?
```

---

## Testing

### Add Unit Tests
```text
Add unit tests for [FILE/FUNCTION] using [TEST_FRAMEWORK].
Test the happy path and error cases.
```

### Run Tests
```text
Run the tests and fix any failures
```

### Add Integration Tests
```text
Add integration tests for the [ENDPOINT] API endpoint.
Test with valid and invalid inputs.
```

---

## Docker & DevOps

### Build and Run
```text
Go ahead and run with docker
```

### Add a Service
```text
Add a [SERVICE] container to docker-compose.yml. Configure it to
[REQUIREMENTS]. Make sure the backend can connect to it.
```

### Check Logs
```text
Show me the docker logs for the [SERVICE] container
```

### Rebuild After Changes
```text
Rebuild the [SERVICE] container with the latest changes
```

---

## Library & Framework Changes

### Swap Libraries
```text
Swap out the [CURRENT] to instead use [NEW_LIBRARY]
```

### Upgrade Dependencies
```text
Update [PACKAGE] to the latest version and fix any breaking changes
```

### Use Latest Docs
```text
Use context7 to get the latest [LIBRARY] documentation and implement
[FEATURE] following current best practices.
```

---

## Code Quality

### Add Error Handling
```text
Add proper error handling to [FUNCTION/ENDPOINT]. Log errors and
return appropriate error messages to the user.
```

### Add Validation
```text
Add input validation to [FORM/ENDPOINT]. Validate [FIELDS] and
show helpful error messages.
```

### Refactor Code
```text
Refactor [FILE/FUNCTION] to be more [READABLE/MAINTAINABLE/EFFICIENT].
Keep the same functionality.
```

### Add Types
```text
Add TypeScript types to [FILE]. Define interfaces for [DATA STRUCTURES].
```

---

## Documentation

### Generate README
```text
Create a README.md for this project with installation instructions,
usage examples, and API documentation.
```

### Add Code Comments
```text
Add JSDoc comments to the functions in [FILE]. Explain what each
function does, its parameters, and return values.
```

### Update CLAUDE.md
```text
Update the CLAUDE.md file to include [NEW_INFORMATION] about the project
```

---

## Tips for Effective Prompts

### Be Specific
❌ "Make it better"
✅ "Add loading spinner while fetching data"

### Provide Context
❌ "Add a button"
✅ "Add a download button to the Tables page that exports data as CSV"

### State Constraints
❌ "Add authentication"
✅ "Add JWT authentication using existing users table, no OAuth for now"

### Ask for Explanations When Needed
✅ "I'm not familiar with React hooks, explain what useEffect does here"

### Iterate Naturally
✅ "Actually, change the color to blue"
✅ "That's good, but also add a confirmation dialog"

---

## Prompt Patterns

### Planning Pattern
```text
Let's plan [FEATURE]. I want to [GOAL]. Consider [CONSTRAINTS].
What's the best approach?
```

### Teaching Pattern
```text
I'm not familiar with [CONCEPT]. Help me understand [SPECIFIC_QUESTION]
as we implement [FEATURE].
```

### Debugging Pattern
```text
[DESCRIBE_PROBLEM]. I tried [WHAT_YOU_TRIED]. The error message is
[ERROR]. What's wrong?
```

### Refinement Pattern
```text
This is good, but [ADJUSTMENT]. Also [ADDITIONAL_REQUIREMENT].
```

---

## Common Shortcuts

| Command | Description |
|---------|-------------|
| `!` | Enter bash mode (run shell commands) |
| `/init` | Initialize CLAUDE.md |
| `/help` | Show available commands |
| `/clear` | Clear conversation history |
| `Ctrl+C` | Cancel current operation |
