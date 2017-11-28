const mensagens = (state = { messages: [] }, action) => {
	if(action.type == 'NEW_MESSAGE') {
		state = {
			messages: [...state.messages, action]
		}
		return state
	}

	return state
}

const createStore = (reducer) => {
	let state
	const subscribers = []
	
	dispatch = (action) => {
		state = reducer(state, action)	
		subscribers.forEach((func) => {
			func()
		})
	}
	subscribe = (func) => {
		subscribers.push(func)
	}
	
	dispatch({})
	
	return {
		getState: () => state,
		dispatch,
		subscribe
	}
}

const store = createStore(mensagens)