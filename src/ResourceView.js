import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'antd/lib/icon';
import { Modal, Spin, Button } from "antd";
import axios from 'axios';

class ResourceView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showResorceName: '',
            showEmail: '',
            showDepartment: '',
            showJobtitle: '',
            showSkill: '',
            showNotes: '',
        }
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        contentScrollbarHeight: PropTypes.number.isRequired,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func,
        toggleExpandFunc: PropTypes.func
    }

    openModal = () => {
        console.log("name", this.state.showResorceName);
        console.log("email", this.state.showEmail);
        this.setState({
            showModal: true,
        })
    }

    loadItem = (value) => {
        console.log("value", value.slotId);
        axios({
            method: 'GET',
            url: 'https://demo-app-tool-nodejs.herokuapp.com/api/resource/' + value.slotId,
            data: null
        }).then(res => {
            console.log("Res", res);
            this.setState({
                showResorceName: res.data.resource.resourceName,
                showEmail: res.data.resource.email,
                showDepartment: res.data.resource.department,
                showJobtitle: res.data.resource.jobTitle,
                showSkill: res.data.resource.skill,
                showNotes: res.data.resource.notes,
            }, this.openModal);
        }).catch(err => {
            console.log(err);
        });
    }

    handleCancel = () => {
        this.setState({
            showModal: false,
        })
    }

    render() {
        let { showResorceName, showDepartment, showEmail, showJobtitle, showSkill, showNotes } = this.state;
        const { schedulerData, contentScrollbarHeight, slotClickedFunc, slotItemTemplateResolver, toggleExpandFunc } = this.props;
        const { renderData } = schedulerData;

        let width = schedulerData.getResourceTableWidth() - 2;
        let paddingBottom = contentScrollbarHeight;
        let displayRenderData = renderData.filter(o => o.render);
        let resourceList = displayRenderData.map((item) => {
            let indents = [];
            // console.log("trang chu", item);
            for (let i = 0; i < item.indent; i++) {
                indents.push(<span key={`es${i}`} className="expander-space"></span>);
            }
            let indent = <span key={`es${item.indent}`} className="expander-space"></span>;
            if (item.hasChildren) {
                indent = item.expanded ? (
                    <Icon type="minus-square" key={`es${item.indent}`} style={{}} className=""
                        onClick={() => {
                            if (!!toggleExpandFunc)
                                toggleExpandFunc(schedulerData, item.slotId);
                        }} />
                ) : (
                        <Icon type="plus-square" key={`es${item.indent}`} style={{}} className=""
                            onClick={() => {
                                if (!!toggleExpandFunc)
                                    toggleExpandFunc(schedulerData, item.slotId);
                            }} />
                    );
            }
            indents.push(indent);

            let a = slotClickedFunc != undefined ? <span className="slot-cell">{indents}<a className="slot-text" onClick={() => {
                slotClickedFunc(schedulerData, item);
            }}>{item.slotName}</a></span>
                : <span className="slot-cell">{indents}<span className="slot-text">{item.slotName}</span></span>;
            let slotItem = (
                <div title={item.slotName} className="overflow-text header2-text" style={{ textAlign: "left" }}>
                    <a href="#" onClick={() => this.loadItem(item)}>{a}</a>
                </div>
            );
            if (!!slotItemTemplateResolver) {
                let temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                if (!!temp)
                    slotItem = temp;
            }

            let tdStyle = { height: item.rowHeight };
            if (item.groupOnly) {
                tdStyle = {
                    ...tdStyle,
                    backgroundColor: schedulerData.config.groupOnlySlotColor
                };
            }

            return (
                <tr key={item.slotId}>
                    <td data-resource-id={item.slotId} style={tdStyle}>
                        {slotItem}
                    </td>
                </tr>
            );
        });

        return (
            <div style={{ paddingBottom: paddingBottom }}>
                <table className="resource-table">
                    <tbody>
                        {resourceList}
                    </tbody>
                </table>
                <Modal
                    title="Deteil Resorce"
                    visible={this.state.showModal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="container" style={{ fontSize: '15px' }}>
                        <div className="row form-group">
                            <div className="col-2"></div>
                            <div className="col-3" style={{ textAlign: 'right' }}>
                                <label htmlFor="exampleInputEmail1" className="fontsize">Name</label>
                            </div>
                            <div className="col-7">
                                {showResorceName}
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-2"></div>
                            <div className="col-3" style={{ textAlign: 'right' }}>
                                <label htmlFor="exampleInputPassword1" className="fontsize">Email</label>
                            </div>
                            <div className="col-7">
                                {showEmail}
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-2"></div>
                            <div className="col-3" style={{ textAlign: 'right' }}>
                                <label htmlFor="exampleInputPassword1" className="fontsize">Department</label>
                            </div>
                            <div className="col-7">
                                {showDepartment}
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-2"></div>
                            <div className="col-3" style={{ textAlign: 'right' }}>
                                <label for="exampleFormControlTextarea1" className="fontsize">Job</label>
                            </div>
                            <div className="col-7">
                                {showJobtitle}
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-2"></div>
                            <div className="col-3" style={{ textAlign: 'right' }}>
                                <label for="exampleFormControlTextarea1" className="fontsize">Skill</label>
                            </div>
                            <div className="col-7">
                                {showSkill}
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-2"></div>
                            <div className="col-3" style={{ textAlign: 'right' }}>
                                <label for="exampleFormControlTextarea1" className="fontsize">Notes</label>
                            </div>
                            <div className="col-7">
                                {showNotes}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ResourceView