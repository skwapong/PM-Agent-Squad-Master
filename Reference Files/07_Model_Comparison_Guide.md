# Agent Foundry - Model Comparison Guide

## Overview

This guide compares all available models in Amazon Bedrock Agent Foundry to help you choose the right model for your use case.

## Quick Selection Guide

| Your Need | Recommended Model | Alternative |
|-----------|------------------|-------------|
| **Best Overall** | Claude 3.5 Sonnet V2 | GPT-5 mini |
| **Highest Reasoning** | Claude 4 Opus | GPT-5 |
| **Fastest Response** | Nova Micro | Claude 3 Haiku |
| **Most Cost-Effective** | Nova Lite | GPT-5 nano |
| **Long Context** | Gemini 2.5 Pro | Llama 4 Scout 17B |
| **Multimodal** | Nova Pro | Llama 4 Maverick 17B |
| **Agentic Tasks** | Claude 4.5 Sonnet | GPT-5 |
| **Self-Hosted** | Llama 4 Maverick | Llama 4 Scout |

## Amazon Nova Models

### Nova Pro

**Strengths:**
- Strong multimodal capabilities (text, image, video)
- Deep AWS/Bedrock integration
- Balanced cost and performance
- Native AWS ecosystem support

**Limitations:**
- AWS-locked (proprietary)
- Video analysis ignores audio
- Less reasoning power than Claude 4 Opus or GPT-5

**Best For:**
- Business intelligence agents analyzing sales videos, charts, reports
- Cloud automation agents managing AWS resources
- AWS-native deployments

**Pricing:** Mid-range
**Speed:** Fast
**Context Window:** Standard

---

### Nova Lite

**Strengths:**
- Very fast and low-cost
- Optimized for real-time applications
- Good multimodal support
- High throughput

**Limitations:**
- Less accurate than Nova Pro
- Not for complex reasoning tasks
- Limited capability for nuanced work

**Best For:**
- Customer service agents (high-volume, real-time queries)
- Content moderation agents
- Real-time chat applications

**Pricing:** Low
**Speed:** Very Fast
**Context Window:** Standard

---

### Nova Micro

**Strengths:**
- Extremely cheap and fast
- Optimized for low latency
- High throughput for text tasks
- Minimal resource usage

**Limitations:**
- Text-only (no vision/audio)
- Weakest Nova model
- Very limited reasoning

**Best For:**
- Simple API agents (formatting, classification)
- Router agents (intent detection)
- High-volume simple chatbots

**Pricing:** Very Low
**Speed:** Extremely Fast
**Context Window:** Standard

---

## Meta Llama Models

### Llama 4 Maverick 17B

**Strengths:**
- Open-weight (MoE: 17B active of 400B total)
- Frontier performance rivaling closed models
- Natively multimodal (text, image)
- No API cost if self-hosted
- Full data privacy and control

**Limitations:**
- Requires significant hardware
- Technical expertise needed
- No built-in safety layer
- Self-implementation of moderation required

**Best For:**
- Private/on-premise agents (maximum data privacy)
- Custom-trained agents on proprietary data
- Medical/legal research agents
- Enterprise deployments with security requirements

**Pricing:** Free (self-hosted) / Infrastructure costs
**Speed:** Fast (when properly resourced)
**Context Window:** Large

---

### Llama 4 Scout 17B

**Strengths:**
- Open-weight MoE architecture
- Massive 10M token context window
- Excellent for large document processing
- Full codebase analysis capability

**Limitations:**
- Requires significant hardware
- Slower than Maverick (long context focus)
- Self-hosting complexity

**Best For:**
- Research agents (multiple papers/books)
- Coding agents (entire project analysis)
- Long-document summarization
- Large-scale codebase refactoring

**Pricing:** Free (self-hosted) / Infrastructure costs
**Speed:** Moderate (due to long context)
**Context Window:** 10M tokens

---

## Anthropic Claude Models

### Claude 4 Opus

**Strengths:**
- State-of-the-art reasoning and coding
- Constitutional AI (strong safety/reliability)
- Excels at complex, multi-step tasks
- Highest capability Claude model

**Limitations:**
- Very expensive (highest-cost model)
- Proprietary
- Safety alignment can be restrictive
- Slower for some tasks

**Best For:**
- High-stakes enterprise agents (legal, financial, medical)
- Autonomous coding agents
- Complex problem-solving
- Critical decision-making systems

**Pricing:** Very High
**Speed:** Moderate
**Context Window:** Large
**Recommended Temperature:** 0.3-0.6

---

### Claude 4 Sonnet

**Strengths:**
- Excellent price/performance balance
- Nearly as capable as Opus
- Significantly cheaper and faster
- Production-grade reliability

**Limitations:**
- Proprietary
- Not quite as powerful as Opus for extreme complexity

**Best For:**
- Advanced workflow agents
- Production business automations
- Complex customer service agents
- Multi-turn conversations

**Pricing:** Mid-High
**Speed:** Fast
**Context Window:** Large
**Recommended Temperature:** 0.5-0.7

---

### Claude 4.5 Sonnet ⭐ HIGHLY RECOMMENDED

**Strengths:**
- "Computer Use" capability (browser/OS control)
- "Extended Thinking" mode
- Best-in-class for agentic tasks
- Advanced reasoning capabilities

**Limitations:**
- Proprietary
- More expensive than Claude 4 Sonnet
- Computer Use has learning curve

**Best For:**
- Autonomous web agents
- Form filling and data extraction
- Proactive assistant agents
- System monitoring and action

**Pricing:** High
**Speed:** Fast
**Context Window:** Large
**Recommended Temperature:** 0.5-0.7

---

### Claude 3.7 Sonnet / 3.5 Sonnet V2

**Strengths:**
- High-speed, cost-effective
- Early "extended thinking" (3.7)
- Great for scaling
- Reliable performance

**Limitations:**
- Proprietary
- Outclassed by Claude 4/4.5 families
- Lower reasoning than newer models

**Best For:**
- Mid-complexity agents
- Long-form content drafting
- Meeting summarization
- Cost-optimized deployments

**Pricing:** Mid
**Speed:** Very Fast
**Context Window:** Large
**Recommended Temperature:** 0.6-0.8

---

### Claude 4.5 Haiku

**Strengths:**
- "Computer Use" and "Extended Thinking" in fast tier
- Incredibly fast and affordable
- Good capability for the price

**Limitations:**
- Proprietary
- Less accurate than Sonnet/Opus
- Can fail at complex tasks

**Best For:**
- Simple autonomous agents
- Repetitive UI tasks
- Scalable data extraction
- High-volume simple operations

**Pricing:** Low
**Speed:** Very Fast
**Context Window:** Standard
**Recommended Temperature:** 0.5-0.7

---

### Claude 3 Haiku

**Strengths:**
- Extremely fast and low-cost
- Text and image support
- Entry-level Claude model
- Good for simple tasks

**Limitations:**
- Proprietary
- No advanced agentic skills
- Low reasoning power
- Struggles with nuance

**Best For:**
- Simple RAG agents
- Triage/classification agents
- Knowledge base queries
- Fast responses needed

**Pricing:** Very Low
**Speed:** Extremely Fast
**Context Window:** Standard
**Recommended Temperature:** 0.4-0.6

---

## OpenAI GPT Models

### GPT-5

**Strengths:**
- Top-tier reasoning, coding, problem-solving
- "Thinking" modes for dynamic reasoning control
- Robust and reliable API
- Excellent documentation

**Limitations:**
- Proprietary and high-cost
- Can be slower in "high thinking" modes
- Premium pricing

**Best For:**
- "God-mode" agents (complex swarms)
- Autonomous problem-solving
- High-level goal planning and execution
- Mission-critical applications

**Pricing:** Very High
**Speed:** Moderate (depends on mode)
**Context Window:** Large
**Recommended Temperature:** 0.5-0.7

---

### GPT-5 mini

**Strengths:**
- Excellent speed/cost/intelligence balance
- "Thinking" modes available
- Reliable production performance
- Good for most use cases

**Limitations:**
- Proprietary
- More expensive than nano/lite tiers

**Best For:**
- Primary agent "brain"
- Production workflows
- Advanced data analysis
- General-purpose agents

**Pricing:** Mid-High
**Speed:** Fast
**Context Window:** Large
**Recommended Temperature:** 0.5-0.7

---

### GPT-5 nano

**Strengths:**
- Very fast and low-cost
- Optimized for high throughput
- Surprisingly capable for size
- Good for specialized tasks

**Limitations:**
- Proprietary
- Low reasoning power
- Not suitable for complex tasks alone

**Best For:**
- "Worker" or "Specialist" agents
- Simple, repetitive tasks
- Text summarization
- Syntax checking

**Pricing:** Low
**Speed:** Very Fast
**Context Window:** Standard
**Recommended Temperature:** 0.4-0.6

---

### GPT 4.1

**Strengths:**
- Strong, reliable flagship model
- Well-understood and battle-tested
- Successor to GPT-4o
- Stable performance

**Limitations:**
- Proprietary
- Surpassed by GPT-5 family
- Legacy model

**Best For:**
- Legacy agents
- Established workflows pre-GPT-5
- Proven, stable systems

**Pricing:** Mid
**Speed:** Moderate
**Context Window:** Standard
**Recommended Temperature:** 0.6-0.8

---

### GPT 4.1 mini / nano

**Strengths:**
- Faster, cheaper versions of GPT 4.1
- Compatible with existing systems

**Limitations:**
- Proprietary
- Largely made obsolete by GPT-5 nano
- Better alternatives available

**Best For:**
- Low-cost legacy agents
- Applications not upgrading to GPT-5
- Budget-constrained projects

**Pricing:** Low
**Speed:** Fast
**Context Window:** Standard

---

## Google Gemini Models

### Gemini 2.5 Pro

**Strengths:**
- Massive 1M+ token context window
- Deep Google ecosystem integration
- Excellent with huge datasets
- Code, video, text processing

**Limitations:**
- Proprietary
- Can be verbose
- Best features locked to Google Cloud
- Google Workspace dependency

**Best For:**
- Productivity agents (Gmail, Drive, Calendar)
- Long-context research
- Entire repository analysis
- 10-hour video analysis

**Pricing:** High
**Speed:** Moderate
**Context Window:** 1M+ tokens
**Recommended Temperature:** 0.5-0.7

---

### Gemini 2.5 Flash

**Strengths:**
- Extremely fast and cost-effective
- 1M token context window
- Optimized for speed in long-context
- Good throughput

**Limitations:**
- Proprietary
- Lower reasoning quality than Pro
- Especially weak in long-context reasoning

**Best For:**
- Real-time conversational agents
- Large document reference
- High-speed RAG agents
- Cost-optimized long-context

**Pricing:** Low
**Speed:** Very Fast
**Context Window:** 1M tokens
**Recommended Temperature:** 0.4-0.6

---

### Gemini 2.5 Flash-Lite

**Strengths:**
- "Thinking" mode support
- Code execution capability
- Google Search grounding
- Large output (65.5K tokens)
- Better instruction following

**Limitations:**
- Proprietary
- Thinking mode increases latency/cost
- More expensive than 2.0 version

**Best For:**
- Smarter "Worker" agents
- Dynamic workflow agents
- Small-scale reasoning
- Tasks needing code execution

**Pricing:** Mid
**Speed:** Fast
**Context Window:** Large
**Recommended Temperature:** 0.5-0.7

---

### Gemini 2.0 Flash-Lite

**Strengths:**
- Extreme speed & low cost
- Excellent for RAG (1M context)
- Very low latency
- High-volume optimized

**Limitations:**
- Proprietary
- No advanced skills (Thinking, code execution)
- Limited reasoning
- Small output limit (8.2K tokens)

**Best For:**
- Simple "Worker" agents
- Real-time voice agents
- Triage/Router agents
- High-volume simple tasks

**Pricing:** Very Low
**Speed:** Extremely Fast
**Context Window:** 1M tokens
**Recommended Temperature:** 0.4-0.5

---

## Model Selection Decision Tree

### By Primary Need

#### Need: Best Overall Balance
→ **Claude 3.5 Sonnet V2** (primary) or **GPT-5 mini** (alternative)

#### Need: Highest Intelligence
→ **Claude 4 Opus** or **GPT-5**

#### Need: Fastest Speed
→ **Nova Micro** (text) or **Gemini 2.0 Flash-Lite** (with context)

#### Need: Lowest Cost
→ **Nova Lite** or **GPT-5 nano**

#### Need: Best Agentic Capabilities
→ **Claude 4.5 Sonnet** or **Claude 4.5 Haiku** (budget)

#### Need: Long Context (100K+ tokens)
→ **Gemini 2.5 Pro** (1M+) or **Llama 4 Scout 17B** (10M)

#### Need: Multimodal (Vision)
→ **Nova Pro** or **Llama 4 Maverick 17B** (self-hosted)

#### Need: Self-Hosted/Private
→ **Llama 4 Maverick 17B** or **Llama 4 Scout 17B**

### By Use Case

#### Customer Support Agent
**Recommended**: Claude 4.5 Haiku, Nova Lite
**Why**: Fast, cost-effective, good for conversations

#### Marketing Campaign Strategist
**Recommended**: Claude 3.5 Sonnet V2, GPT-5 mini
**Why**: Great reasoning, balanced performance

#### Technical Documentation
**Recommended**: Claude 4 Sonnet, GPT-5
**Why**: Accuracy, detail, technical understanding

#### Data Analysis
**Recommended**: GPT-5 mini, Claude 4 Sonnet
**Why**: Strong analytical capabilities

#### Code Generation
**Recommended**: Claude 4 Opus, GPT-5
**Why**: Best coding capabilities

#### Simple Q&A
**Recommended**: Claude 3 Haiku, Nova Micro
**Why**: Fast, cheap, sufficient for simple queries

#### Research & Summarization
**Recommended**: Gemini 2.5 Pro, Claude 4 Sonnet
**Why**: Long context, good summarization

---

## Cost vs Performance Matrix

```
                   Performance
                   │
         High      │  Claude 4 Opus     GPT-5
                   │  Claude 4.5 Sonnet
                   │
                   │  Claude 3.5 V2     GPT-5 mini
         Medium    │  Claude 4 Sonnet   Nova Pro
                   │  Gemini 2.5 Flash
                   │
                   │  Claude 3 Haiku    Nova Lite
         Low       │  Nova Micro        GPT-5 nano
                   │  Gemini 2.0 Lite
                   │
                   └────────────────────────────
                        Low      Mid      High
                              Cost
```

---

## Speed vs Capability Matrix

```
                   Capability
                   │
         High      │  Claude 4 Opus     GPT-5
                   │  Claude 4.5 Sonnet
                   │  Claude 4 Sonnet   GPT-5 mini
         Medium    │  Claude 3.5 V2
                   │  Nova Pro          Gemini 2.5 Flash
                   │
         Low       │  Claude 3 Haiku    Nova Lite
                   │  Nova Micro        GPT-5 nano
                   │
                   └────────────────────────────
                       Slow     Medium    Fast
                              Speed
```

---

## Final Recommendations by Scenario

### Scenario 1: Production Marketing Agent
**Choice**: Claude 3.5 Sonnet V2
**Reasoning**: Best balance of performance, reliability, and cost for complex marketing tasks

### Scenario 2: High-Volume Support Bot
**Choice**: Nova Lite or Claude 4.5 Haiku
**Reasoning**: Fast, cost-effective, handles high throughput well

### Scenario 3: Enterprise Legal Agent
**Choice**: Claude 4 Opus
**Reasoning**: Highest reliability, best reasoning, worth the cost for critical applications

### Scenario 4: Research Assistant
**Choice**: Gemini 2.5 Pro or Llama 4 Scout 17B
**Reasoning**: Massive context windows for processing large documents

### Scenario 5: Budget-Conscious Deployment
**Choice**: Nova Micro or GPT-5 nano
**Reasoning**: Lowest cost while maintaining acceptable performance

### Scenario 6: Autonomous Web Agent
**Choice**: Claude 4.5 Sonnet
**Reasoning**: "Computer Use" capability is game-changing for automation

### Scenario 7: Private/On-Premise
**Choice**: Llama 4 Maverick 17B
**Reasoning**: Open-weight, self-hostable, full data control

---

**Last Updated**: November 12, 2025
**Version**: 2.0.0
**Related to**: PM Agent Squad Master Template
