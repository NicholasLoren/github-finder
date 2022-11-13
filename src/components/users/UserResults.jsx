import { useEffect, useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import UserContext from "../../context/Githhub/GithubContext";

const UserResults = () => {
  const { users, isLoading, fetchUsers } = useContext(UserContext);
  useEffect(() => {
    fetchUsers();
  }, []);

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
