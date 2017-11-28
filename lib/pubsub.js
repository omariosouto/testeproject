// const PubSub = (() => {
// 	const channels = new Map()

// 	const subscribe = (channel, func) => {
// 		const currentChannelSubscribers = channels.get(channel)

// 		if(currentChannelSubscribers) {
// 			currentChannelSubscribers.push(func)
// 		} else {
// 			channels.set(channel, [func])
// 		}                
// 	}

// 	const publish = (channel, data) => {
// 		const currentChannel = channels.get(channel)
// 		if(currentChannel) {
// 			currentChannel.forEach((func) => func(channel, data))	 
// 		}
// 	}

// 	return {
// 		subscribe,
// 		publish
// 	}
// })()



const PubSub = (() => {
	const channels = {}

	const subscribe = (channel, func) => {
		const currentChannelSubscribers = channels[channel]

		if(currentChannelSubscribers) {
			currentChannelSubscribers.push(func)
		} else {
			channels[channel] = [func]
		}                
	}

	const publish = (channel, data) => {
		const currentChannel = channels[channel]
		if(currentChannel) {
			currentChannel.forEach((func) => func(data, channel))	 
		} else {
			console.error('Esse canal não tem ninguém inscrito :(')
		}
	}

	return {
		subscribe,
		publish,
		channels
	}
})()
