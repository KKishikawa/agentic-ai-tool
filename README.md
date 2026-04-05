# agentic-ai-tool

A toolkit for managing and generating AI agent custom instructions and skills for Gemini CLI and Codex.

## Features
- Fragmented instruction management (`common.md`, `gemini.md`, `codex.md`)
- Custom skills management in `skills/`
- Configuration generator script (`generate-ai-config.mjs`)

## Directory Structure
- `common.md`: Shared instructions.
- `gemini.md`: Gemini-specific instructions.
- `codex.md`: Codex-specific instructions.
- `skills/`: Custom skill definitions.
- `generate-ai-config.mjs`: Script to generate `~/.gemini/GEMINI.md` and `~/.codex/AGENTS.md`.

## Usage
Run the generator script to reflect changes in your local AI agent settings:
```bash
node generate-ai-config.mjs
```
