---
title: Unattended Kiosks & Digital Signage
description: Update content, unfreeze screens, and reset kiosks in the field without dispatching a technician.
---

# Unattended Kiosks & Digital Signage

Kiosks and signage in airports, train stations, and retail floors run untouched for weeks until something breaks: a frozen browser, a stale playlist, or a display stuck on an error screen. These devices usually have no keyboard and no on-site staff who can help. ThinRemote lets you reach the local web UI or the terminal to fix them where they stand.

## The problem

Every fix that needs a person on location is slow and expensive. The player often sits behind a mall or station network with no inbound access, so there is nothing to SSH into and no port to forward. A dead screen at a busy terminal can stay dead for days while a field visit gets scheduled.

## How ThinRemote fits

- Open the player's local content-manager web UI in your browser through an HTTP tunnel, no inbound ports required:

```bash
thinr device http kiosk-terminal-3 8080
```

- Push a new playlist or asset bundle straight to the device, then swap it in place:

```bash
thinr device push kiosk-terminal-3 ./winter-campaign.zip /var/signage/incoming/
```

- Jump into a shell to restart the display service when a screen freezes:

```bash
thinr device console kiosk-terminal-3
```

- Clear a wedged state without a full trip by running the exact recovery step:

```bash
thinr device exec kiosk-terminal-3 "systemctl restart signage-player"
```

## At fleet scale

Group the players into a product and roll the same content or restart across every screen on a signage line at once:

```bash
thinr product push signage-line ./winter-campaign.zip /var/signage/incoming/
thinr product exec signage-line "systemctl restart signage-player" -c 20
```

## Related

- [HTTP tunneling](/cli/http-tunneling)
- [SSH and console](/cli/ssh-and-console)
- [File management](/cli/file-management)
- [Products and groups](/getting-started/products-and-groups)
- [Device tunnels](/device-agent/tunnels)
