import React, { useState } from "react";
import { useSelector } from "react-redux";

import Button from "../../components/button";
import InputField from "../../components/input";
import OptionSelect from "../../components/optionselect";
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from "../../services/ApiService";

import "./index.css";

const AddContact = ({ toView, editData }) => {
  const { loginUser } = useSelector((state) => state.counter);
  const dataSetter = () =>
    !editData
      ? { name: "", user_name: "", manager: "", subordinates: [] }
      : {
          name: editData.name ?? "",
          user_name: editData.user_name ?? "",
          manager: editData.manager ?? "",
          subordinates: editData.subordinates ?? [],
        };

  const selectSetter = () =>
    !editData
      ? { manager: "", subordinates: "" }
      : {
          manager: {
            value: editData.manager ?? undefined,
            label: editData.manager ?? undefined,
          },
          subordinates: {
            value: editData.subordinates ?? undefined,
            label: editData.subordinates ?? undefined,
          },
        };

  const [data, setData] = useState(dataSetter());
  const [select, setSelect] = useState(selectSetter());

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
        manager: data.manager !== "" ? data.manager : loginUser._id,
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
          manager: data.manager !== "" ? data.manager : loginUser._id,
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

  return (
    <div className="page-container">
      <div className="table-container">
        <div className="main-content">
          <div className="sub-header">
            <Button
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
            <div className="column">
              <InputField
                name={"User Name"}
                placeholder="Enter the User Name"
                value={data["user_name"]}
                keyname={"user_name"}
                width="50%"
                onChange={inputChangeHandler}
                important={true}
              />
            </div>
            <div className="column">
              <OptionSelect
                name={"Manager Name"}
                placeholder="Enter the Manager Name"
                value={select["manager"]}
                keyname={"manager"}
                width="70%"
                onChange={optionChangeHandler}
                important={true}
              />
            </div>
            <div className="column">
              <OptionSelect
                name={"Subordinates Name"}
                placeholder="Enter the Subordinate Name"
                value={select["subordinates"]}
                keyname={"subordinates"}
                width="90%"
                onChange={optionChangeHandler}
                important={true}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="button-row">
            <div className="button-column">
              <Button
                name="Reset"
                style={{ height: "20px" }}
                onClick={() => reset()}
              />
              <Button
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
