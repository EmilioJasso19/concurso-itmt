# Spec-Driven Development (SDD)

This folder contains all SDD artifacts for this project.

## Structure

```
sdd/
├── changes/          # One subfolder per change/feature
│   └── <change-name>/
│       ├── proposal.md
│       ├── spec.md
│       ├── design.md
│       ├── tasks.md
│       └── state.yaml
└── specs/            # Stable, finalized specs (post-archive)
```

## Workflow

```
proposal → specs → design → tasks → apply → verify → archive
```

Use `/sdd-new <change-name>` to start a new change.
