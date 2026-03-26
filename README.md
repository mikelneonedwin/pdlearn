# PDLearn

[![Build Status](https://img.shields.io/badge/build-passing-lightgrey)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-desktop-2f6fed)](#)

**Turn raw learning materials into structured, interactive courses with AI.**

PDLearn is a desktop application that transforms PDFs, images, and notes into guided learning experiences. Instead of leaving users with a wall of content or a one-shot summary, it organizes source material into chapters, lessons, concepts, examples, and quizzes that are easier to study from.

## Overview

PDLearn is built for people who learn from dense material but do not want to manually extract structure from it. The app processes user-provided content locally, invokes CLI-based AI tools, and renders the result as a navigable course inside a desktop interface.

It is designed to stay practical:

- useful for students and self-learners
- understandable for non-technical users
- flexible enough for developers to extend
- privacy-first by keeping data on the client side

## Problem

Most study material is not packaged for effective self-learning.

Large PDFs often contain only a few relevant sections, notes can be fragmented, and general AI chat tools tend to either over-compress information or return answers without a clear instructional flow. That makes studying slower, more repetitive, and harder to retain.

## Solution

PDLearn converts unstructured learning materials into a structured course experience.

Given uploaded source material, the app can generate:

- table of contents
- chapters and lessons
- key concepts
- examples
- quizzes

Users can also ask contextual questions while learning, so the generated course becomes interactive rather than static.

## Features

- AI-powered course generation from PDFs, images, and notes
- Interactive Q&A during study sessions
- Smart content compression that preserves useful detail
- Built-in quizzes for reinforcement
- Fully offline / local-first workflow
- No sign-up required
- Works with user-provided CLI AI access instead of paid hosted APIs

## How It Works

PDLearn follows a simple end-to-end flow:

1. The user launches the desktop app.
2. The user uploads one or more learning materials.
3. The app invokes supported CLI-based AI tools.
4. The AI parses and restructures the source content.
5. PDLearn stores and renders the generated course structure.
6. The user studies lessons, reviews concepts, asks questions, and takes quizzes.

## Tech Stack

- Electron
- React
- Vite
- TypeScript
- shadcn/ui
- SQLite
- Drizzle ORM
- Agent Client Protocol (ACP)

## Architecture

High-level flow:

```text
Desktop App -> CLI Wrapper -> AI Model -> Structured Output -> UI Rendering
```

### Explanation

- The **desktop app** handles the interface and local user workflow.
- The **CLI wrapper** bridges the app with external AI tooling available on the machine.
- The **AI model** processes uploaded materials and returns structured educational output.
- The **structured output** is persisted locally and prepared for rendering.
- The **UI layer** presents the result as a course-like study experience.

This architecture keeps the product lightweight while avoiding the operational cost of running hosted AI infrastructure.

## Installation

### Prerequisites

Before starting local development, make sure you have:

- Node.js 18+
- Bun
- Git
- a supported CLI-based AI tool available locally

### Clone the repository

```bash
git clone https://github.com/mikelneonedwin/pdlearn.git
cd pdlearn
```

### Install dependencies

```bash
bun install
```

### Start development mode

```bash
bun run dev
```

### Build the application

```bash
bun run build
```

### Platform-specific builds

```bash
bun run build:win
bun run build:mac
bun run build:linux
```

## Usage

Once the app is running locally:

1. Open PDLearn.
2. Upload a PDF, image, or notes file.
3. Let the app process the material.
4. Browse the generated table of contents, chapters, and lessons.
5. Review key concepts and examples.
6. Take quizzes to check understanding.
7. Ask contextual questions as you study.

### Typical use cases

- turning lecture notes into a structured study guide
- extracting only relevant content from a long PDF
- converting scattered notes into a cleaner learning flow
- reviewing dense material through quiz-based reinforcement

## Why PDLearn Is Different

PDLearn uses CLI-based AI tools such as Gemini CLI or Claude Code instead of depending on paid hosted APIs.

That means users can leverage AI access they already have, while the application stays lightweight, local-first, and less expensive to operate. For a small team, that creates a practical path to shipping useful AI-powered learning software without building infrastructure-heavy backend systems.

## Project Philosophy

- small team, fast execution
- free desktop product
- privacy-first, with client-side data ownership
- focused on learning flow, not generic summarization

## Target Users

PDLearn is intended for:

- students
- self-learners
- people studying from PDFs
- anyone working through dense or unstructured learning material

## Roadmap

Planned next steps include:

- exercises for deeper practice
- progress tracking
- multi-document merging
- improved study workflows
- possible mobile version
- potential monetization around expanded product offerings

## Contributing

Contributions are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes with clear scope.
4. Run linting, type checks, and relevant local validation.
5. Open a pull request with a concise explanation of what changed and why.

Issues, bug reports, and suggestions are also useful, especially around learning UX, local AI integrations, and structured content generation.

## License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.
