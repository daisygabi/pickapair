import React, {Component} from 'react';
import '../styles/App.scss';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {GENERATE_BUTTON, LOCATION_OF_OWNER_OF_APP, MADE_WITH, NAMES_ERROR_MSG, WEBSITE_TITLE} from "../utils/constants";
import ShowPairs from "./ShowPairs";
import {generateUniquePairs, shuffle} from "./utils/generateHelper";

const validation =
	Yup.object().shape({
		names: Yup.string()
			.required({NAMES_ERROR_MSG}),
	});

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pairs: [],
		}
	}

	render() {
		return (
			<main>
				<div className="container-fluid">
					<div className="row">
						<div
							className="d-flex flex-column col-sm-6 dashboard-section-wrapper align-items-center justify-content-center">
							<div>
								<img src={require('../img/logo.svg')} alt=""/>
							</div>
							<div className="mt-5 dashboard-wrapper">
								<h1 className="login-title">{WEBSITE_TITLE}</h1>
								<Formik id="generateForm"
									initialValues={{
										names: '',
									}}
									validationSchema={validation}
									onSubmit={fields => {this.generateRandomPairs(fields);}}
									render={({errors, status, touched}) => (
										<Form aria-label="Generate pairs form">
											<div className="form-group">
												<label htmlFor="names">Even your names</label>
												<Field name="names" type="text" label="Names" id="names"
													   className={'form-control' + (errors.names && touched.names ? ' is-invalid' : '')}/>
											</div>
											<div className="form-group">
												<button type="submit" className="btn btn-block action-btn"
														aria-label="generate pairs"
														id="generateBtn">{GENERATE_BUTTON}</button>
											</div>
										</Form>
									)}
								/>
								<span className="">{MADE_WITH}</span>
								<svg className="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16"
									 fill="red" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
								</svg>
								<span>{LOCATION_OF_OWNER_OF_APP}</span>
							</div>
						</div>
						<div className="col-sm-6 px-0 d-none d-sm-block">
							<ShowPairs {...this.props} pairs={this.state.pairs}/>
						</div>
					</div>
				</div>
			</main>
		);
	}

	generateRandomPairs = (fields) => {
		let pairs = shuffle(generateUniquePairs(fields));
		this.updateStatePairs(pairs);
	}

	updateStatePairs(pairs) {
		this.setState({pairs: pairs})
	}
}

export default Dashboard;