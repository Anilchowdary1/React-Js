/* global covid19 */
import './index.css';
import React, { PureComponent, Component } from 'react';
 import {
   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
 } from 'recharts';
 import {
  withRouter,
}
from "react-router-dom";

class CountryDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        country:JSON.parse(this.props.location.state.countryDetails),
    }
}

componentDidMount() {
    const data = covid19.data();
    const currentCountryData = data.filter(x=>x.country_iso3===this.state.country.alpha3Code).groupByDate();
    this.setState({
        data: currentCountryData,
    });
}
goBack=()=>{
  this.props.history.push({
    pathname: `/countrylist`,
  });
}

  render() {
    const url = this.state.country.flag;
        const flagStyle={
            backgroundImage: 'url('+url+')',
            backgroundSize: 'cover',
            width: '40vw',
            height:'300px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
      const rechartStyle={
        position: 'relative',
        cursor: 'default',
        width: '500px',
         height: '500px'
      }
      const currencies = this.state.country.currencies.map((currencyDetails) => {
        return currencyDetails.name;
    });
      const languages = this.state.country.languages.map((languageDetails) => {
        return languageDetails.name;
    });
    return (
      <div>
              <header className="d-flex justify-content-between position-relative px-lg-10 px-xl-16 py-8 px-5 shadow p-4  rounded align-items-center ">
                    <a aria-current="page" className="title-heading px-3  text-xl-left text-dark" href="/countrylist">Where in the world?</a>
                <div className="d-flex text-capitalize px-3 align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 16 16"><path fill="#000" d="M13.2 11.9c-4.5 0-8.1-3.6-8.1-8.1 0-1.4.3-2.7.9-3.8-3.4.9-6 4.1-6 7.9C0 12.4 3.6 16 8.1 16c3.1 0 5.8-1.8 7.2-4.4-.6.2-1.3.3-2.1.3zM8.1 15C4.2 15 1 11.8 1 7.9c0-2.5 1.3-4.7 3.3-6-.2.6-.2 1.2-.2 1.9 0 5 4.1 9.1 9.1 9.2-1.4 1.2-3.2 2-5.1 2z"></path></svg>
                    <p className="text-dark  text-capitalize text-center m-1 "> light mode</p>
                </div>
      </header>
      <main className="bg-light lg:px-10 xl:px-16 px-5 pb-20">
  <div>
    <button onClick={this.goBack} className="bg-white back-btn shadow rounded border-0 px-3 py-2 my-5">
      ← Back
      </button>
  </div>
  <div className="d-flex align-items-center flex-col flex-md-row md:justify-content-between ">
    <div style={flagStyle} className="w-3/4 mr-5  w-md-3/4 w-lg-2/4 w-xl-5/12 h-56 h-lg-64 mr-md-12 mr-lg-20 mr-xl-30 h-md-12/12 " >
    </div>
    <section className="ml-5">
      <h1 className="text-xl font-bold mt-8 mb-6">{this.state.country.name}</h1>
      <div className="d-flex flex-col flex-md-row">
        <div className="mr-md-10">
          <p className="mb-2">
            <b>Native Name:</b> {this.state.country.nativeName}</p>
          <p className="mb-2"><b>Population:</b> {this.state.country.population}</p>
          <p className="mb-2"><b>Region:</b> {this.state.country.region}</p>
          <p className="mb-2"><b>Sub Region:</b> {this.state.country.subregion}</p>
          <p className="mb-2"><b>Capital:</b> {this.state.country.capital}</p>
        </div>
        <div className="ml-4 mt-8 mt-md-0">
          <p className="mb-2"><b>Top Level Domain:</b> {this.state.country.topLevelDomain}</p>
          <p className="mb-2"><b>Currencies:</b> {currencies.join(", ")}</p>
           <p className="mb-2"><b>Languages:</b> {languages.join(", ")}</p> 
          </div>
        </div>
        <div >
        </div>
        <p className="mb-2"><b>Covid-19 Report</b></p>
        <div className="mb-8 chart" style={rechartStyle}>
        <LineChart
           width={600}
           height={450}
            data={this.state.data}
              margin={{
                   top: 5, right: 30, left: 20, bottom: 5,
                    }}>
             <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                  <YAxis />
              <Tooltip />
           <Legend />
              <Line type="monotone" dataKey="recovered" stroke="green" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="confirmed" stroke="orange" />
              <Line type="monotone" dataKey="deaths" stroke="red" />
          </LineChart>
           {/* :<h2>No data found</h2>
         }  */}
          </div>
      </section>
      </div>
    </main>
    </div>
    );
  }
}
export default withRouter(CountryDetails);