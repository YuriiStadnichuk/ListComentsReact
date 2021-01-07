import "./styles.css";

const DetailRowView = ({ comments }) => (
    <div className="card border-success mb-" style={{ maxWidth: '18rem' }}>
        <div className="card-header">{comments.email}</div>
        <div className="card-body text-success">
            <h5 className="card-title">{comments.name}</h5>
            <p className="card-text">{comments.body}</p>
            <p className="card-text">Индекс:{comments.postId}</p>
        </div>
    </div>

);

export default DetailRowView;

