import { useState, useEffect, useRef } from "react";
import { getComments, addOrUpdateComment } from "../../services/api/comment.service";

export const useComments = (productId, userId) => {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState({ author: "", content: "", rating: 5 });
  const [originalUserComment, setOriginalUserComment] = useState({ author: "", content: "", rating: 5 });

  useEffect(() => {
    if (!productId) return;
     getComments(productId).then((data) => {
      setComments(data);
      if (userId) {
        const found = data.find(c => c.userId === userId);
        setUserComment(found || { author: "", content: "", rating: 5 });
        setOriginalUserComment(found || { author: "", content: "", rating: 5 });
      }
    });
  }, [productId, userId]);

  const submitComment = async (e) => {
    e.preventDefault();

    const {author, content, rating }= userComment
    const commentData = {
      productId,
      userId,
      author: author,
      content: content,
      rating: rating
    }
    //console.log(commentData);

    const res = await addOrUpdateComment(commentData);
    // Actualiza el estado local según si es nuevo o editado
    if (res.updated) {
      setComments(comments.map(c => c.userId === userId ? res.comment : c));
    } else {
      setComments([...comments, res.comment]);
    }
    setUserComment(res.comment);
    setOriginalUserComment(res.comment);
  };

  const handleChange = (e) => {
    console.log(e);
    setUserComment({
      ...userComment,
      author: e.author,
      content: e.content,
      rating: e.rating
    });

  }

  // Función para comparar el comentario actual con el original
  const isCommentChanged = () => {
    return (
      userComment.author !== originalUserComment.author ||
      userComment.content !== originalUserComment.content ||
      Number(userComment.rating) !== Number(originalUserComment.rating)
    );
  };

  return { comments, userComment, submitComment, handleChange, isCommentChanged };
}