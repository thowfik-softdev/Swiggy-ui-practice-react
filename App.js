import React from "react";
import ReactDOM from "react-dom/client";

const elem = <div>Element</div>

const title = (
  <h1 id="heading" tabIndex="5">
    {elem}
    Hello from JSX!
  </h1>
);

// React Functional Component
const HeadingComponent = () => {
  return (
    <div id="container">
      {title}
      <h1>React Functional Component</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />); // root.render(HeadingComponent()); 
