---
title: Instant access on alerts
description: Jump into the affected machine the moment monitoring fires, no VPN dance required.
---

# Instant access on alerts

When a monitoring system fires, the clock starts and every minute of latency is downtime. ThinRemote turns an alarm into an immediate action: from the alert you drop straight into a console on the affected machine, or let an AI assistant triage it through the built-in MCP server. There is no VPN client to launch and no bastion to reach first.

## The problem

The usual incident path is slow by design: connect the VPN, find the jump host, look up the private address, then finally open a shell. By the time you are in, the log line that mattered may have scrolled away and the outage has grown.

## How ThinRemote fits

- Let the device agent raise the alarm from its own monitoring, then act on it (see monitoring and alarms).
- Drop into the affected machine the instant the page arrives:

```bash
thinr device console <id>
```

- Pull the evidence you need in one shot, with `--json` when a runbook parses it:

```bash
thinr device exec <id> "systemctl status nginx; tail -n 50 /var/log/nginx/error.log" --json
```

- Follow the live log while you work the incident:

```bash
thinr device logs <id> -f
```

- Wire the built-in MCP server into an AI assistant so alert-triggered response can investigate and remediate automatically: see the AI assistant guide.

## Related

- [Monitoring and alarms](/device-agent/monitoring-and-alarms)
- [AI assistant](/getting-started/ai-assistant)
- [SSH and console](/cli/ssh-and-console)
- [JSON and automation](/cli/json-and-automation)
