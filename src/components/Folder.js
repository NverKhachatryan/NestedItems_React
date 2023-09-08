import React from "react";
import { useDispatch } from "react-redux";
import {addFile, deleteFile, renameFile} from "../features/fileSlice"

function Folder({ explorer }) {
  const dispatch = useDispatch();

  const [expand, setExpand] = React.useState(false);
  const [showInput, setShowInput] = React.useState({
    visible: false,
    isFolder: false,
  });
  const [renameInput, setRenameInput] = React.useState(explorer.name);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // Dispatch an action to add a new folder/file
      // Note: Replace 'addFile' with your Redux action creator
      dispatch(addFile({ id: Date.now(), text: e.target.value }));
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onRenameFolder = () => {
    // Dispatch an action to rename the folder/file
    // Note: Replace 'renameFile' with your Redux action creator
    dispatch(renameFile({ id: explorer.id, text: renameInput }));
    setShowInput({ ...showInput, visible: false });
  };

  const onCancelRename = () => {
    setRenameInput(explorer.name);
    setShowInput({ ...showInput, visible: false });
  };

  const onDeleteFolder = () => {
    // Dispatch an action to delete the folder/file
    // Note: Replace 'deleteFile' with your Redux action creator
    dispatch(deleteFile(explorer.id));
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            <button onClick={onDeleteFolder}>Delete</button>
            {showInput.visible ? (
              <>
                <button onClick={onRenameFolder}>Save</button>
                <button onClick={onCancelRename}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setShowInput({ visible: true, isFolder: true })}>Rename</button>
            )}
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              {showInput.isFolder ? (
                <input
                  type="text"
                  className="inputContainer__input"
                  autoFocus
                  onKeyDown={onAddFolder}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
              ) : (
                <input
                  type="text"
                  className="inputContainer__input"
                  autoFocus
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      onRenameFolder();
                    }
                  }}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
              )}
            </div>
          )}

          {explorer.items.map((exp) => {
            return <Folder key={exp.id} explorer={exp} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}

export default Folder;
