---
title: EV Charging & Smart Energy
description: Run diagnostics, roll out firmware, and monitor uptime across chargers and meters on demand.
---

# EV Charging & Smart Energy

Chargers, inverters, and energy meters are spread across cities, parking lots, and rooftops, and every site visit costs money and time. Operators need to diagnose a faulty charger, roll out firmware, and keep an eye on uptime without driving out to each unit. ThinRemote reaches these assets over their cellular or site uplinks and lets you act on the whole fleet from one place.

## The problem

A charger that drops offline or a meter that reports wrong values loses revenue and frustrates drivers, but you often cannot tell why without being there. The units sit behind carrier NAT with no inbound path. Dispatching an engineer for diagnostics or a firmware bump does not scale to a growing, geographically spread fleet.

## How ThinRemote fits

- Monitor connectivity and health continuously, with alarms on connection loss or abnormal load. See [monitoring and alarms](/device-agent/monitoring-and-alarms).
- Run a diagnostic routine on a specific charger and get structured output back:

```bash
thinr device exec charger-madrid-014 "chargectl self-test" --json
```

- Recover a stuck session or reboot the unit through a named resource:

```bash
thinr device resource charger-madrid-014 reset-session
```

- Pull the OCPP or session log when a charge fails to start:

```bash
thinr device pull charger-madrid-014 /var/log/ocpp/session.log ./
```

## At fleet scale

Group the fleet into a product and roll firmware out safely with a playbook, or trigger a coordinated update across every charger in a city, in batches:

```bash
thinr product push charger-fleet ./charger-fw-5.1.bin /opt/firmware/
thinr product exec charger-fleet "chargectl flash /opt/firmware/charger-fw-5.1.bin" -g city-madrid -c 8
```

## Related

- [Monitoring and alarms](/device-agent/monitoring-and-alarms)
- [Playbook commands](/cli/reference/playbook-commands)
- [Exec commands](/cli/exec-commands)
- [File management](/cli/file-management)
- [Products and groups](/getting-started/products-and-groups)
