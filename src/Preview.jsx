import React from "react";
import * as UI from "./components/ui";

const Preview = ({ plan }) => {
  if (!plan || !plan.components) return null;

  return (
    <div className="flex gap-4 flex-wrap">
      {plan.components.map((comp, index) => {
        const Component = UI[comp.name];

        if (!Component) return null;

        return <Component key={index} {...comp.props} />;
      })}
    </div>
  );
};

export default Preview;
