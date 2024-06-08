import "./Landing.css"
import {NavLink} from "react-router-dom";
import fictionBookCover from "../../assets/the-jungle-book-cover.webp";
import nonFictionBookCover from "../../assets/secret-garden-cover.webp";
import selfHelpBookCover from "../../assets/wizard-of-oz-cover.webp";
import {useContext} from "react";
import {FiltersContext} from "../../contexts/FiltersProvider";
import {BsLinkedin} from "react-icons/bs";
import {FaGithub} from "react-icons/fa";
import {LuTwitter} from "react-icons/lu";

function Landing() {
    const {getChecked} = useContext(FiltersContext);
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <main className="landing">
                <section className={"landing-section"}>
                    <NavLink className="shopnow-link" to={"/productlist"}>Shop now</NavLink>
                </section>
                <section className="categories-section">
                    <div className={"heading-group"}>
                        <h1 className="category-heading">Shop By Categories</h1>
                    </div>
                    <div className="categories-container">
                        <NavLink className={"fiction-card"} to={"/productlist"}>
                            <figure>
                                <img className={"fiction-image"} src={fictionBookCover} alt="fiction-category"
                                     onClick={(e) => getChecked(e, {name: 'Fiction', checked: true})}/>
                                <figcaption>Fiction</figcaption>
                            </figure>
                        </NavLink>
                        <NavLink className={"nonfiction-card"} to={"/productlist"}>
                            <figure>
                                <img className={"nonfiction-image"} src={nonFictionBookCover} alt="fiction-category"
                                     onClick={(e) => getChecked(e, {name: 'Non Fiction', checked: true})}/>
                                <figcaption>Non Fiction</figcaption>
                            </figure>
                        </NavLink>
                        <NavLink className={"selfhelp-card"} to={"/productlist"}>
                            <figure>
                                <img className={"selfhelp-image"} src={selfHelpBookCover} alt="fiction-category"
                                     onClick={(e) => getChecked(e, {name: 'Self Help', checked: true})}/>
                                <figcaption>Self Help</figcaption>
                            </figure>
                        </NavLink>
                    </div>
                </section>
                <footer className={"footer"}>
                    <small className={"copyright-info"}>&copy; {currentYear} Archit Rohal | All rights reserved</small>
                    <div className="social-links">
                        <a href="https://twitter.com/archit__r"><LuTwitter/></a>
                        <a href="https://www.linkedin.com/in/archit-rohal/"><BsLinkedin/></a>
                        <a href="https://github.com/archit-rohal"><FaGithub/></a>
                    </div>
                </footer>
            </main>
        </div>
    )
}

export default Landing