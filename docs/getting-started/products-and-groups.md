---
title: Products and groups
description: Organise devices into fleets and operate on them as one.
---

# Products and groups

A handful of devices you can manage one at a time. A fleet you can't, so ThinRemote gives you two ways to organise devices and act on many at once: products and groups.

## Products

A **product** is a group of devices of the same kind that share configuration and the way you operate them. Every device belongs to exactly one product.

The product holds the shared definition for its devices, its *profile*:

- the **buckets** that store time-series data (the [monitoring](/device-agent/monitoring-and-alarms) bucket lives here),
- the **dashboard metrics** that chart fleet-wide values,
- the **log sources** that `thinr device logs --source` can stream,
- the **product scripts** that become callable resources on every device ([fleet-wide custom scripts](/device-agent/custom-scripts#fleet-wide-product-scripts)),
- the **playbooks** stored for repeatable procedures.

This is why a product is more than a folder: define something once on the product and every device of that product gets it, including devices that join later. When a device is [provisioned](/device-agent/install), it's assigned to a product (the installer creates a default one if you don't have any).

```bash
thinr product list                        # your products
thinr product status edge-gateways        # every device: status + monitoring
thinr product status edge-gateways -w 10  # live, refreshing every 10s
```

## Groups

A **group** is a label that slices devices within a product (or across products): `staging`, `region-emea`, `customer-acme`, `v2-hardware`. A device can carry groups for whatever dimensions you operate along.

Where a product is the unit of shared *configuration*, a group is the unit of *selective action*: most fleet commands take `-g, --group` to narrow their scope to part of the product.

## Operating on a fleet

Once devices are organised, every per-device operation has a product-wide counterpart that fans out in parallel, with per-device results:

```bash
# run a command on every active device of the product
thinr product exec edge-gateways "systemctl restart app" -c 5

# read a property from each device, just the EU ones
thinr product property edge-gateways firmware -g region-emea -f version

# call a resource across a group
thinr product resource edge-gateways reboot -g staging

# push a file to the whole fleet
thinr product push edge-gateways ./config.yaml /etc/app/config.yaml
```

These default to **active devices only**. `property`, `exec` and `push` accept `-a, --all` to include offline devices too; `resource` calls always skip offline devices, since the device has to be connected to answer. Concurrency is capped with `-c` (default 10). Full options in the [`thinr product` reference](/cli/reference/product-commands).

For changes that need more than a single command (check a condition, copy files, run steps, verify, and roll out in safe batches), step up to [playbooks](/cli/reference/playbook-commands). To update agents across a fleet, use [`thinr fleet upgrade`](/cli/reference/fleet-commands).
