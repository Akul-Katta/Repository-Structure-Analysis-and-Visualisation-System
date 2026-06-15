from scanner import scan_repository
from parser import get_file_metadata
from parser import extract_imports_from_notebook


def generate_summary(notebook_name, imports):

    if len(imports) == 0:
        return (
            "This notebook contains code but no external "
            "dependencies were detected."
        )

    top_imports = ", ".join(imports[:5])

    activity = []

    if any("pandas" in x or "numpy" in x for x in imports):
        activity.append("data processing")

    if any("sklearn" in x for x in imports):
        activity.append("machine learning")

    if any("xgboost" in x or "catboost" in x for x in imports):
        activity.append("boosting models")

    if any(
        "matplotlib" in x or "seaborn" in x
        for x in imports
    ):
        activity.append("visualization")

    if len(activity) == 0:
        activity.append("general analysis")

    return (
        f"This notebook uses {top_imports}. "
        f"It appears to focus on "
        f"{', '.join(activity)}."
    )

def build_graph(repo_path):

    nodes = []
    edges = []

    files = scan_repository(repo_path)

    dependency_nodes = set()

    for file in files:

        metadata = get_file_metadata(file)

        imports = extract_imports_from_notebook(file)

        metadata["summary"] = generate_summary(
            metadata["id"],
            imports
        )

        nodes.append(metadata)

        for imp in imports:

            dependency_nodes.add(imp)

            edges.append({
                "source": metadata["id"],
                "target": imp
            })

    for dep in dependency_nodes:

        nodes.append({
            "id": dep,
            "type": "dependency",
            "loc": 0,
            "summary": None
        })

    return {
        "nodes": nodes,
        "edges": edges
    }


if __name__ == "__main__":

    repo = input("Repository path: ")

    graph = build_graph(repo)

    print("\nNODES\n")

    for node in graph["nodes"]:
        print(node)

    print("\nEDGES\n")

    for edge in graph["edges"]:
        print(edge)