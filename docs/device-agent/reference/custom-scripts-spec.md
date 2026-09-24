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
- **Invalid JSON**: stdout that does not parse comes back as a string under `output`. That is a fallback for broken quoting, not a second output format: a resource whose fields collapse into one string cannot be charted as a [dashboard metric](/cli/reference/product-commands#dashboard-metrics), alarmed on, or rendered as fields in the console.

### Building the JSON safely

The example below interpolates a number, which is safe. Interpolating a value you do not control is not: a hostname, a filename or any command output containing a quote or a backslash produces a broken document, and the caller gets a string where it expected fields.

Encode with a real serializer, and pass the value through the environment rather than into the interpreter's source:

```bash
# jq, when the device has it
VALUE="$(hostname)" jq -n --arg v "$VALUE" '{hostname: $v}'

# python3, which Debian-based images carry and jq images often don't
VALUE="$(hostname)" python3 -c 'import json,os; print(json.dumps({"hostname": os.environ["VALUE"]}))'
```

Neither is guaranteed to exist: a stock Raspberry Pi OS image has `python3` but no `jq`, and a BusyBox image usually has neither. Check with `command -v` and pick at runtime, or keep the output to values you generate yourself (numbers, fixed strings) where `printf` is enough.

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
