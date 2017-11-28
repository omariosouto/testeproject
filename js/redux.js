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
    
    function addMessageToMessagesArea() { // para de passar o objeto da mensagem e pego do estado
        // Acessa o estado
        const messageListSize = store.getState().messages.length - 1
        const content = store.getState().messages[messageListSize].content

        const $element = createMessageElement(content)
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
    
    // PubSub.subscribe('NEW_MESSAGE', Chat.addMessageToMessagesArea)
    // PubSub.subscribe('NEW_MESSAGE', Chat.updateScroll)
    store.subscribe(Chat.addMessageToMessagesArea)
    store.subscribe(Chat.updateScroll)
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

    function triggerPopUp() { // não recebe mais parametros (infoObj, type)
        // acessa o estado
        const messageListSize = store.getState().messages.length - 1
        const infoObj = store.getState().messages[messageListSize]
        const type = infoObj.type
        
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
    // PubSub.subscribe('NEW_MESSAGE', GlobalPopUp.triggerPopUp)
    store.subscribe(GlobalPopUp.triggerPopUp)
})()


// Header.js
;(() => {
    'use strict'  
    const $messages  = document.querySelector('.siteHeader__info--messages')

    function updateTotalMessages() {
        //const messagesCount = $messages.dataset.count
        //$messages.dataset.count = 1 + new Number(messagesCount)

        $messages.dataset.count = store.getState().messages.length
        // Pega valor do state do store
    }

    window.Header = {
        updateTotalMessages
    }

    //PubSub.subscribe('NEW_MESSAGE', Header.updateTotalMessages)
    store.subscribe(Header.updateTotalMessages) // Cadastra a função
})()



