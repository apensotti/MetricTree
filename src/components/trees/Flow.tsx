"use client";

import React from "react";
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

import { format, startOfWeek, endOfWeek, subDays } from "date-fns"
import { DateRange } from "react-day-picker"

import {parseData, generateMetricTreeConnections, generateMetricTreeData } from "../../data/parseData";

import FilterPanel from "../component/FilterPanel1";
import FilterPanel2 from "../component/FilterPanel2";
import { parse } from "path";
import OperatorArrow from "../component/OperatorArrow";

const nodeTypes: NodeTypes = {
  data: DataNode,
};

const edgeTypes: EdgeTypes = {
  "custom-edge": OperatorArrow, 
  "custom-edge2": NodeArrow
}

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [market, setMarket] = React.useState<string[]>([])
  const [channel, setChannel] = React.useState<string[]>([])
  const [strategy, setStrategy] = React.useState<string[]>([])
  const [platform, setPlatform] = React.useState<string[]>([])
  const [channelType, setChannelType] = React.useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      if (date?.from && date?.to) {
        const data = await parseData(date.from, date.to, market, channel, strategy, platform, channelType);
        const nodes = await generateMetricTreeData(data);
        const edges = await generateMetricTreeConnections(data);
        setNodes(nodes);
        setEdges(edges);
    }}
    fetchData();
  }, [date, market, channel, strategy, platform, channelType]);

  return (
    <>
    <ReactFlow nodes={nodes}
              nodeTypes={nodeTypes} 
              edges={edges}
              edgeTypes={edgeTypes}
              fitView 
              maxZoom={5}
              minZoom={.1}
              className="bg-gray-950">
      <Panel position="top-right">
        <FilterPanel2 setDateRange={setDate} 
                      date={date}
                      setMarket={setMarket}
                      market={market}
                      setChannel={setChannel}
                      channel={channel}
                      setStrategy={setStrategy}
                      strategy={strategy}
                      setPlatform={setPlatform}
                      platform={platform}
                      setChannelType={setChannelType}
                      channelType={channelType}/>
      </Panel>
      <Background gap={60} size={1.5}/>
      <Controls className="bg-white"/>
    </ReactFlow>
    </>
  );
}
