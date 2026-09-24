---
title: Uninstall
description: Remove the agent from a device, including leftovers from an interrupted install.
---

# Uninstall

The installed binary is its own uninstaller:

```bash
sudo thinr-agent uninstall   # system install
thinr-agent uninstall        # user install
```

It stops the service, removes the unit, deletes the installed binary and drops the configuration and log directories. It asks for confirmation first, so it needs an interactive terminal: over SSH that means `ssh -t host sudo thinr-agent uninstall`, not `ssh host "sudo thinr-agent uninstall"`.

## Uninstall with the privileges you installed with

`uninstall` only touches the scope matching its effective user id: as root it removes the system install and ignores any user one, and as a regular user it removes only that user's install. A device that ended up with both needs both commands.

::: tip A leftover user install looks like a failed system install
`~/.local/bin` comes before `/usr/local/bin` in the `PATH` on most distributions, and a user service keeps running and reporting to the platform on its own. Clean up an unwanted user install before reinstalling as root, or the old agent will keep showing up. `command -v thinr-agent` tells you which binary you are actually talking to.
:::

## Removing leftovers by hand

If the binary is gone, or an install was interrupted halfway, there is nothing to run `uninstall` with. Remove what is left directly:

```bash
# system install (systemd)
sudo systemctl disable --now thinr-agent
sudo rm -f /etc/systemd/system/thinr-agent.service
sudo rm -rf /etc/thinr-agent /var/log/thinr-agent
sudo rm -f /usr/local/bin/thinr-agent /usr/bin/thinr-agent
sudo systemctl daemon-reload
```

```bash
# user install (systemd)
systemctl --user disable --now thinr-agent
rm -f ~/.config/systemd/user/thinr-agent.service
rm -rf ~/.config/thinr-agent ~/.local/share/thinr-agent
rm -f ~/.local/bin/thinr-agent
systemctl --user daemon-reload
```

A user install may also have lingering enabled so it starts without a login session. Turn it off if nothing else needs it:

```bash
loginctl disable-linger $USER
```

On OpenRC, SysV or Upstart the service file is wherever your init system keeps it for `thinr-agent`; the binary, config and log paths are the ones listed in [where things land](/device-agent/install#where-things-land).

## The device record

Uninstalling removes the agent from the device, not the device from your account. The record stays, marked offline, along with its history. Delete it from the web console when you no longer need it.

Going the other way round, deleting the device from the console does not stop the agent: it keeps running and reconnecting with credentials the server no longer recognises. Uninstall on the device first, then delete the record.

## Related

- [Interactive installation](/device-agent/install): install or reinstall a single device
- [Headless provisioning](/device-agent/headless-provisioning): unattended installs for fleets
