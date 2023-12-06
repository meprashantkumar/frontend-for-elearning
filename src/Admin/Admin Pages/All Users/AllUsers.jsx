import Layout from "../../Utils/Layout";
import "./alluser.css";

const AllUsers = ({ users }) => {
  return (
    <Layout>
      <div className="all-users">
        {users &&
          users.map((i) => (
            <div className="users" key={i._id}>
              Name - {i.firstname} {i.lastname} <br />
              Email - {i.email} <br />
              Role - {i.role} <br />
              <button>Make {i.role === "teacher" ? "User" : "Teacher"}</button>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default AllUsers;
