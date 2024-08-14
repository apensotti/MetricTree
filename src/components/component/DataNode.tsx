"use client";

import React, {memo} from 'react'
import type {Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

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
    <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0 }}>
    </Handle>
    <div id={id} className="flex flex-col items-center bg-gray-950 text-white shadow-lg">
        <div className="border border-white rounded-md w-80">
          <p className="text-sm font-semibold p-3">{data.title}</p>
          <div className='border-t border-b border-white flex felx-col gap-6 justify-center'>
            <div className="flex flex-col p-2">
              <p className="text-sm font-semibold ">{data.valueStart}</p>
              <p className="text-xs pt-2 text-gray-400">{data.start_month + " " + data.year}</p>
            </div>
            <div className="flex flex-col p-2">
              <p className="text-sm font-semibold ">{data.valueEnd}</p>
              <p className="text-xs pt-2 text-gray-400">{data.end_month + " " + data.year}</p>
            </div>
            <div className="flex flex-col p-2">
              <p className={`text-sm font-semibold ${getChangeClass(data.change)}`}>{data.change}</p>
              <p className="text-xs pt-2 text-gray-400">Change</p>
            </div>
          </div>
          <div className=" flex justify-center">
            <p className="text-md p-2">Spark Chart Here</p>
          </div>
        </div>
    </div>
    <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}>
    </Handle>
    </>
  )
}

export default memo(DataNode);