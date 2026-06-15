**Repository Structure Analysis and Visualization System**
Overview

The Repository Structure Analysis and Visualization System is an AI-powered software architecture exploration tool that helps developers understand complex repositories through interactive dependency visualization and automated code summarization.

The system scans a repository of Jupyter notebooks, extracts dependencies, builds a visual dependency graph, calculates repository metrics, and uses Google Gemini AI to generate natural-language explanations of notebook functionality.

Features
Repository Scanning
Automatically discovers Jupyter Notebook files (.ipynb)
Traverses local repositories
Collects notebook metadata
Dependency Analysis
Extracts imported libraries and packages
Builds notebook-to-dependency relationships
Creates a complete dependency graph
Interactive Visualization
Built using React Flow
Draggable nodes
Zoomable and pannable canvas
Color-coded node categories
Repository Metrics
Lines of Code (LoC) calculation
Repository complexity analysis
Dependency density calculation
Top dependency identification
AI-Powered Code Understanding
Google Gemini integration
Notebook content analysis
Automatic plain-English summaries
Instant understanding of unfamiliar code
Search and Exploration
Search nodes by name
Highlight repository components
Explore dependency relationships interactively
Export Functionality
Export repository analysis results
JSON-based graph export
System Architecture
Repository Structure Analysis and Visualization System

├── Backend
│   ├── scanner.py
│   ├── parser.py
│   ├── graph_builder.py
│   ├── ai_service.py
│   └── main.py
│
├── Frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
Tech Stack
Frontend
React
React Flow
Axios
Vite
Backend
Python
FastAPI
Uvicorn
nbformat
Artificial Intelligence
Google Gemini API
Workflow
The backend scans a local repository.
Notebook files are identified and parsed.
Dependencies are extracted from notebook imports.
A graph structure is generated.
FastAPI exposes graph data through REST APIs.
React Flow visualizes the repository structure.
Users click notebook nodes to inspect details.
Google Gemini generates AI-powered notebook summaries.
Results are displayed in the dashboard.
Key Capabilities
Visual repository exploration
Dependency relationship mapping
AI-based code explanation
Repository health assessment
Software architecture understanding
Interactive graph navigation
Example Metrics Generated
Total Notebooks
Total Dependencies
Total Connections
Repository Complexity
Dependency Density
Most Frequently Used Libraries
Installation
Backend
cd Backend

pip install -r requirements.txt

uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000
Frontend
cd Frontend

npm install

npm run dev

Frontend runs at:

http://localhost:5173
API Endpoints
Analyze Repository
GET /analyze

Returns repository graph data:

{
  "nodes": [],
  "edges": []
}
Generate AI Summary
GET /explain?file_path=<path>

Returns:

{
  "summary": "AI-generated notebook explanation"
}
Applications
Software architecture visualization
Repository onboarding
Machine learning project exploration
Dependency auditing
Educational code analysis
Documentation assistance
Future Enhancements
Support for Python (.py) files
GitHub repository analysis
Repository-wide AI summaries
PDF report generation
Dependency impact analysis
Docker deployment
Author

Akul Katta

Developed as an AI-powered repository analysis and visualization platform using FastAPI, React Flow, and Google Gemini AI.

License

This project is intended for educational, research, and software analysis purposes.
