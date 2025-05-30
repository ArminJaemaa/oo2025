import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { User } from "../Models/User"
import { Comment } from "../Models/Comment";
import Tagasi from "../components/Tagasi";

function CommentByUser() {


    const {userId} = useParams();
    const [user, setUser] = useState<User>();
    const [comments, setComments] = useState<Comment[]>([]);

        useEffect(()=> {
            fetch("http://localhost:8080/comment-user?userId=" + userId)
            .then(res => res.json())
            .then(json=> setComments(json.content))
        }, [userId]);

        useEffect(()=> {
            fetch("http://localhost:8080/users/" + userId)
            .then(res => res.json())
            .then(json=> setUser(json))
        }, [userId]);

  return (
    <>
    <Tagasi/>
    <div>
        <div><strong>User:</strong>{user?.email}</div>
        <div><strong>Kommentaarid:</strong>
            {comments.map(comment=>
                <div key={comment?.id}> {comment?.text}</div>
            )}
        </div>
    </div>

    </>
  )
}

export default CommentByUser