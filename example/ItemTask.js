import React, { Component } from 'react';
import moment from 'moment'

class ItemTask extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.resourceName}</td>
                <td>{this.props.obj.projectName}</td>
                <td>{this.props.obj.percent}</td>
                <td>{new moment(this.props.obj.startDate).format('DD-MM-YYYY')}</td>
                <td>{new moment(this.props.obj.endDate).format('DD-MM-YYYY')}</td>
                <td>{this.props.obj.detail}</td>
                <td>
                    <button onClick={() => this.props.handleDelete(this.props.obj)} type="button" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '30px', fontSize: '9px', marginRight: '2px' }}>delete</button>
                    <button onClick={() => this.props.handleEdit(this.props.obj)} type="button" className="btn btn-primary btn-sm" style={{ width: '32px', height: '30px', fontSize: '10px' }}>Edit</button>
                </td>
            </tr>
        );
    }
}

export default ItemTask;