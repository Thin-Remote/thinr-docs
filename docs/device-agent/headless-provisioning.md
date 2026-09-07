---
title: Headless provisioning
description: Provision devices unattended with a token and host.
---

# Headless provisioning

For fleets, factory lines, or CI images, skip the interactive prompts entirely. The launcher script forwards everything after `--` verbatim to the agent binary, so a complete unattended install is a single line:

```bash
curl -fsSL https://get.thinremote.io/install.sh | sh -s -- \
  install --token <PROVISIONING_TOKEN> --device my-device-01 --overwrite
```

If the binary is already on the device (for example baked into an OS image), call it directly:

```bash
thinr-agent install --token <PROVISIONING_TOKEN> --device my-device-01
```

## The provisioning token

The token is a JWT that carries the server (`svr`) and account (`usr`) it provisions against, so `--host` is usually unnecessary. The agent presents it once, receives its own long-lived device credentials, and never uses the token again, so provisioning tokens can be shared across an entire batch of devices.

## `install` flags

| Flag | Description |
|------|-------------|
| `--token TOKEN` | Auto-provisioning token. Skips all interactive authentication. |
| `--device ID` | Custom device identifier. Defaults to the hostname. |
| `--product ID` | Product to associate the device with. Defaults to auto-detect, or `thinremote`. |
| `--host HOST` | Server to register against. Usually embedded in the token. |
| `--overwrite` | Re-register without prompting if the device id already exists. |
| `--no-start` | Install the service but don't start it (for image baking). |
| `--no-verify-ssl` | Disable TLS certificate verification (self-signed test servers). |

## Recipes

### Bake the agent into an OS image

Install during image build, but don't start or register, so each device claims its own identity on first boot:

```bash
# at image build time
thinr-agent install --token <PROVISIONING_TOKEN> --no-start

# on first boot (e.g. a oneshot unit), the service starts and registers
systemctl start thinr-agent
```

Since `--device` defaults to the hostname, devices that set a unique hostname on first boot register under it automatically.

### Provision a batch from a list

```bash
while read -r host; do
  ssh "root@$host" \
    "curl -fsSL https://get.thinremote.io/install.sh | sh -s -- \
       install --token $TOKEN --overwrite"
done < hosts.txt
```

Configuration-management users (Ansible, Puppet, cloud-init) can wrap the same one-liner in their tool of choice.

### Verify the result

A headless install exits non-zero on failure, so it composes with `set -e` pipelines. After provisioning, confirm from your workstation:

```bash
thinr device list my-device-01
```

## Related

- [Interactive installation](/device-agent/install): guided setup for a single device
- [Release channels](./channels): choosing stable, main or develop binaries
- [Agent CLI flags](/device-agent/reference/cli-flags): full reference of `thinr-agent` commands
