import Layout from "../../components/Layout";
import axios from "axios";
import { getCookie } from "../../helpers/auth";

function UserPage({ user }) {
  if (user == "no user") return <div>No user</div>;
  return (
    <Layout>
      <h1>User page</h1>
    </Layout>
  );
}

UserPage.getInitialProps = async (context) => {
  console.log("context");

  const token = getCookie("token", context.req);
  console.log(token);
  try {
    const response = await axios.get(`${process.env.API}/user`, {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    });
    return { user: response.data };
  } catch (err) {
    // if (err.response.status === 400) {
    //   return {
    //     user: "no user",
    //   };
    // }
    console.log("errrrr");
    return {
      user: "no user",
    };
  }
};

export default UserPage;
