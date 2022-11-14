import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";

class ServiceTeacher {
  static list = (firestoreDb, callback) => {
    getDocs(collection(firestoreDb, "teacher"))
      .then((teacherSnapshot) => {
        const teachers = [];
        teacherSnapshot.forEach((teacher) => {
          const id = teacher.id;
          const { name, course, salary } = teacher.data();
          teachers.push({ id, name, course, salary });
        });
        callback(teachers);
      })
      .catch((err) => console.log(err));
  };

  static teacherOnSnapshot = (firestoreDb, callback) => {
    const q = query(collection(firestoreDb, "teacher"));
    const unscribe = onSnapshot(q, (querySnapshot) => {
      const teachers = [];
      querySnapshot.forEach((document) => {
        const id = document.id;
        const { name, course, salary } = document.data();
        teachers.push({ id, name, course, salary });
      });
      callback(teachers);
    });
  };

  static addTeacher = (firestoreDb, callback, teacher) => {
    addDoc(collection(firestoreDb, "teacher"), teacher)
      .then((docRef) => {
        callback(docRef.id);
      })
      .catch((err) => console.log(err));
  };

  static retrieveTeacher = (firestoreDb, callback, id) => {
    getDoc(doc(firestoreDb, "teacher", id))
      .then((docSnap) => {
        callback(docSnap.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  static updateTeacher = (firestoreDb, callback, id, teacher) => {
    updateDoc(doc(firestoreDb, "teacher", id), teacher)
      .then(() => {
        callback(true);
      })
      .catch((err) => console.log(err));
  };

  static deleteTeacher = (firestoreDb, callback, id) => {
    deleteDoc(doc(firestoreDb, "teacher", id))
      .then(() => callback(true))
      .catch((err) => console.log(err));
  };
}

export default ServiceTeacher;
