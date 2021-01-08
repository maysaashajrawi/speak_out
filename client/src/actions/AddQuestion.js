import * as api from "../api/index";

// Create question
export const AddQuestions = (questions) => async (dispatch) => {
  try {
    const { data } = await api.AddQuestions(questions);
    dispatch({ type: "AddQuestions", payload: data });
    
  } catch (error) {
    console.log(error, "failed");
  }
};

// Get all question
export const GetQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.GetQuestions();

    dispatch({ type: "GetAllQuestions", payload: data });
    
  } catch (error) {
    console.log(error.message);
  }
};

// Get all question And Answers ..
export const GetAllQuestionsAndAnswers = () => async (dispatch) => {
  try {
    // data represent the response
    const { data } = await api.GetAllQuestionsAndAnswers();

    dispatch({ type: "GetAllQuestionsAndAnswers", payload: data });
    
  } catch (error) {
    console.log(error);
  }
};

// Send The Answer ..
export const createAnswer = (answers) => async (dispatch) => {
  try {
    console.log(answers);
    const { data } = await api.createAnswer(answers);
    dispatch({ type: "CreateAnswer", payload: data });
    // console.log(data,"from action");
  } catch (error) {
    console.log(error, "failed");
  }
};

// // Get Question And Answers For One User ..
// export const getAllQuestionsAndAnswersForOneUser = (userId) => async (dispatch) => {
//     try {
//         // data represent the response
//         const { data } = await api.getAllQuestionsAndAnswersForOneUser(userId);
// console.log(userId)
//         dispatch({ type: 'getAllQuestionsAndAnswersForOneUser', payload: data });
//         console.log(data, "getAllQuestionsAndAnswersForOneUser");
//     }
//     catch (error) {
//         console.log(error);
//     }
// };
