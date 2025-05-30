import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Comment } from "../Models/Comment";
import Tagasi from "../components/Tagasi";

function SingleComment() {

    const {commentId} = useParams();
    const [comment, setComment] = useState<Comment>();

    useEffect(()=> {
        fetch("http://localhost:8080/comments/" + commentId)
        .then(res => res.json())
        .then(json=> setComment(json))
    }, [commentId]);

  return (
    <>
    <Tagasi/>
    <br />
    <div className="singleCommentContainer">
        <div>Kommentaar: {comment?.text}</div>
    </div>
    </>
  )
}

export default SingleComment