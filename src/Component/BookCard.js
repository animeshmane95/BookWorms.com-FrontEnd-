
import React from 'react'




export default class BookCard extends React.Component
{

    constructor(props){

        super(props)


    }




    render(){

        return (


            <div className="card" style={{width: "13rem",height: "18rem",margin: "5px"}}>
                <div className="card-img booksimg">
                <img id="image12" className="card-img-top" src="https://media.giphy.com/media/12cfPQIOSlNj8Y/giphy.gif" alt="Card image cap" height="286rem"/>
                </div>
                    <div className="card-body booksbdy" id="infoi">
                        <a href="" className="card-title">{this.props.title}</a>

                    </div>
            </div>







        )




    }


}