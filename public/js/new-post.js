const newPostHandler = async (event) => {
  try {
    event.preventDefault();
    
    const postTitle = document.querySelector('#new-title').value.trim();
    const postBody = document.querySelector('#new-body').value.trim();

    if (postTitle && postBody) {
      console.log('New post title:', postTitle);
      console.log('New post body:', postBody);

      const response = await fetch('/api/blog/new', {
        method: 'POST',
        body: JSON.stringify({ postTitle, postBody }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const postId = await response.json();

        console.log(postId);

        document.location.replace(`/blog/${postId}}`);
      } else {
        return alert('Failed to create new post.');
      }
    }
  } catch (err) {
    return console.log('Error creating new post:', err);
  }
}

document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);