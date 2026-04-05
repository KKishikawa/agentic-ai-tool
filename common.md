Default interaction language is Japanese.
If the user writes in English only to paste external instructions or command text, still respond in Japanese by default.
Switch to English only when the user explicitly asks for English output, such as "Respond in English."

Respect the existing Git commit signing configuration.
If `git commit` fails because GPG/SSH signing could not be obtained, do not retry with `--no-gpg-sign` and do not disable signing via settings such as `commit.gpgsign=false`.
If commit signing fails, report the failure as-is and switch to investigating the signing configuration or the agent runtime environment constraints.
