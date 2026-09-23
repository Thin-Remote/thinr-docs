---
title: Device agent CLI
description: Commands and flags of the thinr-agent binary.
---

# Device agent CLI

The installed binary doubles as its own management tool. Running `thinr-agent` without a command opens the interactive setup menu.

## Global options

| Flag | Meaning |
|------|---------|
| `-h, --help` | Show help (also per command). |
| `--version` | Print the agent version. |
| `-c, --config <path>` | Use a custom config file (default: `/etc/thinr-agent/config.json` as root, `~/.config/thinr-agent/config.json` otherwise). |
| `-v` / `-vv` | Verbose (info) / debug logging to the console. |

## Commands

### `install`

Headless installation: registers the device, writes the config and sets up the service without prompts. See [headless provisioning](/device-agent/headless-provisioning) for recipes.

| Flag | Meaning |
|------|---------|
| `--token TOKEN` | Auto-provisioning token; skips interactive authentication. |
| `--device ID` | Custom device identifier (default: hostname). |
| `--product ID` | Product to associate (default: auto-detect, or `thinremote`). |
| `--host HOST` | Server to register against (usually embedded in the token). |
| `--overwrite` | Re-register without prompting if the device already exists. |
| `--no-start` | Install the service but don't start it. |
| `--no-verify-ssl` | Disable TLS certificate verification (self-signed test servers). |

### `update`

Check for or apply a self-update. Without `--apply` it only reports whether an update is available.

| Flag | Meaning |
|------|---------|
| `--channel NAME` | Release channel: `latest` (stable), `main`, `develop`. Default: `latest`. |
| `--apply` | Download, verify and install the update. |

```bash
thinr-agent update                       # check only
thinr-agent update --channel main --apply
```

See the [update mechanism](./auto-update) for the full flow.

### `reconfigure`, `uninstall`

| Command | Purpose |
|---------|---------|
| `reconfigure` | Re-run the interactive setup (new server, new credentials). |
| `uninstall` | Stop the service, remove the unit, the binary, the configuration and the logs. |

Both act on the scope matching the effective user id of the process: run them with `sudo` for a system-wide install, without it for a user install. Both are interactive and refuse to run without a terminal, so over SSH use `ssh -t`.

The `status` and `test` commands are listed in `--help` but are not implemented yet: they print a message and exit non-zero. To check a running agent use the init system (`systemctl status thinr-agent`) or the platform (`thinr device list`).

### `bootstrap`

Seed the account's default monitoring alarm rules without provisioning a device. Useful when preparing an instance before any agent is installed.

| Flag | Meaning |
|------|---------|
| `--token TOKEN` | JWT carrying `svr` (host) and `usr` (account) claims. Required. |
| `--force` | Delete existing default rules and recreate them. |
| `--no-verify-ssl` | Disable TLS certificate verification. |
