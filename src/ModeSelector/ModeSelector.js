import "./styles.css";

const ModeSelector = (props) => {
    const smallUrl = `https://jsonplaceholder.typicode.com/comments?_limit=10`;
    const bigUrl = `https://jsonplaceholder.typicode.com/comments?_limit=500`
    return (
        <div className="selector-wrap">
            <button onClick={() => props.onSelect(smallUrl)} className="btn btn-outline-primary">10 эллементов</button>
            <button onClick={() => props.onSelect(bigUrl)} className="btn btn-outline-secondary">500 эллементов</button>
        </div>
    )
}

export default ModeSelector;

