import axios from "axios";
import { useState } from "react";

function AddStudent(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [course,setCourse]=useState("");

const submit=(e)=>{
 e.preventDefault();

 axios.post("http://localhost:8080/students",{
  name:name,
  email:email,
  course:course
 });

 setName("");
 setEmail("");
 setCourse("");
};

return(

<div>

<h2>Add Student</h2>

<form onSubmit={submit}>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
placeholder="Course"
value={course}
onChange={(e)=>setCourse(e.target.value)}
/>

<br/><br/>

<button type="submit">Add Student</button>

</form>

</div>

);

}

export default AddStudent;