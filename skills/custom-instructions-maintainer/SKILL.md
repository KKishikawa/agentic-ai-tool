---
name: custom-instructions-maintainer
description: Update AI custom-instruction fragments, generator composition rules, and skill exposure safely while keeping always-loaded instructions minimal.
---

# Custom Instructions Maintainer

Use this skill when the task is about:

- updating `common.md`, `codex.md`, or `gemini.md`
- revising how `AGENTS.md` and `GEMINI.md` are generated
- deciding whether guidance belongs in always-loaded instructions or in maintenance-only workflow documentation
- refactoring custom-instruction boundaries without reintroducing hardcoded instruction text

## Canonical Layout

Treat `~/.ai` as the source of truth.

- `~/.ai/common.md`: shared, high-frequency instructions only
- `~/.ai/codex.md`: Codex-only delta
- `~/.ai/gemini.md`: Gemini-only delta
- `~/.ai/generate-ai-config.mjs`: composition only
- `~/.ai/skills/custom-instructions-maintainer/SKILL.md`: maintenance workflow

Generated outputs are build artifacts:

- `~/.codex/AGENTS.md`
- `~/.gemini/GEMINI.md`

Do not treat generated files as the canonical editing surface unless the user explicitly asks for emergency direct edits.

## Boundary Rules

Put guidance in always-loaded custom instructions only if it is useful on nearly every interaction.

Move guidance out of always-loaded instructions if it is about:

- how to edit instruction fragments safely
- how to preserve common vs tool-specific boundaries
- how to maintain generator composition rules
- how to expose maintenance workflow to specific agents
- how to avoid reintroducing hardcoded policy into the generator

If a rule is mainly about maintaining the instruction system itself, it belongs in this skill or a related maintenance document, not in generated instruction files.

## Generator Rules

The generator should:

- read fragment files from `~/.ai`
- compose final output files
- fail loudly if required fragments are missing

The generator should not:

- carry substantial instruction text inline
- become the place where policy decisions live
- duplicate maintenance workflow text that belongs in a skill

## Update Workflow

1. Inspect the current fragment split and generator behavior before editing.
2. Decide whether the requested change is:
   - shared (`common.md`)
   - Codex-specific (`codex.md`)
   - Gemini-specific (`gemini.md`)
   - maintenance-only (`SKILL.md` or related maintenance docs)
   - composition logic (`generate-ai-config.mjs`)
3. Prefer the smallest diff that preserves separation of concerns.
4. Update source fragments or the maintenance skill first.
5. Update the generator only if composition behavior must change.
6. Regenerate `AGENTS.md` and `GEMINI.md`.
7. Verify generated outputs reflect the source fragments correctly.
8. Verify skill exposure paths still point at the canonical source.

## Exposure Model

The canonical skill lives in:

- `~/.ai/skills/custom-instructions-maintainer`

Codex exposure should point there through:

- `~/.agents/skills/custom-instructions-maintainer`

Avoid creating duplicate maintained copies unless a tool cannot consume the canonical path. If a fallback is required for another tool, keep the fallback as thin as possible and document why it exists.

## Verification Checklist

After changes:

- run `node ~/.ai/generate-ai-config.mjs`
- inspect `~/.codex/AGENTS.md`
- inspect `~/.gemini/GEMINI.md`
- inspect the maintenance skill through its exposed path if one exists
- confirm no instruction body text was reintroduced into the generator

## Decision Heuristics

Use these tests when classifying new guidance:

- If it helps on nearly every turn, keep it in always-loaded instructions.
- If it matters only when editing the instruction system, keep it in maintenance workflow docs or this skill.
- If it differs by tool behavior or interface, keep it in the tool-specific fragment.
- If it only explains how fragments are assembled, keep it in the generator code or this skill, not in the generated files.

## Output Expectations

When completing a maintenance task, report:

- what source files changed
- whether generated files were regenerated
- whether skill exposure paths changed
- any unresolved Gemini-specific integration question that still needs verification
