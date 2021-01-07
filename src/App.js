import React, { Component } from "react";
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import DetailRowView from './DetailRowView/DetailRowView'
import ModeSelector from './ModeSelector/ModeSelector'
import TableSearch from './TableSearch/TableSearch'



class App extends Component {
  state = {
    isModeSelected: false,//дать пользователю возможность выбрать список данных маленький или большой
    isLoading: false,
    data: [],
    search: '',
    sort: 'asc',//'desc'
    sortField: 'id',
    row: null,
    currentPage: 0

  };

  async fetchData(url) {
    try {
       const response = await fetch(url
    );
    const data = await response.json();
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort),
    });
    } catch (error) {
      console.log(error)
    }
   

  }

  onSort = sortField => {
    const clonedData = this.state.data.concat()
    // soreType - direction

    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    // _.orderBy(arr, [my field], ['asc', 'desc']);
    const data = _.orderBy(clonedData, sortField, sort)

    this.setState({
      data,
      sort,
      sortField

    })

  }
  modeSelectHandler = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    })
    this.fetchData(url)
  }
  onRowSelect = row => {
    this.setState({ row })
  }
  pageChangeHandler = ({ selected }) => {
    this.setState({
      currentPage: selected
    })
  }
  searchHandler = search => {
    this.setState({ search, currentPage: 0 })
  }
  getFilteredData() {
    const { data, search } = this.state
    if (!search) {
      return data
    }
    return data.filter(item => {

      return (
        item['email'].toLowerCase().includes(search.toLowerCase())
        || item['name'].toLowerCase().includes(search.toLowerCase())
        || item['body'].toLowerCase().includes(search.toLowerCase())
      )
    })
  }
  render() {
    const pageSize = 10
    if (!this.state.isModeSelected) {
      return <div className="container">
        <ModeSelector onSelect={this.modeSelectHandler} />
      </div>
    }
    const filteredData = this.getFilteredData()
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
    // const disPlayData = _.chunk(this.state.data, pageSize)[this.state.currentPage];

    return (
      <div className="container">
        {this.state.isLoading
          ? <Loader />
          : <React.Fragment>

            <TableSearch onSearch={this.searchHandler} />
            {!displayData ?
              <Table
                data={[]}
                onSort={this.onSort}
                sort={this.state.sort}
                sortField={this.state.sortField}
                onRowSelect={this.onRowSelect}
              />
              : <Table
                data={displayData}
                onSort={this.onSort}
                sort={this.state.sort}
                sortField={this.state.sortField}
                onRowSelect={this.onRowSelect}
              />}

          </React.Fragment>


        }
        {
          this.state.data.length > pageSize
            ? <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              forcePage={this.state.currentPage}
            />
            : null
        }
        {
          this.state.row ? <DetailRowView comments={this.state.row} /> : null
        }

      </div>
    );
  }
}

export default App;

