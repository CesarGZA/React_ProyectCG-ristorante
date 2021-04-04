import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Button, Modal, ModalBody, ModalHeader, Label, Row, Col} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

/* ----------------------------------· 3 assigment ------------------------------------------- */

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return(
            <div className="commentform">
                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-gruop">
                                <Label className="col-12 bold" htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    
                                </Col>
                            </Row>
                            <Row className="form-gruop"> 
                            <Label className="col-12 " htmlFor="author">Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-gruop ">
                                <Label className="col-12 bold" htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="7"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <br></br>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            )
    }
}
/* --------------------------------------------------------------------------- */

    function RenderDishDetails({dish}){
        console.log(dish.name)
            return( 
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg  width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle tag="h5">{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );      
    }
    function RenderComments({comments, addComment, dishId}){
        if(comments != null)
            return(
                <div className="col-12 col-md-5 m-10 ">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment)=>{
                            return(
                               <li key={comment.id}>
                                   <p>{comment.comment}</p>
                                   <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                   <hr></hr>
                               </li> 
                            );
                        })}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        else
            return(
                <div></div>
            );
    }
        
    

    const DishDetail = (props)=>{
        console.log(props.dish.name)
        
        if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDishDetails dish = {props.dish}/>
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}/>
                        
                    </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

export default DishDetail;