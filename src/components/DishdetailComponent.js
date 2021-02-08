import React, {Component} from 'react';
import {Card, CardImg, CardText,CardBody,CardTitle,List} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }
  
    render(){
        const renderComments = this.props.dishSelect.comments.map((comment)=>{
            return(
                <List type="unstyled">
                    <li>--{comment.author}, {comment.date}</li>
                    
                    <li>{comment.comment}</li>
                </List>

            );
        }); 

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg  width="100%" src={this.props.dishSelect.image} alt={this.props.dishSelect.name} />
                            <CardBody>
                                <CardTitle tag="h5">{this.props.dishSelect.name}</CardTitle>
                                <CardText>{this.props.dishSelect.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-10">
                        <div><h4>Comments</h4></div>
                        
                        {renderComments}
                    </div>
                </div>
            </div>
        );
    }
}
export default DishDetail;