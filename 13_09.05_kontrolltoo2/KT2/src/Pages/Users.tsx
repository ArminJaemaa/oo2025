import { useEffect, useState } from "react";
import { User } from "../Models/User";
import Tagasi from "../components/Tagasi";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("id,asc")

    useEffect(() => {
        fetch(`http://localhost:8080/users?size=1&page=${page}&sort=${sort}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.content);
                setTotalPages(data.totalPages);
            });
    }, [page, sort]);

    return (
        <div>
            <h2>Users</h2>
            <br />
            <Tagasi/>
            <br />
                <button onClick={()=>setSort("id,asc")}>Sorteeri vanemad enne</button>
                <button onClick={()=>setSort("id,desc")}>Sorteeri uuemad enne</button>
                <button onClick={()=>setSort("email,asc")}>Sorteeri A-Z</button>
                <button onClick={()=>setSort("email,desc")}>Sorteeri Z-A</button>
            <br />
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        {user.email}
                        <Link to={"/userComment/" + user.id}>
                        <button>Vaata</button>
                        </Link>
                    </div>
                ))}
            </div>
            
            <div>
                <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                    Previous
                </button>
                <span>Page {page + 1} of {totalPages}</span>
                <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}
export default Users;