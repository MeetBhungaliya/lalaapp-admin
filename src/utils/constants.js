const PAGINATION_DISPATCH_TYPES = {
    NEXT_PAGE: 'NEXTPAGE',
    PREV_PAGE: 'PREVPAGE',
    SET_TOTALRECORD: 'SET_TOTALRECORD',
    RESET: 'RESET',
    SET_PAGE: 'SET_PAGE',
    SET_LIMIT: 'SET_LIMIT'
}


const chartFilterOptions = [
    {
        value: 'weekly',
        label: 'Week'
    },
    {
        value: 'monthly',
        label: 'Month'
    },
    {
        value: 'yearly',
        label: 'Year'
    }
]

export { PAGINATION_DISPATCH_TYPES, chartFilterOptions }