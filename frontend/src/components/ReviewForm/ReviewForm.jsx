import './ReviewForm.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ReviewForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [reviewText, setReviewText] = useState();

  return (
    <div>
      <form action=""></form>
    </div>
  )
}

