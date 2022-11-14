import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "./FirebaseContext";
import TeacherService from "./ServiceTeacher";

const CreateTeacherPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(value) => <CreateTeachers firebase={value} />}
    </FirebaseContext.Consumer>
  );
};

const CreateTeachers = (props) => {
  const [name, setName] = useState(" ");
  const [course, setCourse] = useState(" ");
  const [salary, setSalary] = useState(0.0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTeacher = { name, course, salary };
    TeacherService.add(
      props.firebase.getFirestoreDb(),
      (name) => {
        alert(`Teacher ${name} created successfully!`);
        navigate("/listTeacher");
      },
      newTeacher
    );
  };

  return (
    <div>
      <h2> Create Teacher </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> Name: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert a name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label> Course: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert the course"
            onChange={(event) => {
              setCourse(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label> Salary: </label>
          <input
            type="number"
            step="any"
            className="form-control"
            placeholder="Insert a value"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
          />
        </div>

        <div className="form-group" style={{ marginTop: 20 }}>
          <input
            type="submit"
            value="Criar Professor"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTeacherPage;
