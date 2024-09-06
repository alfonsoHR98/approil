import React from "react";

function PageComponent({ children, tittle }) {
  return (
    <div className="max-w-[80vw] font-mono mt-4 mx-auto py-2 px-4">
      <h1 className="text-2xl font-semibold">
        {tittle}
      </h1>
      {children}
    </div>
  );
}

export default PageComponent;
