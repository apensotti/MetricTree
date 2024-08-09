"use client";
import React from 'react'
import { ArcherContainer, ArcherElement } from 'react-archer';

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

const Card = ({id, title, valueStart, valueEnd, change, end_month, start_month, year, children}: CardProps) => {
  return (
    <div className="flex flex-col items-center ">
        <div className="w-96 border border-white rounded-md">
          <p className="text-xl font-semibold p-4">{title}</p>
          <div className='border-t border-b border-white flex felx-col gap-6 justify-center'>
            <div className="flex flex-col p-3">
              <p className="text-xl font-semibold ">{valueStart}</p>
              <p className="text-xs pt-3 text-gray-400">{start_month + " " + year}</p>
            </div>
            <div className="flex flex-col p-3">
              <p className="text-xl font-semibold ">{valueEnd}</p>
              <p className="text-sm pt-3 text-gray-400">{end_month + " " + year}</p>
            </div>
            <div className="flex flex-col p-3">
              <p className={`text-xl font-semibold ${getChangeClass(change)}`}>{change}</p>
              <p className="text-sm pt-3 text-gray-400">Change</p>
            </div>
          </div>
          <div className=" flex justify-center">
            <p className="text-xl p-4">Spark Chart Here</p>
          </div>
        </div>
        {children && <div id='children' className='flex space-x-12 pt-64'>{children}</div>}
    </div>
  )
}

export default Card