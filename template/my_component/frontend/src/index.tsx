import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StreamlitProvider } from "streamlit-component-lib-react-hooks";
import MyComponent from "./MyComponent";
import GraphComponent from "./GraphComponent";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StreamlitProvider>
        <Routes>
          <Route path="/mycomponent" element={<MyComponent />} />
          <Route path="/graphcomponent" element={<GraphComponent />} />
        </Routes>
      </StreamlitProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
