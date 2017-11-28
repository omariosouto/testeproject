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

        if(typeof createStore !== 'undefined') {
            store.dispatch({
                type: 'NEW_MESSAGE',
                user: 'Thiago Andrade',
                content: randomContent[getRandom(randomContent.length - 1)],  
                from: 'others'
            })
        } else if(typeof PubSub !== 'undefined') {
            PubSub.publish('NEW_MESSAGE', {
                user: 'Thiago Andrade',
                content: randomContent[getRandom(randomContent.length - 1)],  
                from: 'others'
            })
        } else {
            Chat.newMessage({
                user: 'Thiago Andrade',
                content: randomContent[getRandom(randomContent.length - 1)],  
                from: 'others'
            })
        }
    }
})
// Morre aqui