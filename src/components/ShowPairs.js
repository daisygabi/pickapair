import React, {Component} from 'react';
import '../styles/App.scss';

class ShowPairs extends Component {

	render() {
		return (
			<div className="col-12">
				{this.props.pairs ? this.props.pairs.map(item => {
					return <div className="post-block pr-3 pl-3 m-3 flex-column shadow" key={item.id}>
						<p className="post-block--title mt-3">{item.firstPerson} : </p>
						<p className="post-block--title mt-3">{item.secondPerson}</p>
					</div>
				}) : ""}
			</div>
		);
	}
}

export default ShowPairs;
