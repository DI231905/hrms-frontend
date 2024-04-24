import React from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './imagecropper.css';
import { Grid , Button } from '@material-ui/core';


class ImageCropper extends React.Component {

    constructor() {
        super();
        this.state = {
            imageDestination: ''
        };
        this.imageElement = React.createRef();
    }

    componentDidMount() {
        const cropper = new Cropper(this.imageElement.current, {
            zoomable: false,
            scalable: false,
            aspectRatio: this.props.isSquare ? 1 : (16/9),
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                this.setState({ imageDestination: canvas.toDataURL('image/jpeg') });
            }
        });
    }

    render() {
        const { imageDestination } = this.state;
        const { croppedImg, src,setImgSet,cancelPopUp } = this.props;
        return (
            <div>
                <Grid container justify="space-between">
                    <Grid md={8} xl={8} className="img-container"> 
                        <img ref={this.imageElement} src={src} alt="Source" crossOrigin="true" />
                    </Grid>
                    <Grid md={4} xl={4}>
                        <div>
                            <img src={imageDestination} className="img-preview" width={this.props.isSquare ? '200px' : '300px' } alt="Destination" />
                        </div>
                    </Grid>
       
                </Grid>     
                <Button className="buttonDesign3 customBtn-h36" variant="contained" onClick={() => croppedImg(imageDestination)} style={{ float: 'right', marginBottom: '20px', marginRight: '50px'}}>Submit</Button>       
                <Button className="buttonDesign3 customBtn-h36" variant="contained" onClick={() => cancelPopUp()}  style={{float:'right',marginBottom:'20px',marginRight:'20px'}}>cancel</Button>  
            </div>
        );
    }

}

export default ImageCropper;