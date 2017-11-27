// Ajax Emulado
const randomContent = [
    'Falae, sucesso?',
    'Como ta sua familia?',
    'E as namorada?',
    'Sucessinho?'
]
function getRandom(max) {
    return Math.ceil(Math.random() * (max - 0) + 0)
}
document.querySelector('body').addEventListener('keypress', (e) => {
    if(e.key == '=') {
        console.log('[NEW_MESSAGE]')

        Chat.newMessage({
            user: 'Thiago Andrade',
            content: randomContent[getRandom(randomContent.length - 1)],  
            from: 'others'
        })
    }
})
// Morre aqui


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
        $chatMessagesArea
            .querySelector('.chatList__messageWrap')
            .appendChild($element)
    }

    function updateScroll() {
        $chatMessagesArea.scrollTop = $chatMessagesArea.scrollHeight
    }

    // Código acoplado da porra
    function newMessage(message) {
        Chat.addMessageToMessagesArea(message)
        Chat.updateScroll()
        GlobalPopUp.trigger(`Nova Mensagem de: ${message.user}`)
        Header.updateTotalMessages()
    }

    window.Chat = {
        addMessageToMessagesArea,
        newMessage,
        updateScroll
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

        $element.addEventListener('animationend', () => {
            $element.remove()
        })
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
