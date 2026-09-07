---
title: Interactive installation
description: Install the agent on a single device with the guided installer.
---

# Interactive installation

The one-liner installer is the fastest way to onboard a single device:

```bash
curl -fsSL https://get.thinremote.io/install.sh | sh
```

It will:

1. Detect your OS (Linux or macOS), architecture, and init system.
2. Download the correct fully-static binary from `get.thinremote.io` (16 Linux architectures plus Intel and Apple Silicon macOS; see [supported architectures](/device-agent/reference/supported-architectures)).
3. Register the service (systemd, launchd, OpenRC, SysV, or Upstart; see [supported init systems](/device-agent/reference/supported-init-systems)).
4. Guide you through authentication.
5. Start the agent.

The installer only needs `curl` or `wget`; everything else is self-contained, since the binary has no runtime dependencies.

::: tip Devices without HTTPS support
Some minimal embedded images lack TLS-capable download tools. The installer also works over plain HTTP, and the agent still talks to the platform over TLS afterwards:

```bash
curl -fsSL http://get.thinremote.io/install.sh | sh
```
:::

## Authentication options

When the installer reaches the authentication step it offers several ways to claim the device:

- **Browser (OAuth 2.0 device flow)** is the recommended path. The installer shows a short code and a URL; open it on any machine, sign in, and approve. Nothing sensitive is typed on the device.
- **Username and password**, entered directly on the device. Credentials are exchanged for a device token and never stored on disk.
- **Provisioning token**: paste a pre-issued token. This is the same mechanism used by [headless provisioning](/device-agent/headless-provisioning).

Whichever method you choose, the result is the same: the device receives its own long-lived device credentials, stored in the agent config file. Your user password or browser session is never persisted on the device.

## Root or user mode

Run the installer as root (or via `sudo`) for a system-wide install, or as a regular user for an unprivileged one:

| | System install (root) | User install |
|---|---|---|
| Binary | `/usr/local/bin/thinr-agent` (or `/usr/bin` if `/usr/local/bin` isn't on `PATH`) | `~/.local/bin/thinr-agent` |
| Config | `/etc/thinr-agent/config.json` | `~/.config/thinr-agent/config.json` |
| Service (systemd) | `/etc/systemd/system/thinr-agent.service` | `~/.config/systemd/user/thinr-agent.service` |

The config file format is documented in the [config file reference](/device-agent/reference/config-file). In user mode the agent runs with your user's permissions: remote terminal, file access, and exec are all constrained by the OS accordingly. On Linux, enable lingering so a user-mode agent starts at boot without a login session:

```bash
loginctl enable-linger $USER
```

## Verify it's running

```bash
systemctl status thinr-agent          # Linux, system install
systemctl --user status thinr-agent   # Linux, user install
sudo launchctl list | grep thinr      # macOS
```

Or ask the agent itself:

```bash
thinr-agent status
```

The device should immediately appear in the web console and in `thinr device list`.

## Reconfigure or uninstall

The installed binary doubles as its own management tool:

```bash
thinr-agent reconfigure   # re-run the interactive setup (new server, new credentials…)
thinr-agent test          # test connectivity with the current config
thinr-agent uninstall     # remove the service and configuration
```

## Troubleshooting

- **Unsupported architecture**: the installer maps `uname -m` to a binary name. If your platform is missing, check the [architecture list](/device-agent/reference/supported-architectures) and [open an issue](https://github.com/Thin-Remote/thinr-agent/issues).
- **Self-signed server certificate**: when pointing the agent at a server with a self-signed certificate, forward `--no-verify-ssl` to the install command (see [headless provisioning](/device-agent/headless-provisioning) for how to pass flags through the installer). For a private CA, point `SSL_CERT_FILE` at your bundle instead; see [environment variables](/device-agent/reference/environment-variables).
- **Device already exists**: re-installing a device that is already registered prompts before overwriting. Pass `--overwrite` to skip the prompt.
- **The service didn't start**: run the binary in the foreground with verbose logging to see why: `thinr-agent -v` (or `-vv` for debug).
