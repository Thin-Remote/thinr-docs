---
title: Industrial Control & Automation
description: Push firmware, read diagnostics, and run scripts on PLCs behind NAT without touching the network.
---

# Industrial Control & Automation

PLCs and automation controllers in factories, water plants, and energy sites almost never have a public address. They sit behind NAT, industrial firewalls, or tightly controlled uplinks. When you need to push firmware, pull diagnostics, or run a maintenance routine, the network is usually the hardest part. ThinRemote reaches these controllers over an outbound connection, so no inbound rules change.

## The problem

Opening ports or provisioning a VPN into an OT network is a slow, high-scrutiny process, and every change is a security review. Sending an automation engineer to site for a firmware bump or a log pull does not scale across plants. Meanwhile the controller keeps running production and downtime is costly.

## How ThinRemote fits

- Package repeatable maintenance as a custom agent script and trigger it as a named resource, so operators run a vetted action instead of ad-hoc shell:

```bash
thinr device resource plc-line-a run-diagnostics -i level=full
```

- Pull diagnostic and register dumps back for analysis:

```bash
thinr device pull plc-line-a /var/log/plc/diagnostics.csv ./
```

- Read a specific value non-interactively for scripting and reporting:

```bash
thinr device exec plc-line-a "plcctl read cpu-status" --json
```

- Stage a firmware image on the controller before applying it in a controlled window:

```bash
thinr device push plc-line-a ./controller-fw-2.4.bin /opt/firmware/
```

## At fleet scale

Model a controller family as a product and roll firmware out with a playbook that stages, applies, and verifies each device, in batches you control:

```bash
thinr product push automation-line ./controller-fw-2.4.bin /opt/firmware/
thinr product exec automation-line "plcctl flash /opt/firmware/controller-fw-2.4.bin" -c 5
```

## Related

- [Custom scripts](/device-agent/custom-scripts)
- [Playbook commands](/cli/reference/playbook-commands)
- [Exec commands](/cli/exec-commands)
- [File management](/cli/file-management)
- [Products and groups](/getting-started/products-and-groups)
