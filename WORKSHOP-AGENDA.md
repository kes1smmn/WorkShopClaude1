# Claude Code Workshop Agenda

**Duration:** 1.5 hours (90 minutes)
**Format:** Follow-along (participants build alongside facilitator)
**Prerequisites:** Setup completed before session (see SETUP-CHECKLIST.md)

---

## Agenda Overview

| Time | Duration | Module | Activity |
|------|----------|--------|----------|
| 0:00 | 15 min | Setup Check | Verify everyone is ready |
| 0:15 | 10 min | Intro | Claude Code basics, slash commands, MCP |
| 0:25 | 30 min | Build Together | Follow-along coding session |
| 0:55 | 15 min | Git Workflow | Branch, commit, PR |
| 1:10 | 10 min | Practice | Individual exercise |
| 1:20 | 10 min | Wrap-up | Skills preview + Q&A |

---

## Detailed Breakdown

### 0:00 - 0:15 | Setup Check (15 min)

**Goal:** Everyone has Claude Code working

```bash
# Step 1: Login to AWS
aws sso login --profile bedrock

# Step 2: Start Claude Code
cd ~/projects  # or any folder
claude

# Step 3: Test prompt
> Tell me a programming joke
```

**Quick Haiku Model Test:**
```text
Fetch cheese.com
```



**Troubleshooting:**
| Issue | Fix |
|-------|-----|
| SSO expired | `aws sso login --profile bedrock` |
| ARN errors | Check ~/.claude/settings.json |
| Claude hangs | Verify certificate paths |
| Fetch fails | Check ANTHROPIC_DEFAULT_HAIKU_MODEL |

If someone is stuck, have them pair with a neighbor and fix during practice time.

clone are repo ahead of time:
```bash
git clone git@github.com:kes1smmn/WorkShopClaude1.git
```


---

### 0:15 - 0:25 | Introduction - Claude Code Essentials (10 min)

**Goal:** Cover the basics everyone needs to know

#### What is Claude Code? (2 min)

- Terminal-based AI coding assistant (not a chatbot)
- Reads, writes, and executes code in your project
- Has full context of your codebase
- Today: Build a full-stack file hashing app together

#### Slash Commands (3 min)

| Command | What it does |
|---------|--------------|
| `/help` | Show all available commands |
| `/init` | Create CLAUDE.md project file |
| `/clear` | Clear conversation history |
| `/compact` | Summarize conversation to save context |
| `/cost` | Show token usage and cost |
| `/doctor` | Diagnose setup issues |
| `/model` | Switch between models (sonnet/haiku/opus) |

```bash
/help
/init
```

The `/init` command creates a CLAUDE.md file that Claude reads automatically - like giving Claude a README about your project.

#### Keyboard Shortcuts & Tips (2 min)

| Shortcut | Action |
|----------|--------|
| `Shift+Tab` | Toggle between modes / Accept all pending changes |
| `Ctrl+C` | Cancel current operation |
| `Escape` | Exit current input / reject change |
| `!` | Enter bash mode (run shell commands) |
| `↑` / `↓` | Navigate command history |

**Modes:**
- **Auto-accept mode** - Claude executes without asking (faster)
- **Review mode** - Claude asks before each action (safer)
- **Plan mode** - Claude creates a plan before executing (complex tasks)

Use `Shift+Tab` to cycle through modes, or type `/plan` to enter plan mode.

Bash mode tip - prefix commands with `!` to run without leaving Claude:
```text
! ls -la
! docker ps
! git status
```

#### MCP Servers - Context7 (3 min)

**What are MCP Servers?**
- Model Context Protocol - extends Claude's capabilities
- Connect to external data sources and tools
- Context7 = access to latest documentation

```bash
# Add Context7
claude mcp add --transport http context7 https://mcp.context7.com/mcp

# Verify
claude mcp list
```

Claude's training has a cutoff date. When you say "use context7", Claude fetches *current* docs for React, Mantine, Flask, etc.

```text
Use context7 to tell me what's new in Mantine v8
```

---

### 0:25 - 0:55 | Build Together (30 min)

**Goal:** Build the File Hash Analyzer following along together

#### Part 1: Initial App (12 min)

Type the main prompt together:

```text
Let's plan a basic web application using Mantine, the react components library,
for the front end and Flask for the back end. I want a very basic set up with
no JWT or authentication yet.

For the front end, I want to basically have a navbar using the header component,
with "Home", "Upload", and "Status".

Home just takes you to the landing page. Upload takes you to a different page
that uses a "dropzone" component for file upload. This endpoint will literally
just perform a hasher. People can select from md5, sha256, or other popular
options. I want the hashing to be done by python only.

The "Status" page just checks if the flask app is up and running.

When you design this, please use Docker and docker-compose.yml. Use context7.

I am not familiar with React, help me understand how to create the React structure.
```

Walk through Claude's response:
- How Claude plans the architecture
- The file structure it creates
- React component explanation

Checkpoint: "Everyone see files being created? Questions?"

---

#### Part 2: Run with Docker (5 min)

```text
Go ahead and run with docker
```

Wait for `docker-compose up --build` to complete.

Checkpoint: Open http://localhost:3000 - verify the app loads.

---

#### Part 3: Iterate (5 min)

```text
Actually, I want the file size limit to be 200MB
```

Key points:
- Claude knows the context from conversation
- Changes multiple files (nginx.conf, frontend config)
- Natural language refinement works

---

#### Part 4: Add MongoDB (8 min)

```text
Add a local mongo instance to the docker-compose.yml, and implement a way to
keep track of all the files hashed. Then display these hashed files in the
endpoint "Tables". When you hash a file, also check if the file has been
hashed before.

When you set up the mongo instance, I want basic login information, I am not
worried about security right now.
```

Walk through:
- Docker service added
- New Tables page created
- Backend database connection
- Duplicate detection logic

Let Docker rebuild with MongoDB, then demo: upload a file, see it in Tables, upload again to show "previously seen".

---

### 0:55 - 1:10 | Git Workflow (15 min)

**Goal:** Show Claude's Git integration with full PR workflow

One prompt does it all:

```text
Can you create a new branch, commit the changes and come up with a valid
commit message, and create a pull request into main?
```

Watch Claude:
1. Create new branch
2. Stage files
3. Generate commit message
4. Push to origin
5. Create PR with description
6. Return PR URL

Open the PR in GitHub together.

Key points:
- Always review before merging
- Claude generates good commit messages
- PR description summarizes changes

If time, show the swap prompt:
```text
Swap out the table element to instead use AG-Grid
```

---

### 1:10 - 1:20 | Practice Exercise (10 min)

**Goal:** Participants try an exercise independently

Pick one:

**Option A - Quick Win (recommended):**
```text
Add a copy button next to each hash in the Tables page. When clicked,
copy the hash to clipboard and show a notification "Hash copied!"
```

**Option B - Git Practice:**
```text
Create a new branch called feature/my-improvement, make any small change
you want, commit it, and create a PR
```

**Option C - Try Slash Commands:**
```text
/compact
/cost
/model haiku
Tell me a joke
/model sonnet
```

Walk around, help with issues, answer questions.

---

### 1:20 - 1:30 | Wrap-up (10 min)

**Goal:** Preview advanced features, collect feedback

#### Skills Preview (3 min)

**Show the CLAUDE.md file:**
```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Coding Standards
- Use TypeScript strict mode
- All API endpoints must return JSON
- Log all errors to console
```

"Claude reads this automatically. You can add project rules, coding standards, security guidelines."

#### Subagents Mention (2 min)

"For bigger tasks, Claude can spawn subagents to work in parallel:"

```text
Create unit tests for both backend and frontend using subagents -
one for pytest, one for vitest
```

"We'll cover this in a future workshop."

#### Future Topics (2 min)

Upcoming workshops:
1. **Advanced Prompting** - Writing effective prompts
2. **Custom Skills** - Building reusable instructions
3. **Subagents Deep Dive** - Parallel task execution
4. **Code Review Automation** - PR review workflows
5. **MCP Servers** - Database and API integrations

"Interested in leading one?"

#### Q&A (3 min)

Open floor for questions.

**Share:**
- Workshop repo: github.com/ksimmon/WorkShopClaude1
- Slack channel: #claude-code-workshop
- Prompts reference: PROMPTS-REFERENCE.md in repo

---
