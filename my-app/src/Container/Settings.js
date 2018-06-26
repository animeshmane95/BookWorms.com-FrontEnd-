import React from 'react';
import '../CSS/profile.css';
import { instanceOf } from 'prop-types';
import FormData from 'form-data';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import Profile from "./Profile";

class Settings extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            file: "", imagePreviewUrl: " ",
            profile: " "
        }
    }

    componentDidMount() {
        if(this.props.profileSetting != undefined){
            console.log(this.props.profileSetting)
            this.setState({profile: this.props.profileSetting})
        }

    }


    UploadImage(e){
        const { cookies } = this.props;
        console.log(cookies.get('profile').id)

        e.preventDefault();

        console.log("UPLOAD", this.state.file);

        let file = this.state.file;
        console.log(file);

        let data = new FormData();
        data.append("file0", file);

        console.log(data);
        const config = {
            headers: { 'content-type': 'multipart/form-data'}
        };
        return axios.post('http://localhost:8080/api/user/'+ cookies.get('profile').id +'/coverPicture',data,config);


    }


    ImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        console.log(file);

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }


    updateProfile(userId){
        var email1= this.refs.email.value
        var dob1 = this.refs.dob.value;
        var bio1 = this.refs.bio.value;
        var category1 = this.refs.category.value;
        var fileName1 = this.state.file;
        console.log('Update called')

        this.state.user = {
            email:email1,
            bio:bio1,
            category:category1,
            dateOfBirth:dob1
        }

        console.log(this.state.user)


        return fetch('https://book-worms-server.herokuapp.com/api/user/' + userId, {

                method: 'put',
                body: JSON.stringify(this.state.user),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(function(response){return response.json()})


    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} width="400px" height="350px" />;
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }
        return (

            <div className="container-fluid">
                <h4 align="center">Settings</h4>

                <ul className="nav nav-tabs">
                    <li className="">
                        <a data-toggle="tab" href="#personal" style={{color: "black", fontFamily:"Cormorant Unicase"}}>Personal</a></li>
                    <li><a data-toggle="tab" href="#photo" style={{color: "black",fontFamily:"Cormorant Unicase"}}>Photo</a></li>
                    <li><a data-toggle="tab" href="#about" style={{color: "black",fontFamily:"Cormorant Unicase"}}>About Yourself</a></li>
                </ul>

                <div className="tab-content active">
                    <div id="personal" className="tab-pane"><br/>
                        EMAIL
                        <input type ="text" className="form-control" placeholder="Email" ref="email" value={this.state.profile.email}/><br/>
                        DATE OF BIRTH
                        <input type ="date" className="form-control" ref="dob" value={this.state.profile.date_of_birth}/>
                    </div>

                    <div id="photo" className="tab-pane"><br/>COVER PICTURE
                        <div className="previewComponent">
                            <form>
                                <input
                                    className="fileInput"
                                    type="file"
                                    onChange={e => this.ImageChange(e)}/>
                                <button
                                    className="submitButton"
                                    type="submit"
                                    onClick={e => this.UploadImage(e)}>
                                    Upload Image
                                </button>
                            </form>
                            <div className="imgPreview">{$imagePreview}</div>
                        </div>
                    </div>

                    <div id="about" className="tab-pane">
                        <br/>BIO
                        <textarea className="form-control" rows="5"  placeholder="Tell others something about yourself" ref="bio" value={this.state.profile.bio}></textarea>
                        <br/>
                        What are your favorite categories?
                        <form>
                            <div className="checkbox" ref="category" value={this.state.profile.category}>
                                <label><input type="checkbox" value="fiction"/>Fiction</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="nonFiction"/>Non-Fiction</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="thriller"/>Thriller</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="adventure"/>Adventure</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="romance"/>Romance</label>
                            </div>
                        </form>
                    </div>
                </div>
                <hr/>
                <button className="btn btn-outline-primary float-right"  onClick = {()=> {this.updateProfile(this.state.profile.id)
                                                                                              .then(window.location.reload())}}> UPDATE </button>
            </div>
        );
    }
}
export default withCookies(Settings);
