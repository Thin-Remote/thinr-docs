---
title: JSON output and automation
description: Script ThinRemote reliably with structured output.
---

# JSON output and automation

Every data-producing CLI command accepts `-j, --json` and writes a single envelope to stdout:

```json
{ "ok": true,  "data": <payload> }
{ "ok": false, "error": { "message": "...", "code": "<code>" } }
```

Three properties make this dependable in scripts:

- **Stdout is always valid JSON** in this mode: spinners and progress messages are suppressed.
- **Exit codes are real**: `0` on success, non-zero on failure, `130` on Ctrl+C, and `device exec` exits with the remote command's code. Pipelines with `set -e` behave correctly.
- **Error codes are stable**: `not_found`, `unauthorized`, `timeout`, … the full contract is in [error codes](/cli/reference/error-codes), and the envelope shapes (including the fan-out `summary`/`results[]` form) in the [JSON envelope reference](/cli/reference/json-envelope).

## Field extraction

`-f, --field <dot.path>` drills into the result so you don't need `jq` for simple lookups:

```bash
thinr device property store-14 information -f hardware.id
thinr product property edge-gateways temperature -f data.celsius
```

## jq recipes

```bash
# fail the pipeline on error
thinr device status store-14 --json | jq -e '.ok' >/dev/null

# devices that failed a fleet command
thinr product exec edge-gateways "systemctl is-active app" --json \
  | jq -r '.data.results[] | select(.ok | not) | .device'

# version inventory across the fleet
thinr product exec edge-gateways "thinr-agent --version" --json \
  | jq -r '.data.results[] | "\(.device): \(.stdout | rtrimstr("\n"))"'
```

## Non-interactive environments

Two things change in scripts and CI compared with your terminal:

- Commands that normally prompt for confirmation refuse to run and fail with `needs_confirm`; pass `-y, --yes` explicitly.
- Pick the environment per invocation with `THINR_PROFILE=<name>` (or `--profile`; see [global options](/cli/reference/global-options)), instead of relying on the default profile of whoever runs the job.

## A CI example

```yaml
# GitHub Actions: deploy a config and verify, against the staging profile
- run: npm install -g @thinremote/thinr-cli
- run: |
    thinr product push edge-gateways ./config.yaml /etc/app/config.yaml --json
    thinr product exec edge-gateways "systemctl restart app && systemctl is-active app" --json \
      | jq -e '.data.summary.failed == 0'
  env:
    THINR_PROFILE: staging
```

The token comes from the profile store; provision the runner once with a pre-issued token (see [Install the CLI](./install)) or bake `~/.config/thinr-cli/config.json` into the runner's secrets.

## Beyond shell scripts

When the automation grows past a few pipelines, two better tools exist: [playbooks](/cli/reference/playbook-commands) for multi-step procedures with check mode and staged rollouts, and the [MCP server](/mcp/overview) when the thing driving the fleet is an AI agent rather than a script.
