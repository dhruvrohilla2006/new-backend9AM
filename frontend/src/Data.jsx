import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "./UserContext";

function Data() {
  const {data,setData,record,setRecord} = useContext(UserContext)


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
   
  };

  const handleSubmit = (e) => {
     setRecord(
        [...record,data]
    )
    setData({
        name:"",
        age:"",
        class:""
    })
    e.preventDefault();
    alert(
      `Name: ${data.name}\nAge: ${data.age}\nClass: ${data.class}`
    );
  };

  return (
    <div>
      <h2>Student Form</h2>
      <Link to="/data" >GO to Record</Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={data.age}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="class"
          placeholder="Enter class"
          value={data.class}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Data;