import { useFormik, Field, Form } from "formik";
let users = [];
const Forum = () => {
    const formik = useFormik({
        initialValues: {
            body: "",
            author: "",
            date: ""
        },
        onSubmit(values) {
            console.log("form Submit");
            if (localStorage.getItem("Topic")) {
                users = JSON.parse(localStorage.getItem("users"));
                let topic = {
                    Body: formik.values.body,
                    Author: formik.values.author,
                    Date: new Date().toString()
                }
                users.push(topic);
                localStorage.setItem("Topic", JSON.stringify(users));
            }
            else {
                let topic = {
                    Body: formik.values.body,
                    Author: formik.values.author,
                    Date: new Date().toString(),

                }
                users.push(topic);
                let userToJson = JSON.stringify(users);
                localStorage.setItem("Topic", userToJson);
            }
            if(localStorage.getItem("Topic")){
                let arr = JSON.parse(localStorage.getItem("Topic"));
                for(let value of Object.values(arr)){
                    document.querySelector("tbody").innerHTML += `
                    <tr>
                        <td>${value.Body}</td>
                        <td>${value.Author}</td>
                        <td>${value.Date}</td> 

                    </tr>`;
                }
            }
        },
        
    });
    console.log(formik);
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="form-group col-lg-4 col-md-8 mx-auto">
                <textarea name="body" placeholder="Enter Comment" className="form-control my-2" value={formik.values.body} ></textarea><br />
                <select name="author" className="form-control my-2" value={formik.values.author}>
                    <option>User 1</option>
                    <option>User 2</option>
                    <option>User 3</option>
                </select><br />
                <br />
                <button className="btn btn-info">Add Comment</button>
            </form>
        </div>

    );
}
export default Forum;