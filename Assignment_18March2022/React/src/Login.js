import { useFormik} from "formik";
import { useState } from "react";
const Login = () => {
    let [msg, setMsg] = useState("Login!!!");
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit(values) {
            console.log("form Submit");
            if (localStorage.getItem("users")) {
                let arr = JSON.parse(localStorage.getItem("users"));
                console.log(typeof (arr));
                arr.map((value, index) => {
                    if (value.Username === formik.values.username && value.Password === formik.values.password) {
                        alert("Successfully Logged in");
                        setMsg("Successfully LoggedIn");
                        let loggedUser = formik.values.username;
                        localStorage.setItem("Loggedusers", loggedUser);
                        localStorage.setItem("LoggedIn",1);
                    }
                })
            }
            else{
                alert("No Users!!!");
            }
        },
        validate() {
            const errors = {};
            if (formik.values.username.length <= 4) {
                errors.username = "Should be more than 4 chracters";
            }
            if (formik.values.username.length >= 10) {
                errors.username = "Should be less than 10 chracters";
            }
            if (formik.values.password.length <= 5) {
                errors.password = "Should be more than 5 Characters"
            }
            if (formik.values.password.length >= 20) {
                errors.password = "Should be less than 20 characters"
            }
            return errors;
        },
    });
    console.log(formik);
    return (
        <div>
            <h3 className="text-center text-muted mb-5">{msg}</h3>
            <form onSubmit={formik.handleSubmit} className="form-group col-lg-4 col-md-8 mx-auto" noValidate>
                <input type="text" name="username" className="form-control my-2" value={formik.values.username} placeholder="Enter Username" onChange={formik.handleChange} />
                <div className="text-danger">
                    {formik.errors.username ? formik.errors.username : null}
                </div>
                <input type="password" name="password" className="form-control my-2" value={formik.values.password} placeholder="Enter Password" onChange={formik.handleChange} />
                <div className="text-danger">
                    {formik.errors.password ? formik.errors.password : null}
                </div>

                <button className="btn btn-primary col-3 my-3">Login</button>


            </form>
        </div>

    );
}
export default Login;
