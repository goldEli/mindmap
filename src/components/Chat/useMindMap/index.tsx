import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// import { data } from "../data";
import G6, { IEdge, INode, TreeGraph } from "@antv/g6";
import { createGraph } from "./createGraph";

export const useMindMap = (data) => {
  const ref = React.useRef(null);

  const graphRef = React.useRef<TreeGraph>(null);
  const [selectedItems, setSelectedItems] = React.useState<{
    nodes: INode[];
    edges: IEdge[];
  }>({
    nodes: [],
    edges: []
  });

  useEffect(() => {
    const container = ReactDOM.findDOMNode(ref.current) as HTMLElement;
    graphRef.current = createGraph(container as HTMLElement);
    const graph = graphRef.current;
    graph.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          position: "center"
        }
      };
    });

    graph.on("node:mouseenter", (evt) => {
      const { item } = evt;
      // console.log("mouseenter", item);
      graph.setItemState(item, "hover", true);
    });

    graph.on("node:mouseleave", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "hover", false);
    });
    graph.data(data);
    graph.render();
    graph.fitView();

    graph.on("node:click", (evt) => {});
    graph.on("nodeselectchange", (e) => {
      // console.log(e.selectedItems, e.select);
      setSelectedItems(e.selectedItems);
    });
  }, [data]);

  const getData = () => {
    return {
      nodes: graphRef.current?.save() || []
    };
  };
  const onDel = () => {
    if (!selectedItems.nodes.length) return;
    const node = selectedItems.nodes[0];
    const model = node.getModel();
    if (!model.children) {
      model.children = [];
    }
    graphRef.current?.removeChild(model.id);
  };
  const onAdd = () => {
    if (!selectedItems.nodes.length) return;
    const node = selectedItems.nodes[0];
    const model = node.getModel();
    if (!model.children) {
      model.children = [];
    }
    const id = `n-${Math.random()}`;
    model.children.push({
      id
    });
    graphRef.current?.updateChild(model, model.id);
  };

  return {
    ref,
    selectedItems,
    action: {
      onDel,
      onAdd,
      getData
    }
  };
};
