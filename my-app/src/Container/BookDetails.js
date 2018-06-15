import React from 'react'
import SearchContainer from './SearchContainer'
import Advertisement from './Advertisement'
import { Redirect } from 'react-router-dom'
import $ from "jquery";
import StarRatings from 'react-star-ratings';
import bookmark from '../Style/bookmark-icon.png'
import ErrorPage from "./ErrorPage";
import ReviewWidget from "./ReviewWidget";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';




class BookDetails extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.state = {
            isbn: '',
            imgthumb: '',
            books:'',
            isReader: false,
            isReviewer: false,
            err: false,
            redirectToLogin: false
        };

    }

    componentDidMount() {
        const { cookies } = this.props;
        var id = this.props.match.params.id;
        this.setState({isReader: cookies.get('isReader')})
        this.setState({isbn: id})
        this.find_preview(id)

    }




    find_preview(id)
    {
        var isbn = id
        fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn, {
            method: 'get',
        }).then(function(response) {return response.json()}).then((books) => {

            console.log(books)
            try {
                this.setState({books: books.items[0].volumeInfo})
                this.setState({imgthumb: books.items[0].id});
                }
            catch(err) {
                this.setState({ err: true })

            }


        });




    }

    changeRating( newRating, name ) {
        alert(newRating+" for "+name)

    }




    displayImage()
    {
            var link = '/bookPreview/'+this.state.isbn
            var img = 'https://books.google.com/books/content?id=:idkeyword:&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'.replace(":idkeyword:",this.state.imgthumb)
        return(
            <div style={{margin: "12px"}}>


                    <div className="parent">

                        <img className="image1" id="prviewImg" src={img} style={{width: "220px", height: "300px", cursor: "pointer"}} onClick={()=>{


                            if(this.state.isReader||this.state.isReviewer)
                            {
                                window.location.replace(link)
                                return

                            }

                            else
                            {

                                this.infoMsgs("Log In To Read Books ")
                                this.setState({redirectToLogin: true })
                            }

                        }
                        }/>
                        <img className="image2" src="https://media.giphy.com/media/puRciSJdfGCd2/giphy.gif"/>

                    </div>


            </div>
        )
    }

    infoMsgs(msg)
    {
        var x = document.getElementById("info")
        x.className = "show";

        if(!msg.startsWith("SUCCESSFULLY")){
            x.style.backgroundColor = "rgb(217, 56, 26)";
        }
        else
        {
            x.style.backgroundColor = "rgba(113, 217, 41, 1)";
        }
        x.innerHTML=msg;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2600);
    }



    render() {

        console.log(this.state.books.averageRating)
        let des = String(this.state.books.description);
        console.log(this.state.redirectToLogin)
        if (this.state.redirectToLogin) {
            return <Redirect to='/login'/>;
        }


        if (this.state.err) {
            return <Redirect to='/error'/>;
        }

        return(


            <div className="pageView">


                <div className="container-fluid">
                    <SearchContainer/>
                </div>

                <div>

                    <div className="row" style={{marginTop: "81px"}}>
                        <div className="col-sm-8 mainSec">


                            <div className="BooksContainer">
                                    <div className="bookBar container-fluid">
                                        <div className="bookName">
                                            <div style={{float: "left"}}>
                                            <img height="90px" width="120px" style={{marginTop: "-32px", marginRight: "-23px"}} src={bookmark}/>
                                            </div>
                                            <div className="wordwrap" style={{float: "left", marginRight: "-32px"}}>
                                                <h2>&nbsp;&nbsp;&nbsp;{this.state.books.title}</h2>
                                            </div>
                                        </div>
                                        <div className="bookRating">
                                            <div hidden={this.state.isReviewer}>
                                                <StarRatings starDimension="30px" starSpacing="2px" rating={this.state.books.averageRating} starRatedColor="#DAA520"  numberOfStars={5} name={this.state.isbn}/>
                                            </div>
                                            <div hidden={!this.state.isReviewer}>
                                                <StarRatings starDimension="30px" starSpacing="2px" rating={this.state.books.averageRating} starRatedColor="#DAA520" changeRating={this.changeRating} numberOfStars={5} name={this.state.isbn}/>
                                            </div>
                                            </div>
                                    </div>


                                <div className="bookBody">
                                    <div className="bookPreview">
                                        {this.displayImage()}

                                    </div>
                                    <div className="bookDescription form-control" >
                                        <h4 >Description</h4>
                                        <p >{des.substring(0,550)}...</p>
                                    </div>
                                    <div className="bookInfor">
                                        <b>Book Information</b><br/>
                                        <b>Page Count:</b>&nbsp;{this.state.books.pageCount}<br/>
                                        <b>Published Date:</b>&nbsp;{this.state.books.publishedDate}

                                    </div>

                                    <div className="bookInfo form-control" >

                                            <h4>Author</h4>
                                            <p>{this.state.books.authors}</p>

                                    </div>

                                </div>
                                <div className="reviewWidget" hidden={!this.state.isReviewer}>

                                    <ReviewWidget/>

                                </div>





                            </div>



                        </div>

                        <div className="col-sm-4 asideSec">
                            <Advertisement/>
                        </div>

                    </div>
                </div>

            </div>



        );
    }

}
export default withCookies(BookDetails);



