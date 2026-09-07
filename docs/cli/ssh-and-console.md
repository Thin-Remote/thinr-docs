---
title: SSH and remote console
description: Open interactive terminal sessions on any device.
---

# SSH and remote console

Two ways to get a shell on a device, depending on whether you want zero setup or your own SSH tooling.

## Native ThinRemote terminal

```bash
thinr device console <deviceId>
```

A full interactive session through the platform: real PTY, resize, signal forwarding, full-screen programs. Nothing to configure on the device beyond the agent itself, and it works even when `sshd` isn't installed or its port is firewalled. The same session is available in the web console.

The remote shell is the device's own (`zsh`, `bash`, `sh` or `ash`, whichever exists), spawned as a login shell; details in the [terminal feature](/device-agent/terminal).

## Tunneled SSH

Prefer your SSH client, keys and tooling? Expose the device's SSH port through a relay port on the ThinRemote server:

```bash
thinr device tcp <deviceId> 22
# TCP proxy running on <server>:50123 → <deviceId> (localhost:22)
ssh admin@<server> -p 50123
```

The relay port exists only while the command runs; Ctrl+C removes it. SSH's own authentication protects the endpoint while it's up.

### Pin the port for your SSH config

The relay port is random by default. Pin it with `-p` and the endpoint becomes predictable enough to keep in `~/.ssh/config`:

```bash
thinr device tcp store-14 22 -p 50514
```

```
Host store-14
    HostName your-server.thinr.io
    Port 50514
    User admin
```

Then `ssh store-14` works whenever the tunnel is up. `scp`, `rsync` and `git` over SSH ride the same config.

### Non-default ports and other hosts

The target is anything reachable from the device:

```bash
thinr device tcp <deviceId> 2222                 # sshd on a non-default port
thinr device tcp <deviceId> 192.168.0.40:22     # another box on the device's LAN
```

### Keeping sessions alive

The tunnel stays open until you stop it; for long sessions over flaky links, enable SSH keepalives on your side (`ServerAliveInterval 30` in your SSH config). If the device reconnects, re-run the tunnel command.

## Which one?

Day-to-day interactive work: the native console, it's one command and survives anything short of the agent being down. Scripted SSH-based tooling (Ansible over SSH, rsync pipelines, IDE remote development): the tunnel.
