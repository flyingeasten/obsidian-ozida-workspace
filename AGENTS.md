# Agent Rules

## Project

- This repository is an Obsidian plugin project for `ozida-workspace`.
- Keep the plugin compatible with Obsidian's standard plugin structure: `manifest.json`, `main.js`, and `styles.css` at the repository root.
- Use TypeScript and the Obsidian Plugin API directly. Do not introduce React, Svelte, or another UI framework unless the user explicitly asks for it.

## Build And Run Logging

- After every dependency install, build, dev build, test, lint, or other verification command, append a short entry to `logs/build-log.md`.
- Each log entry should include:
  - Timestamp with timezone.
  - Commands run.
  - Result for each command.
  - Important warnings, failures, approvals, or environment notes.
  - Files generated or updated when relevant.
- Keep the newest entry at the top of `logs/build-log.md`.

## Editing Guidelines

- Keep changes scoped to the user's request.
- Preserve `manifest.json` compatibility unless the requested change requires updating it.
- Add comments only where they explain important plugin or Obsidian lifecycle behavior.
- Do not commit `node_modules/`; it is intentionally ignored.
