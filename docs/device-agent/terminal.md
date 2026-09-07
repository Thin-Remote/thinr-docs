---
title: Terminal
description: Real PTY sessions on any device, from the CLI or the browser.
---

# Terminal

The agent gives you an interactive shell on the device with a **real PTY**: full-screen programs like `htop` or `vim`, job control, signals and window resizing all behave like a local terminal.

## Behavior

- The agent spawns the device's shell as an **interactive login shell**, picking the first of `zsh`, `bash`, `sh`, `ash` present on the system. Your usual profile and aliases load.
- Resizing your local terminal propagates to the remote PTY.
- A session ends when the shell exits (`exit` or Ctrl+D); multiple sessions can run in parallel over the same device connection.
- The shell runs as the agent's user: root on a system install, that user on a user install. See [architecture and security](./architecture-and-security).

## Using it

```bash
thinr device console <deviceId>
```

The web console offers the same session in the browser. Prefer your own SSH client? [Tunnel to port 22](./tunnels) and keep your existing workflow, `~/.ssh/config` included.

For scripted or one-shot work you usually don't want an interactive session at all: use [command execution](./command-execution) instead.
