---
title: "thinr playbook"
description: Validate and run playbook YAML files from your workstation.
---

# `thinr playbook`

Playbooks are declarative YAML documents that describe a desired state or procedure to apply across devices. The `thinr playbook` commands work on **local files**; to store and run playbooks attached to a product, see [`thinr product playbook`](./product-commands#playbooks).

## `playbook validate <file>`

Parse and validate a playbook against the schema without running it:

```bash
thinr playbook validate ./deploy.yaml
```

## `playbook run <file>`

Run a playbook file. The target product is declared inside the file but can be overridden from the command line:

```bash
thinr playbook run ./deploy.yaml --dry-run            # print the static plan
thinr playbook run ./deploy.yaml --check              # read-only: report what would change
thinr playbook run ./deploy.yaml -v version=2.4.1     # override a variable
thinr playbook run ./deploy.yaml --target prod-fleet --group staging -c 3
```

| Option | Meaning |
|--------|---------|
| `--dry-run` | Print the resolved plan without contacting devices. |
| `--check` | Contact devices read-only and report what each step would change. |
| `--target <product>` | Override the target product declared in the file. |
| `--group <group>` | Override the asset group filter. |
| `-c, --concurrency <n>` | Override max parallel devices. |
| `--fail-fast` | Stop dequeueing new devices on first failure. |
| `--continue-on-error` | Keep running subsequent steps on a device even if one fails. |
| `-v, --var <key=value>` | Override a playbook variable (repeatable; coerced to the declared type). |
| `-j, --json` | Output as a [JSON envelope](./json-envelope). |

## Example playbooks

The CLI repository ships ready-to-adapt examples (`hello-world.yaml`, `atomic-deploy.yaml`, `conditional-update.yaml`, `linux-host.yaml`) under [`examples/`](https://github.com/Thin-Remote/thinr-cli/tree/main/examples).
