// Ajax Emulated
document.querySelector('body').addEventListener('keypress', (e) => {
    if(e.key == '=') {
        console.log('NEW_MESSAGE')

        PubSub.publish('NEW_MESSAGE', {
            user: 'Thiago Andrade',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit debitis corporis temporibus sed eligendi doloremque, nulla aut mollitia, blanditiis aperiam qui dolores vero veniam doloribus quisquam ad voluptates facere. Illum.'
        })
    }
})

// ChatList.js
;(() => {
    'use strict'
    const $chatMessagesArea = document.querySelector('.chatList__itemMessagesArea')
    const $chatNewMessage = document.querySelector('.chatList__itemNewMessage')

    $chatNewMessage.addEventListener('submit', (event) => {
        event.preventDefault()
    })

    function createMessageElement(content) {
        const $element = document.createElement('li')
        $element.classList.add('chatList__message')
        $element.textContent = content
        return $element
    }
    function addMessageToMessagesArea(channel, { content }) {
        const $element = createMessageElement(content)
        $chatMessagesArea.appendChild($element)
    }

    window.ChatList = {
        addMessageToMessagesArea
    }

    PubSub.subscribe('NEW_MESSAGE', ChatList.addMessageToMessagesArea)
})()


// GlobalPopUp.js
;(() => {
    'use strict'    
    const $globalPopUp = document.querySelector('.globalPopUp') 
    
    function trigger(channel, message) {
        const popUpContent = `Nova Mensagem de: ${message.user}`

        const $element = document.createElement('div')
        $element.classList.add('notificationPopUp')
        $element.textContent = popUpContent
        $globalPopUp.appendChild($element)

        $element.classList.add('notificationPopUp--remove')

        setTimeout(() => {
            $element.remove()
        }, 1000)
    }

    window.GlobalPopUp = {
        trigger
    }

    PubSub.subscribe('NEW_MESSAGE', GlobalPopUp.trigger)
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

    PubSub.subscribe('NEW_MESSAGE', Header.updateTotalMessages)
})()
