# Claude Code Cheat Sheet

## Quick Reference for Arup Lab Developers

---

## Essential Commands

| Command | Description |
|---------|-------------|
| `claude` | Start Claude Code in current directory |
| `claude "prompt"` | Start with an initial prompt |
| `claude --resume` | Continue your last conversation |
| `claude --resume "prompt"` | Continue with a new prompt |
| `claude -c` | Continue most recent conversation (short flag) |

---

## Slash Commands (use inside Claude Code)

| Command | What it does |
|---------|--------------|
| `/init` | Create CLAUDE.md project context file |
| `/cost` | Show token usage and estimated cost |
| `/compact` | Summarize conversation to reduce context |
| `/clear` | Clear conversation history (start fresh) |
| `/help` | Show all available commands |
| `/config` | Open configuration settings |
| `/model` | Switch between Claude models |
| `/memory` | View/edit project memory |

Tip: Use `/init` routinely so that CLAUDE.md has updated context.
---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line (multi-line input) |
| `Escape` (1x) | Cancel current input |
| `Escape` (2x) | Interrupt Claude's response |
| `Ctrl + C` | Exit Claude Code |
| `Up Arrow` | Recall previous message |

---

## Permission Modes

Set how Claude asks for permission to make changes:

```bash
# Ask before every file change (safest)
claude --permission-mode ask

# Auto-approve safe operations
claude --permission-mode auto-edit

# Trust Claude fully (use in containers/CI)
claude --permission-mode full-auto
```

---

## MCP (Model Context Protocol)

### Using Context7 for Documentation
Context7 provides live documentation for libraries. Mention it in your prompt:

```
"Create a Mantine navbar component. Use context7 for current docs."
```

### Common MCP Servers
- **context7** - Live library documentation
- **filesystem** - Extended file operations
- **github** - Repository interactions

---

## The CLAUDE.md File

Create this in your project root to give Claude persistent context:

```markdown
# Project: [Your Project Name]

## Overview
Brief description of what this project does.

## Tech Stack
- Python 3.11
- Flask
- React + Mantine
- MongoDB
- Docker

## Project Structure
src/
  backend/    # Flask API
  frontend/   # React app

## Conventions
- Use type hints in Python
- Follow PEP 8
- Components in PascalCase

## Commands
- `docker-compose up` - Start development
- `pytest` - Run tests
```

---

## Prompting Tips

### Be Specific
❌ "Make a web app"
✅ "Create a Flask API with a /health endpoint that returns JSON status"

### Work Iteratively
Don't ask for everything at once. Build in phases:
1. Basic scaffolding
2. Add routes/components
3. Add features
4. Add tests

### Include Context
```
"Looking at src/api/routes.py, add a new endpoint for file upload 
that accepts POST requests with multipart form data"
```

### Ask for Plans First
```
"Before making changes, outline your plan for adding MongoDB 
to this Flask application"
```

---

## Common Workflows

### Starting a New Project
```bash
mkdir my-project && cd my-project
git init
claude
# Then use /init to create CLAUDE.md
```

### Resuming Work
```bash
cd my-project
claude --resume
# or just: claude -c
```

### Working with Git
```
"Create a new branch called feature/file-upload, implement the 
upload endpoint, and prepare a commit message"
```

### Debugging
```
"I'm getting this error when running pytest: [paste error]
Look at the relevant files and fix the issue"
```

---

## Cost Awareness

- Check costs periodically with `/cost`
- Use `/compact` when context gets large
- Start fresh (`/clear`) for unrelated tasks
- Sonnet is cheaper than Opus for routine tasks

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| AWS credentials expired | Run `aws sso login` |
| Claude seems confused | Use `/compact` or `/clear` |
| Changes not appearing | Check if file was saved, refresh |
| Permission denied | Check `--permission-mode` setting |
| Context too long | Use `/compact` to summarize |

---

## AWS Setup Quick Check

```bash
# Verify AWS CLI is configured
aws sts get-caller-identity

# If it fails, login again
aws sso login --profile your-profile

# Test Claude Code
claude "say hello"
```

---

## Resources

- **Internal Wiki**: https://wiki331.aruplab.net/display/DEVOP/Claude+Code+Guide
- **Official Docs**: https://docs.anthropic.com/claude-code
- **Context7**: https://context7.com

---

*Cheat sheet for Arup Lab Claude Code Workshop*
*Last updated: January 2025*
