# Workshop Setup Checklist

Complete this checklist **before** the workshop. Aim to finish at least 2 days in advance.

---

## 1. Access Requests (1-2 weeks before)

- [ ] AWS Account Access - Submit ServiceNow ticket
- [ ] AWS SSO Role: `BedrockAPI-Access` - Request from DevOps
- [ ] Bedrock Model ARNs - Get from DevOps (Sonnet, Haiku, Opus)
- [ ] SSL Certificate: `ARUPRootCA.crt` - Get from IT Security

---

## 2. Software Installation

### All Platforms

- [ ] **Node.js v18+**
  ```bash
  node --version  # Should show v18.x.x or higher
  ```
  Download: https://nodejs.org/

- [ ] **Python 3.10+**
  ```bash
  python --version  # Should show 3.10.x or higher
  ```
  Download: https://python.org/

- [ ] **Git**
  ```bash
  git --version
  ```
  Download: https://git-scm.com/

- [ ] **AWS CLI v2**
  ```bash
  aws --version  # Should show aws-cli/2.x.x
  ```
  Download: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

- [ ] **Docker Desktop**
  ```bash
  docker --version
  docker-compose --version
  ```
  Download: https://docker.com/products/docker-desktop

- [ ] **VS Code** (optional but recommended)
  Download: https://code.visualstudio.com/

### Windows Only

- [ ] **Git Bash** (included with Git for Windows)
- [ ] Verify Git Bash path: `C:\Program Files\Git\bin\bash.exe`

---

## 3. AWS SSO Configuration

```bash
aws configure sso
```

Enter these values when prompted:

| Prompt | Value |
|--------|-------|
| Profile Name | `bedrock` |
| Start URL | `https://d-XXXXX.awsapps.com/start/#` |
| AWS Region | `us-west-2` |
| Registration Scopes | `sso:account:access` |
| AWS Account | *Select your assigned account* |
| AWS SSO Role | `BedrockAPI-Access` |

### Test AWS Login

```bash
aws sso login --profile bedrock
aws sts get-caller-identity --profile bedrock
```

You should see your user details in the output.

---

## 4. SSL Certificate Setup

```bash
# Create certs directory
mkdir -p ~/certs

# Copy ARUPRootCA.crt to ~/certs/
# (Get file from IT Security)
```

Verify:
```bash
ls ~/certs/ARUPRootCA.crt
```

---

## 5. Claude Code Installation

```bash
npm install -g @anthropic-ai/claude-code
```

Verify:
```bash
claude --version
```

---

## 6. Claude Code Configuration

### Create settings file

```bash
mkdir -p ~/.claude
```

### Edit ~/.claude/settings.json

**macOS/Linux:**
```json
{
  "env": {
    "AWS_PROFILE": "bedrock",
    "AWS_REGION": "us-west-2",
    "CLAUDE_CODE_USE_BEDROCK": "1",
    "ANTHROPIC_MODEL": "<SONNET_ARN>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<OPUS_ARN>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<SONNET_ARN>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<HAIKU_ARN>",
    "NODE_EXTRA_CA_CERTS": "/Users/<USERNAME>/certs/ARUPRootCA.crt",
    "NODE_TLS_REJECT_UNAUTHORIZED": "0",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "4096",
    "MAX_THINKING_TOKENS": "1024"
  }
}
```

**Windows:**
```json
{
  "env": {
    "AWS_PROFILE": "bedrock",
    "AWS_REGION": "us-west-2",
    "CLAUDE_CODE_USE_BEDROCK": "1",
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe",
    "ANTHROPIC_MODEL": "<SONNET_ARN>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<OPUS_ARN>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<SONNET_ARN>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<HAIKU_ARN>",
    "NODE_EXTRA_CA_CERTS": "C:\\Users\\<USERNAME>\\certs\\ARUPRootCA.crt",
    "NODE_TLS_REJECT_UNAUTHORIZED": "0",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "4096",
    "MAX_THINKING_TOKENS": "1024"
  }
}
```

Replace `<SONNET_ARN>`, `<OPUS_ARN>`, `<HAIKU_ARN>` with ARNs from DevOps.

---

## 7. Test Claude Code

```bash
# Login to AWS first
aws sso login --profile bedrock

# Start Claude
claude

# Test prompts:
> Tell me a programming joke
> Fetch cheese.com
```

Both should work without errors.

---

## 8. Clone Workshop Repository

```bash
git clone https://github.com/ksimmon/WorkShopClaude1.git
cd WorkShopClaude1
```

---

## 9. Setup Context7 MCP (Optional but Recommended)

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

Verify:
```bash
claude mcp list
```

Should show `context7` in the list.

---

## 10. Test Docker Setup

```bash
cd WorkShopClaude1
docker-compose up --build
```

Visit http://localhost:3000 - you should see the File Hasher app.

Stop with `Ctrl+C` then `docker-compose down`.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `SSO session expired` | Run `aws sso login --profile bedrock` |
| Claude hangs | Check settings.json ARNs are correct |
| `Connection refused` | Verify NODE_EXTRA_CA_CERTS path exists |
| Docker build fails | Ensure Docker Desktop is running |
| `Port 3000 in use` | Run `docker-compose down` first |
| MCP not found | Re-run the `claude mcp add` command |

---

## Questions?

Contact the workshop facilitator or post in Slack: #claude-code-workshop
