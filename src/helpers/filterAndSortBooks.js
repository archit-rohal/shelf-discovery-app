export const filterAndSortBooks = (books, categoryFilters, isPriceAscendingChecked, isPriceDescendingChecked, bookRating, selectedRating, searchQuery) => {
    let activeBooklist = books;

    if (searchQuery) {
        activeBooklist = activeBooklist.filter(({
                                                    name,
                                                    author
                                                }) => name.toLowerCase().includes(searchQuery) || author.toLowerCase().includes(searchQuery));
    }

    activeBooklist = activeBooklist.filter(book => categoryFilters[book.category] || !Object.values(categoryFilters).some(v => v));

    if (isPriceDescendingChecked) {
        activeBooklist.sort((a, b) => b.price - a.price);
    } else if (isPriceAscendingChecked) {
        activeBooklist.sort((a, b) => a.price - b.price);
    }
    if (bookRating) {
        activeBooklist = activeBooklist.filter(({rating}) => rating >= bookRating);
    } else if (selectedRating) {
        activeBooklist = activeBooklist.filter(({rating}) => rating >= selectedRating);
    }
    return activeBooklist;
}

