import React, { useState } from "react";
import ViewEmployee from "./ViewEmployee";
import CreateEmployee from "./CreateEmployee";

const Index = () => {
  const [show, setShow] = useState("view");
  const [editData, setEditData] = React.useState(null);

  const _editData = (data) => {
    setEditData(data);
    setShow("create");
  };
  if (show === "view")
    return (
      <ViewEmployee toCreate={() => setShow("create")} toEditData={_editData} />
    );
  if (show === "create")
    return (
      <CreateEmployee
        editData={editData}
        toView={() => {
          setShow("view");
          setEditData(null);
        }}
      />
    );
};

export default Index;
