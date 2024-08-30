import os
import streamlit.components.v1 as components

_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "my_component", url="http://localhost:3001/mycomponent",
    )
    _component_func1 = components.declare_component(
        "graph_component", url="http://localhost:3001/graphcomponent"
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("my_component", path=build_dir)
    _component_func1 = components.declare_component("graph_component", path=build_dir)

def my_component(name, key=None):
    component_value = _component_func(name=name, key=key, default=0)
    return component_value

def graph_component(data, key=None):
    component_value1 = _component_func1(data=data, key=key, default=0)
    return component_value1

if not _RELEASE:
    import streamlit as st

    # st.subheader("Component with constant args")

    # num_clicks = my_component("World")
    # # st.markdown("You've clicked %s times!" % int(num_clicks))

    # st.markdown("---")

    # Display the graph component
    data = {
        "nodes": [
            {"id": "1",  "label": "n1"},
            {"id": "2",  "label": "n2"},
            {"id": "3",  "label": "n3"},
            {"id": "4",  "label": "n4"},
            {"id": "5",  "label": "n5"},
            {"id": "6",  "label": "n6"},
            {"id": "7",  "label": "n7"},
            {"id": "8",  "label": "n8"},
            {"id": "9",  "label": "n9"},
            {"id": "10", "label": "n10"}
        ],
        "edges": [
            {"source": "1", "target": "2",  "label": "e1-2", "id": "e12"},
            {"source": "2", "target": "3",  "label": "e2-3", "id": "e23"},
            {"source": "3", "target": "4",  "label": "e3-4", "id": "e34"},
            {"source": "4", "target": "5",  "label": "e4-5", "id": "e45"},
            {"source": "5", "target": "6",  "label": "e5-6", "id": "e56"},
            {"source": "6", "target": "7",  "label": "e6-7", "id": "e67"},
            {"source": "7", "target": "8", "label": "e7-8", "id": "e78"},
            {"source": "8", "target": "9", "label": "e8-9", "id": "e89"},
            {"source": "9", "target": "10", "label": "e9-10", "id": "e910"},
            {"source": "10", "target": "1", "label": "e10-1", "id": "e101"},
            {"source": "1", "target": "3", "label": "e1-3", "id": "e13"},
            {"source": "2", "target": "4", "label": "e2-4", "id": "e24"},
            {"source": "3", "target": "5", "label": "e3-5", "id": "e35"},
            {"source": "4", "target": "6", "label": "e4-6", "id": "e46"},
            {"source": "5", "target": "7", "label": "e5-7", "id": "e57"},
            {"source": "6", "target": "8", "label": "e6-8", "id": "e68"},
            {"source": "7", "target": "9", "label": "e7-9", "id": "e79"},
            {"source": "8", "target": "10", "label": "e8-10", "id": "e810"},
            {"source": "9", "target": "1", "label": "e9-1", "id": "e91"},
            {"source": "10", "target": "2", "label": "e10-2", "id": "e102"}
        ]
    }

    graph_data=graph_component(data)
    if graph_data:
        st.write("Graph component is clicked")
        st.write(f"****Clicked Node ID:**** {graph_data['id']}")
        st.write(f"****Clicked Node Label:**** {graph_data['label']}")
        if graph_data['connectedEdges']:
            st.write("****Connected Edges:****")
            for edge in graph_data['connectedEdges']:
                st.write(f"**Source:** {edge['source']} **Target:** {edge['target']} **Label:** {edge['label']} **ID:** {edge['id']}")
    else:
        st.write("Click a node to get its details")