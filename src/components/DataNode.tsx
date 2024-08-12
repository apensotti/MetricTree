"use client";

import React, {memo} from 'react'
import type { Node, NodeProps } from '@xyflow/react';

export type DataNode = Node<{
  title: string,
  valueStart: string,
  valueEnd: string,
  change: string,
  start_month?: string,
  end_month: string,
  year: number
 }, 'data'>;

export interface CardProps {
    id: number;
    title: string;
    valueStart: string;
    valueEnd: string;
    change: string;
    start_month?: string;
    end_month: string;
    year: number;
    children?: React.ReactNode;
}

function getChangeClass(value: string) {
    return value && value.startsWith('-') ? 'text-red-800' : 'text-green-800';
}

const DataNode = ({data}: NodeProps<DataNode>) => {
  return (
    <div className="flex flex-col items-center bg-slate-950 text-white">
        <div className="w-96 border border-white rounded-md">
          <p className="text-xl font-semibold p-4">{data.title}</p>
          <div className='border-t border-b border-white flex felx-col gap-6 justify-center'>
            <div className="flex flex-col p-3">
              <p className="text-xl font-semibold ">{data.valueStart}</p>
              <p className="text-xs pt-3 text-gray-400">{data.start_month + " " + data.year}</p>
            </div>
            <div className="flex flex-col p-3">
              <p className="text-xl font-semibold ">{data.valueEnd}</p>
              <p className="text-sm pt-3 text-gray-400">{data.end_month + " " + data.year}</p>
            </div>
            <div className="flex flex-col p-3">
              <p className={`text-xl font-semibold ${getChangeClass(data.change)}`}>{data.change}</p>
              <p className="text-sm pt-3 text-gray-400">Change</p>
            </div>
          </div>
          <div className=" flex justify-center">
            <p className="text-xl p-4">Spark Chart Here</p>
          </div>
        </div>
    </div>
  )
}

export default memo(DataNode);