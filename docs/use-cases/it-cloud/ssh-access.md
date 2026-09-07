---
title: SSH access behind firewalls
description: Replace bastion hosts and jump boxes with outbound-only SSH.
---

# SSH access behind firewalls

Traditional SSH requires open ports or a bastion host. ThinRemote replaces both with an outbound-only tunnel you can open from any terminal or CI job.

## What ThinRemote gives you

- `thinr device console <id>`: interactive terminal.
- `thinr device tcp <id> 22`: expose SSH through a relay port on the server for standard `ssh` clients.
- `thinr device exec <id> "<cmd>"`: one-shot commands with streaming output.

## Planned content

- Using ThinRemote as an SSH transport in `~/.ssh/config`
- CI integration with JSON mode
