---
title: Headless provisioning
description: Provision devices unattended with a token and host.
---

# Headless provisioning

For fleets, factory lines, or CI images, skip the interactive prompts entirely. The launcher script forwards everything after `--` verbatim to the agent binary, so a complete unattended install is a single line:

```bash
curl -fsSL https://get.thinremote.io/install.sh | sudo sh -s -- \
  install --token <PROVISIONING_TOKEN> --device my-device-01 --overwrite
```

Keep the `sudo` explicit. With no terminal to prompt on, the installer elevates by itself only where sudo needs no password; being explicit gives the same result on every machine in the fleet. Drop it when the session is already root, and pass `--user` before `install` when you deliberately want an unprivileged install. See [system or user install](/device-agent/install#system-or-user-install).

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

No `sudo` inside the quotes because the session is already root. For an account with sudo rights instead, use `sudo sh -s --`.

Configuration-management users (Ansible, Puppet, cloud-init) can wrap the same one-liner in their tool of choice.

### Verify the result

A headless install exits non-zero on failure, so it composes with `set -e` pipelines. Note that an agent that is already configured counts as a failure here: the installer refuses to provision over an existing configuration and exits non-zero without touching the running agent, which keeps a re-run from silently re-registering a live device. Uninstall first when you mean to re-provision from scratch.

After provisioning, confirm from your workstation:

```bash
thinr device list my-device-01
```

## Related

- [Interactive installation](/device-agent/install): guided setup for a single device
- [Release channels](./channels): choosing stable, main or develop binaries
- [Agent CLI flags](/device-agent/reference/cli-flags): full reference of `thinr-agent` commands
