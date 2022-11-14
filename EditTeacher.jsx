import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FirebaseContext from "./utils/FirebaseContext";
import TeacherService from "./ServiceTeacher";

const EditTeacherPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(value) => <EditTeacher firebase={value} />}
    </FirebaseContext.Consumer>
  );
};

const EditTeacher = (props) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [salary, setSalary] = useState(0.0);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    ServiceTeacher.retrieve(
      props.firebase.getFirestoreDb(),
      (teacher) => {
        setName(teacher.name);
        setCourse(teacher.course);
        setSalary(teacher.salary);
      },
      params.id
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const teacherUpdat = { name, course, salary };
    ServiceTeacher.update(
      props.firebase.getFirestoreDb(),
      (result) => {
        navigate("/listTeacher");
      },
      params.id,
      teacherUpdat
    );
  };

  return (
    <div>
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> Name: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert a name"
            value={name === null || name === undefined ? "" : name}
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
            value={course ?? ""}
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
            value={salary ?? 0.0}
            onChange={(event) => {
              setSalary(event.target.value);
            }}
          />
        </div>
        <div className="form-group" style={{ marginTop: 20 }}>
          <input
            type="submit"
            value="Editar Professor"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTeacherPage;
