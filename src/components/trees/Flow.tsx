"use client";

import React from "react";
import { useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable"; // Import Draggable

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

import { format, startOfWeek, endOfWeek, subDays, set } from "date-fns"
import { DateRange } from "react-day-picker"

import {parseData, extractUniqueValues ,generateMetricTreeConnections, generateMetricTreeData } from "../../data/parseData";

import FilterPanel2 from "../component/FilterPanel2";
import OperatorArrow from "../component/OperatorArrow";
import { TreeDataProps } from "@/data/props";

const nodeTypes: NodeTypes = {
  data: DataNode,
};

const edgeTypes: EdgeTypes = {
  "custom-edge": OperatorArrow, 
  "custom-edge2": NodeArrow
}

export default function Flow() {
  const initialDateRange = {
    from: new Date("2024-08-02"),
    to: new Date("2024-08-16"),
  };

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [range, setDateRange] = React.useState<DateRange | undefined>({
    from: initialDateRange.from,
    to: initialDateRange.to,
  })

  const [market, setMarket] = React.useState<string[]>([])
  const [channel, setChannel] = React.useState<string[]>([])
  const [strategy, setStrategy] = React.useState<string[]>([])
  const [platform, setPlatform] = React.useState<string[]>([])
  const [channelType, setChannelType] = React.useState<string[]>([])

  const [data, setData] = useState<TreeDataProps>({} as TreeDataProps);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function initializeFilters() {
      const uniqueValues = await extractUniqueValues();

      if (!initialized) {
        setMarket(uniqueValues.market.map((option) => option.value));
        setChannel(uniqueValues.channel.map((option) => option.value));
        setStrategy(uniqueValues.strategy.map((option) => option.value));
        setPlatform(uniqueValues.platform.map((option) => option.value));
        setChannelType(uniqueValues.channel_type.map((option) => option.value));
        setInitialized(true);
      }

      if (range?.from && range?.to) {
        const data = await parseData(
          range.from,
          range.to,
          market.length === 0 ? uniqueValues.market.map((option) => option.value) : market,
          channel.length === 0 ? uniqueValues.channel.map((option) => option.value) : channel,
          strategy.length === 0 ? uniqueValues.strategy.map((option) => option.value) : strategy,
          platform.length === 0 ? uniqueValues.platform.map((option) => option.value) : platform,
          channelType.length === 0 ? uniqueValues.channel_type.map((option) => option.value) : channelType
        );

        const nodes = await generateMetricTreeData(data);
        const edges = await generateMetricTreeConnections(data);
        
        setNodes(nodes);
        setEdges(edges);
        setData(data);
      }
    }

    initializeFilters();
  }, [range, initialized, market, channel, strategy, platform, channelType]);

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
          <FilterPanel2 
            setDateRange={setDateRange} 
            range={range}
            setMarket={setMarket}
            market={market}
            setChannel={setChannel}
            channel={channel}
            setStrategy={setStrategy}
            strategy={strategy}
            setPlatform={setPlatform}
            platform={platform}
            setChannelType={setChannelType}
            channelType={channelType}
            data={data}
          />
    </Panel>
      <Background gap={60} size={1.5}/>
      <Controls className="bg-white"/>
    </ReactFlow>
    </>
  );
}
