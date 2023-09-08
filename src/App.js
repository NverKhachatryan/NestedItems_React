import { useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";
import explorer from "./data/folderData";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    // Use the insertNode function to add a new node
    const updatedExplorerData = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(updatedExplorerData);
  };

  const handleDeleteNode = (nodeId) => {
    // Use the deleteNode function to remove a node
    const updatedExplorerData = deleteNode(explorerData, nodeId);
    setExplorerData(updatedExplorerData);
  };

  const handleRenameNode = (nodeId, newName) => {
    // Use the renameNode function to rename a node
    const updatedExplorerData = renameNode(explorerData, nodeId, newName);
    setExplorerData(updatedExplorerData);
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
        explorer={explorerData}
      />
    </div>
  );
}
