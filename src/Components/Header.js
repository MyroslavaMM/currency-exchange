import React from 'react';
import ReactDOM from 'react-dom';
import './Style.css';

var ccyUSD = {
    buyToday: 0,
    saleToday: 0,
}; export {ccyUSD};

var ccyEUR = {
        buyToday: 0,
        saleToday: 0
    }; export {ccyEUR};

class CurrantCurrency extends React.Component {

    componentDidMount(entry) 
        {
           fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
            .then(res => res.json())
            .then((result) => {
            this.setState({
                buyToday: result,
            });
            ccyUSD.buyToday = parseFloat(result[0].buy);
            ccyUSD.saleToday = parseFloat(result[0].sale);
            ccyEUR.buyToday = parseFloat(result[1].buy);
            ccyEUR.saleToday = parseFloat(result[1].sale);
            })
        }  

    render() {
        return(
            <header className='header'>
                <div className='daily_currency'>
                    <div>
                        <h2><span>Currant</span>Currency</h2>
                    </div>
                    <div className='currency_items'>
                        <span className='currency usd'>USD<i className="dollar sign icon"></i></span>
                        <span>
                            <span className='currency_value'>{ccyUSD.buyToday}</span>
                        </span>
                        <span>
                            <span className='currency_value'>{ccyUSD.saleToday}</span>
                        </span>
                        <span className='currency eur'>EUR <i className="euro sign icon"></i> </span>
                        <span>
                            <span className='currency_value'>{ ccyEUR.buyToday }</span>
                        </span>
                        <span>
                            <span className='currency_value'>{ ccyEUR.saleToday }</span>
                        </span>
                    </div>                    
                </div>
            </header>
        )
    }
}

export default CurrantCurrency;