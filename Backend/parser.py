from pathlib import Path
import json


def count_lines_in_notebook(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            notebook = json.load(f)

        lines = 0

        for cell in notebook.get("cells", []):
            if cell.get("cell_type") == "code":
                lines += len(cell.get("source", []))

        return lines

    except Exception:
        return 0


def get_file_metadata(file_path):

    file = Path(file_path)

    return {
        "id": file.name,
        "path": str(file),
        "type": file.suffix,
        "loc": count_lines_in_notebook(file_path)
    }


def extract_imports_from_notebook(file_path):
    import json
    import re

    imports = set()

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            notebook = json.load(f)

        for cell in notebook.get("cells", []):

            if cell.get("cell_type") != "code":
                continue

            source = "".join(cell.get("source", []))

            lines = source.split("\n")

            for line in lines:

                line = line.strip()

                if line.startswith("import "):

                    modules = line.replace("import ", "").split(",")

                    for module in modules:
                        imports.add(
                            module.strip().split(" ")[0]
                        )

                elif line.startswith("from "):

                    module = line.split()[1]
                    imports.add(module)

        return list(imports)

    except Exception as e:
        print(e)
        return []
    

if __name__ == "__main__":

    path = input("Notebook path: ")

    imports = extract_imports_from_notebook(path)

    print("\nImports Found:\n")

    for imp in imports:
        print(imp)