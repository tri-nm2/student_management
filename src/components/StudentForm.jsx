import React, { useEffect } from "react";
import Style from "./StudentForm.module.css";
import { Card, Input, Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import _ from "lodash";

const studentSchema = Yup.object().shape({
  studentCode: Yup.string().required("*Trường này bắt buộc nhập"),
  fullName: Yup.string()
    .required("*Trường này bắt buộc nhập")
    .matches(/^[A-Za-z ]+$/g, "*Tên phải nhập chữ"),
  phoneNumber: Yup.string()
    .required("*Trường này bắt buộc nhập")
    .matches(/^[0-9]+$/g, "*Số điện thoại phải là số"),
  email: Yup.string()
    .required("*Trường này bắt buộc nhập")
    .email("*Email không đúng định dạng"),
});

function StudentForm() {
  const initStudent = {
    id: "",
    key: "",
    studentCode: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    dataFlag: true,
  };

  const [student, setStudent] = useState(initStudent);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.student.studentList);
  const selectedStudent = useSelector((state) => state.student.selectedStudent);

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const checkExistStudent = (studentCode) => {
    const existStudent = studentList.find(
      (student) =>
        student.studentCode === studentCode && student.dataFlag === true
    );

    if (existStudent) return true;
    return false;
  };

  const validation = async () => {
    const errorList = {};
    try {
      await studentSchema.validate(student, { abortEarly: false });
    } catch (error) {
      const obj = { ...error };

      obj.inner.forEach((error) => {
        if (errorList[error.path]) return;
        errorList[error.path] = error.message;
      });

      setErrors(errorList);
    }

    return _.isEmpty(errorList);
  };

  const handleClick = async () => {
    const isValid = await validation();
    if (!isValid) return;

    const studentCode = student.studentCode;

    if (selectedStudent) {
      const newStudent = { ...student };
      console.log(newStudent);
      const action = {
        type: "UPDATE_STUDENT",
        payload: {
          data: newStudent,
        },
      };

      dispatch(action);
    } else {
      if (!checkExistStudent(studentCode)) {
        const newId = Math.floor(Math.random() * 1000).toString();
        const newStudent = { ...student, id: newId, key: newId };
        const action = {
          type: "ADD_NEW_STUDENT",
          payload: {
            data: newStudent,
          },
        };

        dispatch(action);
      } else {
        alert("Mã sinh viên đã tồn tại");
      }
    }

    setStudent(initStudent);
    setErrors({});
  };

  const handleCancel = () => {
    setStudent(initStudent);
    setErrors({});
  };

  return (
    <div>
      <Card
        title="Thông tin sinh viên"
        style={{
          width: "100%",
          textAlign: "left",
        }}
        headStyle={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <form className={Style.form}>
          <div className={Style.formGroup}>
            <label htmlFor="txtStudentCode">Mã SV</label>
            <Input
              id="txtStudentCode"
              name="studentCode"
              value={student.studentCode}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <span>{errors.studentCode}</span>
          </div>

          <div className={Style.formGroup}>
            <label htmlFor="txtFullname">Họ tên</label>
            <Input
              id="txtFullname"
              name="fullName"
              value={student.fullName}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <span>{errors.fullName}</span>
          </div>

          <div className={Style.formGroup}>
            <label htmlFor="txtPhoneNumber">Số điện thoại</label>
            <Input
              id="txtPhoneNumber"
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <span>{errors.phoneNumber}</span>
          </div>

          <div className={Style.formGroup}>
            <label htmlFor="txtEmail">Email</label>
            <Input
              id="txtEmail"
              name="email"
              value={student.email}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <span>{errors.email}</span>
          </div>

          <div className={Style.buttonGroup}>
            <Button
              type="primary"
              onClick={() => {
                handleClick();
              }}
            >
              Lưu sinh viên
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleCancel();
              }}
            >
              Hủy
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default StudentForm;
