const PubSub = (() => {
	const channels = new Map()

	'NEW_MESSAGE', adicionaMensagemNoChat
	
	const subscribe = (channel, func) => {
		const currentChannelSubscribers = channels.get(channel)

		if(currentChannelSubscribers) {
			currentChannelSubscribers.push(func)
		} else {
			channels.set(channel, [func])
		}                
	}

	PubSub.publish('NEW_MESSAGE', {})
	const publish = (channel, data) => {
		const currentChannel = channels.get(channel)
		if(currentChannel) {
			currentChannel.forEach((func) => func(channel, data))	 
		}
	}

	return {
		subscribe,
		publish
	}
})()