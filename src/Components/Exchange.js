import React from 'react';
import ReactDOM from 'react-dom';
import './Style.css';
import {ccyUSD, ccyEUR} from './Header';

var ccy_L = 'USD';
var ccy_R = 'USD';
var input_value_L = '';
var input_value_R = '';

function exchange (input, ccy_code1, ccy_code2) {
    var out = 0;
    if (ccy_code1 == ccy_code2) {
        out = input;
    } else if (ccy_code1 == 'USD' && ccy_code2 == 'UAH') {
        out = input * ccyUSD.buyToday;
        out = Math.round(out * 100)/100;
    } else if (ccy_code1 == 'USD' && ccy_code2 == 'EUR') {
        out = input * (ccyEUR.buyToday / ccyUSD.buyToday);
        out = Math.round(out * 100)/100;
    } else if (ccy_code1 == 'EUR' && ccy_code2 == 'UAH') {
        out = input * ccyEUR.buyToday;
        out = Math.round(out * 100)/100;
    } else if (ccy_code1 == 'EUR' && ccy_code2 == 'USD') {
        out = input * (ccyUSD.buyToday / ccyEUR.buyToday);
        out = Math.round(out * 100)/100;
    } else if (ccy_code1 == 'UAH' && ccy_code2 == 'USD') {
        out = input / ccyUSD.buyToday;
        out = Math.round(out * 100)/100;
    } else if (ccy_code1 == 'UAH' && ccy_code2 == 'EUR') {
        out = input / ccyEUR.buyToday;
        out = Math.round(out * 100)/100;
    }
    return out;
}

class CurrencyExchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputL: '', inputR: '', valueL: '', valueR: ''};
        
        this.handleChange_inputL = this.handleChange_inputL.bind(this);
        this.handleChange_inputR = this.handleChange_inputR.bind(this);
        this.handleChange_ccyL = this.handleChange_ccyL.bind(this);
        this.handleChange_ccyR = this.handleChange_ccyR.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    
    handleChange_inputL(event) 
    {
        this.setState({inputL: event.target.value});
        input_value_L = event.target.value;
        input_value_R = exchange(input_value_L, ccy_L, ccy_R);
        this.state.inputR = input_value_R;        
    }
    
    handleChange_inputR(event) 
    {
        this.setState({inputR: event.target.value});
        input_value_R = event.target.value;
        input_value_L = exchange(input_value_R, ccy_R, ccy_L);
        this.state.inputL = input_value_L;
    }

    handleChange_ccyL(event) 
    {
        this.setState({valueL: event.target.value});
        ccy_L = event.target.value;
        input_value_L = this.state.inputL = exchange(input_value_R, ccy_R, ccy_L);
      }

    handleChange_ccyR(event) 
    {
        this.setState({valueR: event.target.value});
        ccy_R = event.target.value;
        input_value_R = this.state.inputR = exchange(input_value_L, ccy_L, ccy_R);
      }

      handleClick = (event) => 
      {
        let tmp_ccy = ccy_L;
        let tmp_input = input_value_L;

        ccy_L = ccy_R;
        ccy_R = tmp_ccy;

        input_value_L = input_value_R;
        input_value_R = tmp_input;

        this.state.inputL = input_value_L;
        this.state.inputR = input_value_R;

        this.state.valueR = ccy_R;
        this.state.valueL = ccy_L;

        this.setState({ccy_L});
        this.setState({ccy_R}); 
        this.setState({input_value_L});
        this.setState({input_value_R});
    }  

    handleSubmit(event) 
    {
        event.preventDefault();
    }   

    render() {        
        return(
            <form className='Input_info' onSubmit={this.handleSubmit}>
                <div className='From'>
                    <h4>From</h4>
                    <input type="number" value={this.state.inputL} onChange={this.handleChange_inputL} />
                    <select value={this.state.valueL} onChange={this.handleChange_ccyL}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="UAH">UAH</option>
                    </select>
                </div>
                <button  onClick={this.handleClick}><i className="exchange alternate icon"></i></button>
                <div className='To'>
                    <h4>To</h4>
                    <input type="number" value={this.state.inputR} onChange={this.handleChange_inputR } />
                    <select value={this.state.valueR} onChange={this.handleChange_ccyR}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="UAH">UAH</option>
                    </select>
                </div>                
            </form>            
        )
    }
}

export default CurrencyExchange;