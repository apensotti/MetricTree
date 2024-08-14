"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Background,
  Controls,
  Edge,
  EdgeTypes,
  ReactFlow,
  type Node,
  type NodeTypes,
} from "@xyflow/react";

import '@xyflow/react/dist/base.css';

import '../../tailwind.config'
import DataNode from "./DataNode";
import NodeArrow from "./NodeArrow";

import { generateMetricTreeData, generateMetricTreeConnections } from "../data/TreeTemplate";

const nodeTypes: NodeTypes = {
  data: DataNode,
};

const edgeTypes: EdgeTypes = {
  "custom-edge": NodeArrow, 
}

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    async function fetchData() {
        const data = await generateMetricTreeData();
        const edges = await generateMetricTreeConnections();
        setNodes(data);
        setEdges(edges);
    }
    fetchData();
  }, []);

  

  return (
  <ReactFlow nodes={nodes}
            nodeTypes={nodeTypes} 
            edges={edges}
            fitView 
            className="bg-slate-950">
    <Background/>
    <Controls className="bg-white"/>
  </ReactFlow>
  );
}
