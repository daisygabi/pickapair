import React, {Component} from 'react';
import '../styles/App.scss';

class ShowPairs extends Component {

	render() {
		return (
			<div className="row">
				<div className="col-12 d-flex flex-wrap justify-content-center" aria-label="Generated pairs">
					{this.props.pairs.length > 0 ? this.props.pairs.map((item, key) => {
						return <div className="d-inline-block flex-grow-0 flex-shrink-0 info-block p-3 m-3 shadow" key={key} tabIndex={3}>
							<div className="d-flex align-items-center justify-content-center h-100"><span>{item.firstPerson} + {item.secondPerson}</span></div>
						</div>
					}) : <div className="row"><img src={require('../img/undraw_pair.svg')}
												   alt="initial image shown where are no results" title="default image when there are no results" className="col-12"/>
					</div>}
				</div>
			</div>
		);
	}
}

export default ShowPairs;