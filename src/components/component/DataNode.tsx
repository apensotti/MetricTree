"use client";

import React, {memo} from 'react'
import type {Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import SparkChart from './SparkChart';

export type DataNode = Node<{
  title: string,
  valueStart: string,
  valueEnd: string,
  change: string,
  start_month?: string,
  end_month: string,
  year: number
 }, 'data'>;

function getChangeClass(value: string) {
    return value && value.startsWith('-') ? 'text-red-600' : 'text-green-600';
}

const DataNode = ({id, data}: NodeProps<DataNode>) => {
  return (
    <>
    <div className='mb-2'>
      <Handle
          type="source"
          isConnectable={false}
          className='rounded-full'
          position={Position.Top}
          style={{ opacity: 100 }}>
      </Handle>
    </div>
    <div id={id} className="flex flex-col items-center bg-gray-950 text-white shadow-lg">
        <div className="border border-white rounded-md w-80">
          <p className="text-sm font-semibold pl-3 p-2">{data.title}</p>
          <div className='border-t border-b border-white flex felx-col gap-6 justify-center'>
            <div className="flex flex-col p-2">
              <p className="text-sm font-semibold ">{data.valueStart}</p>
              <p className="text-xs pt-1 text-gray-400">{data.start_month + " " + data.year}</p>
            </div>
            <div className="flex flex-col p-2">
              <p className="text-sm font-semibold ">{data.valueEnd}</p>
              <p className="text-xs pt-1 text-gray-400">{data.end_month + " " + data.year}</p>
            </div>
            <div className="flex flex-col p-2">
              <p className={`text-sm font-semibold ${getChangeClass(data.change)}`}>{data.change}</p>
              <p className="text-xs pt-1 text-gray-400">Change</p>
            </div>
          </div>
          <div className="flex w-auto">
            <SparkChart/>
          </div>
        </div>
    </div>
    <div className='mt-2'>
      <Handle
          type="target"
          className='rounded-full'
          isConnectable={false}
          position={Position.Bottom}
          style={{ opacity: 100 }}>
      </Handle>
    </div>
    </>
  )
}

export default DataNode;