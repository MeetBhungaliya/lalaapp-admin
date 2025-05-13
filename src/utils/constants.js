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
        label: 'Week'
    },
    {
        value: 'month',
        label: 'Month'
    },
    {
        value: 'year',
        label: 'Year'
    }
]

export { PAGINATION_DISPATCH_TYPES, chartFilterOptions }