import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
// import logo from './logo.svg';
//import './App.css';
import Item from './Item';
import ItemEdit from './ItemEdit';
import SweetAlert from 'sweetalert-react';
import './../node_modules/sweetalert/dist/sweetalert.css';
import axios from 'axios';
import NavCustom from './NavCustom';
import { configConsumerProps } from 'antd/lib/config-provider';
import { Modal, Spin, Empty, Pagination } from "antd";
import { DemoData } from '../src/index';
import MultiSelectReact from 'multi-select-react';
import './Basiccss.css';
import { Layout, Menu, Icon, Input, Avatar } from 'antd';
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

class CrudResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: [],
      itemEdit: [],
      idEdit: '',
      editDepartment: '',
      editName: '',
      editEmail: '',
      editJobTitle: '',
      editSkill: [],
      editNote: '',
      editSkillMaster: '',

      showModal: false,
      showModalEdit: false,
      fullname: '',
      email: '',
      department: '',
      job_title: '',
      skill: '',
      notes: '',

      arrayDepartment: [],
      arrayJobTile: [],
      arraySkill: [],

      loading: true,
      multiSelect: [],
      multiSelectTmp: [],
      nameSkill: '',
      skillMaster: '',

      totalElement: 0,
      pageIndex: 1,
      pageSize: 5,
      checkEditMulti: false,

      nameSearch: '',
      emailSearch: '',
      departmentSearch: '',
      jobSearch: '',
      skillSearch: '',
    }
  }

  componentWillMount() {
    let arrayList = [];
    for (let i = 0; i < DemoData.skill.length; i++) {
      let tmp = {
        "label": DemoData.skill[i].nameSkill,
        "value": false,
      }
      arrayList.push(tmp);
    }
    this.setState({
      multiSelect: arrayList,
      multiSelectTmp: arrayList,
    })
    console.log("ddd", this.state.multiSelect);
  }

  loadData = () => {
    let { pageIndex, pageSize } = this.state;
    let newe = pageIndex - 1;
    console.log("toi day");
    axios({
      method: 'GET',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource?pageIndex=' + newe + '&pageSize=' + pageSize,
      data: {
        // "pageIndex": 1,
        // "pageSize": 2
      }
    }).then(res => {
      console.log("Resaaaa", res);
      this.setState({
        showList: res.data.resource,
        totalElement: res.data.myPage.totalElements,
      }, this.displayData);

    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.loadData();
    let arrayDep = [];
    if (DemoData.department.length > 0) {
      for (let i = 0; i < DemoData.department.length; i++) {
        arrayDep.push(DemoData.department[i].nameDepartment);
      }
    }
    this.setState({
      arrayDepartment: arrayDep
    })

    let arrayJob = [];
    if (DemoData.jobtitle.length > 0) {
      for (let i = 0; i < DemoData.jobtitle.length; i++) {
        arrayJob.push(DemoData.jobtitle[i].nameJob);
      }
    }
    this.setState({
      arrayJobTile: arrayJob
    })

    let arraySkill = []
    if (DemoData.skill.length > 0) {
      for (let i = 0; i < DemoData.skill.length; i++) {
        arraySkill.push(DemoData.skill[i].nameSkill);
      }
    }
    this.setState({
      arraySkill: arraySkill
    })


  }

  handleDelete = (obj) => {
    let { showList } = this.state;
    console.log("testdata", this.state.showList);
    console.log("id", obj._id);
    axios({
      method: 'DELETE',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/' + obj._id,
      data: {

      }
    }).then(res => {
      console.log(res);
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
      });
      alert("Xoa thanh cong!");
    }).catch(err => {
      console.log(err);
    });
  }

  handleEdit = (obj) => {
    let { multiSelect } = this.state;
    console.log("skill edit", multiSelect);
    const string = obj.skill;
    if (obj.skill.length == 1) {
      this.setState({
        editSkillMaster: obj.skill[0],
        editSkill: '',
      })
    } else if (obj.skill.length > 1) {
      let tmpSkill = '';
      obj.skill.forEach((item) => {
        tmpSkill = tmpSkill + ',' + item;
      })
      for (let i = 0; i < multiSelect.length; i++) {
        for (let j = 1; j < obj.skill.length; j++) {
          if (multiSelect[i].label === obj.skill[j]) {
            multiSelect[i].value = true;
          }
        }
      }
      this.setState({
        editSkillMaster: obj.skill[0],
        editSkill: tmpSkill.slice(1),
        multiSelect: multiSelect,
      })
      console.log("phu", tmpSkill.slice(1));
    }

    this.setState({
      itemEdit: obj,
      idEdit: obj._id,
      department: obj.department,
      editName: obj.resourceName,
      editDepartment: obj.department,
      editEmail: obj.email,
      editJobTitle: obj.jobTitle,
      editNote: obj.notes,
      showModalEdit: true,
    });

    console.log("item", this.state.multiSelect);

  }

  onChangeEditDepartment = (value) => {
    console.log("department", value);
    this.setState({
      editDepartment: value,
    })
  }

  onChangeEditNameResource = (value) => {
    console.log("name resource", value);
    this.setState({
      editName: value,
    });
  }

  onChangeEditEmail = (value) => {
    console.log("email", value);
    this.setState({
      editEmail: value,
    })
  }

  onChangeEditJobTitle = (value) => {
    console.log("job", value);
    this.setState({
      editJobTitle: value,
    })
  }

  onChangeEditSkill = (value) => {
    this.setState({
      editSkill: value
    })
  }

  onChangeEditNote = (value) => {
    console.log("note", value);
    this.setState({
      editNote: value
    })
  }

  onClickEditCancel = () => {
    this.setState({
      idEdit: '',
    })
  }

  onClickSave = () => {
    let { showList, editDepartment, editName, editEmail, editJobTitle, editSkill, editNote, idEdit, editSkillMaster, nameSkill, checkEditMulti, multiSelect } = this.state;
    let arraySkillPost = [];
    let stringTmp = '';
    arraySkillPost.push(editSkillMaster);
    if (checkEditMulti) {
      let arraySkill_ = nameSkill.split(',');
      arraySkill_.forEach((item) => {
        arraySkillPost.push(item);
      })
    } else {
      for (let i = 0; i < multiSelect.length; i++) {
        if (multiSelect[i].value) {
          stringTmp = stringTmp + ',' + multiSelect[i].label;
          arraySkillPost.push(multiSelect[i].label);
        }
      }
      stringTmp = stringTmp.slice(1);
    }

    axios({
      method: 'PUT',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/' + idEdit,
      data: {
        "resourceName": editName,
        "email": editEmail,
        "department": editDepartment,
        "jobTitle": editJobTitle,
        "skill": arraySkillPost,
        "notes": editNote
      }
    }).then(res => {
      console.log("aaaaaaaaaaaaa", res);
      for (let i = 0; i < showList.length; i++) {
        if (idEdit === showList[i]._id) {
          showList[i].resourceName = editName;
          showList[i].email = editEmail;
          showList[i].department = editDepartment;
          showList[i].jobTitle = editJobTitle;
          showList[i].skill = editSkillMaster + ',' + stringTmp;
          showList[i].notes = editNote;
          break;
        }
      }
      this.setState({
        showList: showList,
        idEdit: '',
        showModalEdit: false,
        checkEditMulti: false,
      })
      alert("Sua thanh cong!");
    }).catch(err => {
      console.log(err);
    });

  }

  rederItem = () => {
    let { showList, idEdit, itemEdit, editName, editDepartment, editEmail, editJobTitle, editSkill, editNote, arrayDepartment, arrayJobTile, arraySkill } = this.state;

    return showList.map((object, i) => {
      return <Item
        obj={object}
        key={i}
        // skill = {skill}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEdit}
      />
    });
  }

  openModal = () => {
    this.setState({
      showModal: true,
    })
  }

  handleOk = () => {
    let { showList, fullname, email, department, job_title, skill, notes, nameSkill, skillMaster } = this.state;
    let arraySkillPost = [];
    arraySkillPost.push(skillMaster);
    let arraySkill_ = nameSkill.split(',');
    arraySkill_.forEach((item) => {
      arraySkillPost.push(item);
    })

    this.setState({
      skill: skillMaster + ',' + nameSkill,
    })
    console.log("skill", skillMaster + ',' + nameSkill);
    axios({
      method: 'POST',
      url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/create',
      data: {
        "resourceName": fullname,
        "email": email,
        "department": department,
        "jobTitle": job_title,
        "skill": arraySkillPost,
        "notes": notes
      }
    }).then(res => {
      console.log(res);
      let addList = { resourceName: fullname, email: email, department: department, jobTitle: job_title, skill: skillMaster + ',' + nameSkill, notes: notes };
      showList.push(addList);
      this.setState({
        showList: showList,
        showModal: false,
        checkEditMulti: false,
      });
      alert("Them thanh cong!");
    }).catch(err => {
      console.log(err);
    });
  }

  handleCancel = () => {
    this.setState({
      showModal: false,
      fullname: '',
      email: '',
      department: '',
      job_title: '',
      nameSkill: '',
      notes: '',
      skillMaster: '',
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

  onChangeEdit = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    console.log(e);
    this.setState({
      [name]: value
    });
  }

  showSelectDepartment = () => {
    let { arrayDepartment } = this.state;
    Object.assign({}, arrayDepartment);
    console.log("qqqqqqqqqq", arrayDepartment);
    return arrayDepartment.map((value, index) => {
      switch (index) {
        case index:
          return <option key={index} value={value}>{value}</option>
      }
    })
  }

  showSelectJobtitle = () => {
    let { arrayJobTile } = this.state;
    Object.assign({}, arrayJobTile);
    return arrayJobTile.map((value, index) => {
      switch (index) {
        case index:
          return <option key={index} value={value}>{value}</option>
      }
    })
  }

  showSelectSkill = () => {
    let { arraySkill } = this.state;
    Object.assign({}, arraySkill);
    return arraySkill.map((value, index) => {
      switch (index) {
        case index:
          return <option key={index} value={value}>{value}</option>
      }
    })
  }

  displayData = () => {
    this.setState({
      loading: false,
    });
  }

  optionClicked(optionsList) {
    this.setState({ multiSelect: optionsList });
  }
  selectedBadgeClicked(optionsList) {

    console.log("test skill", optionsList);
    this.setState({ multiSelect: optionsList });
    let { nameSkill } = this.state;
    let tmp = '';
    for (let i = 0; i < optionsList.length; i++) {
      if (optionsList[i].value) {
        tmp = tmp + ',' + optionsList[i].label
      }
    }
    this.setState({
      nameSkill: tmp.substring(1),
      checkEditMulti: true,
    })
    console.log("chon", nameSkill);
  }

  handleOkEdit = () => {
    this.setState({
      showModalEdit: false,
    })
  }

  handleCancelEdit = () => {
    let { multiSelect } = this.state;
    for (let i = 0; i < multiSelect.length; i++) {
      multiSelect[i].value = false;
    }
    console.log("tat");
    this.setState({
      showModalEdit: false,
      editSkillMaster: '',
      editSkill: '',
      multiSelect: multiSelect,
    })
  }

  onChangePagination = (current, pageSize) => {
    this.setState({
      pageIndex: current,
      pageSize: pageSize,
    }, this.loadData);
    console.log("curen", current);
    console.log("pageSixe", pageSize);
  }

  getFilter = () => {
    let { nameSearch, emailSearch, departmentSearch, jobSearch, skillSearch } = this.state;
    let arrayt = [];
    if (nameSearch != '') {
      arrayt.push({ "value": nameSearch, "title": "resourceName" });
    }
    if (emailSearch != '') {
      arrayt.push({ "value": emailSearch, "title": "email" });
    }
    if (departmentSearch != '') {
      arrayt.push({ "value": departmentSearch, "title": "department" });
    }
    if (jobSearch != '') {
      arrayt.push({ "value": jobSearch, "title": "jobTitle" });
    }
    if (skillSearch != '') {
      arrayt.push({ "value": skillSearch, "title": "skill" })
    }

    let url = 'https://demo-app-tool-nodejs.herokuapp.com/api/resource?';
    for (let i = 0; i < arrayt.length; i++) {
      url = url + arrayt[i].title + '=' + arrayt[i].value + '&';
    }
    url = url.slice(0, url.length - 1);
    // console.log("day la test",url.slice(0,url.length-1));
    axios({
      method: 'GET',
      url: url,
      data: {

      }
    }).then(res => {
      console.log("ket qua", res);
      this.setState({
        showList: res.data.resource,
      }, this.displayData);

    }).catch(err => {
      console.log(err);
    });
  }

  loadApi = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
      loading: true,
    }, this.getFilter)
  }

  render() {
    let { fullname, email, department, job_title, skill, notes, skillMaster, totalElement, pageIndex } = this.state;
    let { editName, editEmail, editDepartment, editJobTitle, editNote, editSkillMaster } = this.state;
    let { nameSearch, emailSearch, departmentSearch, jobSearch, skillSearch } = this.state;
    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
      backgroundColor: "#dff0d8",
      color: "#3c763d"
    };
    return (
      <div>
        {/* <NavCustom /> */}
        <div className="container">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8"></div>
                <div className="col-sm-4">
                  <button type="button" onClick={this.openModal} className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <Search
                    placeholder="search name"
                    onSearch={value => console.log("dydydy", value)}
                    name="nameSearch"
                    value={nameSearch}
                    onChange={this.loadApi}
                    style={{ width: 150 }}
                  />
                </div>
                <div className="col-sm-2">
                  <Search
                    placeholder="search email"
                    onSearch={value => console.log(value)}
                    style={{ width: 150 }}
                    name="emailSearch"
                    value={emailSearch}
                    onChange={this.loadApi}
                  />
                </div>
                <div className="col-sm-2">
                  <Search
                    placeholder="search department"
                    onSearch={value => console.log(value)}
                    style={{ width: 150 }}
                    name="departmentSearch"
                    value={departmentSearch}
                    onChange={this.loadApi}
                  />
                </div>
                <div className="col-sm-2">
                  <Search
                    placeholder="search job"
                    onSearch={value => console.log(value)}
                    style={{ width: 150 }}
                    name="jobSearch"
                    value={jobSearch}
                    onChange={this.loadApi}
                  />
                </div>
                <div className="col-sm-2">
                  <Search
                    placeholder="search skill"
                    onSearch={value => console.log(value)}
                    style={{ width: 150 }}
                    name="skillSearch"
                    value={skillSearch}
                    onChange={this.loadApi}
                  />
                </div>
              </div>
            </div>
            <Spin spinning={this.state.loading}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Job Title</th>
                    <th>Skill</th>
                    <th>Notes</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.rederItem()}
                </tbody>
              </table>
              <Pagination
                style={{ margin: "auto", textAlign: "center", marginTop: "10px", }}
                onChange={this.onChangePagination}
                defaultCurrent={1}
                current={pageIndex}
                pageSize={5}
                total={totalElement}
              />
            </Spin>

          </div>
        </div>
        <Modal
          title="ADD RESOURCE"
          visible={this.state.showModal}

          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="container">
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputEmail1" className="fontsize">Full Name</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="fullname"
                  value={fullname}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">Email</label>
              </div>
              <div className="col-8">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="exampleInputPassword1"
                  placeholder=""
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">Department</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control form-control-sm"
                  name="department"
                  value={department}
                  onChange={this.onChange}
                >
                  <option></option>
                  {this.showSelectDepartment()}
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">Job Title</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control form-control-sm"
                  name="job_title"
                  value={job_title}
                  onChange={this.onChange}
                >
                  <option></option>
                  {this.showSelectJobtitle()}
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">skill master</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control form-control-sm"
                  name="skillMaster"
                  value={skillMaster}
                  onChange={this.onChange}
                >
                  <option></option>
                  {this.showSelectSkill()}
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">skill extra</label>
              </div>
              <div className="col-8">
                <MultiSelectReact
                  options={this.state.multiSelect}
                  optionClicked={this.optionClicked.bind(this)}
                  selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                  selectedOptionsStyles={selectedOptionsStyles}
                  optionsListStyles={optionsListStyles}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label for="exampleFormControlTextarea1" className="fontsize">Notes</label>
              </div>
              <div className="col-8">
                <textarea
                  class="form-control form-control-sm"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="notes"
                  value={notes}
                  onChange={this.onChange}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          title="EDIT RESOURCE"
          visible={this.state.showModalEdit}

          onOk={this.onClickSave}
          onCancel={this.handleCancelEdit}
        >
          <div className="container">
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputEmail1" className="fontsize">Full Name</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="editName"
                  value={editName}
                  onChange={this.onChangeEdit}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">Email</label>
              </div>
              <div className="col-8">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="exampleInputPassword1"
                  placeholder=""
                  name="editEmail"
                  value={editEmail}
                  onChange={this.onChangeEdit}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">Department</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control form-control-sm"
                  name="editDepartment"
                  value={editDepartment}
                  onChange={this.onChangeEdit}
                >
                  <option></option>
                  {this.showSelectDepartment()}
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">Job Title</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control form-control-sm"
                  name="editJobTitle"
                  value={editJobTitle}
                  onChange={this.onChangeEdit}
                >
                  <option></option>
                  {this.showSelectJobtitle()}
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">skill master</label>
              </div>
              <div className="col-8">
                <select
                  className="form-control form-control-sm"
                  name="editSkillMaster"
                  value={editSkillMaster}
                  onChange={this.onChangeEdit}
                >
                  <option></option>
                  {this.showSelectSkill()}
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">skill extra</label>
              </div>
              <div className="col-8">

                <MultiSelectReact
                  options={this.state.multiSelect}
                  optionClicked={this.optionClicked.bind(this)}
                  selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                  selectedOptionsStyles={selectedOptionsStyles}
                  optionsListStyles={optionsListStyles}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label for="exampleFormControlTextarea1" className="fontsize">Notes</label>
              </div>
              <div className="col-8">
                <textarea
                  className="form-control form-control-sm"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="editNote"
                  value={editNote}
                  onChange={this.onChangeEdit}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CrudResource;
