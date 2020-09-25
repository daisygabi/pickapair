import React, {Component} from 'react';
import '../styles/App.scss';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {
	GENERATE_BUTTON,
	LOCATION_OF_OWNER_OF_APP,
	MADE_WITH,
	NAME_SEPARATOR,
	NAMES_ERROR_MSG,
	WEBSITE_TITLE
} from "../utils/constants";
import ShowPairs from "./ShowPairs";

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
						<div className="d-flex flex-column col-sm-6 login-section-wrapper align-items-center justify-content-center">
							<div>
								<img src={require('../img/logo.svg')} alt="" className="logo"/>
							</div>
							<div className="mt-5 login-wrapper">
								<h1 className="login-title">{WEBSITE_TITLE}</h1>
								<Formik
									initialValues={{
										names: '',
									}}
									validationSchema={validation}
									onSubmit={fields => {this.generateRandomPairs(fields);}}
									render={({errors, status, touched}) => (
										<Form aria-label="Generate pairs form">
											<div className="form-group">
												<label htmlFor="names">Even number of names</label>
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

							<a href="https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
							   target="_blank" rel="noopener noreferrer">
								<img
									src={"https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"}
									alt="simple aired pantry" className="login-img"/>
							</a>
						</div>
					</div>
				</div>
			</main>
		);
	}

	generateRandomPairs = (fields) => {
 		let pairs = [];
		const allNames = fields.names.split(NAME_SEPARATOR);

		for (let i = 0; i < allNames.length; i++) {
			for (let j = i + 1; j < allNames.length; j++) {
				pairs.push({firstPerson: allNames[i].toLowerCase(), secondPerson: allNames[j].toLowerCase()});
			}
		}
		this.shuffle(pairs);
		this.updateStatePairs(pairs);
	}

	shuffle(pairs) {
		for (let i = 0; i < pairs.length; i++) {
			const j = Math.floor(Math.random() * i);
			let temp = pairs[i];
			pairs[i] = pairs[j];
			pairs[j] = temp;
		}
		return pairs;
	}

	updateStatePairs(pairs) {
		this.setState({pairs: pairs})
	}
}

export default Dashboard;
