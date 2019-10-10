import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
//import 'moment/locale/zh-cn';
// import 'antd/lib/style/index.less';     //Add this code for locally example
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, DemoData } from '../src/index'
//import Popup from 'reactjs-popup';
// import Popup from 'react-popup';
import './Basiccss.css';
import withDragDropContext from './withDnDContext'
import { Modal, Spin, Pagination } from "antd"
import axios from 'axios';
import { Layout, Menu, Icon, Avatar, Input, Select, DatePicker } from 'antd';
import { Link, NavLink } from 'react-router-dom'

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const { Header, Content, Footer, Sider } = Layout;

class Basic extends Component {
    constructor(props) {
        super(props);

        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let schedulerData = new SchedulerData('2019-09-01', ViewTypes.Month);
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData,

            tmp: schedulerData,
            showModal: false,
            startDate: "",
            endDate: "",
            resourceName: "",
            startTime: "",
            endTime: "",
            namePro: "",
            nameDetail: "",
            id: 0,
            testresourceId: "",
            newsch: schedulerData,
            startDateNow: 0,
            endDateNow: 0,
            color: "",
            percent: "",
            task: [],
            person: [],
            dataproject: [],
            arrayproject: [],
            nextData: [],

            loading: true,
            totalElement: 0,
            pageIndex: 1,
            pageSize: 5,

            resourceSearch: '',
            projectSearch: '',
            percentSearch: '',
            startSearch: 0,
            endSearch: 0,
        }
    }

    handleOk = (e) => {
        let { startDateNow, endDateNow, testresourceId } = this.state;
        console.log("name", this.state.resourceName);
        console.log("start", { startDateNow });
        console.log("end", { endDateNow });
        console.log("namePro", this.state.namePro);
        console.log("percent", this.state.percent);
        console.log("detail", this.state.nameDetail);
        console.log("resourceid");
        axios({
            method: 'POST',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/task/create',
            data: {
                "resourceName": this.state.resourceName,
                "startDate": startDateNow,
                "endDate": endDateNow,
                "projectName": this.state.namePro,
                "percent": this.state.percent,
                "detail": this.state.nameDetail,
                "resourceId": testresourceId,
            }
        }).then(res => {
            console.log(res);
            this.setState({
                showModal: false,
            });
            this.getAutodata();
        }).catch(err => {
            console.log(err);
        });
    }
    reloadPage = () => {
        location.reload();
    }
    getAutodata = () => {
        let { startDateNow, endDateNow, resourceName, namePro, nameDetail, startTime, endTime, id, testresourceId, startDate, endDate, newsch } = this.state;
        // const str1 = startDate + ' 09:00:00';
        // const str2 = endDate + ' 18:00:00';
        // const newStartDate = moment(str1, 'YYYY-MM-DD HH:mm:ss');
        // const newEndDate = moment(str2, 'YYYY-MM-DD HH:mm:ss');
        let newColor = '';
        for (let i = 0; i < this.state.dataproject.length; i++) {
            if (this.state.namePro === this.state.dataproject[i].nameProject) {
                newColor = this.state.dataproject[i].color;
                break;
            }
        }
        let newEvent = {
            id: '',
            title: this.state.namePro,
            start: startDateNow,
            end: endDateNow,
            resourceId: this.state.testresourceId,
            bgColor: newColor,
        }
        let pram = {};
        pram.id = this.state.id;
        pram.title = this.state.namePro;
        pram.start = this.state.startDate;
        console.log("data", pram);
        newsch.addEvent(newEvent);
        this.setState({
            viewModel: newsch
        })
        this.setState({
            showModal: false,
        });
        console.log(namePro);
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    };

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        console.log("namePro", this.state.namePro);
        console.log("ma mau", this.state.color);
    }

    componentDidMount() {
        this.getData();
    }

    getDataResource = () => {
        let { viewModel } = this.state;
        let { pageIndex, pageSize } = this.state;
        let newe = pageIndex - 1;
        axios({
            method: 'GET',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource?pageIndex=' + newe + '&pageSize=' + pageSize,
            data: {

            }
        }).then(res => {
            this.setState({
                person: res.data.resource,
                totalElement: res.data.myPage.totalElements,
            });
            if (this.state.person.length > 0) {
                for (let i = 0; i < this.state.person.length; i++) {
                    viewModel.addResource({ id: this.state.person[i]._id, name: this.state.person[i].resourceName });
                    this.setState({
                        viewModel: viewModel
                    });
                    axios({
                        method: 'GET',
                        url: 'https://demo-app-tool-nodejs.herokuapp.com/api/task?resourceName=' + this.state.person[i].resourceName,
                        data: {

                        }
                    }).then(res => {
                        if (res.data.task.length > 0) {
                            for (let k = 0; k < res.data.task.length; k++) {
                                // let datestart = new moment(this.state.task[i].startDate).format('YYYY-MM-DD 00:00:00');
                                // console.log("end", new moment(this.state.task[i].endDate).format('YYYY-MM-DD 23:59:59'));
                                let newColor = '';
                                for (let j = 0; j < this.state.dataproject.length; j++) {
                                    if (res.data.task[k].projectName === this.state.dataproject[j].nameProject) {
                                        newColor = this.state.dataproject[j].color;
                                        break;
                                    }
                                }
                                let newEvent = {
                                    id: res.data.task[k]._id,
                                    title: res.data.task[k].projectName,
                                    start: res.data.task[k].startDate,
                                    end: res.data.task[k].endDate,
                                    resourceId: this.state.person[i]._id,
                                    bgColor: newColor,
                                }
                                this.state.nextData.push(newEvent);
                                viewModel.addEvent(newEvent);
                                this.setState({
                                    viewModel: viewModel
                                })
                            }
                            this.displayData();
                        }
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }

    async getData() {
        await axios({
            method: 'GET',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/project',
            data: null
        }).then(res => {
            this.setState({
                dataproject: res.data.project,
            });
            let array = [];
            if (this.state.dataproject.length > 0) {
                for (let i = 0; i < this.state.dataproject.length; i++) {
                    array.push(this.state.dataproject[i].nameProject);
                }
            }
            this.setState({
                arrayproject: array
            });

        }).catch(err => {
            console.log(err);
        })

        console.log("giua");

        let { viewModel } = this.state;
        await this.getDataResource();
        //let { viewModel } = this.state;

        // console.log("gggg", this.state.person);
        // await axios({
        //     method: 'GET',
        //     url: 'https://demo-app-tool-nodejs.herokuapp.com/api/task',
        //     data: null
        // }).then(res => {
        //     this.setState({
        //         task: res.data.task,
        //     }, this.displayData);
        //     if (this.state.task.length > 0) {
        //         for (let i = 0; i < this.state.task.length; i++) {
        //             let datestart = new moment(this.state.task[i].startDate).format('YYYY-MM-DD 00:00:00');
        //             console.log("end", new moment(this.state.task[i].endDate).format('YYYY-MM-DD 23:59:59'));
        //             let newColor = '';
        //             for (let j = 0; j < this.state.dataproject.length; j++) {
        //                 if (this.state.task[i].projectName === this.state.dataproject[j].nameProject) {
        //                     newColor = this.state.dataproject[j].color;
        //                     break;
        //                 }
        //             }
        //             let newEvent = {
        //                 id: this.state.task[i]._id,
        //                 title: this.state.task[i].projectName,
        //                 start: this.state.task[i].startDate,
        //                 end: this.state.task[i].endDate,
        //                 resourceId: this.state.task[i].resourceId,
        //                 bgColor: newColor,
        //             }
        //             this.state.nextData.push(newEvent);
        //             viewModel.addEvent(newEvent);
        //             this.setState({
        //                 viewModel: viewModel
        //             })
        //         }
        //     }
        // }).catch(err => {
        //     console.log(err);
        // })

    }

    showSelect = () => {
        let { arrayproject } = this.state;
        Object.assign({}, arrayproject);
        return arrayproject.map((value, index) => {
            switch (index) {
                case index:
                    return <option key={index} value={value}>{value}</option>
            }
        })
    }

    filterData = (value) => {
        alert(value);
    }

    displayData = () => {
        this.setState({
            loading: false,
        });
    }

    onChangePagination = (current, pageSize) => {
        this.state.viewModel.resources = [];
        this.setState({
            pageIndex: current,
            pageSize: pageSize,
        }, this.getDataResource);
        console.log("curen", current);
        console.log("pageSixe", pageSize);
    }

    //search
    onChangeSearch = (e) => {
        console.log("viewmodal", this.state.viewModel);
        var target = e.target;
        var name = target.name;
        var value = target.value;
        console.log(e);
        this.setState({
            [name]: value,
            loading: true,
        }, this.filterSearch);
    }

    onChangeSearchProject = (e) => {
        this.setState({
            projectSearch: e,
            loading: true,
        }, this.filterSearch);
    }

    onChangeDate = (date, dateString) => {
        let dateStartObj = moment(date[0]._d).unix() * 1000;
        let dateEndObj = moment(date[1]._d).unix() * 1000;
        this.setState({
            startSearch: dateStartObj,
            endSearch: dateEndObj,
            loading: true,
        }, this.filterSearch)
    }

    filterSearch = () => {
        let { viewModel, resourceSearch, projectSearch, percentSearch, startSearch, endSearch } = this.state;
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
        if (startSearch != 0) {
            arraySearch.push({ "value": startSearch, "title": "startDate" });
        }
        if (endSearch != 0) {
            arraySearch.push({ "value": endSearch, "title": "endDate" });
        }
        let url = 'https://demo-app-tool-nodejs.herokuapp.com/api/task?';
        for (let i = 0; i < arraySearch.length; i++) {
            url = url + arraySearch[i].title + '=' + arraySearch[i].value + '&';
        }
        url = url.slice(0, url.length - 1);
        console.log("url", url);
        axios({
            method: 'GET',
            url: url,
            data: {

            }
        }).then(res => {
            console.log("jdd", res);
            if (res.data.task.length > 0) {
                this.state.viewModel.resources = [];
                this.state.viewModel.events = [];
                for (let i = 0; i < res.data.task.length; i++) {
                    if (i == 0) {
                        viewModel.addResource({ id: res.data.task[i].resourceId, name: res.data.task[i].resourceName });
                        this.setState({
                            viewModel: viewModel,
                            loading: true,
                        }, this.displayData);
                    }
                    else if (i > 0 && res.data.task[i - 1].resourceId != res.data.task[i].resourceId) {
                        viewModel.addResource({ id: res.data.task[i].resourceId, name: res.data.task[i].resourceName });
                        this.setState({
                            viewModel: viewModel,
                            loading: true,
                        }, this.displayData);
                    }
                    let newColor = '';
                    for (let j = 0; j < this.state.dataproject.length; j++) {
                        if (res.data.task[i].projectName === this.state.dataproject[j].nameProject) {
                            newColor = this.state.dataproject[j].color;
                            break;
                        }
                    }
                    let newEvent = {
                        id: res.data.task[i]._id,
                        title: res.data.task[i].projectName,
                        start: res.data.task[i].startDate,
                        end: res.data.task[i].endDate,
                        resourceId: res.data.task[i].resourceId,
                        bgColor: newColor,
                    }
                    this.state.nextData.push(newEvent);
                    viewModel.addEvent(newEvent);
                    this.setState({
                        viewModel: viewModel,
                        loading: true,
                    }, this.displayData)
                    // axios({
                    //     method: 'GET',
                    //     url: 'https://demo-app-tool-nodejs.herokuapp.com/api/task?resourceName=' + this.state.person[i].resourceName,
                    //     data: {

                    //     }
                    // }).then(res => {
                    //     if (res.data.task.length > 0) {
                    //         this.state.viewModel.events = [];
                    //         for (let k = 0; k < res.data.task.length; k++) {
                    //             // let datestart = new moment(this.state.task[i].startDate).format('YYYY-MM-DD 00:00:00');
                    //             // console.log("end", new moment(this.state.task[i].endDate).format('YYYY-MM-DD 23:59:59'));
                    //             let newColor = '';
                    //             for (let j = 0; j < this.state.dataproject.length; j++) {
                    //                 if (res.data.task[k].projectName === this.state.dataproject[j].nameProject) {
                    //                     newColor = this.state.dataproject[j].color;
                    //                     break;
                    //                 }
                    //             }
                    //             let newEvent = {
                    //                 id: res.data.task[k]._id,
                    //                 title: res.data.task[k].projectName,
                    //                 start: res.data.task[k].startDate,
                    //                 end: res.data.task[k].endDate,
                    //                 resourceId: this.state.person[i]._id,
                    //                 bgColor: newColor,
                    //             }
                    //             this.state.nextData.push(newEvent);
                    //             viewModel.addEvent(newEvent);
                    //             this.setState({
                    //                 viewModel: viewModel,
                    //                 loading: true,
                    //             }, this.displayData)
                    //         }
                    //     }
                    // });
                }
                ;
            }
        }).catch(err => {
            console.log(err);
        })
    }
    showSelectOption = () => {
        let { arrayproject } = this.state;
        Object.assign({}, arrayproject);
        return arrayproject.map((value, index) => {
            switch (index) {
                case index:
                    return <Option key={index} value={value}>{value}</Option>
            }
        })
    }

    render() {

        const { percentSearch, projectSearch, resourceSearch, pageIndex, totalElement, dataproject, viewModel, showModal, startDate, endDate, resourceName, startTime, endTime, namePro, nameDetail, id, testresourceId, newsch, startDateNow, endDateNow, color, percent } = this.state;


        return (
            <div>
                <Search
                    placeholder="search name resource"
                    onSearch={value => console.log("search resource", value)}
                    value={resourceSearch}
                    name="resourceSearch"
                    onChange={this.onChangeSearch}
                    style={{ width: 200, marginRight: '16px' }}
                />
                {/* </div> */}
                {/* <div className="col-sm-3"> */}
                <Select
                    showSearch
                    style={{ width: 200, marginRight: '16px' }}
                    placeholder="search project"
                    optionFilterProp="children"
                    // value={projectSearch}
                    onChange={this.onChangeSearchProject}
                    // onFocus={this.onFocus}
                    // onBlur={this.onBlur}
                    onSearch={value => console.log("search project", value)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectOption()}
                </Select>
                {/* </div> */}
                {/* <div className="col-sm-3"> */}
                <Search
                    placeholder="search percent"
                    // onSearch={value => console.log(value)}
                    name="percentSearch"
                    value={percentSearch}
                    onChange={this.onChangeSearch}
                    style={{ width: 200, marginRight: '16px' }}
                />
                {/* </div> */}
                {/* <div className="col-sm-3"> */}
                <RangePicker
                    onChange={this.onChangeDate}
                    format="DD-MM-YYYY"
                // value={projectSearch}
                />
                {/* </div> */}
                <div >
                    {/* <h3 style={{textAlign: 'center'}}>Basic example<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/Basic.js" /></h3> */}
                    <Spin spinning={this.state.loading}>
                        <Scheduler schedulerData={viewModel}
                            prevClick={this.prevClick}
                            nextClick={this.nextClick}
                            onSelectDate={this.onSelectDate}
                            onViewChange={this.onViewChange}
                            //eventItemClick={this.eventClicked}
                            viewEventClick={this.ops1}
                            viewEventText="Edit"
                            viewEvent2Text="Delete"
                            viewEvent2Click={this.ops2}
                            updateEventStart={this.updateEventStart}
                            updateEventEnd={this.updateEventEnd}
                            moveEvent={this.moveEvent}
                            newEvent={this.newEvent}
                            onScrollLeft={this.onScrollLeft}
                            onScrollRight={this.onScrollRight}
                            onScrollTop={this.onScrollTop}
                            onScrollBottom={this.onScrollBottom}
                            toggleExpandFunc={this.toggleExpandFunc}
                            filterData={this.filterData}
                        // popupEvent={this.popupEvent}
                        />
                        <Pagination
                            style={{ margin: "auto", textAlign: "center", marginTop: "10px", }}
                            onChange={this.onChangePagination}
                            defaultCurrent={1}
                            current={pageIndex}
                            pageSize="5"
                            total={totalElement}
                        />
                    </Spin>
                </div>
                <Modal
                    title="Thông tin yêu cầu"
                    visible={showModal}

                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="container">
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Resource
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label" >
                                <input
                                    type="text"
                                    value={resourceName}
                                    className="form-control form-control-sm"
                                    name="resourceName"
                                    onChange={this.onChange}
                                >
                                </input>
                            </label>
                        </div>
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                From
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <input
                                    type="text"
                                    value={startDate}
                                    className="form-control form-control-sm"
                                    name="startDate"
                                    onChange={this.onChange}
                                ></input>
                            </label>
                            <label className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-form-label">
                                to
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <input
                                    type="text"
                                    value={endDate}
                                    className="form-control form-control-sm"
                                    name="endDate"
                                    onChange={this.onChange}
                                ></input>
                            </label>
                        </div>

                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Project
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">

                                <select name="namePro" id="input" class="form-control" onChange={this.onChange} value={namePro}>
                                    {/* <option value=""></option> */}
                                    <option></option>
                                    {this.showSelect()}

                                </select>

                            </label>
                        </div>
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Percent
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <input
                                    type="text"
                                    // onChange={this.onChangePercent}
                                    className="form-control form-control-sm"
                                    value={percent}
                                    name="percent"
                                    onChange={this.onChange}

                                ></input>
                            </label>
                        </div>
                        <div className="row form-group">
                            <label className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-form-label">
                                Detail
                            </label>
                            <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-form-label">
                                <textarea
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={nameDetail}
                                    name="nameDetail"
                                    onChange={this.onChange}
                                ></textarea>
                            </label>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
    demo = value => {
        this.setState({
            namePro: value
        });
    }

    onChangeColor = event => {
        this.setState({
            color: event.target.value
        });
    }

    onChangeStartTime = event => {
        this.setState({
            startTime: event.target.value
        });
    }

    onChangeEndTime = event => {
        this.setState({
            endTime: event.target.value
        });
    }

    onChangeNamePro = event => {
        this.setState({
            namePro: event.target.value
        });
    };

    onChangeDetail = event => {
        this.setState({
            nameDetail: event.target.value
        });
    }

    prevClick = (schedulerData) => {
        schedulerData.prev();
        // schedulerData.setEvents(DemoData.events);
        schedulerData.setEvents(this.state.nextData);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData) => {
        schedulerData.next();
        // schedulerData.setEvents(DemoData.events);
        schedulerData.setEvents(this.state.nextData);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.state.nextData);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, day) => {
        console.log("test2");
        schedulerData.setDate(day);
        schedulerData.setEvents(this.state.nextData);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`Su kien vua duoc nhap: {id: ${event.id}, title: ${event.title}}`);

    };

    ops1 = (schedulerData, event) => {
        //alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        //alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
        alert('Ban co muon xoa khong?');
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        const beginDay = start.substr(0, 10);
        const endDay = end.substr(0, 10);
        let dateStartObj = moment(start).unix() * 1000;
        let dateEndObj = moment(end).unix() * 1000;
        console.log("tssss", dateStartObj);
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        console.log("ma mau", this.state.color);
        const newItem = newFreshId;
        //const newSlotId = slotId;
        console.log("id", slotId);
        //console.log("schedulerData2 schedulerData2", schedulerData);
        console.log("ngay bat dau", start);
        console.log("ngay ket thuc:", end);
        this.setState({
            showModal: true,
            startDate: beginDay,
            endDate: endDay,
            startDateNow: dateStartObj,
            endDateNow: dateEndObj,
            startTime: "9 am",
            endTime: "6 pm",
            resourceName: slotName,
            namePro: "",
            nameDetail: "",
            id: newItem,
            testresourceId: slotId,
            newsch: schedulerData
        });

        // if(confirm(`Do you want to create a new task? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

        // let newFreshId = 0;
        // schedulerData.events.forEach((item) => {
        //     if(item.id >= newFreshId)
        //         newFreshId = item.id + 1;
        // });

        // let newEvent = {
        //     id: newFreshId,
        //     title: 'New event you just created',
        //     start: start,
        //     end: end,
        //     resourceId: slotId,
        //     bgColor: 'purple'
        //     }
        //     schedulerData.addEvent(newEvent);
        //     this.setState({
        //         viewModel: schedulerData
        //     })
        // }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if (confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if (confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(DemoData.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default withDragDropContext(Basic)
