---
title: Smart Vending & Self-Service
description: Watch machine health, catch payment faults early, and SSH in over cellular before rolling a truck.
---

# Smart Vending & Self-Service

Smart vending and self-service machines fail in ways that lose revenue quietly: a stuck payment terminal, a crashed control app, or a stockout no one noticed. Most sit on a mobile connection with no public address. ThinRemote surfaces machine health continuously and gives you a shell into the device even behind a carrier NAT.

## The problem

A machine that stops taking payments earns nothing until someone visits, and by the time a route driver notices, the outage has run for days. Cellular NAT makes the machine unreachable from outside. Sending a technician just to read a log or restart a service does not pay for itself.

## How ThinRemote fits

- Track health with monitoring metrics and raise alarms on payment faults or stockouts, so you hear about problems before customers do. See [monitoring and alarms](/device-agent/monitoring-and-alarms).
- Publish a machine-specific signal (bill validator status, coin level) as a custom resource the dashboard can read:

```bash
thinr device resource vendor-4471 stock-report
```

- SSH into the controller over its cellular link to restart a crashed app:

```bash
thinr device console vendor-4471
```

- Check the payment daemon without an interactive session:

```bash
thinr device exec vendor-4471 "systemctl status payment-agent" --json
```

## At fleet scale

Define the metric once on the product so every machine reports the same health signals, then poll the whole fleet's status at a glance:

```bash
thinr product status vending-fleet -w
```

## Related

- [Monitoring and alarms](/device-agent/monitoring-and-alarms)
- [Custom scripts](/device-agent/custom-scripts)
- [SSH and console](/cli/ssh-and-console)
- [Exec commands](/cli/exec-commands)
- [Products and groups](/getting-started/products-and-groups)
