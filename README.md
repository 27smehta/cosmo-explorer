To check my previous commits go here: [https://github.com/27smehta/cosmo-explorer/commits/389df8f63ba576132f17d8185a7519b2685968c3/]([url](https://github.com/27smehta/cosmo-explorer/commits/389df8f63ba576132f17d8185a7519b2685968c3/))


# CosmoExplorer Documentation
Welcome to the documentation for CosmoExplorer-an interactive, space-themed web application built with React, TypeScript, and modern UI tools. This guide will help you understand the project structure, setup, core features, and best practices for contributing or extending the codebase.

# Table of Contents
Introduction

Features Overview

Getting Started

Project Structure

Core Technologies

Contribution Guidelines

Best Practices

# FAQ

Introduction
CosmoExplorer is designed to make space exploration fun and educational. It combines interactive articles, games, and tools in a visually engaging, accessible interface. The project emphasizes modularity, maintainability, and accessibility.

# Features Overview
Interactive Articles: Educational content about space.

Games: Asteroid Defender, Space Trivia, Planet Matcher.

Tools: Weight converter (see your weight on other planets), Zodiac sign calculator, Astronomical events tracker.

Responsive & Accessible: Mobile-first design, ARIA support, keyboard navigation.

Modern UI: Glassmorphism, custom animations, and space color schemes.

# Getting Started
Prerequisites:

Node.js (v16+ recommended)

npm

# Installation:

bash
git clone https://github.com/27smehta/cosmo-explorer.git
cd cosmo-explorer
npm install
npm run dev
This starts the development server. Visit http://localhost:5173 in your browser.

# Project Structure
text
src/
├── components/   # Reusable UI components

├── pages/        # Route-based page components

├── games/        # Interactive games

├── hooks/        # Custom React hooks

├── utils/        # Utility functions

├── types/        # TypeScript type definitions

└── data/         # Static data and constants

# Core Technologies
React (with TypeScript)

Vite (build tool)

Tailwind CSS (styling)

React Router (routing)

TanStack Query (data fetching)

Lucide Icons, shadcn/ui, Radix UI (UI components)

# Contribution Guidelines
Fork the repository and create a new branch for your feature or bugfix.

Follow the existing project structure for new components, pages, or utilities.

Document your code using JSDoc or TypeScript comments for clarity.

Write concise, meaningful commit messages.

Update documentation for any new features or changes.

Submit a pull request and request a review.

# Best Practices
Component Documentation:
Use JSDoc or TypeScript doc comments for all components, describing props, expected behavior, and usage examples.

Prop Types & Interfaces:
Clearly define and export prop types/interfaces for each component.

Examples & Demos:
Provide usage examples in comments or separate Markdown files for complex components.

Keep Documentation Up-to-Date:
Update docs with every code change to avoid drift.

Visual Aids:
Use diagrams or flowcharts for complex logic or data flow (tools: draw.io, Mermaid).

Accessibility:
Ensure all UI elements are accessible (ARIA labels, keyboard navigation).

Code Comments:
Use inline comments to explain non-obvious logic, but avoid cluttering the codebase.

# FAQ
Q: Where do I find component documentation?
A: Each component in src/components/ includes JSDoc or TypeScript comments. For complex components, see the docs/ folder (if present) or refer to the README.

Q: How do I add a new game or tool?
A: Create a new folder in src/games/ or src/components/, follow the project’s structure, document your code, and update the navigation if needed.

Q: How do I report bugs or request features?
A: Open an issue in the GitHub repository with clear steps to reproduce or a detailed feature description.

# Maintainers
Shaurya Mehta (author, maintainer)

# License
All rights reserved by Shaurya Mehta.
- Developer and creator of CosmoExplorer
- All code and design by Shaurya Mehta

## License

This project is proprietary and all rights are reserved by Shaurya Mehta.
