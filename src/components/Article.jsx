import React, { Component } from 'react';
import C from '../constants';
import {Col,Button, ButtonGroup} from 'react-bootstrap';


class Article extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	submit(e) {
		e.preventDefault();
		this.props.submitArticleEdit(this.refs.article.value);
		this.refs.article.value = '';
	}
	render() {
		let button;
		if (this.props.status === C.ARTICLE_EDITING) {
			return (
				<form onSubmit={this.submit}>
					<div className="input-group">
						<input className="form-control" ref="article" defaultValue={this.props.article.content} />
						<span className="input-group-btn">
							<Button bsStyle="danger" type="button" onClick={this.props.cancelArticleEdit}>Cancel</Button>
						</span>
						<span className="input-group-btn">
							<Button bsStyle="success" type="submit" onClick={this.submit}>Submit</Button>
						</span>
					</div>
					<hr/>
				</form>
			);
		}
		if (!this.props.canEdit) {
			button = '';
		} else if (this.props.status === C.ARTICLE_SUBMITTING) {
			button = <Button disabled="disabled">Submitting...</Button>;
		} else {
			button = (
				<ButtonGroup>
					<Button bsStyle="info" onClick={this.props.startArticleEdit}>Edit</Button>
					<Button bsStyle="danger" onClick={this.props.deleteArticle}>Delete</Button>
				</ButtonGroup>
			);
		}
		return (
			<div>
				<Col md={8}>
					<b>{`${this.props.article.username}: `}</b>
					<em>{this.props.article.content}</em>
				</Col>
				<Col md={4}>
				{button}
				</Col>
				<br/>
				<hr/>
			</div>
		);
	}
}

export default Article;
