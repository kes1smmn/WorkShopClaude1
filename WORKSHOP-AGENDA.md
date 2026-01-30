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

## 💡 Helpful Tips for the Workshop

Before we begin, here are some practical tips to make your workshop experience smoother:

| Tip | Why It Helps |
|-----|--------------|
| **Use `caffeinate`** | Prevents your Mac from sleeping during long Docker builds or Claude operations. Run `caffeinate -d` in a separate terminal, or `caffeinate -d -t 7200` for a 2-hour session. |
| **Open multiple terminal windows** | Keep one terminal dedicated to Claude Code, another for Docker logs (`docker-compose logs -f`), and a third for git or manual commands. This prevents interrupting Claude mid-task. |
| **Position terminals side-by-side** | See Claude's output while watching Docker build progress or browsing localhost:3000. |
| **Keep a browser tab on localhost:3000** | Quick refresh to see changes after each iteration. |
| **Use `/cost` periodically** | Track token usage, especially during the Build Together section where prompts are longer. |
| **Use `Cmd+K` to clear terminal** | Keeps your terminal readable when output gets cluttered. |
| **Start Docker Desktop first** | Ensure Docker Desktop is running before the workshop begins to avoid delays. |

**Quick setup command (run before workshop starts):**
```bash
# In a dedicated terminal window - keeps Mac awake for 2 hours
caffeinate -d -t 7200 &
```

---

## Detailed Breakdown

### 0:00 - 0:15 | Setup Check (15 min)

> 📄 **Reference:** See [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md) for detailed pre-workshop setup instructions.

#### Learning Outcomes

> "After this section, you'll be able to:
> - Successfully authenticate with AWS SSO
> - Launch Claude Code in your terminal
> - Verify your setup is working correctly"

---

**📋 Facilitator notes:** Keep this section moving. If someone is stuck for more than 2 minutes, pair them with a neighbor and circle back during practice time.

#### Step 1: AWS Authentication (3 min)

```bash
aws sso login --profile bedrock
```

**🎯 Checkpoint:** Browser opens for SSO login. Once complete, terminal shows "Successfully logged in."

#### Step 2: Launch Claude Code (3 min)

```bash
mkdir ~/claude_test
cd ~/claude_test  # or your preferred folder
claude
```

**🎯 Checkpoint:** You see the Claude Code welcome message and input prompt.

#### Step 3: Test Basic Prompt (3 min)

```text
Tell me a programming joke
```

**🎯 Checkpoint:** Claude responds with a joke. This confirms your API connection works.

#### Step 4: Test Haiku Model with MCP (4 min)

First, verify the Haiku model is configured:

```text
/model haiku
```

**🎯 Checkpoint:** You should see an ARN path like `arn:aws:bedrock:us-west-2:XXXXXXXX:application-inference-profile/XXXXXXXX`

Then test the fetch capability:

```text
Fetch cheese.com
```

**💡 Why this test?** This validates that:
- The Haiku model (faster, cheaper) is configured correctly
- MCP (Model Context Protocol) can fetch external resources
- Your environment variables are set properly

**🎯 Checkpoint:** Claude returns information about the cheese.com website (a cheese encyclopedia with 2,000+ cheeses).

---

#### Troubleshooting Reference

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| "Session expired" or SSO errors | AWS credentials timed out | `aws sso login --profile bedrock` |
| "Invalid ARN" or model errors | Settings misconfigured | Check `~/.claude/settings.json` for correct ARN |
| Claude hangs on startup | Certificate issues | Verify certificate paths in environment |
| Fetch command fails | Haiku model not set | Check `ANTHROPIC_DEFAULT_HAIKU_MODEL` env var |
| "Permission denied" errors | SSH key not configured | Run `ssh -T git@github.com` to test |


---

#### Pre-work: Clone the Repository and Cache Docker Images

Clone the repo (HTTP method, signed out users)
```
git clone https://github.com/kes1smmn/WorkShopClaude1.git
```

SSH method (may need prior setup for SSH keys)
```bash
git clone git@github.com:kes1smmn/WorkShopClaude1.git
```

---

### 0:15 - 0:25 | Introduction - Claude Code Essentials (10 min)

#### Learning Outcomes (30 sec)

> "After this section, you'll be able to:
> - Run 3 essential slash commands
> - Choose the right mode for your task
> - Understand how MCP extends Claude's capabilities"

#### What is Claude Code? (2 min)

- Terminal-based AI coding assistant (not a chatbot)
- Reads, writes, and executes code in your project
- Has full context of your codebase
- **What makes it different:** Works in your terminal, not a browser - direct access to files, git, and shell commands
- **Today's hook:** We'll build a full-stack file hashing app together

#### Slash Commands with Live Demo (3 min)

**🎯 Interactive Checkpoint:** Have everyone run `/help` together now!

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/help` | See all commands | When stuck |
| `/init` | Create CLAUDE.md | New projects |
| `/clear` | Reset conversation | Fresh start |
| `/compact` | Summarize context | Long sessions |
| `/cost` | Check token usage | Budget tracking |
| `/doctor` | Diagnose issues | Troubleshooting |
| `/model` | Switch AI model | Different tasks |

**Sample CLAUDE.md snippet** (created by `/init`):
```markdown
# CLAUDE.md
## Project: File Hasher
- Frontend: React + Mantine
- Backend: Flask
- Always use TypeScript strict mode
```

#### Modes & When to Use Them (2 min)

| Mode | Best For | Example |
|------|----------|---------|
| **Auto-accept** | Repetitive, low-risk tasks | Formatting, simple refactors |
| **Review** | Production code changes | Feature development |
| **Plan** | Complex, multi-file work | Architecture decisions |

Use `Shift+Tab` to cycle through modes, or type `/plan` to enter plan mode.

⚠️ **Security note:** Always review changes before committing, regardless of mode.

#### Keyboard Shortcuts (1.5 min)

| Shortcut | Action |
|----------|--------|
| `Shift+Tab` | Toggle between modes (shows visual indicator) |
| `Ctrl+C` | Stop current operation |
| `Escape` | Cancel input / reject change |
| `!` prefix | Run bash directly (e.g., `! git status`) |
| '@' tag | Use this to reference file/folder (e.g., `@myfolder/script.py`|
| `↑` / `↓` | Navigate command history |

#### MCP Preview (1 min)

**Brief intro** (detailed use comes in Build Together):

- **MCP** (Model Context Protocol) lets Claude access external tools and documentation
- We've pre-configured **Context7** for live docs lookup
- You'll see this in action during the demo when we fetch React/Mantine docs

```text
# You'll use prompts like this later:
Use context7 to look up Mantine Dropzone component
```

---

### 0:25 - 0:55 | Build Together (30 min)

#### Learning Outcomes

> "After this section, you'll be able to:
> - Write effective multi-requirement prompts
> - Use Context7 for live documentation lookup
> - Iterate on generated code with natural language
> - Understand how Claude maintains conversation context"

---

#### Part 1: Initial App (12 min)

**What we're building:** A full-stack file hashing web app with React frontend and Flask backend.

**🎯 Interactive Checkpoint:** Everyone type this prompt together (don't hit enter yet):

Shift tab untill you are in plan mode

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

**📋 Facilitator: Walk through Claude's response and highlight:**

| What to Point Out | Why It Matters |
|-------------------|----------------|
| Claude enters Plan mode | Complex tasks trigger planning automatically |
| Context7 fetches Mantine docs | Live documentation, not stale training data |
| File structure created | Claude understands project conventions |
| React component breakdown | Responds to "help me understand" request |

**🎯 Checkpoint:** "Everyone see files being created? Raise hand if you have questions."

---

#### Part 2: Run with Docker (5 min)

**Goal:** See the app running - validates Claude's generated code works.

```text
Go ahead and run with docker
```

**📋 Facilitator notes:**
- Wait for `docker-compose up --build` to complete (~2-3 min)
- Common issue: Port 3000 already in use → `docker-compose down` first
- If build fails, Claude can debug its own output

**🎯 Checkpoint:** Everyone open http://localhost:3000

| What to Verify | Expected Result |
|----------------|-----------------|
| App loads | Mantine UI with navbar visible |
| Navigation works | Home, Upload, Status links functional |
| Status page | Shows "healthy" from Flask backend |

---

#### Part 3: Iterate with Natural Language (5 min)

**Goal:** Show how Claude maintains context and handles refinements.

```text
Actually, I want the file size limit to be 200MB
```

```text

Make a feature branch 'add_local_storage' for this change. Add a local mongo instance to the docker-compose.yml, and implement a way to keep track of all the files hashed. Then display these hashed files in the endpoint "Tables". When you hash a file, also check if the file has been  hashed before. When you setup the mongo instance, I want basic login information, I am not worried about security right now.

could you give me a uri so I can connect to the mongodb via studio3t  
```

```text
update the table to use ag-grid. Can you style it like an xkcd comic and use context7      
```

```text
I would like to include a pie chart on the tables page that will display either the file extensions or the hash type from the table the user should be able to toggle. Refer to this example https://observablehq.com/@d3/pie-chart-update.  Use d3.js and context7 
```

**📋 Facilitator: Highlight these key concepts:**

| Concept | What's Happening |
|---------|------------------|
| **Context awareness** | Claude knows which app we're talking about |
| **Multi-file changes** | Updates nginx.conf, frontend config, backend validation |
| **No re-explanation needed** | Natural language refinement just works |

**💡 Teaching moment:** "Notice we didn't say 'in the file hasher app' - Claude tracks the conversation."

---

#### Part 4: Add MongoDB (8 min)

**Goal:** Extend the app with persistence - shows Claude handling infrastructure + code together.

```text
Add a local mongo instance to the docker-compose.yml, and implement a way to
keep track of all the files hashed. Then display these hashed files in the
endpoint "Tables". When you hash a file, also check if the file has been
hashed before.

When you set up the mongo instance, I want basic login information, I am not
worried about security right now.
```

**📋 Facilitator: Walk through what Claude creates:**

| Component | What Claude Adds |
|-----------|------------------|
| `docker-compose.yml` | MongoDB service with credentials |
| Backend | PyMongo connection, hash storage logic |
| Frontend | New "Tables" page with data grid |
| Duplicate detection | Checks hash before storing |

**🎯 Final Demo Sequence:**
1. Let Docker rebuild with MongoDB (~2 min)
2. Upload a file → see hash result
3. Check Tables page → file appears in list
4. Upload same file again → "previously seen" message

**💡 Teaching moment:** "One prompt added a database, new API endpoints, a new page, and business logic. That's the power of context-aware AI."

---

### 0:55 - 1:10 | Git Workflow (15 min)

#### Learning Outcomes

> "After this section, you'll be able to:
> - Use Claude to automate git branching and commits
> - Generate meaningful commit messages with AI
> - Create pull requests without leaving the terminal"

---

**Goal:** Show Claude's Git integration with full PR workflow

#### Full Workflow Demo (10 min)

One prompt does it all:

```text
Can you create a new branch, commit the changes and come up with a valid
commit message, and create a pull request into main?
```

**📋 Facilitator: Point out each step as Claude executes:**

| Step | What Claude Does | What to Highlight |
|------|------------------|-------------------|
| 1. Branch | Creates feature branch | Follows naming conventions (e.g., `feature/add-mongo-storage`) |
| 2. Stage | Adds changed files | Selects relevant files, not everything |
| 3. Commit | Generates message | Summarizes *what* and *why*, not just file names |
| 4. Push | Pushes to origin | Sets upstream tracking |
| 5. PR | Creates pull request | Auto-generates description from commit history |
| 6. URL | Returns PR link | Click to open in browser |

**🎯 Checkpoint:** Open the PR in GitHub together. Review the generated description.

---

#### Key Concepts

| Concept | Why It Matters |
|---------|----------------|
| Branch naming | Claude follows project conventions automatically |
| Commit message quality | AI reads the diff and summarizes changes accurately |
| PR description | Generated from full commit history, not just last commit |

⚠️ **Security reminder:** Always review the PR diff before merging. Claude may include unintended changes (debug logs, commented code, etc.).

---

#### Optional Extension: Live Code Change (5 min)

*If time permits, demonstrate a quick change and new PR:*

```text
Swap out the table element to instead use AG-Grid
```

**What this demonstrates:**
- Claude can research new libraries (via Context7)
- Makes multi-file changes (package.json, imports, component)
- You can create another PR for this change

**🎯 Expected outcome:** New PR with AG-Grid implementation.

---

### 1:10 - 1:20 | Practice Exercise (10 min)

#### Goal

> "Practice independently. Try to complete one exercise without facilitator help."

This is your chance to apply what you've learned. Pick an option that matches your comfort level.

---

#### Exercise Options

| Option | Difficulty | What You'll Practice | Expected Result |
|--------|------------|---------------------|-----------------|
| A - Copy Button | ⭐ Easy | UI changes, clipboard API | Button appears next to hashes, copies on click |
| B - Git Practice | ⭐⭐ Medium | Full git workflow | New PR created in your fork |
| C - Slash Commands | ⭐ Easy | CLI navigation | See cost, switch models |

---

**Option A - Copy Button (⭐ Easy, recommended for first-timers):**
```text
Add a copy button next to each hash in the Tables page. When clicked,
copy the hash to clipboard and show a notification "Hash copied!"
```

**Option B - Git Practice (⭐⭐ Medium):**
```text
Create a new branch called feature/my-improvement, make any small change
you want, commit it, and create a PR
```

**Option C - Explore Slash Commands (⭐ Easy):**
```text
/compact
/cost
/model haiku
Tell me a joke
/model sonnet
```

---

#### 📋 Facilitator Notes

**Common issues and when to intervene:**

| Issue | Let Them Try | Intervene If... |
|-------|--------------|-----------------|
| Prompt doesn't work first time | ✅ Encourage rewording | Stuck for 3+ minutes |
| Docker rebuild needed | ✅ Normal workflow | Build fails repeatedly |
| Git authentication error | ❌ Help immediately | SSH key issues block progress |
| Unsure which option | ✅ Suggest Option A | Analysis paralysis > 1 minute |

**For participants who finish early:**
- Suggest trying Option B if they did A
- Explore `/help` to see all available commands
- Try asking Claude to explain something in the generated code

---

### 1:20 - 1:30 | Wrap-up (10 min)

#### Key Takeaways

> "From today's workshop, remember:
> - Claude Code works best with clear, detailed prompts (context matters)
> - Use `/compact` for long sessions, `/cost` to track usage
> - Always review generated code before committing
> - MCP extends Claude with live documentation and external tools"

---

#### CLAUDE.md Deep Dive (3 min)

**Beyond basics - project-specific rules:**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Coding Standards
- Use TypeScript strict mode
- All API endpoints must return JSON
- Prefer functional components over class components

## Security Rules
- Never read or commit .env files
- All user input must be sanitized before database operations
- Use parameterized queries for MongoDB operations

## Project Patterns
- API routes follow RESTful conventions: /api/{resource}/{id}
- Use Mantine notifications for user feedback, never alert()
- Hash validation uses Python hashlib, not external libraries
```

**💡 Tie-back:** Notice the security rules? That's why Claude didn't commit credentials when we set up MongoDB.

---

#### Subagents Preview (2 min)

**What are subagents?** Claude can spawn specialized "helper" agents to work on tasks in parallel.

**Example use case:**
```text
Create unit tests for both backend and frontend using subagents -
one for pytest, one for vitest
```

**What happens:**
- Claude spawns two subagents simultaneously
- One writes Python tests with pytest
- One writes TypeScript tests with vitest
- Results merge back into your session

**🔜 Future workshop:** "Subagents Deep Dive" will cover parallel task execution in detail.

---

#### What's Next? (2 min)

| Workshop | What You'll Learn |
|----------|-------------------|
| **Advanced Prompting** | Write prompts that get better results first time |
| **Custom Skills** | Create reusable instruction sets for common tasks |
| **Subagents Deep Dive** | Parallelize work across multiple Claude instances |
| **Code Review Automation** | Automate PR reviews with AI-powered analysis |
| **MCP Servers** | Connect Claude to databases, APIs, and custom tools |

💬 "Interested in leading or co-facilitating one? Let me know!"

---

#### Q&A (3 min)

**📋 Facilitator: Seed discussion with these common questions if needed:**

| Question | Quick Answer |
|----------|--------------|
| "How much does this cost?" | Use `/cost` to check. Haiku is ~10x cheaper than Sonnet. |
| "Can I use this on client projects?" | Check with your project lead re: data handling policies. |
| "Does Claude remember between sessions?" | No, but CLAUDE.md persists context. Use `/init` to create one. |
| "What if Claude writes bad code?" | Review everything. Claude is a tool, not a replacement for judgment. |

**Open floor for questions.**

---

#### Resources

| Resource | Link |
|----------|------|
| Workshop repo | github.com/kes1smmn/WorkShopClaude1 |
| Prompts reference | `PROMPTS-REFERENCE.md` in repo |
| Claude Code docs | claude.ai/code |

---
