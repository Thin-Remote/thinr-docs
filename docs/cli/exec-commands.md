---
title: Executing commands
description: Run shell commands on remote devices with streaming output.
---

# Executing commands

Run arbitrary commands without opening a full session:

```bash
thinr device exec <deviceId> "uname -a"
```

Output streams back to your terminal in real time, and the local process exits with the **remote command's exit code**, so exec composes with `set -e`, conditionals and CI steps:

```bash
thinr device exec store-14 "systemctl is-active app" && echo "app is up"
```

Commands run through the device's shell as the agent's user (root on a system install); see the [command execution feature](/device-agent/command-execution) for the agent-side semantics.

## JSON mode for automation

```bash
thinr device exec <deviceId> "df -P /" --json
```

Buffers output and emits a single envelope with `{ stdout, stderr, exitCode }`. See [JSON and automation](./json-and-automation) for the scripting patterns.

## Long-running commands and cancellation

Output streams as it's produced, so `tail -f`-style commands work; stop them with Ctrl+C, which terminates the remote command and exits with code `130`. For following logs specifically, prefer [`thinr device logs -f`](/cli/reference/device-commands#logs), which adds units, files and product log sources.

## Fleet-wide execution

Fan a command out to every active device of a product, in parallel:

```bash
thinr product exec edge-gateways "apt-get update -qq" -c 5 --timeout 60
```

You get a status table per device plus the outputs, with `-c` controlling concurrency (default 10), `--timeout` per device (default 30 s), `--fail-fast` to stop dequeueing on the first failure, and `-g` to scope by group. In JSON mode the envelope carries a `summary` block and per-device `results[]`; remember that partial failures don't change the exit code, so check `summary.failed` when scripting. Full flags in the [`thinr product` reference](/cli/reference/product-commands).

For procedures with more than one step (check a condition, copy files, run, verify), reach for [playbooks](/cli/reference/playbook-commands) instead of chaining exec calls.

## Older agents

`--legacy` switches to the non-streaming one-shot API for agents that predate streaming exec. You only need it if a very old agent rejects the default mode; updating the agent is the better fix.
