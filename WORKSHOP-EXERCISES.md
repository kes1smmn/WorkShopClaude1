# Workshop Exercises

These exercises are designed for hands-on practice after watching the demo. Start with Exercise 1 and progress based on time available.

---

## Exercise 1: Quick Win - Copy to Clipboard (5 min)

**Goal:** Add a small feature using natural language

```text
Add a copy button next to each hash in the Tables page. When clicked, copy the
hash to the clipboard and show a notification that says "Hash copied!"
```

**What you'll learn:**
- Feature requests in natural language
- Claude adds UI components and functionality
- Toast notifications with Mantine

---

## Exercise 2: UX Improvement - Loading States (10 min)

**Goal:** Improve user experience

```text
The Upload page feels slow when hashing large files. Add a progress indicator
or skeleton loader while waiting for the hash result. Also add a "Cancel" button
that aborts the request.
```

**What you'll learn:**
- UX-focused prompts
- State management in React
- Request cancellation patterns

---

## Exercise 3: Add a New Algorithm (10 min)

**Goal:** Backend and frontend changes together

```text
Add BLAKE2 as a hashing algorithm option. Update both the backend to support it
and the frontend dropdown to include it. Use the hashlib library.
```

**What you'll learn:**
- Coordinated changes across stack
- Python hashlib capabilities
- Form option updates

---

## Exercise 4: Data Export (15 min)

**Goal:** Add a complete new feature

```text
Add an "Export" button to the Tables page that downloads all hash records as a
CSV file. The CSV should have columns: Filename, Algorithm, Hash, Size, Timestamp.
Include proper headers and handle the case when there are no records.
```

**What you'll learn:**
- File generation and download
- Data transformation
- Edge case handling

---

## Exercise 5: Git Workflow (10 min)

**Goal:** Practice Claude's Git integration

First, complete Exercise 1 or 2. Then:

```text
Create a new branch called feature/clipboard-copy, stage all changes, write a
descriptive commit message, and push to origin. Then create a pull request to main
with a summary of what was changed.
```

**What you'll learn:**
- Automated Git workflow
- Branch naming conventions
- PR descriptions

---

## Exercise 6: Iterative Refinement (15 min)

**Goal:** Learn the conversation flow

Start with a vague request, then refine:

**Prompt 1:**
```text
Make the Tables page look better
```

Review what Claude suggests, then be more specific:

**Prompt 2:**
```text
I like the alternating row colors. Can you also add sorting by clicking column
headers? And make the timestamp column show relative time like "2 hours ago".
```

**Prompt 3:**
```text
The relative time is good but I also want to see the full timestamp on hover
```

**What you'll learn:**
- Iterative development flow
- Building on previous changes
- Specific vs vague prompts

---

## Challenge Exercise: Dark Mode (20 min)

**Goal:** Larger feature with persistence

```text
Add a dark mode toggle to the header. Use Mantine's color scheme system.
The preference should persist in localStorage so it's remembered across visits.
Make sure all pages look good in both light and dark mode.
```

Follow-up if time:
```text
Add a system preference option that follows the user's OS dark mode setting
```

**What you'll learn:**
- Theme systems in React
- LocalStorage persistence
- CSS-in-JS theming

---

## Bonus: MCP Server Exercise

If you want to try Context7:

```text
I want to add form validation to the Upload page. Use context7 to get the
latest Mantine form documentation and implement validation that:
1. Requires a file to be selected
2. Shows an error if the file is larger than 200MB before upload
3. Validates that an algorithm is selected
```

**What you'll learn:**
- Using MCP servers for current docs
- Form validation patterns
- Pre-upload validation

---

## Tips for Success

1. **Be specific** - "Add a blue button" vs "Add a button"
2. **Provide context** - "In the Tables page" not "on the page"
3. **State constraints** - "Using Mantine components" "Without adding new dependencies"
4. **Ask for explanations** - "Explain what this useEffect does"
5. **Iterate** - Start simple, add complexity

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Claude creates wrong file | "No, put that in frontend/src/pages/Tables.tsx" |
| Too many changes at once | "Let's start with just the button, we'll add the notification after" |
| Doesn't use Mantine | "Use Mantine's Button component, not a plain HTML button" |
| Breaks existing functionality | "The upload still needs to work, don't change the hash endpoint" |

---

## After the Workshop

Continue practicing with these prompts:

1. "Add unit tests for the backend using pytest"
2. "Create a Dockerfile health check for the backend"
3. "Add rate limiting to prevent hash spam"
4. "Implement file type validation - only allow certain extensions"
5. "Add a search/filter feature to the Tables page"
