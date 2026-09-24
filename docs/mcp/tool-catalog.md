---
title: MCP tool catalog
description: Complete list of tools exposed by the ThinRemote MCP server.
---

# Tool catalog

Every tool accepts optional `device_id`, `user` and `profile` arguments: `device_id` targets a device where it applies, `user` enables admin impersonation, and `profile` switches the environment for that single call.

## Discovery

- **`thinr_devices`**: list devices, with an optional regex `query` over id and name.
- **`thinr_device_info`**: detailed info for one device.
- **`thinr_profiles`**: list the configured CLI profiles (environments).

## Shell

- **`thinr_exec`**: run a shell command on a device, with stdout/stderr and exit code.

## Filesystem

- **`thinr_ls`** · **`thinr_read`** · **`thinr_write`** · **`thinr_push`** · **`thinr_pull`** · **`thinr_mkdir`** · **`thinr_rm`** · **`thinr_mv`**: the full file toolset, mirroring the [CLI file operations](/cli/file-management).

## Resources and properties

- **`thinr_resource_list`**: list a device's resources, with input/output schemas when advertised.
- **`thinr_resource_call`**: invoke a resource with typed inputs.
- **`thinr_property_get`** · **`thinr_property_set`**: read and write device properties.

## Device scripts

- **`thinr_script_list`** · **`thinr_script_write`** · **`thinr_script_delete`**: manage [per-device custom scripts](/device-agent/custom-scripts) remotely; `write` installs, marks executable and reloads the registry in one call.

## Monitoring, history and updates

- **`thinr_monitoring`**: the device's live metrics.
- **`thinr_bucket_read`**: query stored time-series data (e.g. the monitoring bucket).
- **`thinr_update`**: check or apply an agent update.

## Alarms

- **`thinr_alarm_rules`** · **`thinr_alarm_rule_read`** · **`thinr_alarm_rule_write`** · **`thinr_alarm_rule_delete`**: manage alarm rules.
- **`thinr_alarm_instances`** · **`thinr_alarm_instance_stats`** · **`thinr_alarm_instance_get`** · **`thinr_alarm_instance_update`** · **`thinr_alarm_instance_delete`**: triage what's currently firing.

## Provisioning and lifecycle

- **`thinr_agent_install_command`**: generate the install one-liner for onboarding a new device.
- **`thinr_device_set_product`**: assign a device to a product.
- **`thinr_device_delete`**: remove a device record (irreversible).

## Products and fleet operations

- **`thinr_products`** · **`thinr_product_create`** · **`thinr_product_update`** · **`thinr_product_delete`**: manage products.
- **`thinr_product_exec`**: run a command on every active device of a product, in parallel.
- **`thinr_product_write`**: deploy a file across the product.
- **`thinr_product_property_get/set/delete`**: properties attached to the product itself.

## Product scripts

- **`thinr_product_script_list/read/write/delete`**: [fleet-wide custom scripts](/device-agent/custom-scripts#fleet-wide-product-scripts); `write` orchestrates storage, the typed API resource and enablement in one idempotent call.

## Product configuration

- **`thinr_product_profile_api_list/get/set/delete`**: the product's API resources.
- **`thinr_product_profile_bucket_list/get/set/delete`**: data buckets (like the monitoring bucket).
- **`thinr_product_profile_property_list/get/set/delete`**: property templates.
- **`thinr_product_logs_list/add/remove/presets/set_default`**: [log sources](/cli/reference/product-commands#logs).
- **`thinr_product_metric_list/set/delete`**: [dashboard metrics](/cli/reference/product-commands#dashboard-metrics).

## Playbooks

- **`thinr_playbook_schema`** · **`thinr_playbook_validate`** · **`thinr_playbook_run`**: author and run ad-hoc playbooks.
- **`thinr_product_playbook_list/read/write/delete`**: playbooks stored on a product.
- **`thinr_product_playbook_run`**: run against a single device, with dry-run and check modes.
- **`thinr_product_playbook_rollout`**: progressive fleet rollout with batches and a failure threshold.

## Access tokens

- **`thinr_token_list/get/create/update/delete`**: user-level access tokens.
- **`thinr_device_token_list/create/delete`**: per-device tokens.

## Seeing the live schemas

The catalog above is the map; the source of truth is the server itself. Every MCP client can inspect the registered tools and their JSON schemas, so when in doubt, ask your assistant to describe a tool before using it.
