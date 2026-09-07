---
title: "thinr profile"
description: Manage the local profile store for multi-account and multi-environment use.
---

# `thinr profile`

```bash
thinr profile list                          [--json]
thinr profile current                       [--json]
thinr profile use    <name>                 [--json]
thinr profile add    [name] [--no-activate] [--json]
thinr profile delete <name>                 [--json]
```

| Action | Purpose |
|--------|---------|
| `list` | List all profiles, marking the active one. |
| `current` | Print the active profile name. |
| `use <name>` | Set the default profile. |
| `add [name]` | Add a profile via interactive authentication. Prompts for a name when omitted; `--no-activate` keeps the current default. |
| `delete <name>` | Remove a profile. The others are untouched. |

`thinr logout` removes the *active* profile's credentials.

## The profile store

Profiles live in `~/.config/thinr-cli/config.json`:

```json
{
  "default": "production",
  "profiles": {
    "production": {
      "server": "console.thinr.io",
      "username": "alice",
      "token": "…",
      "refresh_token": "…"
    },
    "staging": {
      "server": "staging.example.com",
      "username": "alice",
      "token": "…"
    }
  }
}
```

The active profile is picked in this order:

1. `--profile <name>` flag.
2. `THINR_PROFILE` env var.
3. `default` field in the config file.
4. The sole profile, if only one exists.

## Scripting with multiple profiles

The flag and env var make one-off cross-environment calls trivial without touching the default:

```bash
thinr device list --profile staging
THINR_PROFILE=staging thinr product status edge-gateways --json
```

The [MCP server](/mcp/overview) goes one step further: every tool accepts an optional `profile` parameter per call, so a single running server can reach any configured environment.
