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
        value: 'week',
        label: 'This Week'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
]

export { PAGINATION_DISPATCH_TYPES, chartFilterOptions }