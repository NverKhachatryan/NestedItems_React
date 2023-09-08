const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = function (tree, nodeId) {
    const filterItems = (items) => {
      return items.filter((item) => item.id !== nodeId);
    };

    if (tree.id === nodeId) {
      return null;
    }

    let updatedItems = tree.items.map((item) => deleteNode(item, nodeId));

    updatedItems = filterItems(updatedItems);

    return { ...tree, items: updatedItems };
  };

  const renameNode = function (tree, nodeId, newName) {
    if (tree.id === nodeId) {
      return { ...tree, name: newName };
    }

    let updatedItems = tree.items.map((item) =>
      renameNode(item, nodeId, newName)
    );

    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
