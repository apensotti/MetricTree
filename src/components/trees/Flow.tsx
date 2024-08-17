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

import { getMetricTreeData, generateMetricTreeConnections } from "../../data/TreeTemplate";

import FilterPanel from "../component/FilterPanel";

const nodeTypes: NodeTypes = {
  data: DataNode,
};

const edgeTypes: EdgeTypes = {
  "custom-edge": NodeArrow, 
}

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    async function fetchData() {
      if (startDate && endDate) {
        const nodes = await getMetricTreeData(startDate, endDate);
        const edges = await generateMetricTreeConnections();
        setNodes(nodes);
        setEdges(edges);
    }}
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
        <FilterPanel setStartDate={setStartDate} setEndDate={setEndDate}/>
      </Panel>
      <Background gap={60} size={1.5}/>
      <Controls className="bg-white"/>
    </ReactFlow>
    </>
  );
}
