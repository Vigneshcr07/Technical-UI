import React, { useState } from "react";
import { Button } from "reactstrap";

import Button1 from "../../components/button";
import InputField from "../../components/input";
import OptionSelect from "../../components/optionselect";
import {
  CREATE_EMPLOYEE,
  GET_MANAGER,
  UPDATE_EMPLOYEE,
} from "../../services/ApiService";

import "./index.css";

const AddContact = ({ toView, editData }) => {
  const dataSetter = () =>
    !editData
      ? { name: "", manager: "", isManager: false }
      : {
          name: editData.name ?? "",
          manager: editData.manager ?? "",
          isManager: editData.isManager ?? "",
        };

  const selectSetter = () =>
    !editData
      ? { manager: "" }
      : {
          manager: {
            value: editData.manager ?? undefined,
            label: editData.manager ?? undefined,
          },
        };

  const [data, setData] = useState(dataSetter());
  const [select, setSelect] = useState(selectSetter());
  const [options, setOptions] = useState();

  const inputChangeHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const optionChangeHandler = (name, e) => {
    setData({ ...data, [name]: e.value });
    setSelect({ ...select, [name]: e });
  };

  const reset = () => {
    setData(dataSetter());
    setSelect(selectSetter());
  };

  const createEmployee = async () => {
    let response;
    try {
      response = await CREATE_EMPLOYEE({
        ...data,
      });
      if (response.success === true) {
        toView();
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateEmployee = async () => {
    let response;
    try {
      response = await UPDATE_EMPLOYEE(
        {
          ...data,
        },
        editData._id
      );
      if (response.success === true) {
        toView();
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getManager = async () => {
    let response;
    try {
      response = await GET_MANAGER(editData ?? {});
      if (response.success === true) {
        const options = [];
        response.employee.map((employee) => {
          options.push({
            label: employee.name,
            value: employee.name,
          });
        });

        setOptions(options);
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    getManager();
  }, []);

  return (
    <div className="page-container">
      <div className="table-container">
        <div className="main-content">
          <div className="sub-header">
            <Button1
              name="Go back"
              type="submit"
              style={{ marginTop: "20px", height: "20px" }}
              onClick={() => toView()}
            />
            <h2 style={{ marginRight: "30px" }}>
              {editData ? "Edit Employee" : "Add Employee"}
            </h2>
          </div>
          <div className="row">
            <div className="column">
              <InputField
                name={"Name"}
                placeholder="Enter Name"
                value={data["name"]}
                keyname={"name"}
                width="50%"
                onChange={inputChangeHandler}
                important={true}
              />
            </div>            
            <div className="column" style={{ marginTop: "-10px" }}>
              <OptionSelect
                name={"Manager Name"}
                placeholder="Enter the Manager Name"
                options={options}
                value={select["manager"]}
                keyname={"manager"}
                width="70%"
                onChange={optionChangeHandler}
                important={true}
              />
            </div>
            <div className="column" style={{ marginTop: "20px" }}>
              Is the employee a Manager?
              <Button
                onClick={() => {
                  setData({ ...data, isManager: !data["isManager"] });
                }}
                className={`toggle-button-${data.isManager ? "" : "active"}`}
              >
                <div className="toggle-switch"></div>
              </Button>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="button-row">
            <div className="button-column">
              <Button1
                name="Reset"
                style={{ height: "20px" }}
                onClick={() => reset()}
              />
              <Button1
                name="submit"
                type="submit"
                style={{ height: "20px" }}
                onClick={() =>
                  !editData ? createEmployee() : updateEmployee()
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
