# AI-Powered Repository Dependency Analyzer

## Overview

The AI-Powered Repository Dependency Analyzer is a full-stack application that helps developers understand complex repositories through dependency visualization, repository metrics, and AI-generated code explanations.

The system scans Jupyter notebooks, extracts dependencies, builds an interactive graph, calculates repository statistics, and uses Google Gemini AI to generate natural-language summaries of notebook functionality.

---

## Features

### Repository Scanning
- Automatically discovers Jupyter Notebook (`.ipynb`) files
- Traverses local repositories
- Collects notebook metadata

### Dependency Analysis
- Extracts imported libraries and packages
- Builds notebook-to-dependency relationships
- Generates a complete dependency graph

### Interactive Visualization
- Built using React Flow
- Draggable nodes
- Zoomable and pannable canvas
- Color-coded node categories

### Repository Metrics
- Lines of Code (LoC) calculation
- Repository complexity analysis
- Dependency density calculation
- Top dependency identification

### AI-Powered Code Understanding
- Google Gemini integration
- Notebook content analysis
- Plain-English notebook summaries
- Faster understanding of unfamiliar code

### Search and Exploration
- Search nodes by name
- Explore dependency relationships
- Interactive graph navigation

### Export Functionality
- Export repository analysis results
- JSON graph export

---

## System Architecture

```text
Repository Dependency Analyzer
│
├── Backend
│   ├── scanner.py
│   ├── parser.py
│   ├── graph_builder.py
│   ├── ai_service.py
│   └── main.py
│
├── Frontend
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

## Tech Stack

### Frontend
- React
- React Flow
- Axios
- Vite

### Backend
- Python
- FastAPI
- Uvicorn
- nbformat

### AI Integration
- Google Gemini API

---

## Workflow

1. Scan a local repository.
2. Parse notebook files.
3. Extract imported libraries and dependencies.
4. Generate a dependency graph.
5. Serve graph data through FastAPI.
6. Visualize the graph using React Flow.
7. Click a notebook node to inspect details.
8. Generate AI-powered notebook summaries using Gemini.
9. Display results in the dashboard.

---

## Repository Metrics

The system automatically generates:

- Total Notebooks
- Total Dependencies
- Total Connections
- Repository Complexity
- Dependency Density
- Top Dependencies

---

## Installation

### Backend Setup

```bash
cd Backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoints

### Analyze Repository

```http
GET /analyze
```

Example Response:

```json
{
  "nodes": [],
  "edges": []
}
```

### Generate AI Summary

```http
GET /explain?file_path=<path>
```

Example Response:

```json
{
  "summary": "AI-generated notebook explanation"
}
```

---

## Applications

- Software Architecture Visualization
- Repository Onboarding
- Dependency Auditing
- Educational Code Analysis
- Machine Learning Project Exploration
- Documentation Assistance

---

## Future Enhancements

- Support for Python (`.py`) files
- GitHub Repository Analysis
- Repository-wide AI Summaries
- PDF Report Generation
- Dependency Impact Analysis
- Docker Deployment

---

## Screenshots

Add screenshots of:

1. Dependency Graph
2. Repository Health Dashboard
3. AI Summary Generation
4. Search Functionality
5. Export Feature

---

## Author

**Akul Katta**

Developed using FastAPI, React Flow, and Google Gemini AI.

---

## License

This project is intended for educational and research purposes.
