"use client";

import { useEffect, useState, useCallback } from "react"

import Link from "next/link";

import {
  Background,
  Controls,
  Edge,
  EdgeTypes,
  Panel,
  ReactFlow,
  type Node,
  type NodeTypes,
} from "@xyflow/react";

import '@xyflow/react/dist/base.css'

import '../../../tailwind.config'
import DataNode from "../component/DataNode"
import NodeArrow from "../component/NodeArrow"

import { generateMetricTreeData, generateMetricTreeConnections } from "../../data/TreeTemplate";

import { Button } from "../ui/button";
import { CheckboxDropdown } from "../ui/CheckboxDropdown";

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
    <>    
    <ReactFlow nodes={nodes}
              nodeTypes={nodeTypes} 
              edges={edges}
              fitView 
              maxZoom={5}
              minZoom={.1}
              className="bg-gray-950">
      <Panel position="top-right">
        <div className='w-72 border border-gray-800 rounded-sm backdrop-blur-md bg-slate/30 p-2'>
          <div>
            <CheckboxDropdown/>
          </div>
        </div>
      </Panel>
      <Background gap={60} size={1.5}/>
      <Controls className="bg-white"/>
    </ReactFlow>
    </>
  );
}
