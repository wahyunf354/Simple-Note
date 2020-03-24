import firebase, { database } from "../../firebase";

export const actionUserName = () => despatch => {
  setTimeout(() => {
    return despatch({
      type: "CHANGE_USER",
      value: "Wahyu Nur Fadillah"
    });
  }, 2000);
};

export const registerUserAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log("seccess : ", res);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(true);
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMassage = error.massage;
        console.log("error : ", errorCode, "/", errorMassage);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log("seccess : ", res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        };
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMassage = error.massage;
        console.log("error : ", errorCode, "/", errorMassage);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

export const addDataToAPI = data => dispatch => {
  database.ref("note/" + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date
  });
};

export const getDataFromAPI = userId => dispatch => {
  const urlNotes = database.ref("note/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", function(snapshot) {
      console.log(snapshot.val());
      const data = [];
      Object.keys(snapshot.val()).map(key => {
        data.push({
          id: key,
          data: snapshot.val()[key]
        });
      });
      dispatch({ type: "SET_NOTES", value: data });
      resolve(data);
    });
  });
};

export const updateNoteFromAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    database.ref(`note/${data.userId}/${data.noteId}`).set(
      {
        title: data.title,
        content: data.content,
        date: data.date
      },
      err => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteNoteFromAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    database.ref(`note/${data.userId}/${data.noteId}`).remove();
  });
};
