import React, {Component} from 'react';
import {Card, CardImg, CardText,CardBody,CardTitle,List} from 'reactstrap';


class DishDetail extends Component{
    
    render(){
        console.log(this.props.dish.name)
        const renderComments = this.props.dish.comments.map((comment)=>{
            return(
                <List type="unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </List>

            );
        }); 

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg  width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle tag="h5">{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
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