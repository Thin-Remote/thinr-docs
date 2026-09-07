---
title: Supported init systems
description: Service managers the agent installer integrates with.
---

# Supported init systems

The installer detects the init system and registers the appropriate service. In every case the service restarts the agent if it dies, which is also how [updates](./auto-update) take effect: the binary is swapped, the process exits, the init system brings it back on the new version.

| Init system | Platforms | Service file |
|-------------|-----------|--------------|
| systemd (system) | Modern Linux | `/etc/systemd/system/thinr-agent.service` |
| systemd (user) | Modern Linux, unprivileged installs | `~/.config/systemd/user/thinr-agent.service` |
| launchd (system) | macOS | `/Library/LaunchDaemons/io.thinremote.agent.plist` |
| launchd (user) | macOS, unprivileged installs | `~/Library/LaunchAgents/io.thinremote.agent.plist` |
| OpenRC | Alpine, Gentoo, embedded distros | `/etc/init.d/thinr-agent` |
| SysV init | Legacy Linux | `/etc/init.d/thinr-agent` + `/etc/rc*.d/` symlinks |
| Upstart | Legacy Ubuntu, older CentOS | `/etc/init/thinr-agent.conf` |

## Controlling the service

```bash
# systemd
systemctl status|start|stop|restart thinr-agent
systemctl --user status thinr-agent          # user install

# macOS
sudo launchctl list | grep io.thinremote.agent
launchctl unload ~/Library/LaunchAgents/io.thinremote.agent.plist   # user install

# OpenRC / SysV
service thinr-agent status|start|stop|restart
```

## User-mode start at boot (Linux)

A user-mode systemd service only runs while that user has a session. Enable lingering so it starts at boot without a login:

```bash
loginctl enable-linger $USER
```
