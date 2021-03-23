import G6 from "@antv/g6";

export function createGraph(container: HTMLElement) {
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
