
let commentFormTool= async function(event){
  event.preventDefault()
  const post_id = document.querySelector('.commentForm').dataset.postid
  const comment_text= document.querySelector('#comment_text').value
  if(comment_text)
    await fetch('/api/comments',{
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(res.ok) {
    document.location.reload()
    }
    else {
      alert(res.statusText)
    }
}
document
.querySelector('.commentForm')
.addEventListener('submit', commentFormTool)
