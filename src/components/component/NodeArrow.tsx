import { BaseEdge, EdgeLabelRenderer, getStraightPath, type EdgeProps, Edge, getBezierPath, getSimpleBezierPath } from '@xyflow/react';
import { formatNumber } from '@/data/parseData';
import React, { FC } from 'react';


const NodeArrow: FC<EdgeProps<Edge<{ label: string }>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) => {

  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  function getChangeClass(value: string | undefined) {
    if (value === "$0.00" || value === "0.00") {
        return '#4b5563';
    }
    return value && value.startsWith('-') ? '#dc2626' : '#16a34a';
  }

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ strokeDasharray: '5,5' }}/>
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${(sourceX + targetX) / 2}px,${(sourceY + targetY) / 2}px)`,
            background: '#030712',
            color: getChangeClass(data?.label),
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {data?.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default NodeArrow;