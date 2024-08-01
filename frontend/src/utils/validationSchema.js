import * as Yup from "yup";

export const survivalCalculatorSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  pClass: Yup.string().required("Passenger class is required"),
  sex: Yup.string().required("Sex is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .typeError("Age must be a number"),
  fare: Yup.number()
    .required("Fare is required")
    .positive("Fare must be a positive number")
    .typeError("Fare must be a number"),
  traveledAlone: Yup.string().required("Traveled alone is required"),
  embarked: Yup.string().required("Embarkation point is required"),
  chooseModel: Yup.string().required("Model is required"),
});
