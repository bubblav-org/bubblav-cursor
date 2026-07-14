#!/usr/bin/env node
/**
 * Lightweight validator for the BubblaV Cursor plugin (single-plugin repo).
 *
 * Mirrors the invariants Cursor's marketplace review cares about:
 *   - .cursor-plugin/plugin.json is valid JSON with a kebab-case name
 *   - the logo is committed and referenced by a relative path
 *   - mcp.json declares the BubblaV remote MCP server
 *
 * Run from the repository root:  node scripts/validate-plugin.mjs
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const errors = [];
const warnings = [];

const pluginNamePattern = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/;

async function readJson(file, label) {
  let raw;
  try {
    raw = await fs.readFile(file, 'utf8');
  } catch {
    errors.push(`${label} is missing: ${file}`);
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    errors.push(`${label} contains invalid JSON (${file}): ${err.message}`);
    return null;
  }
}

async function exists(file) {
  try {
    await fs.access(path.join(repoRoot, file));
    return true;
  } catch {
    return false;
  }
}

const plugin = await readJson(path.join(repoRoot, '.cursor-plugin/plugin.json'), 'plugin.json');

if (plugin) {
  if (!plugin.name) {
    errors.push('plugin.json: "name" is required.');
  } else if (!pluginNamePattern.test(plugin.name)) {
    errors.push(`plugin.json: "name" (${plugin.name}) must be lowercase kebab-case matching ${pluginNamePattern}.`);
  }

  if (plugin.logo) {
    if (path.isAbsolute(plugin.logo) || plugin.logo.startsWith('..')) {
      errors.push(`plugin.json: "logo" (${plugin.logo}) must be a relative path.`);
    } else if (!(await exists(plugin.logo))) {
      errors.push(`plugin.json: "logo" references a missing file: ${plugin.logo}`);
    }
  } else {
    warnings.push('plugin.json: no "logo" set (a committed logo is recommended for marketplace listing).');
  }

  if (!plugin.description) warnings.push('plugin.json: no "description" set.');
  if (!plugin.version) warnings.push('plugin.json: no "version" set.');
}

const mcp = await readJson(path.join(repoRoot, 'mcp.json'), 'mcp.json');
if (mcp) {
  if (!mcp.mcpServers || typeof mcp.mcpServers !== 'object') {
    errors.push('mcp.json: missing "mcpServers" object.');
  } else {
    const server = mcp.mcpServers.bubblav;
    if (!server) {
      errors.push('mcp.json: expected a "bubblav" entry under "mcpServers".');
    } else if (server.url !== 'https://www.bubblav.com/mcp') {
      errors.push(`mcp.json: "bubblav.url" should be "https://www.bubblav.com/mcp" (got ${JSON.stringify(server.url)}).`);
    }
    if (server && ('type' in server || 'command' in server)) {
      warnings.push('mcp.json: remote servers should declare only "url" (Cursor infers transport); remove "type"/"command".');
    }
  }
}

if (!(await exists('README.md'))) errors.push('README.md is missing.');
if (!(await exists('LICENSE'))) errors.push('LICENSE is missing.');

console.log(warnings.length ? `Warnings (${warnings.length}):` : 'No warnings.');
for (const w of warnings) console.log(`  - ${w}`);

if (errors.length) {
  console.error(`\nErrors (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('\nValidation FAILED.');
  process.exit(1);
}

console.log('\nValidation passed.');
