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
import { Layout, Menu, Icon, Input, Avatar, Table, Divider, Select } from 'antd';
import Async, { makeAsyncSelect } from 'react-select/async';
import AsyncSelect from 'react-select/async';
import { Link } from 'react-router-dom';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: '1',
    lastName: 'Nguyen Tien Duy',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
      pageSize: 10,
      checkEditMulti: false,

      nameSearch: '',
      emailSearch: '',
      departmentSearch: '',
      jobSearch: '',
      skillSearch: [],

      inputValue: '',
      value: 'ocean',

      nameError: '',
      emailError: '',
      departmentError: '',
      jobError: '',
      skillError: '',
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
      url: 'https://rmgit.topicanative.edu.vn/api/resource?pageIndex=' + newe + '&pageSize=' + pageSize,
      data: {
        // "pageIndex": 1,
        // "pageSize": 2
      }
    }).then(res => {
      if (res.data.resource.length > 0) {
        for (let i = 0; i < res.data.resource.length; i++) {
          let j = res.data.resource[i].skill.toString();
          res.data.resource[i].skill = j;
        }
        console.log("Resaaaa", res.data.resource);
      }

      this.setState({
        showList: res.data.resource,
        totalElement: res.data.myPage.totalElements,
      },this.displayData);

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
      url: 'https://rmgit.topicanative.edu.vn/api/resource/' + obj._id,
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
    console.log("zzzz", obj);
    let stringg = obj.skill.split(',');
    console.log("ojoj", stringg);
    if (stringg.length == 1) {
      this.setState({
        editSkillMaster: stringg[0],
        editSkill: '',
      })
    } else if (stringg.length > 1) {
      let tmpSkill = '';
      stringg.forEach((item) => {
        tmpSkill = tmpSkill + ',' + item;
      })
      for (let i = 0; i < multiSelect.length; i++) {
        for (let j = 1; j < stringg.length; j++) {
          if (multiSelect[i].label === stringg[j]) {
            multiSelect[i].value = true;
          }
        }
      }
      this.setState({
        editSkillMaster: stringg[0],
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

    console.log("skill master", stringg[0]);


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
      url: 'https://rmgit.topicanative.edu.vn/api/resource/' + idEdit,
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
      fullname: '',
      email: '',
      department: '',
      job_title: '',
      skill: '',
      notes: '',
      nameSkill: '',
      skillMaster: '',
    })
  }

  validateEmail = (email) => {
    var result = false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      if (email.slice(-13, email.length) === "topica.edu.vn") {
        result = true;
      }
    }
    return result;
  }

  validate = () => {
    let nameError = '';
    let emailError = '';
    let departmentError = '';
    let jobError = '';
    let skillError = '';

    if (!this.state.fullname) {
      nameError = "Name cannot be blank!";
    }

    if (!this.state.email) {
      emailError = "Email cannot be blank!";
    } else if (!this.validateEmail(this.state.email)) {
      emailError = "Invalid email examplle@topica.edu.vn!";
    }

    if (!this.state.job_title) {
      jobError = "Job cannot be blank!";
    }

    if (!this.state.skillMaster) {
      skillError = "Skill master cannot be blank!";
    }

    if (nameError || emailError || jobError || skillError) {
      this.setState({ nameError, emailError, departmentError, jobError, skillError });
      return false;
    }

    return true;

  }

  handleOk = () => {
    let { showList, fullname, email, department, job_title, skill, notes, nameSkill, skillMaster } = this.state;
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        loading: true,
      })
      let arraySkillPost = [];
      arraySkillPost.push(skillMaster);
      nameSkill.forEach((item) => {
        arraySkillPost.push(item);
      })

      this.setState({
        skill: skillMaster + ',' + nameSkill,
      })
      console.log("skill", skillMaster + ',' + nameSkill);
      axios({
        method: 'POST',
        url: 'https://rmgit.topicanative.edu.vn/api/resource/create',
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
          showModal: false,
          checkEditMulti: false,
          fullname: '',
          email: '',
          department: '',
          job_title: '',
          skillMaster: '',
          nameSkill: '',
          notes: '',
        }, this.loadData);
      }).catch(err => {
        console.log(err);
      });
    }

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
      nameError: '',
      emailError: '',
      departmentError: '',
      jobError: '',
      skillError: '',
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

  onChanMultiSkill = (value) => {
    this.setState({
      nameSkill: value,
    })
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
    if (departmentSearch === "All") {
      departmentSearch = '';
    }
    if (jobSearch === "All") {
      jobSearch = '';
    }
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
    if (skillSearch.length != 0) {
      arrayt.push({ "value": skillSearch, "title": "skill" })
    }

    let url = 'https://rmgit.topicanative.edu.vn/api/resource?';
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
      if (res.data.resource.length > 0) {
        for (let i = 0; i < res.data.resource.length; i++) {
          let j = res.data.resource[i].skill.toString();
          res.data.resource[i].skill = j;
        }
        console.log("Resaaaa", res.data.resource);
      }
      console.log("test total", res.data.myPage.totalElements)
      this.setState({
        showList: res.data.resource,
        totalElement: res.data.myPage.totalElements,
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

  showEditDepartment = (value) => {
    console.log("sssyysys", value);
  }

  //department
  showSelectDep = () => {
    let { arrayDepartment } = this.state;
    Object.assign({}, arrayDepartment);
    return arrayDepartment.map((value, index) => {
      switch (index) {
        case index:
          return <Option key={index} value={value}>{value}</Option>
      }
    })
  }

  onChangeSearchDepartment = (e) => {
    console.log("department", e);
    this.setState({
      departmentSearch: e,
      loading: true,
    }, this.getFilter);
  }
  //search job
  showSelectJob = () => {
    let { arrayJobTile } = this.state;
    Object.assign({}, arrayJobTile);
    return arrayJobTile.map((value, index) => {
      switch (index) {
        case index:
          return <Option key={index} value={value}>{value}</Option>
      }
    })
  }

  onChangeSearchJob = (e) => {
    this.setState({
      jobSearch: e,
      loading: true,
    }, this.getFilter);
  }
  // search skill
  handleChangeSearchSkill = (value) => {
    this.setState({
      skillSearch: value,
      loading: true,
    }, this.getFilter);
  }

  //search skill
  showSelectEditSkill = () => {
    let { arraySkill } = this.state;
    Object.assign({}, arraySkill);
    return arraySkill.map((value, index) => {
      switch (index) {
        case index:
          return <Option key={index} value={value}>{value}</Option>
      }
    })
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
          <div className="row">
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ marginBottom: "10px" }}>
              <button type="button" onClick={this.openModal} className="ant-btn ant-btn-danger" style={{ backgroundColor: "#cc3e31", color: "white" }}><span>Thêm mới</span></button>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ marginBottom: "10px" }}>
              <Search
                placeholder="search name"
                onSearch={value => console.log("dydydy", value)}
                name="nameSearch"
                value={nameSearch}
                onChange={this.loadApi}
                style={{ width: 150 }}
              />
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ marginBottom: "10px" }}>
              <Search
                placeholder="search email"
                onSearch={value => console.log(value)}
                style={{ width: 150 }}
                name="emailSearch"
                value={emailSearch}
                onChange={this.loadApi}
              />
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ marginBottom: "10px" }}>
              <Select
                showSearch
                style={{ width: 150 }}
                placeholder="search department"
                optionFilterProp="children"
                onChange={this.onChangeSearchDepartment}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={value => console.log("search project", value)}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.showSelectDep()}
              </Select>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ marginBottom: "10px" }}>
              <Select
                showSearch
                style={{ width: 150 }}
                placeholder="search Job"
                optionFilterProp="children"
                onChange={this.onChangeSearchJob}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={value => console.log("search project", value)}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.showSelectJob()}
              </Select>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ marginBottom: "10px" }}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Search skill"
                // defaultValue={['a10', 'c12']}
                onChange={this.handleChangeSearchSkill}
              >
                {this.showSelectEditSkill()}
              </Select>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ margin: "auto" }}>
              <Spin spinning={this.state.loading}>
                <Table dataSource={this.state.showList} style={{ border: '1px solid #c6d2e4' }} pagination={false}>
                  {/* <ColumnGroup title="Name"> */}
                  <Column title="Full Name" dataIndex="resourceName" key="resourceName" />
                  <Column title="Email" dataIndex="email" key="email" />
                  <Column title="Department" dataIndex="department" key="department" />
                  <Column title="Job Title" dataIndex="jobTitle" key="jobTitle" />
                  <Column title="Skill" dataIndex="skill" key="skill" />
                  <Column title="Notes" dataIndex="notes" key="notes" />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <a onClick={() => this.handleEdit(record)}><Icon type="edit" /></a>
                        <Divider type="vertical" />
                        <a onClick={this.showDeleteDepartment}><Icon type="delete" /></a>
                      </span>
                    )}
                  />
                </Table>
              </Spin>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ margin: "auto" }}>
              <Pagination
                style={{ margin: "auto", textAlign: "center", marginTop: "10px", }}
                onChange={this.onChangePagination}
                defaultCurrent={1}
                current={pageIndex}
                pageSize={this.state.pageSize}
                total={totalElement}
              />
            </div>
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
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.nameError}
                </div>
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
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.emailError}
                </div>
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
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.jobError}
                </div>
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
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.skillError}
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-3">
                <label htmlFor="exampleInputPassword1" className="fontsize">skill extra</label>
              </div>
              <div className="col-8">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder=""
                  // defaultValue={['a10', 'c12']}
                  onChange={this.onChanMultiSkill}
                >
                  {this.showSelectEditSkill()}
                </Select>
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
