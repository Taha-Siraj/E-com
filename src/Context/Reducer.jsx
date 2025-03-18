export const reducer = (state, action) => {
    switch (action.type) {
      case "USER_LOGIN": {
        return { isLogin: true , user: action.payload, token: action.payload.token }
      }
      case "USER_LOGOUT": {
        return { isLogin: false , user: {} }
      }
      default: {
        return state
      }
    }
}