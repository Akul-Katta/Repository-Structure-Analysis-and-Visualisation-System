from fastapi import FastAPI
from graph_builder import build_graph
from fastapi.middleware.cors import CORSMiddleware

from ai_service import explain_code
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Repository Analyzer API Running"}


@app.get("/analyze")
def analyze():

    repo_path = r"C:\Users\akulk\OneDrive\Desktop\OP\SOCBIZ"

    return build_graph(repo_path)


# ADD THIS ENTIRE BLOCK HERE

@app.get("/explain")
def explain(file_path: str):

    try:

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as f:

            code = f.read()

        summary = explain_code(code)

        return {
            "summary": summary
        }

    except Exception as e:

        return {
            "error": str(e)
        }
