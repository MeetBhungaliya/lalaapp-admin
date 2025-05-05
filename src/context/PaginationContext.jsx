
import { PAGINATION_DISPATCH_TYPES } from "@/utils/constants";
import { createContext, useMemo, useReducer } from "react"
const PaginationContext = createContext();

const PaginationProvider = ({ children }) => {
    const defaultValue = useMemo(() => ({ page: 1, total: 20, limit: 10 }), [])
    const reducer = (state, action) => {
        switch (action.type) {
            case PAGINATION_DISPATCH_TYPES.NEXT_PAGE:
                return { ...state, page: state.page + 1 }
            case PAGINATION_DISPATCH_TYPES.PREV_PAGE:
                return { ...state, page: state.page - 1 }
            case PAGINATION_DISPATCH_TYPES.SET_TOTALRECORD:
                return { ...state, total: action.payload }
            case PAGINATION_DISPATCH_TYPES.SET_PAGE:
                return { ...state, page: action.payload }
            case PAGINATION_DISPATCH_TYPES.SET_LIMIT:
                return { ...state, page: 1, limit: action.payload }
            case PAGINATION_DISPATCH_TYPES.RESET:
                return { page: 1, total: 0, limit: 10 }
            default:
                return state
        }
    }
        const [state, dispatch] = useReducer(reducer, defaultValue)

    return (
        <PaginationContext.Provider value={{ state, dispatch }}>
            {children}
        </PaginationContext.Provider>
    )
}

export default PaginationProvider;
export { PaginationContext }
