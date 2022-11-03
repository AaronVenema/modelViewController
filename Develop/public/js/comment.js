
let commentFormTool= async function(event){
  event.preventDefault()
  const comment_id = document.querySelector('.commentForm').data.commentid
  console.log(comment_id)
  const comment_text= document.querySelector('#comment_text').value
  if(comment_text)
    await fetch('/api/comments',{
      method: 'POST',
      body: JSON.stringify({
        comment_id,
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
