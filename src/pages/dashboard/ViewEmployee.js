import React, { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import Button from "../../components/button";
import DynamicTable from "../../components/datatable";
import { GET_ALL_EMPLOYEE, DELETE_EMPLOYEE } from "../../services/ApiService";

import "./index.css";

const ViewEmployee = ({ toCreate, toEditData }) => {
  const [data, setData] = useState([]);

  const getEmployee = async () => {
    let response;
    try {
      response = await GET_ALL_EMPLOYEE();
      if (response.success === true) {
        setData(response.employees);
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteEmployee = async (id) => {
    let response;
    try {
      response = await DELETE_EMPLOYEE(id);
      if (response.success === true) {
        getEmployee();
        alert(response.message);
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const ColumnConfig = [
    {
      Header: "Sl.No",
      filterable: true,
      disableFilters: true,
      width: "10px",
      Cell: (cellProps) => {
        return <div>{cellProps.row.index + 1}</div>;
      },
    },
    {
      Header: "Name",
      accessor: "name",
      filterable: true,
      disableFilters: true,
      width: "150px",
    },
    {
      Header: "User Name",
      accessor: "user_name",
      filterable: true,
      disableFilters: true,
      width: "200px",
    },
    {
      Header: "Manager",
      accessor: "manager",
      filterable: true,
      disableFilters: true,
      width: "200px",
    },
  ];

  const ActionColumn = [
    {
      Header: "Action",
      filterable: true,
      disableFilters: true,
      width: "50px",
      Cell: (cellProps) => {
        const data = cellProps.cell.row.original;
        return (
          <div className="action_icon_con">
            <div className="action_icon">
              <AiTwotoneEdit
                size={14}
                onClick={() => toEditData(data)}
                color={"#000000"}
              />
            </div>
            <div className="action_icon-delete">
              <RiDeleteBin6Line
                size={16}
                onClick={() => {
                  deleteEmployee(data._id);
                }}
                color={"#000000"}
              />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div className="page-container">
      <div className="table-container">
        <div className="sub-header">
          <h2>List of Employees</h2>
          <Button
            name="Create"
            type="submit"
            style={{ marginTop: "20px", height: "20px" }}
            onClick={() => toCreate()}
          />
        </div>
        <DynamicTable
          columns={React.useMemo(() => {
            return [...ColumnConfig, ...ActionColumn];
          })}
          data={data}
        />
      </div>
    </div>
  );
};

export default ViewEmployee;
