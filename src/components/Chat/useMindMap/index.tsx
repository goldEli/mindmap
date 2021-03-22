import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// import { data } from "../data";
import G6, { IEdge, INode, TreeGraph } from "@antv/g6";

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

    graph.data(data);
    graph.render();
    graph.fitView();

    graph.on("node:mouseenter", (evt) => {
      const { item } = evt;
      // console.log("mouseenter", item);
      graph.setItemState(item, "hover", true);
    });

    graph.on("node:mouseleave", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "hover", false);
    });

    graph.on("node:click", (evt) => {});
    graph.on("nodeselectchange", (e) => {
      // console.log(e.selectedItems, e.select);
      setSelectedItems(e.selectedItems);
    });
  }, [data]);

  const getData = () => {
    const { nodes = [], edges = [] } = graphRef?.current?.cfg;

    return {
      nodes: graphRef?.current?.cfg?.nodes || [],
      edges: graphRef?.current?.cfg?.edges || []
    };
  };
  const onDel = () => {};
  const onAdd = () => {};

  return {
    ref,
    graphRef,
    action: {
      onDel,
      onAdd,
      getData
    }
  };
};

function createGraph(container: HTMLElement) {
  const width = 1200;
  const height = 600;

  const defaultLabelCfg = {
    style: {
      fill: "#000",
      fontSize: 12
    }
  };

  const defaultStateStyles = {
    selected: {
      fill: "#91d5ff",
      stroke: "#1890ff",
      lineWidth: 2
    },
    hover: {
      stroke: "#1890ff",
      lineWidth: 2
    }
  };

  const defaultNodeStyle = {
    fill: "#91d5ff",
    stroke: "#40a9ff",
    radius: 5
  };

  const defaultEdgeStyle = {
    stroke: "#91d5ff"
  };

  const defaultLayout = {
    type: "compactBox",
    direction: "LR",
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 40;
    },
    getHGap: function getHGap() {
      return 70;
    }
  };

  const graph = new G6.TreeGraph({
    container: container,
    width,
    height,
    modes: {
      default: ["drag-canvas", "zoom-canvas", "click-select"]
    },
    defaultNode: {
      label: "rect",
      type: "rect",
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg
    },
    defaultEdge: {
      type: "cubic-horizontal",
      style: defaultEdgeStyle
    },
    nodeStateStyles: defaultStateStyles,
    edgeStateStyles: defaultStateStyles,
    layout: defaultLayout
  });
  // Register a custom behavior: click two end nodes to add an edge

  return graph;
}
