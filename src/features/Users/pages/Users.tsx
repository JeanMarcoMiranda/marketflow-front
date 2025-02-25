import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/data-table";

import { User } from "../data/userSchema";
import { columns } from "../components/columns";
import { fetchUsers } from "../services/usersService";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users Page</h2>
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <DataTable data={users} columns={columns} />
      )}
    </div>
  );
};

export default UsersPage;
