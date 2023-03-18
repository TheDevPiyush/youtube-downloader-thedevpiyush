import React, { Component } from 'react'

import './Home.css';

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            videoURL: "",
            videoID: "",
            DownloadURL: "",
            title: "",
            quality: "",
            loaded: false,
            showSpinner: false,

        }
    }



    getVideoId = () => {
        try {
            
            this.setState({ showSpinner: true, loaded:false })
            var url = `${this.state.videoURL}`
            let id = url.split("v=")[1].substring(0, 11)
            this.setState({ videoID: id }, () => {
            });
            setTimeout(() => {
                this.getVideo()
            }, 300);
        } catch {
            alert("Please enter a valid Youtube URL. Try again")
            this.setState({ showSpinner: false })

        }
    }


    getVideo = async () => {
        try {

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ccbbb9265fmsh23310fd9f46a253p1c2e41jsn6a15149f6366',
                    'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
                }
            };

            const url = await fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${this.state.videoID}`, options)

            let response = await url.json()
            this.setState({ DownloadURL: response.formats.pop().url, title: response.title, quality: response.formats.pop().qualityLabel, loaded: false, showSpinner: false, loaded: true })
        } catch {
            alert("Something went wrong from server side or the URL is invalid. Try again")
            this.setState({ showSpinner: false })
        }
    }

    render() {
        return (
            <>
                <div className="heading text-center">
                    <h2 className='my-3'>
                        Youtube Downloader - TheDevPiyush
                    </h2>
                    <div className="border border-2 border-white"></div>
                </div>

                <div className='text-center my-3'>
                    <input style={{ "height": "3.5rem", "width": "20rem", "textAlign": "center", "borderRadius": "30px" }} placeholder='Paste Youtube Video URL' onChange={(e) => { this.setState({ videoURL: e.target.value }) }} id="inputBox" className='my-4' type="text" />
                </div>

                <div className="button text-center my-2">
                    <div className="btn btn-lg btn-primary" onClick={this.getVideoId}>
                        Enter
                    </div>

                </div>

                <div className="heading text-center ">
                    <h4>
                        {
                            (this.state.showSpinner)
                                ?
                                <div class="spinner-border my-5 text-light" role="status">
                                    <span class="visually-hidden">Loaded...</span>
                                </div>
                                :
                                <div className="main"></div>
                        }

                        {(this.state.loaded)
                            ?

                            <ul class="list-group my-5 fs-5 list-group-flush border border-white border-3">
                                <li class="list-group-item py-4 bg-dark text-white ">"{this.state.title}"</li>
                                <li class="list-group-item py-4 bg-dark text-white ">"{this.state.quality}"</li>
                                <a href={`${this.state.DownloadURL}`} target="_blank" class="list-group-item py-3 list-group-item-action bg-dark text-white "><i class="fas fa-download"></i> Download <p> <i>
                                    This opens the video in a seperate tab. You've to select download in the video options there.</i> </p> </a>

                            </ul>


                            :
                            <div className="hello my-5">
                            </div>
                        }



                    </h4>
                </div>

            </>
        )
    }
}
