import { getAllUsersAction } from "@/actions/user.actions";

async function UsersPage() {
  const users = await getAllUsersAction();
  console.log("Check for users:: ", users);
  return (
    <div>
      <p>UsersPage</p>
      <p>All Registered Users</p>

      {users && users?.length > 0 && (
        <div>
          {users?.map((user: any) => (
            <div key={user._id}>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <p>{user.isVerified ? "Verified" : "Not Verified"}</p>
              <button>Update</button>
              <button>Delete</button>
            </div>
          ))}
        </div>
      )}

      {users?.length === 0 && <p>No users found</p>}
    </div>
  );
}

export default UsersPage;
