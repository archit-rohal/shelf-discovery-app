import React, {useContext} from 'react'
import "./Filters.css"
import {FiltersContext} from "../../../contexts/FiltersProvider";

const Filters = () => {
    const {
        getAscending,
        getDescending,
        getChecked,
        isPriceAscendingChecked,
        isPriceDescendingChecked,
        categoryFilters,
        getRating,
        selectedRating,
        getClearAll
    } = useContext(FiltersContext);
    const rangeOptions = [0, 1, 2, 3, 4, 5];
    return (
        <div className="filters">
            <header className="filter-header">
                <h2 className="filter-heading">Filters</h2>
                <button type="button" className="clearall-btn" onClick={() => getClearAll()}>Clear All</button>
            </header>
            <main className="filters-container">
                <fieldset className="price-group">
                    <legend className="price-legend">Price</legend>
                    <label className="group-asc" htmlFor="price-asc">
                        <input type="radio" id="price-asc" name="price-radio" checked={isPriceAscendingChecked}
                               onChange={() => getAscending()} className="price-asc"/>
                        <span className="price-asc-text">Price - Low to high</span>
                    </label>
                    <label className="group-dsc" htmlFor="price-dsc">
                        <input type="radio" name="price-radio" checked={isPriceDescendingChecked}
                               onChange={() => getDescending()} id="price-dsc" className="price-dsc"/>
                        <span className="price-dsc-text">Price - High to low</span>
                    </label>
                </fieldset>
                <fieldset className="cat-group">
                    <legend className="cat-legend">Category</legend>
                    <div className="group-fiction">
                        <input type="checkbox" id="cat-fiction" onChange={e => getChecked(e)}
                               checked={categoryFilters["Fiction"]} name="Fiction" className="cat-fiction"/>
                        <label htmlFor="cat-fiction" className="cat-fiction-label">Fiction</label>
                    </div>
                    <div className="group-nonfiction">
                        <input type="checkbox" id="cat-nonfiction" onChange={e => getChecked(e)} name="Non Fiction"
                               checked={categoryFilters["Non Fiction"]} className="cat-nonfiction"/>
                        <label htmlFor="cat-nonfiction" className="cat-nonfiction-label" id="nonFiction">Non
                            Fiction</label>
                    </div>
                    <div className="group-selfhelp">
                        <input type="checkbox" id="cat-selfhelp" name="Self Help" className="cat-selfhelp"
                               checked={categoryFilters["Self Help"]} onChange={e => getChecked(e)}/>
                        <label htmlFor="cat-selfhelp" className="cat-selfhelp-label">Self Help</label>
                    </div>
                </fieldset>
                <fieldset className="rating-group">
                    <legend className="rating-legend">Rating</legend>
                    <div className="group-slider">
                        <input type="range" id="rating-slider" name="rating-slider" className="rating-slider" min="0"
                               max="5"
                               step="1" list="tickmark" value={selectedRating}
                               onChange={(e) => getRating(e.target.value)}/>
                        <datalist id="tickmark">
                            {rangeOptions.map(range =>
                                <option key={range} label={range} value={range}></option>
                            )}
                        </datalist>
                        <div className="range-limits">
                            {rangeOptions.map(range =>
                                <span key={range}>{range}</span>
                            )}
                        </div>
                    </div>
                </fieldset>
            </main>
        </div>
    )
}
export default Filters