socket = io()

addReplyButton = document.getElementById("addReplyButton");
replierName = document.getElementById("replierName");
replierContent = document.getElementById("replierContent");
chat = document.getElementById("chat");


addReplyButton.onclick = () => {    
    // alert(`Name: ${replierName.value} Content: ${replierContent.value}`);
    socket.emit('addReply', {
        name: replierName.value,
        content = replierContent.value
    });
}

socket.on('updatedChat', chatHistory => {
    alert('recieved update');
    chat.innerHTML += "<p> " + chatHistory[chatHistory.length - 1].name + chatHistory[chatHistory.length - 1].content + "</p>";
})