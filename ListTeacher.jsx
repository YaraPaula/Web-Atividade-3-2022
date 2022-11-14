import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FirebaseContext from "./utils/FirebaseContext";
import TeacherService from "./ServiceTeacher";

const ListTeacherPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(value) => <ListTeachers firebase={value} />}
    </FirebaseContext.Consumer>
  );
};

const ListTeachers = (props) => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    ServiceTeacher.listOnSnapshot(
      props.firebase.getFirestoreDb(),
      (teachers) => {
        setTeachers(teachers);
      }
    );
  }, []);

  function deleteTeacher(id) {
    window.confirm("Are you sure?")
      ? ServiceTeacher.deleteTeacher(
          props.firebase.getFirestoreDb(),
          id,
          () => {
            alert(`Deleted! -> ${id}`);
            setTeachers(teachers.filter((teacher) => teacher.idDoc !== id));
          }
        )
      : alert("Error!");
  }

  const generateTableBody = () => {
    return teachers.map((element, index) => {
      element.key = index;
      return (
        <tr>
          <td>{element.id}</td>
          <td>{element.name}</td>
          <td>{element.course}</td>
          <td>{element.salary}</td>
          <td>
            <Link to={"/editTeacher/" + element.id} className="btn btn-primary">
              Edit
            </Link>
          </td>
          <td>
            <button
              className="btn btn-dark"
              onClick={() => deleteTeacher(element.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1>List Teachers</h1>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Salary</th>
            <th colSpan={2}>Options</th>
          </tr>
        </thead>
        <tbody>{generateTableBody()}</tbody>
      </table>
    </div>
  );
};

export default ListTeacherPage;
