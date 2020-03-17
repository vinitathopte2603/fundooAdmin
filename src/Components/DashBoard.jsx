import React, { Component } from 'react';
import AdminServices from '../Services/AdminServices'
import '../SCSS/DashBoard.css'
import Pagination from "react-js-pagination"
const adminServices = new AdminServices()
class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            basic: '',
            advance: '',
            keyword: '',
            currentPage: 1,
            usersPerPage: 4
        }
    }
    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }

    GetStatistics = () => {
        adminServices.GetStatistic().then(response => {
            console.log("response", response.data.data);
            this.setState({ basic: response.data.data.Basic, advance: response.data.data.Advanced })
        })
    }
    GetUsers = () => {
        adminServices.GetUsers().then(response => {
            this.setState({ users: response.data.data })
            console.log("dncjn", response.data.data);

        })
    }
    componentDidMount = () => {
        this.GetStatistics();
        this.GetUsers();
    }
    logout = () => {
        localStorage.removeItem("token", "Name")
        this.props.history.push('/')
    }
    render() {
        const { users, currentPage, usersPerPage } = this.state;
        const indexOfLastTodo = currentPage * usersPerPage;
        const indexOfFirstTodo = indexOfLastTodo - usersPerPage;
        const currentTodos = users.slice(indexOfFirstTodo, indexOfLastTodo);
        const table = currentTodos.map((element, index) => {
            return (
                <tr key={index}>
                    <td>{4 * (this.state.currentPage - 1) + index + 1}</td>
                    <td>{element.firstName}</td>
                    <td>{element.lastName}</td>
                    <td>{element.email}</td>
                    <td>{element.type}</td>
                </tr>
            )
        })



        return (
            <div style={{ overflow: 'hidden' }}>

                <nav className="navbar" style={{ backgroundColor: 'lightgray' }}>
                    {localStorage.getItem("Name")}
                    <div style={{ width: '70%' }}>
                        <input className="form-control d-block" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    <button onClick={this.logout}>
                        logout
                        </button>

                </nav>
                <div className="row d-flex justify-content-center" style={{ marginTop: '26px', marginBottom: '26px' }}>
                    <div className="col-lg-4">
                        <div className="col-lg-12 mx-auto">
                            BASIC
                    </div>
                        <div className="avatar">
                            {this.state.basic}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="col-lg-12 mx-auto">
                            ADVANCE
                </div>
                        <div className="avatar">

                            {this.state.advance}
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 mx-auto table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead style={{ backgroundColor: 'rosybrown' }}>
                            <tr>
                                <th>Id</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>

                </div>
                <div className="container"  >
                    <div>
                        <Pagination
                            prevPageText='prev'
                            nextPageText='next'
                            activePage={this.state.currentPage}
                            itemsCountPerPage={this.state.usersPerPage}
                            totalItemsCount={users.length}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default DashBoard