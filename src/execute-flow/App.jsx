import { useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, useReactFlow, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };

let nodeId = 0;

function Flow() {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes] = useNodesState(defaultNodes);

  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, [reactFlowInstance]);

  const computeResult = (nodes, edges) => {
    return 1;
  };

  const onExecute = useCallback(() => {
    const nodes = reactFlowInstance.getNodes();
    const edges = reactFlowInstance.getEdges();
    
    // Add your execution logic here based on nodes and edges
    console.log('Executing flow with nodes:', nodes);
    console.log('Executing flow with edges:', edges);

    // Compute result using static method
    const result = computeResult(nodes, edges);
    console.log('Computed result:', result);

    // Update the output node with the result
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.label.startsWith('Output')) {
          return {
            ...node,
            data: {
              ...node.data,
              label: `Output: ${result}`,
            },
          };
        }
        return node;
      })
    );
  }, [reactFlowInstance, setNodes]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        fitView
        style={{
          backgroundColor: '#D3D2E5',
        }}
        connectionLineStyle={connectionLineStyle}
      />
      <button onClick={onClick} className="btn-add">
        add node
      </button>
      <button onClick={onExecute} className="btn-execute">
        execute flow
      </button>
    </>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}