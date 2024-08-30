import React, { useEffect, useState } from "react";
import * as G6 from "@antv/g6";
import { useRenderData } from "streamlit-component-lib-react-hooks";
import { Streamlit } from "streamlit-component-lib"


const GraphComponent = () => {
    const renderData = useRenderData();
    const [data, setData] = useState({ nodes: [], edges: [] });

    useEffect(() => {
        // Check if renderData contains data
        if (renderData && renderData.args && renderData.args["data"]) {
            setData(renderData.args["data"]);
        }
    }, [renderData]);

    useEffect(() => {
        // Check if the container is available
        const container = document.getElementById('container');
        if (!container) {
            console.error('Container element not found');
            return;
        }

        // Initialize G6 graph
        const graph = new G6.Graph({
            container: 'container',
            width: container.clientWidth,
            height: container.clientHeight,
            layout: {
                type: 'force',
                preventOverlap: true,
                linkDistance: 150,  // Adjust distance between nodes
                nodeStrength: -30,  // Adjust the strength of node repulsion
                edgeStrength: 0.5,  // Adjust edge strength
            },
            defaultNode: {
                size: 20,
                style: {
                    lineWidth: 1,
                    fill: '#C6E5FF',
                },
                labelCfg: {
                    style: {
                        fill: '#000',
                        fontSize: 12,
                    },
                },
            },
            defaultEdge: {
                style: {
                    stroke: '#F6BD16',
                    lineWidth: 1,
                },
                labelCfg: {
                    style: {
                        fill: '#000',
                        fontSize: 10,
                    },
                },
            },
            modes: {
                default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
            },
        });

        // Update graph data
        graph.data(data);
        graph.render();

        graph.on('node:click', (evt) => {
            const node = evt.item;
            if (node) {
                // Reset all nodes to normal
                graph.getNodes().forEach(n => {
                    graph.updateItem(n, {
                        labelCfg: { style: { fontWeight: 'normal' } },
                        style: { fill: '#C6E5FF' },
                    });
                });

                // Reset all edges to normal
                graph.getEdges().forEach(edge => {
                    graph.updateItem(edge, {
                        style: { stroke: '#F6BD16', lineWidth: 1 },
                        labelCfg: { style: { fontWeight: 'normal', fill: "#000" } },
                    });
                });

                // Update the clicked node to be bold
                graph.updateItem(node, {
                    labelCfg: { style: { fontWeight: 'bold' } },
                    style: { fill: '#5B8FF9' },
                });

                //update the connected edges to be bold
                graph.getEdges().forEach(edge => {
                    if (edge.getSource().getID() === node.getID() || edge.getTarget().getID() === node.getID()) {
                        graph.updateItem(edge, {
                            style: { stroke: '#5B8FF9', lineWidth: 2 },
                            labelCfg: { style: { fontWeight: 'bold', fill: "#D61111" } },
                        });
                    }
                });
                

                const model = node.getModel();
                const connectedEdges = graph.getEdges().filter(edge => edge.getSource().getID() === model.id || edge.getTarget().getID() === model.id);
                
                const edgesDetails = connectedEdges.map(edge => {
                    return {
                        source: edge.getSource().getID(),
                        target: edge.getTarget().getID(),
                        id: edge.getID(),
                        label: edge.getModel().label,
                    };
                });

                const nodeDetails = {
                    id: model.id,
                    label: model.label,
                    connectedEdges: edgesDetails,
                };

                Streamlit.setComponentValue(nodeDetails);
            }
        });
        // Cleanup
        return () => {
            graph.destroy();
        };
    }, [data]);

    return (
        <div>
            <div id="container" style={{ width: "700px", height: "400px", border: "1px solid black" }}></div>
        </div>
    );
};

export default GraphComponent;
