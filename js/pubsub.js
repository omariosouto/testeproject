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
    
    function addMessageToMessagesArea(message) {
        const $element = createMessageElement(message.content)
        $chatMessagesArea
            .querySelector('.chatList__messageWrap')
            .appendChild($element)
    }

    function updateScroll() {
        $chatMessagesArea.scrollTop = $chatMessagesArea.scrollHeight
    }

    // Código acoplado da porra
    // function newMessage(message) {
    //     Chat.addMessageToMessagesArea(message)
    //     Chat.updateScroll() // Vem depois
    //     GlobalPopUp.triggerPopUp(message, 'NEW_MESSAGE')
    //     Header.updateTotalMessages()
    // }

    window.Chat = {
        addMessageToMessagesArea,
        updateScroll
    }
    
    PubSub.subscribe('NEW_MESSAGE', Chat.addMessageToMessagesArea)
    PubSub.subscribe('NEW_MESSAGE', Chat.updateScroll)
})()


// GlobalPopUp.js
;(() => {
    'use strict'    
    const $globalPopUp = document.querySelector('.globalPopUp') 
    
    function createPopUpElement() {
        const $element = document.createElement('div')
        $element.classList.add('notificationPopUp')
        $element.textContent = 'Você tem novas atualizações :)'
        return $element
    }

    function triggerPopUp(infoObj, type) {
        const $element = createPopUpElement()

        if(type === 'NEW_MESSAGE')
            $element.textContent = `Nova mensagem de: ${infoObj.user}`

        $globalPopUp.appendChild($element)
        $element.addEventListener('animationend', () => {
            $element.remove()
        })
    }

    window.GlobalPopUp = {
        triggerPopUp
    }
    PubSub.subscribe('NEW_MESSAGE', GlobalPopUp.triggerPopUp)
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









