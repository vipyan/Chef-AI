import img from "../images/loader.svg"

export default function LoadingSvg(props) {
    return (
        <>
            <section className={`loading-panel ${props.isLoading ? " visible" : ""}`}>
                <img src={img} alt="loading" />
                 <div id="api-message">Creating recipe…</div>
            </section>
        </>
    )
}