import React, { Component } from 'react';
import { connect } from 'react-redux';
import {submitArticle, startArticleEdit, cancelArticleEdit, submitArticleEdit, deleteArticle } from '../actions/articles';
import {Col} from 'react-bootstrap';
import Article from './Article';

class Articles extends Component {
	constructor() {
		super();
		this.submitNewArticle = this.submitNewArticle.bind(this);
	}
	submitNewArticle(e) {
		if (!this.props.articles.submitting) {
			e.preventDefault();
			if (this.refs.newArticle.value) {
				this.props.submitArticle(this.refs.newArticle.value);
			}
			this.refs.newArticle.value = '';
		}
	}
	render() {
		let rows = [];
		if (this.props.articles.data) {
			rows = Object.keys(this.props.articles.data).reverse().map((qid) => {
				const article = this.props.articles.data[qid];
				const status = this.props.articles.status[qid];
				/* eslint-disable react/jsx-no-bind */
				const thisStartArticleEdit = this.props.startArticleEdit.bind(this, qid);
				const thisCancelArticleEdit = this.props.cancelArticleEdit.bind(this, qid);
				const thisSubmitArticleEdit = this.props.submitArticleEdit.bind(this, qid);
				const thisDeleteArticle = this.props.deleteArticle.bind(this, qid);
				/* eslint-enable react/jsx-no-bind */
				return (
					<Article
						key={qid}
						qid={qid}
						article={article}
						status={status}
						canEdit={this.props.auth.uid === article.uid}
						startArticleEdit={thisStartArticleEdit}
						cancelArticleEdit={thisCancelArticleEdit}
						submitArticleEdit={thisSubmitArticleEdit}
						deleteArticle={thisDeleteArticle}
					/>
				);
			});
		}
		let content;
		if (this.props.auth.uid) {
			content = (
				<div>
					<form onSubmit={this.submitNewArticle}>
						<Col mdOffset={3} md={6}>
							<div className="input-group">
								<input className="form-control" ref="newArticle" placeholder="write something clever!" />
								<span className="input-group-btn">
									<button className="btn btn-primary" type="submit" disabled={this.props.articles.submittingNew}>
										{this.props.articles.submittingNew ? 'Submitting...' : 'Submit'}
									</button>
								</span>
							</div>
						</Col>
					</form>
				</div>
			);
		} else {
			content = <Col mdOffset={3} md={6}>
			<b>Log in to add a new article of your own!</b>
			</Col>;
		}
		const rowsOrLoading = this.props.articles.hasReceivedData ? rows	: 'Loading articles...';
		return (
			<div>
				{content}
				<br/>
				<br/>
				<br/>
				<br/>
				<Col mdOffset={3} md={6}>
					{this.props.articles.errorMessage
						? <p>{this.props.articles.errorMessage}</p>
						: rowsOrLoading
					}
				</Col>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		articles: state.articles,
		auth: state.auth
	};
};

const mapDispatchToProps = {
	submitArticle,
	startArticleEdit,
	cancelArticleEdit,
	submitArticleEdit,
	deleteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
