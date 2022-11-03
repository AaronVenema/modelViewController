
let commentFormTool = async function (event) {
  event.preventDefault()
  const post_id = document.querySelector('.commentForm').id
  console.log(post_id)
  const comment_text = document.querySelector('#comment_text').value
  console.log(comment_text)
  if (comment_text)
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  {
    document.location.reload()
  }

}
document
  .querySelector('.commentForm')
  .addEventListener('submit', commentFormTool)
