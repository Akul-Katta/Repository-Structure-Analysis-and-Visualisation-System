from pathlib import Path
from parser import get_file_metadata


def scan_repository(repo_path):
    files = []

    for file in Path(repo_path).rglob("*"):
      if file.suffix in [".py", ".ipynb"]:
        files.append(str(file))

    return files


if __name__ == "__main__":
    repo = input("Enter repository path: ")

    files = scan_repository(repo)

    print(f"\nFound {len(files)} Python files:\n")

    for file in files:
      print(get_file_metadata(file))