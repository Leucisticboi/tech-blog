const changeDisplay = () => {
  const commentText = document.querySelector('.comment-text');
  const newCommentInput = document.querySelector('#edit-comment-form');

  commentText.style.display = 'none';
  newCommentInput.style.display = 'block';
}

const submitEditedComment = async (event) => {
  event.preventDefault();

  const newComment = document.getElementById('edited-comment').value.trim();

  const commentId = document.querySelector('.comment-id').value.trim();

  // Check if commentId is undefined
  if (!commentId) {
    console.log('Comment ID is undefined. Unable to update comment.');
    return;
  }

  const response = await fetch(`/api/comment/edit/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify({ newComment }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    console.log('Failed to update comment.');
  }
}


document.querySelector('.edit-btn').addEventListener('click', changeDisplay);

document.querySelector('#edit-comment-form').addEventListener('submit', submitEditedComment);