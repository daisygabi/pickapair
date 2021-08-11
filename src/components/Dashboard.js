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
	NAMES_ERROR_MSG,
	NAMES_TITLE,
	NOT_ENOUGH_DATA_MSG,
	RESET_BUTTON,
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
		let resetBtn = '';
		if (this.state.pairs.length > 0) {
			resetBtn = <div>
				<button type='submit' className='ml-3 btn reset-btn' aria-label='click to reset pairs'
						onClick={() => this.resetValues()}>{RESET_BUTTON}</button>
			</div>;
		}
		return (
			<main className="vh-100">
				<section className="w-100 header-line p-3">Analytics and tracking free</section>
				<section className="d-flex flex-column align-items-center justify-content-center m-3 pt-5">
					<div className="row mt-5">
						<div className="d-flex col-md-7 col-sm-12 flex-column dashboard-section-wrapper align-items-center">
							<div className="dashboard-wrapper pt-5">
								<h1 aria-label="use semicolon as separator">{WEBSITE_TITLE}</h1>
								<Formik id="generateForm"
										initialValues={{
											names: this.getInitialInputValues(),
										}}
										validationSchema={validation}
										onSubmit={fields => {this.generateRandomPairs(fields);}}
										render={({errors, status, touched}) => (
											<Form
												aria-label="A form that asks for names as input and generates unique pairs">
												<div className="form-group mt-5 shadow">
													<Field name="names" type="text" label="Names" id="names"
														   aria-label="Write names with semicolon between them"
														   className={'form-control' + (errors.names && touched.names ? ' is-invalid' : '')}
														   placeholder={NAMES_TITLE}/>
													<ErrorMessage name="names" component="div"
																  className="invalid-feedback"/>
												</div>
												<div className="d-flex align-items-center justify-content-end">
													<button type="submit" className="btn action-btn"
															aria-label="click to generate unique pairs"
															id="generateBtn">{GENERATE_BUTTON}</button>
													{resetBtn}
												</div>
											</Form>
										)}
								/>
								<span aria-label="made with love">{MADE_WITH}</span>
								<svg className="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16"
									 fill="red" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="love">
									<title>Love</title>
									<desc>Red heart</desc>
									<path fillRule="evenodd" role="presentation"
										  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
								</svg>
								<span aria-label="in Sibiu, Romania">{LOCATION_OF_OWNER_OF_APP}</span>
							</div>
						</div>
						<div className="col-md-5 col-sm-12 d-flex align-items-center justify-content-center">
							<ShowPairs {...this.props} pairs={this.state.pairs}/>
						</div>
					</div>
				</section>
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

	resetValues() {
		this._getLocalStorageService().clear();
		this.setState({pairs: []})
	}

	_getLocalStorageService() {
		if (!this.localStorageService) {
			this.localStorageService = new LocalStorageService();
		}
		return this.localStorageService;
	}
}

export default Dashboard;
