import { useNavigate } from "react-router-dom";
import { postRequest } from "../services/axiosWrapper";
import { setIn, useFormik } from "formik";
import * as Yup from "yup";

const AddToDo = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      isCompleted: false,
      dueDate: "",
      description: "",
      assignee: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(4, "must be of minimum of four letters")
        .max(10, "can't be more than 10 letters")
        .required("Required"),
      assignee: Yup.string().required("Required"),
      dueDate: Yup.date().min(
        new Date(Date.now()),
        "You can't add any todo before today"
      ),
    }),
    onSubmit: (values) => {
      postRequest(values);
      navigate("/");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}
      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      <label htmlFor="assignee">Assignee</label>
      <input
        id="assignee"
        name="assignee"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.assignee}
      />
      {formik.touched.assignee && formik.errors.assignee ? (
        <div>{formik.errors.assignee}</div>
      ) : null}
      <label htmlFor="dueDate">Due Date</label>
      <input
        id="dueDate"
        name="dueDate"
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.dueDate}
      />
      {formik.touched.dueDate && formik.errors.dueDate ? (
        <div>{formik.errors.dueDate}</div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddToDo;
