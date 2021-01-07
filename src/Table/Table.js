import './styles.css'
const Table = (props) => (
  
  <table className="table">
    <thead>
   
      <tr>
        <th onClick={props.onSort.bind(null, "id")}>ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}</th>
        <th onClick={props.onSort.bind(null, "name")}>Name{props.sortField === 'name' ? <small> {props.sort}</small> : null}</th>
        <th onClick={props.onSort.bind(null, "email")}>Email{props.sortField === 'email' ? <small> {props.sort}</small> : null}</th>
        <th onClick={props.onSort.bind(null, "body")}>Body{props.sortField === 'body' ? <small> {props.sort}</small> : null}</th>
        <th onClick={props.onSort.bind(null, "postId")}>Post_ID{props.sortField === 'postId' ? <small> {props.sort}</small> : null}</th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((item) => (
        <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.body}</td>
          <td>{item.postId}</td>
        </tr>
      ))}
    </tbody>
    
  </table>
);

export default Table;
