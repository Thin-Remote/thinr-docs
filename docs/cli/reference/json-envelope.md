---
title: JSON envelope
description: Structured output contract for scripting.
---

# JSON envelope

Every data-producing command accepts `-j, --json` and writes a single envelope to stdout:

```json
{ "ok": true,  "data": <payload> }
{ "ok": false, "error": { "message": "...", "code": "<code>" } }
```

- `ok` is a boolean.
- On success, `data` holds the command-specific payload.
- On failure, `error.code` is one of the values listed in [Error codes](./error-codes).

Process exit codes always reflect success (`0`) or failure (non-zero), independently of the envelope.

Spinners and progress messages are suppressed in JSON mode so stdout is valid JSON. Interactive commands (`console`, `tcp`/`tls`/`http`) accept `--json` silently but don't change behavior, since they don't produce a discrete result.

## Streaming commands

`device exec` buffers stdout/stderr when `--json` is set and emits a single envelope on exit:

```json
{
  "ok": true,
  "data": { "stdout": "…", "stderr": "…", "exitCode": 0 }
}
```

`device logs --json` behaves the same way (and is incompatible with `--follow`, which never terminates).

## Product-scoped commands

Fan-out commands (`thinr product property`, `resource`, `push`, …) emit one entry per device under `results[]`:

```json
{
  "ok": true,
  "data": {
    "results": [
      { "device": "id-1", "ok": true, "data": <per-device> },
      { "device": "id-2", "ok": false, "error": { ... } }
    ]
  }
}
```

`thinr product exec` adds an aggregate `summary` block:

```json
{
  "ok": true,
  "data": {
    "product": "edge-gateways",
    "command": "uptime",
    "summary": { "total": 12, "ok": 11, "failed": 1, "timedOut": 0, "errored": 1, "durationMs": 4180 },
    "results": [
      { "device": "id-1", "ok": true, "exitCode": 0, "stdout": "…", "stderr": "", "timedOut": false, "durationMs": 350 }
    ]
  }
}
```

The top-level `ok` reflects whether the fan-out itself ran; inspect `summary.failed` and `results[].ok` to detect per-device failures.

## jq recipes

```bash
# extract the payload, fail the pipeline on error
thinr device status edge-gw-17 --json | jq -e '.ok' >/dev/null

# devices that failed a fleet exec
thinr product exec edge-gateways "systemctl is-active app" --json \
  | jq -r '.data.results[] | select(.ok | not) | .device'
```
