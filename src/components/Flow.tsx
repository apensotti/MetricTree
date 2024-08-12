"use client";

import { useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  useNodesState,
  type Node,
  type NodeTypes,
} from "@xyflow/react";

import '@xyflow/react/dist/base.css';

import '../../tailwind.config.ts'
import DataNode from "./DataNode";

const nodeTypes: NodeTypes = {
  data: DataNode,
};

const initialNodes: Node[] = [
  { id: '1',
    type: 'data',
    data: { title: 'Node 1', valueStart: '100', valueEnd: '200', change: '100', start_month: 'Jan', end_month: 'Feb', year: 2022 }, 
    position: { x: 5, y: 5 } 
  },
  { id: '2', 
    type: 'data',
    data: { title: 'Node 1', valueStart: '100', valueEnd: '200', change: '100', start_month: 'Jan', end_month: 'Feb', year: 2022 }, 
    position: { x: 5, y: 300 } 
  },
];

export default function Flow() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);

    return (
    <ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView className="bg-slate-950">
      <Background/>
      <Controls/>
    </ReactFlow>
  );
}
