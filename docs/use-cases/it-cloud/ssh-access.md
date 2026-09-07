---
title: SSH access behind firewalls
description: Reach SSH on machines in private subnets, behind NAT, or in a lab with no open ports.
---

# SSH access behind firewalls

A server in a private subnet, behind NAT, or on an isolated lab bench has no route in from the outside. ThinRemote carries SSH over the platform instead: the device keeps an outbound connection, and `thinr device tcp` exposes port 22 through a relay port on the server. No bastion host, no inbound firewall rule, no static IP.

## The problem

Classic remote maintenance depends on a jump box or a VPN concentrator that you have to provision, patch, and keep reachable. Every exposed SSH endpoint is another port to defend, and machines behind NAT often cannot be reached at all without extra network plumbing.

## How ThinRemote fits

- Open an interactive shell straight away, no SSH client needed:

```bash
thinr device console <id>
```

- Expose SSH through a relay port on the server, then connect a standard client to the printed port:

```bash
thinr device tcp <id> 22
ssh user@<server> -p <printed port>
```

- Run one-off maintenance without a full session:

```bash
thinr device exec <id> "apt-get update && apt-get -y upgrade"
```

- Because the relay port is short-lived, close it with Ctrl+C when the work is done. Wire the printed port into `~/.ssh/config` for scp, rsync, or Ansible over the same tunnel.

## Related

- [SSH and console](/cli/ssh-and-console)
- [TCP & TLS tunneling](/cli/tcp-tls-tunneling)
- [Exec commands](/cli/exec-commands)
- [Device agent terminal](/device-agent/terminal)
