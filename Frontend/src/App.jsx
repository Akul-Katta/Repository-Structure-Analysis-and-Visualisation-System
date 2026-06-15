import { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

function getNodeColor(node) {
  if (node.type === ".ipynb") {
    return "#90caf9";
  }

  const id = node.id.toLowerCase();

  if (
    id.includes("sklearn") ||
    id.includes("xgboost") ||
    id.includes("catboost") ||
    id.includes("lightgbm")
  ) {
    return "#ffb74d";
  }

  if (
    id.includes("numpy") ||
    id.includes("pandas")
  ) {
    return "#81c784";
  }

  if (
    id.includes("matplotlib") ||
    id.includes("seaborn")
  ) {
    return "#ba68c8";
  }

  return "#bdbdbd";
}

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const [dependencies, setDependencies] = useState([]);
  const [incomingNodes, setIncomingNodes] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/analyze")
      .then((res) => {
        const filteredNodes =
          searchText.trim() === ""
            ? res.data.nodes
            : res.data.nodes.filter((node) =>
                node.id
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );

        const apiNodes = filteredNodes.map((node, index) => ({
          id: node.id,

          data: {
            label: node.id,
            details: node,
          },

          position: {
            x: (index % 5) * 250,
            y: Math.floor(index / 5) * 180,
          },

          style: {
            background: getNodeColor(node),
            border: "1px solid #333",
            color: "black",
          },
        }));

        const filteredNodeIds = new Set(
          filteredNodes.map((n) => n.id)
        );

        const apiEdges = res.data.edges
          .filter(
            (edge) =>
              filteredNodeIds.has(edge.source) &&
              filteredNodeIds.has(edge.target)
          )
          .map((edge, index) => ({
            id: `e${index}`,
            source: edge.source,
            target: edge.target,
          }));

        setNodes(apiNodes);
        setEdges(apiEdges);
      })
      .catch((err) => console.error(err));
  }, [searchText]);

  useEffect(() => {
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        style: {
          ...n.style,
          border:
            n.id === selectedNodeId
              ? "3px solid yellow"
              : "1px solid #333",
        },
      }))
    );
  }, [selectedNodeId]);

  const notebookCount = nodes.filter(
    (n) => n.data.details.type === ".ipynb"
  ).length;

  const dependencyCount = nodes.filter(
    (n) => n.data.details.type === "dependency"
  ).length;

  const edgeCount = edges.length;

  const dependencyFrequency = {};

edges.forEach((edge) => {
  dependencyFrequency[edge.target] =
    (dependencyFrequency[edge.target] || 0) + 1;
});

const topDependencies =
  Object.entries(dependencyFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* GRAPH AREA */}

      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {/* SEARCH */}

        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 10,
            background: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          }}
        >
          <input
            type="text"
            placeholder="Search node..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            style={{
              padding: "8px",
              width: "200px",
            }}
          />
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodeClick={(event, node) => {

  setSelectedNode(node.data.details);
  setSelectedNodeId(node.id);

  setAiSummary("Generating AI summary...");

  console.log("Clicked node:");
  console.log(node.data.details);

  if (
    node.data.details.type === ".ipynb" &&
    node.data.details.path
  ) {
    axios
      .get(
        "http://127.0.0.1:8000/explain",
        {
          params: {
            file_path: node.data.details.path,
          },
        }
      )
      .then((res) => {
        console.log("Gemini Response:");
        console.log(res.data);

        setAiSummary(
          res.data.summary ||
          "No AI summary returned."
        );
      })
      .catch((err) => {
        console.error(err);

        setAiSummary(
          "Failed to generate AI summary."
        );
      });
  } else {
    setAiSummary(
      "AI summaries are available only for notebooks."
    );
  }

  const deps = edges
    .filter((e) => e.source === node.id)
    .map((e) => e.target);

  setDependencies(deps);

  const incoming = edges
    .filter((e) => e.target === node.id)
    .map((e) => e.source);

  setIncomingNodes(incoming);
}}
        />
      </div>

      {/* SIDEBAR */}

      <div
        style={{
          width: "320px",
          padding: "15px",
          borderLeft: "1px solid gray",
          overflowY: "auto",
          backgroundColor: "#0f172a",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Repository Analyzer
        </h2>
        <button
  onClick={() => {
    const data = {
      nodes,
      edges,
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download =
      "repository-analysis.json";

    a.click();
  }}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Export Analysis
</button>

        <p style={{ textAlign: "center" }}>
          {nodes.length} Nodes • {edgeCount} Connections
        </p>

        {/* REPOSITORY STATS */}

        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        >
          <h3>Repository Stats</h3>

          <p>📓 Notebooks: {notebookCount}</p>
          <p>📦 Dependencies: {dependencyCount}</p>
          <p>🔗 Connections: {edgeCount}</p>
          <hr />

<h3>Repository Health</h3>

<p>
  Complexity:
  {edgeCount > 40
    ? " High"
    : edgeCount > 20
    ? " Medium"
    : " Low"}
</p>

<p>
Dependency Density:{" "}
{(edgeCount / notebookCount).toFixed(1)}
</p>
<hr />

  <h3>Top Dependencies</h3>

  <ul>
    {topDependencies.map(([name, count]) => (
      <li key={name}>
        {name} ({count})
      </li>
    ))}
  </ul>

        </div>

        {/* LEGEND */}

        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid gray",
            borderRadius: "8px",
          }}
        >
          <h3>Legend</h3>

          <p>🟦 Notebook</p>
          <p>🟧 ML Libraries</p>
          <p>🟩 Data Libraries</p>
          <p>🟪 Visualization Libraries</p>
          <p>⬜ Other Libraries</p>
        </div>

        {/* NODE DETAILS */}

        {selectedNode ? (
          <>
            <h3>Node Details</h3>

            <p>
              <b>Name:</b> {selectedNode.id}
            </p>

            <p>
              <b>Type:</b> {selectedNode.type}
            </p>

            <p>
              <b>LOC:</b> {selectedNode.loc}
            </p>

            <p>
              <b>Path:</b>
            </p>

            <small
              style={{
                wordBreak: "break-all",
              }}
            >
              {selectedNode.path}
            </small>

            <hr />

<h3>AI Summary</h3>

<p
  style={{
    lineHeight: "1.6",
    color: "#cbd5e1"
  }}
>
  {aiSummary ||
  "Click a notebook to generate AI summary"}
</p>

            <hr />

            <h3>
              Dependencies ({dependencies.length})
            </h3>

            <ul>
              {dependencies.map((dep) => (
                <li key={dep}>{dep}</li>
              ))}
            </ul>

            <hr />

            <h3>
              Used By ({incomingNodes.length})
            </h3>

            <ul>
              {incomingNodes.map((node) => (
                <li key={node}>{node}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Click a node to view details.</p>
        )}
      </div>
    </div>
  );
}

export default App;