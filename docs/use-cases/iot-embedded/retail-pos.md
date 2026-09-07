---
title: Retail & Point-of-Sale Terminals
description: Reach POS logs, files, and software instantly to cut downtime and skip the store visit.
---

# Retail & Point-of-Sale Terminals

When a POS terminal fails, the checkout stops and the store loses sales by the minute. Support usually has to talk a cashier through a fix over the phone or dispatch someone to the location. ThinRemote gives your team direct access to the terminal's logs, files, and software so a failing register is back up fast, with no one on site.

## The problem

Every minute a lane is down is lost revenue, so speed matters more than anything. Terminals are spread across many stores on different networks, none of them reachable from outside. Phone support is slow and error-prone, and a truck roll to reset a register is far too costly for a routine fault.

## How ThinRemote fits

- Get on the terminal instantly to see what is wrong:

```bash
thinr device console pos-store12-lane3
```

- Stream the POS application log live while a cashier reproduces the fault:

```bash
thinr device logs pos-store12-lane3 -f
```

- Pull a crash log or config for a closer look, or push a corrected file back:

```bash
thinr device pull pos-store12-lane3 /var/log/pos/error.log ./
thinr device push pos-store12-lane3 ./receipt.conf /etc/pos/
```

- Restart the register software without rebooting the whole terminal:

```bash
thinr device exec pos-store12-lane3 "systemctl restart pos-app"
```

## At fleet scale

Model each chain as a product and push a software fix or patched config to every register at once, in controlled batches per region:

```bash
thinr product push pos-chain ./pos-app-3.7.pkg /opt/pos/updates/
thinr product exec pos-chain "pos-update /opt/pos/updates/pos-app-3.7.pkg" -c 10
```

## Related

- [SSH and console](/cli/ssh-and-console)
- [File management](/cli/file-management)
- [Exec commands](/cli/exec-commands)
- [Products and groups](/getting-started/products-and-groups)
- [Device tunnels](/device-agent/tunnels)
