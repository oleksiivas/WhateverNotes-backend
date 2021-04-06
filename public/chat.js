socket = io()

addReplyButton = document.getElementById("addReplyButton");
replierName = document.getElementById("replierName");
replierContent = document.getElementById("replierContent");
chat = document.getElementById("chat");


addReplyButton.onclick = () => {
    // alert(`Name: ${replierName.value} Content: ${replierContent.value}`);
    socket.emit('addReply', {
        name: replierName.value,
        content: replierContent.value,
    });
}


socket.on('updatedChat', chatHistory => {
    if (chatHistory[chatHistory.length - 1].name !== "" && chatHistory[chatHistory.length - 1].content !== "") {
        // alert('recieved update');
        chat.innerHTML += "<p><b>" + chatHistory[chatHistory.length - 1].name + "</b> says: <i>\"" + chatHistory[chatHistory.length - 1].content + "\"</i></p>";
    } else {
        // alert('Name and Content fields are required');
    }
})