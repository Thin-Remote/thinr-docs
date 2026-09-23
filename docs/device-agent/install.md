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
2. Work out whether it can install a system service, elevating with sudo when needed.
3. Download the correct fully-static binary from `get.thinremote.io` (16 Linux architectures plus Intel and Apple Silicon macOS; see [supported architectures](/device-agent/reference/supported-architectures)).
4. Register the service (systemd, launchd, OpenRC, SysV, or Upstart; see [supported init systems](/device-agent/reference/supported-init-systems)).
5. Guide you through authentication.
6. Start the agent.

The installer only needs `curl` or `wget`; everything else is self-contained, since the binary has no runtime dependencies.

::: tip Devices without HTTPS support
Some minimal embedded images lack TLS-capable download tools. The installer also works over plain HTTP, and the agent still talks to the platform over TLS afterwards:

```bash
curl -fsSL http://get.thinremote.io/install.sh | sh
```
:::

## System or user install

A system service starts at boot regardless of who is logged in, which is what you normally want, and it needs root. The installer works out how to get there:

- **As root**: system install, no questions asked.
- **As a regular user on a terminal**: it asks `Install as a system service? [Y/n]` and, if you accept, prompts for your sudo password before the download starts, rather than halfway through. Answer `n` for a user install.
- **Unattended**, with no terminal to prompt on: it elevates when sudo needs no password, which is the usual case on provisioning images. When sudo would need one it says so and installs for the invoking user instead of blocking on input nobody will type.

The mode it settles on is printed as `Install mode:` before anything is downloaded, so the output tells you what you got.

```bash
curl -fsSL https://get.thinremote.io/install.sh | sh                 # asks if it needs to
curl -fsSL https://get.thinremote.io/install.sh | sudo sh            # system service, no questions
curl -fsSL https://get.thinremote.io/install.sh | sh -s -- --user    # user install, no questions
```

::: tip Where `sudo` goes in a pipeline
`sudo` belongs in front of the interpreter, as `| sudo sh`. In front of `curl` it elevates the download and nothing else, since the `sh` on the other side of the pipe still runs as you.
:::

### Installer flags

| Flag | Meaning |
|------|---------|
| `--user` | Install for the current user. Never elevates. |
| `-h`, `--help` | Show the installer's own help. |

To install something other than the stable channel's head, set `CHANNEL`: it takes `main`, `develop` or a version tag such as `v1.6.7`. See [release channels](/device-agent/channels).

These flags belong to the installer script, so they go before any agent arguments. Everything from the first unrecognised argument onwards is forwarded verbatim to the agent, which is how [headless provisioning](/device-agent/headless-provisioning) passes `install --token …`.

### Where things land

| | System install | User install |
|---|---|---|
| Binary | `/usr/local/bin/thinr-agent` (or `/usr/bin` if `/usr/local/bin` isn't on `PATH`) | `~/.local/bin/thinr-agent` |
| Config | `/etc/thinr-agent/config.json` | `~/.config/thinr-agent/config.json` |
| Service (systemd) | `/etc/systemd/system/thinr-agent.service` | `~/.config/systemd/user/thinr-agent.service` |
| Logs | `/var/log/thinr-agent` | `~/.local/share/thinr-agent/logs` |
| Custom scripts | `/etc/thinr-agent/scripts` | `~/.config/thinr-agent/scripts` |

The config file format is documented in the [config file reference](/device-agent/reference/config-file). A user-mode agent runs with that user's permissions, so remote terminal, file access and exec are constrained accordingly. On Linux, enable lingering so it starts at boot without a login session:

```bash
loginctl enable-linger $USER
```

## Authentication options

When the installer reaches the authentication step it offers several ways to claim the device:

- **Browser (OAuth 2.0 device flow)** is the recommended path. The installer shows a short code and a URL; open it on any machine, sign in, and approve. Nothing sensitive is typed on the device.
- **Username and password**, entered directly on the device. Credentials are exchanged for a device token and never stored on disk.
- **Provisioning token**: paste a pre-issued token. This is the same mechanism used by [headless provisioning](/device-agent/headless-provisioning).

Whichever method you choose, the result is the same: the device receives its own long-lived device credentials, stored in the agent config file. Your user password or browser session is never persisted on the device.

## Verify it's running

```bash
systemctl status thinr-agent          # Linux, system install
systemctl --user status thinr-agent   # Linux, user install
sudo launchctl list | grep thinr      # macOS
```

Or follow the agent's own logs:

```bash
journalctl -u thinr-agent -f          # Linux, system install
journalctl --user -u thinr-agent -f   # Linux, user install
```

The device should immediately appear in the web console and in `thinr device list`.

## Reconfigure

To point the agent at another server, or to re-authenticate it, run the guided setup again. `reconfigure` drops the existing configuration and starts the wizard, so it needs an interactive terminal:

```bash
sudo thinr-agent reconfigure   # system install
thinr-agent reconfigure        # user install
```

Over SSH that means `ssh -t host sudo thinr-agent reconfigure`, not `ssh host "sudo thinr-agent reconfigure"`.

## Uninstall

`uninstall` stops the service, removes the unit, deletes the installed binary and drops the configuration and log directories. It asks for confirmation first, so like `reconfigure` it needs a terminal.

Uninstall with the same privileges you installed with: `uninstall` only touches the scope matching its effective user id, so as root it removes the system install and ignores any user one, and as a regular user it removes only that user's install. A device that ended up with both needs both commands.

```bash
sudo thinr-agent uninstall   # system install
thinr-agent uninstall        # user install
```

::: tip A leftover user install looks like a failed system install
`~/.local/bin` comes before `/usr/local/bin` in the `PATH` on most distributions, and a user service keeps running and reporting to the platform on its own. Clean up an unwanted user install before reinstalling as root, or the old agent will keep showing up. `command -v thinr-agent` tells you which binary you are actually talking to.
:::

If the binary is gone, or an install was interrupted halfway, remove the leftovers by hand:

```bash
# system install (systemd)
sudo systemctl disable --now thinr-agent
sudo rm -f /etc/systemd/system/thinr-agent.service
sudo rm -rf /etc/thinr-agent /var/log/thinr-agent
sudo rm -f /usr/local/bin/thinr-agent /usr/bin/thinr-agent
sudo systemctl daemon-reload

# user install (systemd)
systemctl --user disable --now thinr-agent
rm -f ~/.config/systemd/user/thinr-agent.service
rm -rf ~/.config/thinr-agent ~/.local/share/thinr-agent
rm -f ~/.local/bin/thinr-agent
systemctl --user daemon-reload
```

On OpenRC, SysV or Upstart the service file is wherever your init system keeps it for `thinr-agent`; the binary, config and log paths are the ones in the table above.

Uninstalling removes the agent from the device, not the device from your account: delete it from the web console if you no longer need it.

## Troubleshooting

- **Configuration already exists**: the installer will not provision over an existing configuration. It says so and exits non-zero, leaving the running agent untouched. Use `thinr-agent reconfigure` to re-authenticate in place, or uninstall first for a clean slate.
- **Unsupported architecture**: the installer maps `uname -m` to a binary name. If your platform is missing, check the [architecture list](/device-agent/reference/supported-architectures) and [open an issue](https://github.com/Thin-Remote/thinr-agent/issues).
- **Self-signed server certificate**: forward `--no-verify-ssl` to the agent through the installer (see [headless provisioning](/device-agent/headless-provisioning) for how arguments are forwarded). For a private CA, point `SSL_CERT_FILE` at your bundle instead; see [environment variables](/device-agent/reference/environment-variables).
- **Device already exists on the server**: provisioning a device id that is already registered prompts before overwriting. Pass `--overwrite` to skip the prompt.
- **The service didn't start**: run the binary in the foreground with verbose logging to see why: `thinr-agent -v` (or `-vv` for debug).
