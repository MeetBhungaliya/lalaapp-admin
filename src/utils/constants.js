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

export const TUTORIAL_TYPES = {
    letter_sound: "letterSound",
    word_pronunciation: "wordPronunciation",
    rhyming_words: "rhymingWords",
    phoneme_isolation: "phonemeIsolation",
    blending_letter: "blendingLetter",
    segmenting_words: "segmentingWords",
}

export { PAGINATION_DISPATCH_TYPES, chartFilterOptions }