import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";

const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_GITHUB_TOKEN;

const UserResults = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${url}/users`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };

  if (!isLoading) {
    return (
      <div className="grid grid-col-1 xl:grid-cols-4 lg:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;
