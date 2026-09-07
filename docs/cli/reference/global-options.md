---
title: Global options
description: Flags and environment variables that apply to every thinr subcommand.
---

# Global options

## Flags

| Flag | Meaning |
|------|---------|
| `--profile <name>` | Use a non-default profile for this invocation. |
| `-u, --user <name>` | Admin impersonation: act on behalf of another user (requires admin privileges). |
| `--version` | Print the CLI version. |
| `--help` | Show help for any command or subcommand. |

`-j, --json` is accepted by every data-producing subcommand (not the root program) and switches output to the [JSON envelope](./json-envelope).

Running `thinr` with no arguments starts the first-time setup when unconfigured, or the interactive dashboard in a TTY.

## Environment variables

| Variable | Meaning |
|----------|---------|
| `THINR_PROFILE` | Override the active profile for this invocation (same effect as `--profile`). |
| `THINR_INSECURE=1` | Accept self-signed TLS certificates for any host. `localhost`/`127.0.0.1` are always accepted without it. |
| `THINR_DEBUG` | Enable debug logging to stderr. |

## Profile resolution order

1. `--profile <name>` flag.
2. `THINR_PROFILE` environment variable.
3. The `default` field in `~/.config/thinr-cli/config.json`.
4. The sole profile, if only one exists.

See [`thinr profile`](./profile-commands) for managing the profile store.
