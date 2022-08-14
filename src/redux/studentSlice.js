const initState = { studentList: [], selectedStudent: null, searchList: [] };

function Reducer(state = initState, action) {
  let newStudentList = [...state.studentList];
  let newSelectedStudent = state.selectedStudent;
  let index;
  switch (action.type) {
    case "ADD_NEW_STUDENT":
      newStudentList.push(action.payload.data);
      return {
        ...state,
        studentList: newStudentList,
        searchList: newStudentList,
      };
    case "DELETE_STUDENT":
      index = newStudentList.findIndex(
        (student) =>
          student.id === action.payload.id && student.dataFlag
      );
      if (index !== -1) {
        newStudentList[index].dataFlag = false;
      }
      return {
        ...state,
        studentList: newStudentList,
        searchList: newStudentList,
      };
    case "GET_STUDENT":
      newSelectedStudent = { ...action.payload.selectedStudent };
      return { ...state, selectedStudent: newSelectedStudent };
    case "UPDATE_STUDENT":
      index = newStudentList.findIndex(
        (student) =>
          student.id === action.payload.data.id &&
          student.dataFlag
      );
      if (index !== -1) {
        newStudentList[index] = { ...action.payload.data };
      }
      return {
        ...state,
        studentList: newStudentList,
        selectedStudent: null,
        searchList: newStudentList,
      };
    case "SEARCH_STUDENT":
      const keyWord = action.payload.keyWord;
      // eslint-disable-next-line array-callback-return
      const resultList = newStudentList.filter((student) => {
        if (
          (student.studentCode.includes(keyWord) ||
          student.fullName.toLowerCase().includes(keyWord.toLowerCase())) &&
          student.dataFlag
        )
          return student;
      });
      return { ...state, searchList: resultList };
    default:
      return state;
  }
}

export default Reducer;
