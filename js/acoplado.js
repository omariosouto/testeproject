// Ajax Emulado
document.querySelector('body').addEventListener('keypress', (e) => {
    if(e.key == '=') {
        console.log('NEW_MESSAGE')

        Chat.newMessage({
            user: 'Thiago Andrade',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis corporis temporibus sed eligendi doloremque, nulla aut mollitia, blanditiis aperiam qui dolores vero veniam doloribus quisquam ad voluptates facere. Illum.'
        })
    }
})



// ChatList.js
;(() => {
    'use strict'
    const $chatMessagesArea = document.querySelector('.chatList__itemMessagesArea')

    function createMessageElement(content) {
        const $element = document.createElement('li')
        $element.classList.add('chatList__message')
        $element.textContent = content
        return $element
    }
    
    function addMessageToMessagesArea({ content }) {
        const $element = createMessageElement(content)
        $chatMessagesArea.appendChild($element)
    }

    // Código acoplado da porra
    function newMessage(message) {
        Chat.addMessageToMessagesArea(message)
        GlobalPopUp.trigger(`Nova Mensagem de: ${message.user}`)
        Header.updateTotalMessages()
    }

    window.Chat = {
        addMessageToMessagesArea,
        newMessage
    }
})()


// GlobalPopUp.js
;(() => {
    'use strict'    
    const $globalPopUp = document.querySelector('.globalPopUp') 
    
    function trigger(popUpContent) {
        const $element = document.createElement('div')
        $element.classList.add('notificationPopUp')
        $element.textContent = popUpContent
        $globalPopUp.appendChild($element)

        setTimeout(() => {
            $element.remove()
        }, 1000)
    }

    window.GlobalPopUp = {
        trigger
    }
})()


// Header.js
;(() => {
    'use strict'  
    const $messages  = document.querySelector('.siteHeader__info--messages')
    
    function updateTotalMessages() {
        const messagesCount = $messages.dataset.count
        $messages.dataset.count = 1 + new Number(messagesCount)
    }

    window.Header = {
        updateTotalMessages
    }
})()
