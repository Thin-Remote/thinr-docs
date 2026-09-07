---
title: TCP and TLS tunneling
description: Forward arbitrary TCP and TLS services through ThinRemote.
---

# TCP and TLS tunneling

For non-HTTP services (databases, MQTT brokers, custom protocols), `tcp` and `tls` expose any service reachable from the device through a relay port on your ThinRemote server:

```bash
thinr device tcp <deviceId> 5432
# TCP proxy running on <server>:50701 → <deviceId> (localhost:5432)
```

Connect your normal client to the printed endpoint:

```bash
psql -h <server> -p 50701 -U app mydb
```

Defaults: `tcp` targets `localhost:22`, `tls` targets `localhost:443`. The target can be any `address:port` the device can reach, including other machines on its network. The device side is plain TCP, so any protocol rides through; see the agent's [tunnels feature](/device-agent/tunnels) for the semantics.

## Examples

```bash
thinr device tcp <id> 1883                    # MQTT broker → mosquitto_sub -h <server> -p <port> …
thinr device tcp <id> 5432                    # PostgreSQL
thinr device tcp <id> 3306                    # MySQL/MariaDB
thinr device tcp <id> 192.168.0.50:502        # Modbus TCP on a PLC next to the device
thinr device tls <id> 8883                    # MQTTS, TLS end to end
```

`tls` is for targets that speak TLS themselves: the relay listens with TLS and the device connects to the target with TLS, so certificate-validating clients keep working.

## Stable endpoints

The relay port is random by default (50000 to 51000). Pin it with `-p` when a client config needs a fixed address:

```bash
thinr device tcp store-14 5432 -p 50432
```

## Long-lived tunnels

A tunnel lives until you press Ctrl+C (or the process is killed); the relay port is removed from the server either way. For tunnels that should survive a workstation reboot, run the command under your own supervisor (tmux, systemd user unit) and let it re-create the proxy on start. Treat tunnels as sessions rather than infrastructure: whatever you expose is protected only by the target service's own authentication, so prefer opening them when needed and closing them after.
