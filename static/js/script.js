document.addEventListener("DOMContentLoaded", () => {
  let sessionId = null;
  const preferredLanguages = navigator.languages;
  const firstLanguage = preferredLanguages[0]; 

  const locale = firstLanguage;

  const defaultLanguage = 'English';

  try {
      const languagePart = locale.split('-')[0];
      const languageName = new Intl.DisplayNames([locale], { type: 'language' }).of(languagePart);
      chatLanguage = languageName || defaultLanguage; // Outputs the language name or defaults to English
      console.log(chatLanguage)
  } catch (error) {
      console.log(defaultLanguage); // Defaults to English in case of any error
  }


  // Initialize the session
  initSession();

  function initSession() {
      fetch("/initiate-session", {
        method: "POST",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        sessionId = data.session_id;
        sendInitialMessage();  // Send the initial message
    });

  }

  const restartButton = document.getElementById("restart-chat");
  restartButton.addEventListener("click", restartChat);

  function restartChat() {
      //document.getElementById("message-list").innerHTML = ''; // Clear the chat
      initSession(); // Send initial message to start the chat again

      const textList = document.getElementById("text-list");  // Adjust selector as needed
      // Clear the existing list
      textList.innerHTML = '';
  }

  const getStoryButton = document.getElementById("get-story");
  getStoryButton.addEventListener("click", getStory);

  function getStory() {
      //document.getElementById("message-list").innerHTML = ''; // Clear the chat
      document.getElementById("text-list").style.display = 'block';
      fetch("/show-all-story", {
        method: "GET",
        headers: {"Content-Type": "application/json",    "X-Session-Id": sessionId,}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        textArray = data.story;
        const textList = document.getElementById("text-list");  // Adjust selector as needed
        
        // Clear the existing list
        textList.innerHTML = '';
        
        textArray.forEach(text => {
            const listItem = document.createElement("li");  // Adjust element type if needed
            listItem.textContent = text;
            textList.appendChild(listItem);
        });

    });
  }

  //const sendButton = document.getElementById("send-button");
  //sendButton.addEventListener("click", sendMessage);

  const messageInput = document.getElementById("message-input");
  messageInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          event.preventDefault(); // Prevent the default action to avoid form submission
          sendMessage();
      }
  });
  
  function sendMessage(messageText = null) {
    const messageInput = document.getElementById("message-input");
    const message = messageText || messageInput.value;
    messageInput.value = "";
    document.getElementById("input-area").style.display = "none";
    document.getElementById("text-list").style.display = 'none';
    postMessage(message);
}


  function sendInitialMessage() {
      // Define an initial message
      const initialMessage = "Hola";
      postMessage(initialMessage);
  }

  function postMessage(message) {
      document.getElementById("loading-indicator").style.display = "block"; // Show loading indicator

      fetch("/send_message", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "X-Session-Id": sessionId,
          },
          body: JSON.stringify({ message }),
      })
      .then(response => response.json())
      .then(data => {
          console.log(data)
          document.getElementById("loading-indicator").style.display = "none"; // Hide loading indicator
          /*const messageList = document.getElementById("message-list");
          const botMessage = document.createElement("li");
          botMessage.classList.add("bot-message");
          botMessage.textContent = data.message;
          messageList.appendChild(botMessage);
          */

          const message = document.getElementById("message");
          message.textContent = data.message;

          if (data.message.includes('<button>')) {
            console.log('button')
            message.innerHTML = data.message;
            Array.from(message.querySelectorAll('button')).forEach(button => {
                console.log(button.textContent)
                buttonText = button.textContent;
                button.addEventListener('click', () => {
                    console.log('click')
                    sendMessage(button.textContent);
                });
             
            });
          } else {
              //botMessage.textContent = data.message;
              message.textContent = data.message;
          }

          // Show input area if a question is asked
          //if (data.is_question) {
              document.getElementById("input-area").style.display = "block";
          //}
      });
  }

 

});
