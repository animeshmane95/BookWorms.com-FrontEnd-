import React from 'react'
import '../CSS/course.css'

export default class EventCard extends React.Component
{
    constructor(props) {
        super(props);

    }


    render() {
        return (

            <div  className="col-5 row-3">
                <div className="card text-white bg-dark mb-3" style={{width: "15rem", height: "15rem"}}>
                    <div className="card-header"><i className="fa fa-calendar-check-o" aria-hidden="true"></i><h5 style={{textAlign: "center"}}>{this.props.eventCard.dateOfEvent}</h5></div>
                    <div className="card-body" >
                        <h5 className="card-title">{this.props.eventCard.title}</h5>

                    </div>

                        <button onClick={() => {this.props.delete(this.props.eventCard.id)}}
                                className="btn btn-dark float-right">
                            Delete
                        </button>

                </div>

            </div>

        )
    }}