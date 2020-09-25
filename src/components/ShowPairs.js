import React, {Component} from 'react';
import '../styles/App.scss';

class ShowPairs extends Component {

	render() {
		return (
			<div className="col-12">
				{this.props.pairs.length > 0 ? this.props.pairs.map((item, key) => {
					return <div className="info-block p-3 m-3 flex-column shadow" key={key}>
						<p className="d-flex align-items-center justify-content-center">{item.firstPerson} + {item.secondPerson}</p>
					</div>
				}) : <div><img src={require('../img/undraw_pair.svg')} alt="" className="p-3 m-3"/></div>}
			</div>
		);
	}
}

export default ShowPairs;