import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ItemEditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStart: new Date(this.props.editStart),
            dateEnd: new Date(this.props.editEnd)
        };
        // this.dateChange = this.dateChange.bind(this);
    }

    dateChangeEditStart = value => {
        // let {dateChangeS} = this.props;
        // dateChangeS(value);
        this.setState({
            dateStart: value
        });
        this.props.onChanvalueEditStart(value)
    }

    dateChangeEditEnd = value => {
        this.setState({
            dateEnd: value
        });
        this.props.onChangevalueEditEnd(value)
    }

    render() {
        return (
            <tr>
                <td>
                    <input type="text" className="form-control" value={this.props.editNameRes} onChange={(event) => this.props.onChangeEditNameRes(event.target.value)}/>
                </td>
                <td>
                    <input type="text" className="form-control" value={this.props.editNamePro} onChange={(event) => this.props.onChangeEditNamePro(event.target.value)}/>
                </td>
                <td>
                    <input type="text" className="form-control" value={this.props.editPercent} onChange={(event) => this.props.onChangeEditPercent(event.target.value)}/>
                </td>
                <td>
                    <DatePicker className="form-control" selected={this.state.dateStart} onChange={this.dateChangeEditStart} dateFormat="yyyy-dd-MM HH:mm:ss" />
                </td>
                <td>
                    <DatePicker className="form-control" selected={this.state.dateEnd} onChange={this.dateChangeEditEnd} dateFormat="yyyy-dd-MM HH:mm:ss" />
                </td>
                <td>
                    <textarea type="text" value={this.props.editDetail} onChange={(event) => this.props.onChangeEditDetail(event.target.value)} >

                    </textarea>
                </td>
                <td>
                    <button type="button" onClick={() => this.props.onClickEditCancel()} className="btn btn-secondary btn-sm" style={{ width: '40px', height: '30px', fontSize: '9px', marginRight: '2px' }}>cancel</button>
                    <button type="button" onClick={() => this.props.onClickEditSave()} className="btn btn-primary btn-sm" style={{ width: '32px', height: '30px', fontSize: '10px' }}>save</button>
                </td>
            </tr>
        );
    }
}

export default ItemEditTask;