import type {
  Agent,
  ChatMessage,
  Chapter,
  Course,
  MockDocument,
  ProcessingState,
  Section
} from "./types"

// ─── Documents ──────────────────────────────────────────────────
export const mockDocuments: MockDocument[] = [
  {
    id: "doc-1",
    name: "Introduction to Machine Learning.pdf",
    type: "pdf",
    size: 2_400_000,
    addedAt: "2026-03-25T10:30:00Z"
  },
  {
    id: "doc-2",
    name: "Neural Networks Diagram.png",
    type: "image",
    size: 850_000,
    addedAt: "2026-03-25T10:32:00Z"
  },
  {
    id: "doc-3",
    name: "Deep Learning Research Notes.docx",
    type: "word",
    size: 1_200_000,
    addedAt: "2026-03-25T10:35:00Z"
  },
  {
    id: "doc-4",
    name: "AI Ethics Presentation.pptx",
    type: "slides",
    size: 5_600_000,
    addedAt: "2026-03-25T11:00:00Z"
  },
  {
    id: "doc-5",
    name: "training_config.txt",
    type: "text",
    size: 4_200,
    addedAt: "2026-03-25T11:05:00Z"
  },
  {
    id: "doc-6",
    name: "Transformer Architecture Paper.pdf",
    type: "pdf",
    size: 3_100_000,
    addedAt: "2026-03-25T11:10:00Z"
  }
]

// ─── Agents & Models ────────────────────────────────────────────
export const mockAgents: Agent[] = [
  {
    id: "agent-opencode",
    name: "Opencode",
    icon: "terminal",
    active: true,
    models: [
      {
        id: "model-gpt4o",
        name: "GPT-4o",
        description: "Most capable model for complex reasoning"
      },
      {
        id: "model-gpt4o-mini",
        name: "GPT-4o Mini",
        description: "Fast and efficient for simpler tasks"
      },
      {
        id: "model-o1",
        name: "o1",
        description: "Advanced reasoning with chain of thought"
      }
    ]
  },
  {
    id: "agent-gemini",
    name: "Gemini CLI",
    icon: "sparkles",
    active: true,
    models: [
      {
        id: "model-gemini-2",
        name: "Gemini 2.5 Pro",
        description: "Google's most capable model"
      },
      {
        id: "model-gemini-flash",
        name: "Gemini 2.5 Flash",
        description: "Fast responses with good quality"
      }
    ]
  },
  {
    id: "agent-claude",
    name: "Claude Code",
    icon: "bot",
    active: false,
    models: [
      {
        id: "model-claude-sonnet",
        name: "Claude 4 Sonnet",
        description: "Balanced performance and speed"
      },
      {
        id: "model-claude-opus",
        name: "Claude 4 Opus",
        description: "Maximum capability"
      }
    ]
  }
]

// ─── Sections ───────────────────────────────────────────────────
const mlIntroSections: Section[] = [
  {
    id: "sec-1-1",
    title: "What is Machine Learning?",
    type: "lesson",
    completed: true,
    content: `## What is Machine Learning?

Machine learning is a subset of artificial intelligence that enables systems to **learn and improve from experience** without being explicitly programmed. It focuses on the development of computer programs that can access data and use it to learn for themselves.

### Key Concepts

- **Supervised Learning**: The algorithm learns from labeled training data
- **Unsupervised Learning**: The algorithm finds patterns in unlabeled data
- **Reinforcement Learning**: The algorithm learns through trial and error

### The Learning Process

1. Data is collected and prepared
2. A model is selected and trained
3. The model is evaluated on test data
4. The model is deployed and monitored

> Machine learning is the field of study that gives computers the ability to learn without being explicitly programmed. — Arthur Samuel, 1959

\`\`\`python
# Simple example of a ML pipeline
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LogisticRegression()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)
\`\`\`

### Applications

Machine learning powers many technologies we use daily, including recommendation systems, voice assistants, fraud detection, and autonomous vehicles.`
  },
  {
    id: "sec-1-2",
    title: "Types of Machine Learning",
    type: "lesson",
    completed: true,
    content: `## Types of Machine Learning

There are three main categories of machine learning algorithms, each suited for different types of problems.

### 1. Supervised Learning

In supervised learning, the model learns from **labeled examples**. Each training sample includes both the input features and the expected output.

**Common algorithms:**
- Linear Regression
- Decision Trees
- Support Vector Machines
- Neural Networks

### 2. Unsupervised Learning

Unsupervised learning works with **unlabeled data**. The model must discover patterns and structures on its own.

**Common algorithms:**
- K-Means Clustering
- Principal Component Analysis (PCA)
- Autoencoders

### 3. Reinforcement Learning

The agent learns by **interacting with an environment** and receiving rewards or penalties for its actions.

**Key components:**
- Agent — the learner
- Environment — what the agent interacts with
- Actions — choices the agent can make
- Rewards — feedback from the environment`
  },
  {
    id: "sec-1-3",
    title: "Knowledge Check",
    type: "quiz",
    completed: false,
    questions: [
      {
        id: "q-1",
        type: "multiple-choice",
        question: "Which type of machine learning uses labeled training data?",
        options: [
          { id: "opt-1a", text: "Unsupervised Learning", isCorrect: false },
          { id: "opt-1b", text: "Supervised Learning", isCorrect: true },
          { id: "opt-1c", text: "Reinforcement Learning", isCorrect: false },
          { id: "opt-1d", text: "Transfer Learning", isCorrect: false }
        ],
        explanation:
          "Supervised learning uses labeled training data where each example includes both inputs and expected outputs."
      },
      {
        id: "q-2",
        type: "multiple-choice",
        question: "What does the agent receive in reinforcement learning?",
        options: [
          { id: "opt-2a", text: "Labels", isCorrect: false },
          { id: "opt-2b", text: "Clusters", isCorrect: false },
          { id: "opt-2c", text: "Rewards or penalties", isCorrect: true },
          { id: "opt-2d", text: "Feature vectors", isCorrect: false }
        ],
        explanation:
          "In reinforcement learning, the agent receives rewards or penalties based on its actions in the environment."
      },
      {
        id: "q-3",
        type: "short-answer",
        question: "Name one common algorithm used in unsupervised learning.",
        correctAnswer: "K-Means Clustering",
        explanation:
          "K-Means Clustering, PCA, and Autoencoders are common unsupervised learning algorithms."
      }
    ]
  }
]

const neuralNetSections: Section[] = [
  {
    id: "sec-2-1",
    title: "Introduction to Neural Networks",
    type: "lesson",
    completed: false,
    content: `## Introduction to Neural Networks

Neural networks are computing systems inspired by **biological neural networks** in the human brain. They consist of interconnected nodes (neurons) organized in layers.

### Architecture

A basic neural network consists of:

1. **Input Layer**: Receives the raw data
2. **Hidden Layers**: Process the information
3. **Output Layer**: Produces the final result

### How Neurons Work

Each neuron performs a simple computation:

\`\`\`
output = activation(weights · inputs + bias)
\`\`\`

Common activation functions include:
- **ReLU**: \\( f(x) = max(0, x) \\)
- **Sigmoid**: Maps values to (0, 1)
- **Tanh**: Maps values to (-1, 1)

### Training

Neural networks learn through **backpropagation** — adjusting weights to minimize the difference between predicted and actual outputs.`
  },
  {
    id: "sec-2-2",
    title: "Deep Learning Fundamentals",
    type: "lesson",
    completed: false,
    content: `## Deep Learning Fundamentals

Deep learning refers to neural networks with **multiple hidden layers**. These deep architectures can learn hierarchical representations of data.

### Why "Deep"?

Each layer learns increasingly abstract features:
- Layer 1: Edges and simple patterns
- Layer 2: Textures and shapes
- Layer 3: Object parts
- Layer 4+: Complete objects and concepts

### Popular Architectures

| Architecture | Best For | Key Feature |
|-------------|----------|-------------|
| CNN | Images | Spatial feature detection |
| RNN | Sequences | Temporal dependencies |
| Transformer | Text/NLP | Self-attention mechanism |
| GAN | Generation | Adversarial training |

### Hardware Requirements

Deep learning requires significant computational power:
- **GPUs** for parallel matrix operations
- **TPUs** for specialized tensor computations
- **Cloud computing** for scalability`
  },
  {
    id: "sec-2-3",
    title: "Neural Network Quiz",
    type: "quiz",
    completed: false,
    questions: [
      {
        id: "q-nn-1",
        type: "multiple-choice",
        question: "What are the three main layers of a neural network?",
        options: [
          {
            id: "opt-nn-1a",
            text: "Input, Hidden, Output",
            isCorrect: true
          },
          {
            id: "opt-nn-1b",
            text: "Front, Middle, Back",
            isCorrect: false
          },
          {
            id: "opt-nn-1c",
            text: "Read, Process, Write",
            isCorrect: false
          },
          {
            id: "opt-nn-1d",
            text: "Source, Transform, Sink",
            isCorrect: false
          }
        ],
        explanation:
          "Neural networks consist of an input layer, one or more hidden layers, and an output layer."
      },
      {
        id: "q-nn-2",
        type: "short-answer",
        question: "What algorithm is used to train neural networks by adjusting weights?",
        correctAnswer: "Backpropagation",
        explanation:
          "Backpropagation computes gradients and adjusts weights to minimize the loss function."
      }
    ]
  }
]

const ethicsSections: Section[] = [
  {
    id: "sec-3-1",
    title: "AI Ethics Overview",
    type: "lesson",
    completed: false,
    content: `## AI Ethics Overview

As AI systems become more powerful and prevalent, ethical considerations become increasingly important.

### Core Principles

- **Fairness**: AI systems should not discriminate
- **Transparency**: Decisions should be explainable
- **Privacy**: User data must be protected
- **Accountability**: Clear responsibility for AI actions
- **Safety**: Systems should be robust and reliable

### Bias in Machine Learning

Bias can enter ML systems through:

1. **Data bias**: Training data that doesn't represent the real world
2. **Algorithm bias**: Model architecture that favors certain outcomes
3. **Human bias**: Prejudices encoded by developers

### Best Practices

- Audit training data for representation
- Use fairness metrics during evaluation
- Implement human oversight for critical decisions
- Document model limitations and intended use cases`
  }
]

// ─── Chapters ───────────────────────────────────────────────────
const mlChapters: Chapter[] = [
  {
    id: "ch-1",
    title: "Machine Learning Basics",
    sections: mlIntroSections
  },
  {
    id: "ch-2",
    title: "Neural Networks",
    sections: neuralNetSections
  },
  {
    id: "ch-3",
    title: "Ethics & Responsibility",
    sections: ethicsSections
  }
]

// ─── Courses ────────────────────────────────────────────────────
export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to AI & Machine Learning",
    description:
      "A comprehensive introduction to artificial intelligence and machine learning concepts.",
    chapters: mlChapters,
    createdAt: "2026-03-24T09:00:00Z",
    progress: 28
  }
]

// ─── Chat Messages ──────────────────────────────────────────────
export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content: "Can you explain what supervised learning is in simpler terms?",
    timestamp: "2026-03-25T14:00:00Z"
  },
  {
    id: "msg-2",
    role: "assistant",
    content:
      'Of course! Think of supervised learning like having a teacher. You show the computer many examples with the correct answers (labels), and it learns the pattern.\n\nFor example, if you show it thousands of photos labeled "cat" or "dog," it learns to tell them apart. The "supervision" comes from providing those correct answers during training.\n\nThe key steps are:\n1. **Collect labeled data** — examples with known answers\n2. **Train the model** — let it find patterns\n3. **Test it** — check if it can predict correctly on new data',
    timestamp: "2026-03-25T14:00:05Z"
  },
  {
    id: "msg-3",
    role: "user",
    content: "What's the difference between a decision tree and a neural network?",
    timestamp: "2026-03-25T14:01:00Z"
  },
  {
    id: "msg-4",
    role: "assistant",
    content:
      "Great question! Here's a simple comparison:\n\n**Decision Tree** 🌳\n- Makes decisions by asking yes/no questions\n- Easy to understand and visualize\n- Works well with structured/tabular data\n- Fast to train\n\n**Neural Network** 🧠\n- Inspired by the human brain\n- Can learn very complex patterns\n- Better for unstructured data (images, text, audio)\n- Needs more data and compute power\n\nThink of a decision tree like a flowchart, while a neural network is more like a brain that develops its own internal logic.",
    timestamp: "2026-03-25T14:01:08Z"
  }
]

// ─── Processing Steps ───────────────────────────────────────────
export const mockProcessingSteps: ProcessingState[] = [
  {
    step: "parsing",
    message: "Parsing uploaded documents…",
    progress: 15
  },
  {
    step: "analyzing",
    message: "Analyzing content structure…",
    progress: 40
  },
  {
    step: "generating",
    message: "Generating course structure…",
    progress: 70
  },
  {
    step: "finalizing",
    message: "Finalizing your course…",
    progress: 95
  }
]
