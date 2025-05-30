import { useEffect, useRef, useState } from "react"
import { Comment } from "../Models/Comment"
import { Link } from "react-router-dom";

function MainMenu() {

    const [comments, setComments] = useState<Comment[]>([]);


    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('http://localhost:8080/comments')
            .then(res=>res.json())
            .then(json=>setComments(json))
    }, []);

    

    const addComment = ()=>{
        const newComment = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            text: textRef.current?.value
        }
        fetch(`http://localhost:8080/comments`, {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
            "content-type": "application/json",
            }
        })
        .then(res=>res.json())
        .then(json=>{setComments(json)
            if (nameRef.current) nameRef.current.value = '';
            if (emailRef.current) emailRef.current.value = '';
            if (textRef.current) textRef.current.value = '';})
    }

  return (
    <>
    <h1>Kommentaarid</h1>
    <div className="addCommentContainer">
        <label>Name</label> <br />
        <input placeholder="Lisa nimi" ref={nameRef} type="text" /> <br />
        <label>Email</label> <br />
        <input placeholder="Lisa email" ref={emailRef} type="text" /> <br />
        <label>Kommentaar</label> <br />
        <input placeholder="Lisa kommentaar" ref={textRef} type="text" /> <br />
        <button onClick={()=>addComment()}>Lisa</button>
    </div>
    <br />
    <div>
        <Link to={"/users"}>
            <button>Vaata kasutajaid</button>
        </Link>
    </div>
    <br />
    {comments.map(comment => 
        <div key={comment.id}> {comment.text}
          <Link to={"comment/" + comment.id}>
            <button>Vaata</button>
            </Link>
        </div>
    )}

    </>
  )
}

export default MainMenu