import { useContext } from "react";
// import { StudentContext } from "../Context/StudentContext";
import { UserContext } from "./UserContext";

function Record() {
  const { record } = useContext(UserContext);

  return (
    <div>
      <h2>Student Records Page</h2>

      {record.length === 0 ? (
        <p>No student records found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
        
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Class</th>
            </tr>
          </thead>

          <tbody>
              {
                record.map((item,index)=>{
                    return (
                            <tr key={index}  >
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.class}</td>
              </tr>
                    )
                })
            }
          
          
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Record;