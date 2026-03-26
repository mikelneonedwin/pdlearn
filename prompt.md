You are a senior frontend engineer tasked with scaffolding the **entire UI layer (mock-only)** for a desktop application called **PDLearn**.

Your goal is to produce a **fully navigable, production-grade UI scaffold** with **mock data only**, designed so that real data and logic can later replace the mocks with minimal changes.

---

# **Core Requirements**

* Framework: Tanstack Router +React + TypeScript (Vite environment)
* UI System: **shadcn/ui ONLY** (use its components, tokens, and patterns strictly)
* Animations: **framer-motion**
* Styling: Tailwind via shadcn tokens (NO custom colors or design systems)
* State: Local component state or lightweight store (e.g. Tanstack Query) with clear separation for easy replacement
* Data: Fully mocked (centralized mock layer)
* Architecture: Clean, modular, scalable

---

# **Primary Objective**

Build a **complete UI scaffold** for:

* Pre-course experience (AI chat-like interface)
* Course creation flow
* Course learning experience
* Navigation & layout system
* Settings dialog
* Agent & model selection system

Everything must be **visually complete and interactive**, but powered by mock data.

---

# **High-Level App Structure**

Create a layout with:

### **1. App Shell**

* Sidebar (persistent)
* Main content area
* Optional right panel (future-ready but not active)
* Global modals (settings, confirmations)

---

# **Sidebar (Global Navigation)**

### Sections:

#### **A. Document Gallery (Top)**

* Horizontally scrollable
* Displays uploaded documents (mocked)
* Each item:

  * File icon (based on type: PDF, image, doc, slides, etc.)
  * Filename (truncated)
  * Remove button (UI only)
* Supports overflow scrolling with smooth motion

---

#### **B. Course List (Below Gallery)**

* Vertical list of created courses
* Each item:

  * Course title
  * Small progress indicator (e.g. % or progress bar)
* Active course is highlighted
* Clicking switches to course view

---

#### **C. Empty State**

If no courses:

* Sidebar still visible
* Course list shows empty placeholder

---

# **Main View States**

---

## **STATE 1: No Courses (Landing / Chat Interface)**

Design similar to modern AI chat apps like:

* ChatGPT
* Claude

### Layout:

* Centered input panel

### Features:

#### **1. File Upload Area**

* Drag & drop zone
* Accept:

  * PDFs
  * Images
  * Word docs
  * Slides
  * Text files
* Display uploaded files as chips/cards above input

---

#### **2. Prompt Input**

* Large textarea
* Placeholder like: *“Add instructions (optional)…”*

---

#### **3. Controls Row (Below Input)**

##### **Agent Selector (Dropdown)**

* Shows:

  * Active agents (configured)
  * Inactive agents (faded/disabled at bottom)
* Example agents:

  * Opencode (active)
  * Gemini CLI (active)
  * Claude Code (inactive/faded)

---

##### **Model Selector (Dropdown)**

* Changes based on selected agent
* Mock model list per agent

---

#### **4. Submit Button**

* Triggers "course generation"
* Shows loading state (mock)

---

## **STATE 2: Processing State**

* Full-page loading state after submission
* Animated progress indicator
* Messages like:

  * “Parsing documents…”
  * “Generating course structure…”
* Use framer-motion for transitions

---

## **STATE 3: Course View**

---

### **Course Layout**

#### **Left Sidebar (Course-Specific)**

* Course title at top
* List of:

  * Chapters
  * Sections nested under chapters

Each section:

* Title
* Completion checkbox (toggleable)
* Active section highlighted

---

#### **Main Content Area**

Displays selected section content:

### **Section Types**

#### **1. Lesson Section**

* Title
* Structured content:

  * Headings
  * Paragraphs
  * Lists
  * Code blocks (if needed)
* Mimic LMS platforms like:

  * IBM SkillsBuild

---

#### **2. Quiz Section**

* Question types:

  * Multiple choice
  * Short answer
* UI includes:

  * Options
  * Submit button
  * Feedback (mock)

---

---

### **Floating Chat Assistant (Bottom Right)**

* Collapsible chat widget
* Context-aware (tied to current section)

#### Features:

* Chat history (mock)
* Input box
* Send button
* Messages styled like modern AI chat

---

---

# **Global Features**

---

## **Settings Dialog**

* Center modal (shadcn Dialog)
* Opens from top-right or sidebar

### Sections:

* Agent configuration (mock)
* Model preferences (mock)
* General settings (UI only)

---

## **Navigation + Routing**

* Use a routing system (React Router or equivalent)
* Routes:

  * `/` → Chat / upload screen
  * `/course/:id` → Course view

---

## **Animations**

Use **framer-motion** for:

* Page transitions
* Sidebar interactions
* Loading states
* Modal transitions

---

# **State & Data Design**

---

## **Mock Data Layer**

Create a centralized mock module:

### Types:

* Course
* Chapter
* Section
* Document
* Agent
* Model

---

## **Important Constraint**

All UI must rely on **mock services/hooks**, such as:

* `useCourses()`
* `useDocuments()`
* `useAgents()`

These must be easily replaceable with real implementations.

---

# **Component Architecture**

Structure components into:

* `components/ui` (shadcn-based)
* `components/layout`
* `components/course`
* `components/chat`
* `components/upload`
* `components/sidebar`
* `features/*`
* `hooks/*`
* `mocks/*`

---

# **Important UX Details You MUST Include**

* Empty states for:

  * No documents
  * No courses
* Loading states for:

  * Course generation
  * Chat responses
* Disabled states for:

  * Inactive agents
* File type icons
* Scroll handling for long content
* Responsive layout (within desktop constraints)
* Keyboard-friendly interactions

---

# **What NOT to Do**

* Do NOT implement real backend logic
* Do NOT connect to real AI tools
* Do NOT introduce custom UI outside shadcn
* Do NOT over-engineer beyond UI scaffolding

---

# **Final Deliverable**

Produce:

* Complete React + TypeScript UI scaffold
* Fully navigable app
* Clean folder structure
* Mock-driven architecture
* Ready for integration with minimal refactoring

The result should feel like a **real, polished product**, even though all data is mocked.
