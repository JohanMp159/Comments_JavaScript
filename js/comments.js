const comments = [],
	  d = document;

const inputContainer = d.createElement("div"),
	  input = d.createElement("input"),
	  $span = d.createElement("span"),
	  commentsContainer = d.querySelector(".comments-container");

input.classList.add("input");
inputContainer.classList.add("comment");


input.addEventListener("keyup",(e)=>{
	handleEnter(e,null);
})

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input)

function handleEnter(e,current){
	if(!e.target.value && e.key === "Enter"){
		
/*		const $spans = d.querySelectorAll("span");
		console.log($spans)*/
		
		$span.textContent = 'Ingresa un comentario!';
		$span.style.padding = "10px";
		inputContainer.append($span);
			
		setTimeout(()=>{
			$span.textContent = ""
		},2000)
	}
	
	if(e.key === 'Enter' && e.target.value != ''){
		const newComment = {
			text: e.target.value,
			likes: 0,
			response: []
		}
		
		if(current === null){
			comments.unshift(newComment)
		} else {
			current.response.unshift(newComment);
		}
		console.log(current)
		
		e.target.value = '';
		commentsContainer.innerHTML = '';
		commentsContainer.appendChild(inputContainer);
		
		//console.log(comments)
		
		renderComments(comments,commentsContainer);
	}
}


function renderComments(arr, parent){
	arr.forEach((el)=>{
		const commentContainer = d.createElement('div');
		commentContainer.classList.add('comment-container');
		
		const textContainer = d.createElement('div');
		textContainer.textContent = el.text;
		
		const actionsContainer = d.createElement('div'),
			  replyButton = d.createElement('button'),
			  likeButton = d.createElement('button'),
			  responsesContainer = d.createElement('div');
		
		responsesContainer.classList.add('responses-container');
		
		replyButton.textContent = 'Reply';
		likeButton.textContent = `${el.likes > 0?`${el.likes} likes`: "like" }`;
		
		replyButton.addEventListener('click',(e)=>{
			const newInput = inputContainer.cloneNode(true);
			newInput.value = '';
			newInput.focus();
			newInput.addEventListener('keyup',(e)=>{
				handleEnter(e, el)
			});
			
			commentContainer.insertBefore(newInput,responsesContainer);
		})
		
		likeButton.addEventListener('click',(e)=>{
			el.likes++;
			likeButton.textContent = `${el.likes > 0?`${el.likes} likes`: "like" }`;
		})
		
		commentContainer.appendChild(textContainer);
		commentContainer.appendChild(actionsContainer);
		actionsContainer.appendChild(replyButton);
		actionsContainer.appendChild(likeButton);
		commentContainer.appendChild(responsesContainer);
		
		if(el.response.length>0){
			renderComments(el.response, responsesContainer);
		}
		
		parent.appendChild(commentContainer)
		
	})
}

//console.log(comments)