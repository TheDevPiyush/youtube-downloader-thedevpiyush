import React, { Component } from 'react'
export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            videoURL: "",
            videoID: "some",
            DownloadURL: "",
            title: "",

        }
    }


    getVideoId = () => {
        var url = `${this.state.videoURL}`
        let id = url.split("v=")[1].substring(0, 11)
        this.setState({ videoID: id }, () => {
        });

        setTimeout(() => {
            this.getVideo()
        }, 300);
    }


    getVideo = async () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ccbbb9265fmsh23310fd9f46a253p1c2e41jsn6a15149f6366',
                'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
            }
        };

        const url = await fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${this.state.videoID}`, options)

        let response = await url.json()
        this.setState({ DownloadURL: response.formats.pop().url, title : response.title })
    }

    render() {
        return (
            <>
                <div className="heading text-center">
                    <h2>
                        Enter URL of the youtube video
                    </h2>
                </div>

                <div className='text-center'>
                    <input onChange={(e) => { this.setState({ videoURL: e.target.value }) }} className='my-5 border border-danger border-5' type="text" />
                </div>

                <div className="button text-center my-3">
                    <div className="btn btn-primary" onClick={this.getVideoId}>
                        Enter
                    </div>

                </div>

                <div className="heading text-center ">
                    <h4>


                        {(this.state.DownloadURL.length > 1)
                            ?

                            <div className="text-info">
                                <div className="text-danger">
                                    About Video: <br />
                                </div>
                                Video Title : {this.state.title}
                                <a href={`${this.state.DownloadURL}`} target="_blank" rel="noreferrer"> Click Here To Download</a>
                            </div>
                            :
                            <div className="hello"></div>
                        }


                    </h4>
                </div>

            </>
        )
    }
}
