import React, { Component } from 'react';
import ItemTask from './ItemTask';
import axios from 'axios';
import { Modal, Pagination } from "antd";
import { Spin } from 'antd';
import moment from 'moment';
import DatePicker2 from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Input, Select, DatePicker, notification, Avatar } from 'antd';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;


const { Header, Content, Footer, Sider } = Layout;

class CrudTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: [],
            showModal: false,

            itemEdit: [],
            idEdit: '',
            editNameRes: '',
            editNamePro: '',
            editPercent: '',
            editStart: '',
            editEnd: '',
            editDetail: '',
            editResourceId: '',

            loading: true,

            totalElement: 0,
            pageIndex: 1,
            pageSize: 5,
            dateStart: new Date(),
            dateEnd: new Date(),

            arrayProject: [],
            dataproject: [],

            resourceSearch: '',
            projectSearch: '',
            percentSearch: '',
            startDateSearch: 0,
            endDateSearch: 0,
        }
    }

    loadData = () => {
        let { pageIndex, pageSize } = this.state;
        let newe = pageIndex - 1;
        axios({
            method: 'GET',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/task?pageIndex=' + newe + '&pageSize=' + pageSize,
            data: {

            }
        }).then(res => {
            console.log("du lieu nhan ve", res);
            this.setState({
                showList: res.data.task,
                totalElement: res.data.myPage.totalElements,
            }, this.displayData)
        }).catch(err => {
            console.log(err);
        })
    }

    loadDataProject = () => {
        axios({
            method: 'GET',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/project',
            data: null
        }).then(res => {
            this.setState({
                dataproject: res.data.project,
            });
            console.log("dataproject", res.data.project);
            let array = [];
            if (this.state.dataproject.length > 0) {
                for (let i = 0; i < this.state.dataproject.length; i++) {
                    array.push(this.state.dataproject[i].nameProject);
                }
            }
            this.setState({
                arrayProject: array
            });

        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.loadData();
        this.loadDataProject();
    }

    showSelect = () => {
        let { arrayProject } = this.state;
        Object.assign({}, arrayProject);
        return arrayProject.map((value, index) => {
            switch (index) {
                case index:
                    return <Option key={index} value={value}>{value}</Option>
            }
        })
    }

    rederItem = () => {
        let { showList, idEdit, itemEdit, editNameRes, editNamePro, editPercent, editStart, editEnd, editDetail } = this.state;
        return showList.map((object, i) => {
            return <ItemTask
                obj={object}
                key={i}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
            />
        })
    }

    onClickEditSave = () => {
        let { showList, idEdit, itemEdit, editNameRes, editNamePro, editPercent, editStart, editEnd, editDetail, editResourceId, dateStart, dateEnd } = this.state;
        let dateStartObj = moment(dateStart).unix() * 1000;
        let dateEndObj = moment(dateEnd).unix() * 1000;
        console.log("start", new moment(dateStartObj).format('DD-MM-YYYY'));
        axios({
            method: 'PUT',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/task/' + idEdit,
            data: {
                "resourceName": editNameRes,
                "startDate": dateStartObj,
                "endDate": dateEndObj,
                "projectName": editNamePro,
                "percent": editPercent,
                "detail": editDetail,
                "resourceId": editResourceId
            }
        }).then(res => {

            for (let i = 0; i < showList.length; i++) {
                if (idEdit === showList[i]._id) {
                    showList[i].resourceName = editNameRes;
                    showList[i].startDate = dateStartObj;
                    showList[i].endDate = dateEndObj;
                    showList[i].projectName = editNamePro;
                    showList[i].percent = editPercent;
                    showList[i].detail = editDetail;
                    showList[i].resourceId = editResourceId;
                    break;
                }
            }
            this.setState({
                showList: showList,
                idEdit: '',
                showModal: false,
            }, this.showNotifi);
        })
    }

    showNotifi = () => {
        notification.success({
            message: 'Edit success!',
        });
    }

    onChangevalueEditEnd = (value) => {
        let date = moment(value).format("YYYY-MM-DD HH:mm:ss");
        this.setState({
            editEnd: date,
        })
        console.log("end date", date);
    }

    onChanvalueEditStart = (value) => {
        let date = moment(value).format("YYYY-MM-DD HH:mm:ss");
        this.setState({
            editStart: date
        });
        console.log("start date", date);

    }

    onChangeEditNameRes = (value) => {
        console.log("name", value);
        this.setState({
            editNameRes: value,
        })
    }

    onChangeEditNamePro = (value) => {
        console.log("pro", value);
        this.setState({
            editNamePro: value,
        })
    }

    onChangeEditPercent = (value) => {
        console.log("per", value);
        this.setState({
            editPercent: value,
        })
    }

    onChangeEditDetail = (value) => {
        console.log("detail", value);
        this.setState({
            editDetail: value,
        })
    }

    handleDelete = (obj) => {
        let { showList } = this.state;
        axios({
            method: 'DELETE',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/task/' + obj._id,
            data: {

            }
        }).then(res => {
            if (showList.length > 0) {
                for (let i = 0; i < showList.length; i++) {
                    if (showList[i]._id === obj._id) {
                        showList.splice(i, 1);
                        break;
                    }
                }
            }
            this.setState({
                showList: showList,
            })
            alert("Xoa thanh cong!");
        }).catch(err => {
            console.log(err);
        })
    }

    handleEdit = (obj) => {
        this.setState({
            showModal: true,
            itemEdit: obj,
            idEdit: obj._id,
            editNameRes: obj.resourceName,
            editNamePro: obj.projectName,
            editPercent: obj.percent,
            editStart: obj.startDate,
            editEnd: obj.endDate,
            editDetail: obj.detail,
            editResourceId: obj.resourceId,
            dateStart: new Date(obj.startDate),
            dateEnd: new Date(obj.endDate),
        })
    }

    onClickEditCancel = () => {
        this.setState({
            idEdit: '',
        })
    }
    displayData = () => {
        this.setState({
            loading: false,
        });
    }

    onChangePagination = (current, pageSize) => {
        this.setState({
            pageIndex: current,
            pageSize: pageSize,
        }, this.loadData);
        console.log("curen", current);
        console.log("pageSixe", pageSize);
    }

    handleCancel = () => {
        this.setState({
            showModal: false,
        })
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        console.log(e);
        this.setState({
            [name]: value
        });

        console.log("kill", this.state.skill)
    }

    dateChangeEditEnd = (value) => {
        this.setState({
            dateEnd: value,
        })
    }

    dateChangeEditStart = (value) => {
        this.setState({
            dateStart: value,
        })
    }

    //filterProject
    onChangeSearchProject = (e) => {
        console.log("project", e);
        this.setState({
            projectSearch: e,
            loading: true,
        }, this.filterData);
    }

    onBlur() {
        console.log('blur');
    }

    onFocus() {
        console.log('focus');
    }

    onSearch(val) {
        console.log('search:', val);
    }
    onChangeDate = (date, dateString) => {
        let dateStartObj = moment(date[0]._d).unix() * 1000;
        let dateEndObj = moment(date[1]._d).unix() * 1000;
        this.setState({
            startDateSearch: dateStartObj,
            endDateSearch: dateEndObj,
            loading: true,
        }, this.filterData)
    }

    onChangeSearch = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        // console.log(e);
        this.setState({
            [name]: value,
            loading: true,
        }, this.filterData);
    }

    filterData = () => {
        let { resourceSearch, projectSearch, percentSearch, startDateSearch, endDateSearch } = this.state;
        let arraySearch = [];
        if (resourceSearch != '') {
            arraySearch.push({ "value": resourceSearch, "title": "resourceName" });
        }
        if (projectSearch != '') {
            arraySearch.push({ "value": projectSearch, "title": "projectName" });
        }
        if (percentSearch != '') {
            arraySearch.push({ "value": percentSearch, "title": "percent" });
        }
        if (startDateSearch != 0) {
            arraySearch.push({ "value": startDateSearch, "title": "startDate" });
        }
        if (endDateSearch != 0) {
            arraySearch.push({ "value": endDateSearch, "title": "endDate" });
        }
        let url = 'https://demo-app-tool-nodejs.herokuapp.com/api/task?';
        for (let i = 0; i < arraySearch.length; i++) {
            url = url + arraySearch[i].title + '=' + arraySearch[i].value + '&';
        }
        url = url.slice(0, url.length - 1);
        console.log("test", url);
        axios({
            method: 'GET',
            url: url,
            data: {

            }
        }).then(res => {
            console.log("ket qua", res);
            this.setState({
                showList: res.data.task,
            }, this.displayData);

        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        let { totalElement, pageIndex, idEdit, editNameRes, editNamePro, editPercent, editStart, editEnd, editDetail, editResourceId, dateStart, dateEnd } = this.state;
        let { resourceSearch, projectSearch, percentSearch, startDateSearch, endDateSearch } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-3">
                                    <Search
                                        placeholder="search name resource"
                                        onSearch={value => console.log("search resource", value)}
                                        value={resourceSearch}
                                        name="resourceSearch"
                                        onChange={this.onChangeSearch}
                                        style={{ width: 200 }}
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="search project"
                                        optionFilterProp="children"
                                        // value={projectSearch}
                                        onChange={this.onChangeSearchProject}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        onSearch={value => console.log("search project", value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.showSelect()}
                                    </Select>
                                </div>
                                <div className="col-sm-3">
                                    <Search
                                        placeholder="search percent"
                                        // onSearch={value => console.log(value)}
                                        name="percentSearch"
                                        value={percentSearch}
                                        onChange={this.onChangeSearch}
                                        style={{ width: 200 }}
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <RangePicker
                                        onChange={this.onChangeDate}
                                        format="DD-MM-YYYY 00:00:00"
                                    // value={projectSearch}
                                    />
                                </div>
                            </div>
                        </div>
                        <Spin spinning={this.state.loading}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name Resource</th>
                                        <th>Name Project</th>
                                        <th>Percent</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Detail</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.rederItem()}
                                </tbody>
                            </table>
                            <Pagination
                                // style={{ margin: "auto" }}
                                style={{ margin: "auto", textAlign: "center", marginTop: "10px", }}
                                onChange={this.onChangePagination}
                                defaultCurrent={1}
                                current={pageIndex}
                                pageSize="5"
                                total={totalElement}
                            />
                        </Spin>
                    </div>
                </div>
                <Modal
                    title="ADD RESOURCE"
                    visible={this.state.showModal}

                    onOk={this.onClickEditSave}
                    onCancel={this.handleCancel}
                >
                    <div className="container">
                        <div className="row form-group">
                            <div className="col-3">
                                <label htmlFor="exampleInputEmail1" className="fontsize">Name Resource</label>
                            </div>
                            <div className="col-8">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id=""
                                    aria-describedby=""
                                    placeholder=""
                                    name="editNameRes"
                                    value={editNameRes}
                                    onChange={this.onChange}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-3">
                                <label htmlFor="exampleInputPassword1" className="fontsize">Name Project</label>
                            </div>
                            <div className="col-8">
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="exampleInputPassword1"
                                    placeholder=""
                                    name="editNamePro"
                                    value={editNamePro}
                                    onChange={this.onChange}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-3">
                                <label htmlFor="exampleInputPassword1" className="fontsize">Percent</label>
                            </div>
                            <div className="col-8">
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="exampleInputPassword1"
                                    placeholder=""
                                    name="editPercent"
                                    value={editPercent}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-3">
                                <label htmlFor="exampleInputPassword1" className="fontsize">Start</label>
                            </div>
                            <div className="col-8">
                                <DatePicker2
                                    className="form-control"
                                    name={dateStart}
                                    selected={dateStart}
                                    onChange={this.dateChangeEditStart}
                                    dateFormat="yyyy-dd-MM HH:mm:ss"
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-3">
                                <label htmlFor="exampleInputPassword1" className="fontsize">End</label>
                            </div>
                            <div className="col-8">
                                <DatePicker2
                                    className="form-control"
                                    name={dateEnd}
                                    selected={dateEnd}
                                    onChange={this.dateChangeEditEnd}
                                    dateFormat="yyyy-dd-MM HH:mm:ss"
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-3">
                                <label for="exampleFormControlTextarea1" className="fontsize">Detail</label>
                            </div>
                            <div className="col-8">
                                <textarea
                                    class="form-control form-control-sm"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    name="editDetail"
                                    value={editDetail}
                                    onChange={this.onChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default CrudTask;