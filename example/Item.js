import React, { Component } from 'react';
import axios from 'axios';

class Item extends Component {
    constructor(props){
        super(props);
        this.state= {
            showSkill: '',
            arraySkill: this.props.obj.skill,
        }
        
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.resourceName}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.department}</td>
                <td>{this.props.obj.jobTitle}</td>
                <td>{this.props.obj.skill.toString()}</td>
                <td>{this.props.obj.notes}</td>
                <td>
                    <button onClick={()=>this.props.handleDelete(this.props.obj)} type="button" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '30px', fontSize: '9px', marginRight: '2px' }}>delete</button>
                    <button onClick={()=>this.props.handleEdit(this.props.obj)} type="button" className="btn btn-primary btn-sm" style={{ width: '32px', height: '30px', fontSize: '10px' }}>Edit</button>
                </td>

            </tr>
        );
    }
}

export default Item;