---
title: Command execution
description: One-shot and streaming command execution, on one device or a whole fleet.
---

# Command execution

Run any shell command on a device without opening an interactive session, with live output and real exit codes. This is the building block most automation ends up using, and what AI assistants call through the `thinr_exec` MCP tool.

## Behavior

- Commands run through the **same shell as the terminal** (first of `zsh`, `bash`, `sh`, `ash`), so quoting and expansions behave consistently between interactive and scripted use.
- **Streaming**: stdout and stderr arrive live; the local exit code mirrors the remote command's, so it composes with `set -e`, CI steps and shell conditionals.
- `$HOME` is guaranteed for child processes even when the service manager didn't set it, so scripts relying on `~` keep working.
- Commands run as the agent's user: root on a system install. See [architecture and security](./architecture-and-security).

## Using it

```bash
thinr device exec edge-gw-17 "uname -a && uptime"
thinr device exec edge-gw-17 "df -P /" --json     # {stdout, stderr, exitCode}
```

Fan out across a fleet with concurrency, timeouts and per-device results:

```bash
thinr product exec edge-gateways "systemctl restart app" -c 5 --timeout 60
```

Full options in the [exec workflow](/cli/exec-commands). Two features build on this same capability: [device logs](/cli/reference/device-commands#logs) streaming, and [product scripts](./custom-scripts), which execute centrally-stored scripts through it.
