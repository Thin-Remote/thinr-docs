---
title: Custom scripts specification
description: Protocol contract for agent custom scripts.
---

# Custom scripts specification

Custom scripts live in `/etc/thinr-agent/scripts/` (system) or `~/.config/thinr-agent/scripts/` (user) and become callable device resources automatically. This page is the contract; for a tutorial with examples, see the [custom scripts guide](/device-agent/custom-scripts).

## Discovery

1. The agent scans the scripts directory and registers every **executable** file (any language: shell, Python, a compiled binary). Non-executable files are skipped.
2. Each script is invoked once with `--describe`, under a timeout, to fetch its input/output schema. A script that doesn't answer `--describe` is still registered, as an output-only resource.

## `--describe` output

Print a JSON object describing the expected input and output shapes:

```json
{
  "input":  { "threshold": 80 },
  "output": { "status": "", "usage": 0 }
}
```

- Declaring an `input` object registers the script as a callable resource with typed inputs.
- Omitting `input` (or not answering `--describe`) registers it as output-only: it runs with no payload and its stdout becomes the result.

## Runtime contract

- **Input**: the call payload arrives as a JSON object on stdin.
- **Output**: print a JSON object to stdout; that is the resource's response.
- **Failure**: exit non-zero. Stderr is captured for diagnostics.
- **Permissions**: the script runs as the agent's user (root in a system install), so the OS enforces what it can touch.

## Minimal example

```bash
#!/bin/sh
if [ "$1" = "--describe" ]; then
  echo '{"input": {"path": "/"}, "output": {"usage_pct": 0}}'
  exit 0
fi
path=$(cat | sed -n 's/.*"path"[^"]*"\([^"]*\)".*/\1/p')
usage=$(df -P "${path:-/}" | awk 'NR==2 {gsub("%",""); print $5}')
echo "{\"usage_pct\": $usage}"
```

Call it from anywhere a resource can be called:

```bash
thinr device resource edge-gw-17 disk-usage -i path=/var
```

Scripts can also be managed remotely per device or per product, so the same resource exists across a whole fleet; see the [custom scripts guide](/device-agent/custom-scripts).
