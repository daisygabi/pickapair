import React, {Component} from 'react';
import '../styles/App.scss';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {
	GENERATE_BUTTON,
	GENERATED_PAIR_VALUES,
	INPUT_TITLE,
	LOCATION_OF_OWNER_OF_APP,
	MADE_WITH,
	NAMES_ERROR_MSG, NAMES_TITLE,
	NOT_ENOUGH_DATA_MSG,
	WEBSITE_TITLE
} from "../utils/constants";
import ShowPairs from "./ShowPairs";
import {generateUniquePairs, shuffle} from "./utils/GeneratePairs";
import {LocalStorageService} from "../services/LocalStorageService";

const validation =
	Yup.object().shape({
		names: Yup.string()
			.min(2, NOT_ENOUGH_DATA_MSG)
			.required(NAMES_ERROR_MSG),
	});

class Dashboard extends Component {

	localStorageService = null;

	constructor(props) {
		super(props);
		this.state = {
			pairs: [],
		}
	}

	componentDidMount() {
		let previouslyGeneratedPairs = this.getPreviouslyGeneratedPairs();
		if (previouslyGeneratedPairs.length > 0) {
			this.setState({
				pairs: JSON.parse(previouslyGeneratedPairs),
			})
		}
	}

	render() {
		return (
			<main>
				<div className="row m-3">
					<div className="d-flex col-md-6 col-sm-12 dashboard-section-wrapper align-items-center justify-content-center">
						<div className="pt-3">
							<img src={require('../img/logo.svg')} alt="pick a pair logo" title="logo of the application"/>
						</div>
						<div className="dashboard-wrapper mt-2">
							<h1 aria-label="use semicolon as separator">{WEBSITE_TITLE}</h1>
							<Formik id="generateForm"
									initialValues={{
										names: this.getInitialInputValues(),
									}}
									validationSchema={validation}
									onSubmit={fields => {this.generateRandomPairs(fields);}}
									render={({errors, status, touched}) => (
										<Form aria-label="A form that asks for names as input and generates unique pairs">
											<div className="form-group" tabIndex={1}>
												<label htmlFor="names">{NAMES_TITLE}</label>
												<Field name="names" type="text" label="Names" id="names" aria-label="Write names with semicolon between them"
													   className={'form-control' + (errors.names && touched.names ? ' is-invalid' : '')}/>
												<ErrorMessage name="names" component="div" className="invalid-feedback"/>
											</div>
											<div className="form-group">
												<button type="submit" className="btn btn-block action-btn"
														aria-label="click to generate unique pairs"
														id="generateBtn" tabIndex={2}>{GENERATE_BUTTON}</button>
											</div>
										</Form>
									)}
							/>
							<span className="">{MADE_WITH}</span>
							<svg className="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16"
								 fill="red" xmlns="http://www.w3.org/2000/svg" role="img">
								<title>Love</title>
								<desc>Red heart</desc>
								<path fillRule="evenodd" role="presentation"
									  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
							</svg>
							<span>{LOCATION_OF_OWNER_OF_APP}</span>
						</div>
					</div>
					<div className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
						<ShowPairs {...this.props} pairs={this.state.pairs}/>
					</div>
				</div>
			</main>
		);
	}

	generateRandomPairs = (fields) => {
		let pairs = shuffle(generateUniquePairs(fields));
		this.updateStatePairs(pairs);

		// Save locally for recurrent user
		this._getLocalStorageService().saveItemToLocalStorage(INPUT_TITLE, fields.names);
		this._getLocalStorageService().saveItemToLocalStorage(GENERATED_PAIR_VALUES, JSON.stringify(pairs));
	}

	updateStatePairs(pairs) {
		this.setState({pairs: pairs});
	}

	getInitialInputValues() {
		return this._getLocalStorageService().retrieveItemFromLocalStorage(INPUT_TITLE) ?
			this._getLocalStorageService().retrieveItemFromLocalStorage(INPUT_TITLE) : '';
	}

	getPreviouslyGeneratedPairs() {
		return this._getLocalStorageService().retrieveItemFromLocalStorage(GENERATED_PAIR_VALUES) ?
			this._getLocalStorageService().retrieveItemFromLocalStorage(GENERATED_PAIR_VALUES) : [];
	}

	_getLocalStorageService() {
		if (!this.localStorageService) {
			this.localStorageService = new LocalStorageService();
		}
		return this.localStorageService;
	}
}

export default Dashboard;