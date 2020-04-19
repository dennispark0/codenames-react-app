import React from 'react';
import './Card.scss';

export interface CardProps{
    text : string;
    type : string;
    isFlipped? : boolean;
    callbackFn?;
}


export class Card extends React.Component<CardProps> {
    

render (){
return (
<div className="flip-card-container"
onClick={()=>this.props.callbackFn()}
>
    <div className={`flip-card card ${this.props.isFlipped ? 'active' : ''}`}>
        <div className="flip-card-face d-flex flex-column">
            <div className="card-header"></div>
            <p className="m-auto card-title">{this.props.text}</p>
            <div className="card-footer"></div>
            </div>
        <div className="flip-card-face__back d-flex">
<p className="m-auto">{this.props.type}</p></div>
    </div>
  </div>);
}

}