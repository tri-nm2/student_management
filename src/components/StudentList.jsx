import React from "react";
import { Card, Table, Space, Button, Input } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

function StudentList() {
  const data = useSelector((state) =>
    state.student.searchList.filter((item) => item.dataFlag)
  );

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Mã Sv",
      dataIndex: "studentCode",
      key: "studentCode",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "action",
      render: (_, student) => (
        <Space size="small">
          <Button
            type="primary"
            ghost
            onClick={() => {
              handleUpdate(student);
            }}
          >
            Update
          </Button>
          <Button
            type="default"
            danger
            onClick={() => {
              handleDelete(student.studentCode);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (studentCode) => {
    const action = {
      type: "DELETE_STUDENT",
      payload: {
        studentCode: studentCode,
      },
    };

    dispatch(action);
  };

  const handleUpdate = (student) => {
    const action = {
      type: "GET_STUDENT",
      payload: {
        selectedStudent: student,
      },
    };

    dispatch(action);
  };

  const searchStudent = (keyWord) => {
    const action = {
      type: "SEARCH_STUDENT",
      payload: {
        keyWord: keyWord,
      },
    };

    dispatch(action);
  };

  const handleChange = (e) => {
    const debounce = _.debounce(() => {
      searchStudent(e.target.value);
    }, 400);
    debounce();
  };

  return (
    <div>
      <Card
        title="User List"
        style={{
          width: "100%",
          textAlign: "left",
        }}
        headStyle={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Input
          id="txtKeyWord"
          style={{
            width: 300 + "px",
            marginBottom: 20 + "px",
            border: 1 + "px solid black",
          }}
          prefix={<KeyOutlined />}
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
}

export default StudentList;
